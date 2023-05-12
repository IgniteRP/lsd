import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifySession from '@fastify/session'
import { definePlugin } from '@michealpearce/classy-fastify'
import { isDefined, type FunctionType } from '@michealpearce/utils'
import type { FastifyInstance, FastifyRequest } from 'fastify'
import { User } from 'server/database/models/User'
import { UserSessionStore } from 'server/includes/UserSessionStore'

declare module 'fastify' {
	interface FastifyRequest {
		authed?: User
	}

	interface Session {
		userID: number
	}
}

function getRoutes(): Array<FunctionType> {
	const files = import.meta.glob<true, string, Record<string, any>>(
		'../api/**/*.route.ts',
		{
			eager: true,
		},
	)

	return Object.values(files)
		.map(file => file.route)
		.filter(isDefined)
}

export const plugin = definePlugin(
	async instance => {
		await instance
			.register(fastifyCors, {
				origin: import.meta.env.CLIENT_URL,
			})
			.register(fastifyCookie)
			.register(fastifySession, {
				secret: import.meta.env.SERVER_SESSION_SECRET,
				cookieName: 'lsd-session',
				store: new UserSessionStore(),
				cookie: {
					secure: import.meta.env.PROD,
					httpOnly: true,
				},
			})

		instance.addHook('onRequest', checkAuthSession)

		for (const route of getRoutes())
			await instance.register(route, {
				prefix: '/api',
			})
	},
	{
		global: true,
		name: 'routes',
	},
)

function loadSession(
	id: string,
	request: FastifyRequest,
	instance: FastifyInstance,
) {
	return new Promise<void>((resolve, reject) => {
		instance.decryptSession(id, request, err => (err ? reject(err) : resolve()))
	})
}

async function checkAuthSession(
	this: FastifyInstance,
	request: FastifyRequest,
) {
	const authHeader = request.headers.authorization
	if (!request.cookies['lsd-session'] && authHeader) {
		// removes "Bearer " from the start of the string
		const sessionID = authHeader.split(' ')[1]
		if (sessionID)
			try {
				this.log.info('loading session from Auth header')
				await loadSession(sessionID, request, this)
			} catch (error) {
				this.log.error(error, 'failed loading session from Auth header')
			}
	}

	const userID = request.session.get('userID')
	if (!userID) return

	const authed = await User.findOneBy({ id: userID })
	if (!authed) {
		this.log.warn('Invalid session found, destroying session')
		await request.session.destroy()
		return
	} else this.log.info(`User ${authed.name} is authed`)

	request.authed = authed
}
