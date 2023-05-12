import { ModelID, type ModelIDData } from '@michealpearce/typeorm-models'
import { Column, Entity } from 'typeorm'

export interface ReportData extends ModelIDData {
	title: string
	description: string
}

@Entity()
export class Report extends ModelID<ReportData> implements ReportData {
	@Column('text')
	declare title: string

	@Column('longtext')
	declare description: string
}

export const model = Report
