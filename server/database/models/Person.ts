import { ModelID, type ModelIDData } from '@michealpearce/typeorm-models'
import { Column, Entity } from 'typeorm'

export interface PersonData extends ModelIDData {
	name: string
}

@Entity()
export class Person extends ModelID<PersonData> implements PersonData {
	@Column('varchar')
	declare name: string
}

export const model = Person
