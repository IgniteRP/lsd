import { Endpoint, defineRoute } from '@michealpearce/classy-fastify'
import { pick } from '@michealpearce/utils'
import { User, type UserData } from '../database/models/User'
import { ServerError } from '../includes/ServerError'
import { parseListQuery } from '../includes/functions'
import { hasPermission } from '../middleware/hasPermission'
import { UserRole } from '../database/models/UserRole'
import { UserMeta } from '../database/models/UserMeta'

export const route = defineRoute('/users')

@route.endpoint('GET')
export class UsersListEndpoint extends Endpoint<{
	query: {
		limit?: number
		page?: number
		order?: string
	}
}> {
	async handle() {
		const options = parseListQuery(this.query)

		try {
			this.console.info(options, 'Listing users')
			const items = await User.find(options)

			if (!items.length) throw new ServerError('No users found', 404)
			return items
		} catch (error) {
			this.console.error(error, 'Failed to list users')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to list users', 500)
		}
	}
}

@route.endpoint('POST')
export class UsersCreateEndpoint extends Endpoint<{
	body: Partial<UserData>
}> {
	get data() {
		return pick(this.body, ['name'])
	}

	async handle() {
		try {
			return await User.init(this.data).save()
		} catch (error) {
			this.console.error(error, 'Failed to create user')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to create user', 500)
		}
	}
}

@route.endpoint('GET', '/:id')
export class UsersFetchEndpoint extends Endpoint<{
	params: {
		id: string
	}
}> {
	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		try {
			const user = await User.findOneBy({
				id: this.userID,
			})

			if (!user) throw new ServerError('User not found', 404)
			return user
		} catch (error) {
			this.console.error(error, 'Failed to fetch user')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to fetch user', 500)
		}
	}
}

@route.endpoint('POST', '/:id/roles/:name')
export class UsersAddRoleEndpoint extends Endpoint<{
	params: { id: string; name: string }
}> {
	static onRequest = [hasPermission('users.addRole')]

	async handle() {
		const { name } = this.params
		const fetch = new UsersFetchEndpoint(
			this.instance,
			this.request,
			this.reply,
		)
		const user = await fetch.handle()

		try {
			const role = await UserRole.findOne({
				where: { name },
			})

			if (!role) throw new ServerError('Role not found', 400)

			user.roles.push(role)
			await user.save()

			return user
		} catch (error) {
			this.console.error(error, 'Failed to add user role')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to add user role', 500)
		}
	}
}

@route.endpoint('DELETE', '/:id/roles/:name')
export class UsersRemoveRoleEndpoint extends Endpoint<{
	params: { id: string; name: string }
}> {
	static onRequest = [hasPermission('users.removeRole')]

	async handle() {
		const { name } = this.params
		const fetch = new UsersFetchEndpoint(
			this.instance,
			this.request,
			this.reply,
		)
		const user = await fetch.handle()

		try {
			const role = await UserRole.findOne({
				where: { name },
			})

			if (!role) throw new ServerError('Role not found', 400)

			user.roles = user.roles.filter(r => r.name !== role.name)
			await user.save()

			return user
		} catch (error) {
			this.console.error(error, 'Failed to remove user role')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to remove user role', 500)
		}
	}
}

@route.endpoint('GET', '/:id/permissions')
export class UsersFetchPermissionsEndpoint extends Endpoint<{
	params: {
		id: string
	}
}> {
	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const id = this.userID

		try {
			const user = await User.findOne({
				where: { id },
				relations: {
					permissions: true,
				},
				select: {
					id: true,
					permissions: true,
				},
			})

			if (!user) throw new ServerError('User not found', 404)
			else if (!user.permissions)
				throw new Error('user permissions relation not loaded')

			return user.permissions
		} catch (error) {
			this.console.error(error, 'Failed to fetch user permissions')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to fetch user permissions', 500)
		}
	}
}

