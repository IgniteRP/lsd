import { Endpoint, defineRoute } from '@michealpearce/classy-fastify'
import { Report, type ReportData } from 'server/database/models/Report'
import { ServerError } from 'server/includes/ServerError'
import { parseListQuery } from 'server/includes/functions'
import { hasPermission } from 'server/middleware/hasPermission'

export const route = defineRoute('/reports')

@route.endpoint('GET')
export class ReportsListEndpoint extends Endpoint<{
	query: {
		page?: number
		limit?: number
		order?: string
	}
}> {
	static onRequest = [hasPermission('reports.list')]

	async handle() {
		const options = parseListQuery(this.query)

		try {
			this.console.info(options, 'Listing reports')
			const items = await Report.find(options)

			if (!items.length) throw new ServerError('No reports found', 404)
			return items
		} catch (error) {
			this.console.error(error, 'Failed to list reports')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to list reports', 500)
		}
	}
}

@route.endpoint('POST')
export class ReportsCreateEndpoint extends Endpoint<{
	body: Partial<ReportData>
}> {
	static onRequest = [hasPermission('reports.create')]

	async handle() {
		try {
			this.console.info(this.body, 'Creating report')
			const item = await Report.init(this.body).save()

			return item
		} catch (error) {
			this.console.error(error, 'Failed to create report')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to create report', 500)
		}
	}
}

@route.endpoint('GET', '/:id')
export class ReportsGetEndpoint extends Endpoint<{
	params: {
		id: string
	}
}> {
	static onRequest = [hasPermission('reports.list')]

	get reportID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const { reportID } = this

		try {
			this.console.info({ reportID }, 'Getting report')
			const item = await Report.findOneBy({ id: reportID })

			if (!item) throw new ServerError('Report not found', 404)
			return item
		} catch (error) {
			this.console.error(error, 'Failed to get report')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to get report', 500)
		}
	}
}
