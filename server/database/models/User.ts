import { ModelID, ModelIDData } from '@michealpearce/typeorm-models'
import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	Unique,
} from 'typeorm'
import { UserRole, type UserRoleData } from './UserRole'
import { UserMeta, type UserMetaData } from './UserMeta'

export interface UserData extends ModelIDData {
	name: string
	password?: string
	roles: UserRoleData[]
	permissions: string[]
	meta?: UserMetaData[]
}

@Entity()
export class User extends ModelID<UserData> implements UserData {
	@Column('varchar')
	declare name: string

	@Column('varchar', { select: false })
	declare password?: string

	@ManyToMany(() => UserRole, role => role.users, {
		eager: true,
		onDelete: 'CASCADE',
	})
	declare roles: UserRole[]

	@Column('simple-array')
	declare permissions: string[]

	@OneToMany(() => UserMeta, meta => meta.user, { cascade: true })
	declare meta?: UserMeta[]
}

export const model = User
