import { Model, type ModelData } from '@michealpearce/typeorm-models'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { User, type UserData } from './User'

export interface UserRoleData extends ModelData {
	name: string
	displayName: string
	users?: UserData[]
	permissions: string[]
}

@Entity()
export class UserRole extends Model<UserRoleData> implements UserRoleData {
	@Column('varchar', { primary: true, length: 255 })
	declare name: string

	@Column('varchar')
	declare displayName: string

	@ManyToMany(() => User, user => user.roles, { onDelete: 'CASCADE' })
	@JoinTable({ name: 'user_roles' })
	declare users?: User[]

	@Column('simple-array')
	declare permissions: string[]
}

export const model = UserRole
