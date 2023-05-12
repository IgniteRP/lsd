import type { UserRoleData } from '../database/models/UserRole'

export const baseRoles: Array<
	Pick<UserRoleData, 'name' | 'displayName' | 'permissions'>
> = [
	{
		name: 'admin',
		displayName: 'Administrator',
		permissions: [
			'users.list',
			'users.create',
			'users.edit',
			'users.addPermission',
			'users.removePermission',
			'users.delete',
			'users.addRole',
			'users.removeRole',
			'roles.list',
			'roles.create',
			'roles.addPermission',
			'roles.removePermission',
			'roles.delete',
		],
	},
]
