import { Model, type ModelData } from '@michealpearce/typeorm-models'
import { User, type UserData } from './User'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

export interface UserSessionData extends ModelData {
	id: string
	userID?: number
	user?: UserData
	data: any
}

@Entity()
export class UserSession
	extends Model<UserSessionData>
	implements UserSessionData
{
	@Column('varchar', { primary: true, length: 255 })
	declare id: string

	@Column('varchar')
	declare userID: number

	@ManyToOne(() => User, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'userID' })
	declare user?: User

	@Column('simple-json')
	declare data: any
}

export const model = UserSession
