import type { onRequestHookHandler } from 'fastify'
import { ServerError } from '../includes/ServerError'

export function hasPermission(...permissions: string[]): onRequestHookHandler {
	return async function (request) {
		const authed = request.authed
		if (!authed) throw new ServerError('Not logged in', 401)

		if (hasMasterPermission(permissions, authed.permissions)) return

		const foundPerms = new Set<string>()

		for (const perm of authed.permissions)
			if (permissions.includes(perm)) foundPerms.add(perm)
		if (foundPerms.size === permissions.length) {
			console.log('found perms')
			return
		}

		// check user roles
		for (const { permissions: rolePerms } of authed.roles) {
			for (const perm of rolePerms)
				if (permissions.includes(perm)) foundPerms.add(perm)

			if (foundPerms.size === permissions.length) return
		}

		const missingPerms = permissions
			.filter(perm => !foundPerms.has(perm))
			.join(', ')
		throw new ServerError(`Missing permissions: ${missingPerms}`, 403)
	}
}

function hasMasterPermission(wantedPerms: string[], permissions: string[]) {
	if (permissions.includes('*')) return true
	return wantedPerms.every(wantedPerm => {
		const [permNS] = wantedPerm.split('.')
		return permissions.includes(`${permNS}.*`)
	})
}
