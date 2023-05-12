import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifySession from '@fastify/session'
import { definePlugin } from '@michealpearce/classy-fastify'
import { isDefined, type FunctionType } from '@michealpearce/utils'
import type { FastifyInstance, FastifyRequest } from 'fastify'
import { User } from 'server/database/models/User'

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

async function checkAuthSession(
	this: FastifyInstance,
	request: FastifyRequest,
) {
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
