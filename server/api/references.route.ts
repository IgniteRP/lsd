import { Endpoint, defineRoute } from '@michealpearce/classy-fastify'
import { Report } from 'server/database/models/Report'
import { parseLimitQuery, parsePageQuery } from 'server/includes/functions'
import { Like, type FindManyOptions } from 'typeorm'

export const route = defineRoute('/references')

@route.endpoint('GET', '/:type/:id')
export class ReferencesListEndpoint extends Endpoint<{
	query: {
		page?: number
		limit?: number
	}
	params: {
		type: string
		id: string
	}
}> {
	async handle() {
		const take = parseLimitQuery(this.query.limit)
		const skip = parsePageQuery(this.query.page, take)
		const opts: FindManyOptions<any> = { take, skip }

		return {
			reports: await this.listReports(opts),
		}
	}

	async listReports(opts: FindManyOptions<any>) {
		const { type, id } = this.params
		try {
			return await Report.find({
				...opts,
				where: {
					description: Like(`%${type}#${id}%`),
				},
			})
		} catch (error) {}
	}
}