@route.endpoint('GET', '/:id/permissions/:name')
export class UsersHasPermissionEndpoint extends Endpoint<{
	params: {
		id: string
		name: string
	}
}> {
	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const id = this.userID
		const { name } = this.params

		try {
			const user = await User.findOne({
				where: { id },
				relations: {
					permissions: true,
					roles: true,
				},
				select: {
					id: true,
					permissions: true,
					roles: true,
				},
			})

			if (!user) throw new ServerError('User not found', 404)
			else if (!user.permissions)
				throw new Error('user permissions relation not loaded')

			const directlyHasPerm = user.permissions.includes(name)
			if (directlyHasPerm) return true

			// check user roles
			for (const { name: roleName } of user.roles) {
				const role = await UserRole.findOneOrFail({
					where: { name: roleName },
					relations: {
						permissions: true,
					},
					select: {
						name: true,
						permissions: true,
					},
				})

				const roleHasPerm = role.permissions.includes(name)
				if (roleHasPerm) return true
			}

			return false
		} catch (error) {
			this.console.error(error, 'Failed to fetch user permission')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to check user permission', 500)
		}
	}
}

@route.endpoint('POST', '/:id/permissions/:name')
export class UsersAddPermissionEndpoint extends Endpoint<{
	params: {
		id: string
		name: string
	}
}> {
	static onRequest = [hasPermission('users.addPermission')]

	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const id = this.userID
		const { name } = this.params

		try {
			const user = await User.findOne({
				where: { id },
				relations: {
					permissions: true,
				},
				select: {
					id: true,
					permissions: true,
				},
			})

			if (!user) throw new ServerError('User not found', 404)
			else if (!user.permissions) user.permissions = []

			const missingPerm = !user.permissions.includes(name)
			if (missingPerm) {
				user.permissions.push(name)
				await user.save()
			}

			return user.permissions
		} catch (error) {
			this.console.error(error, 'Failed to add user permission')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to add user permission', 500)
		}
	}
}

@route.endpoint('DELETE', '/:id/permissions/:name')
export class UsersRemovePermissionEndpoint extends Endpoint<{
	params: {
		id: string
		name: string
	}
}> {
	static onRequest = [hasPermission('users.removePermission')]

	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const id = this.userID
		const { name } = this.params

		try {
			const user = await User.findOne({
				where: { id },
				relations: {
					permissions: true,
				},
				select: {
					id: true,
					permissions: true,
				},
			})

			if (!user) throw new ServerError('User not found', 404)
			else if (!user.permissions) user.permissions = []

			const missingPerm = !user.permissions.includes(name)
			if (!missingPerm) {
				user.permissions = user.permissions.filter(perm => perm !== name)
				await user.save()
			}

			return user.permissions
		} catch (error) {
			this.console.error(error, 'Failed to remove user permission')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to remove user permission', 500)
		}
	}
}

@route.endpoint('GET', '/:id/meta')
export class UsersListMetaEndpoint extends Endpoint<{
	params: { id: string }
	query: Record<string, string>
}> {
	async handle() {
		const { id } = this.params
		const options = parseListQuery(this.query, 10000)

		if (options.where) options.where.id = id
		else options.where = { userID: id }

		try {
			const items = await UserMeta.find(options)

			if (!items) throw new ServerError('Meta not found', 404)
			return items
		} catch (error) {
			this.console.error(error, 'Failed to list user meta')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to list user meta', 500)
		}
	}
}

@route.endpoint('GET', '/:id/meta/:name')
export class UsersGetMetaEndpoint extends Endpoint<{
	params: { id: string; name: string }
}> {
	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const { name } = this.params

		try {
			const meta = await UserMeta.findOneBy({ userID: this.userID, name })

			if (!meta) throw new ServerError('Meta not found', 404)
			return meta
		} catch (error) {
			this.console.error(error, 'Failed to get user meta')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to get user meta', 500)
		}
	}
}

@route.endpoint('POST', '/:id/meta/:name')
export class UsersSetMetaEndpoint extends Endpoint<{
	params: { id: string; name: string }
	body: { value: any }
}> {
	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const {
			userID,
			params: { name },
			body,
		} = this
		const value = body.value

		try {
			const meta = await UserMeta.init({ userID, name, value }).save()
			return meta
		} catch (error) {
			this.console.error(error, 'Failed to set user meta')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to set user meta', 500)
		}
	}
}

@route.endpoint('DELETE', '/:id/meta/:name')
export class UsersRemoveMetaEndpoint extends Endpoint<{
	params: { id: string; name: string }
}> {
	get userID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const {
			userID,
			params: { name },
		} = this

		try {
			const meta = await UserMeta.findOneBy({ userID, name })

			if (!meta) throw new ServerError('Meta not found', 404)
			await meta.remove()
			return true
		} catch (error) {
			this.console.error(error, 'Failed to remove user meta')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to remove user meta', 500)
		}
	}
}
