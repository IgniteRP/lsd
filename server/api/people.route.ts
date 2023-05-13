import { Endpoint, defineRoute } from '@michealpearce/classy-fastify'
import { pick } from '@michealpearce/utils'
import { Person, type PersonData } from 'server/database/models/Person'
import { ServerError } from 'server/includes/ServerError'
import { parseListQuery } from 'server/includes/functions'
import { hasPermission } from 'server/middleware/hasPermission'

export const route = defineRoute('/people')

@route.endpoint('GET')
export class PeopleListEndpoint extends Endpoint<{
	query: {
		page?: number
		limit?: number
		order?: string
	}
}> {
	static onRequest = [hasPermission('people.list')]

	async handle() {
		const options = parseListQuery(this.query)

		try {
			this.console.info(options, 'Listing people')
			const items = await Person.find(options)

			if (!items.length) throw new ServerError('No people found', 404)
			return items
		} catch (error) {
			this.console.error(error, 'Failed to list people')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to list people', 500)
		}
	}
}

@route.endpoint('POST')
export class PeopleCreateEndpoint extends Endpoint<{
	body: Partial<PersonData>
}> {
	static onRequest = [hasPermission('people.create')]

	async handle() {
		try {
			this.console.info(this.body, 'Creating person')
			const item = await Person.init(this.body).save()

			return item
		} catch (error) {
			this.console.error(error, 'Failed to create person')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to create person', 500)
		}
	}
}

@route.endpoint('GET', '/:id')
export class PeopleGetEndpoint extends Endpoint<{
	params: {
		id: string
	}
}> {
	static onRequest = [hasPermission('people.list')]

	get personID() {
		return parseInt(this.params.id)
	}

	async handle() {
		const { personID } = this

		try {
			this.console.info({ personID }, 'Getting person')
			const item = await Person.findOne({
				where: { id: personID },
				withDeleted: true,
			})

			if (!item) throw new ServerError('Person not found', 404)
			return item
		} catch (error) {
			this.console.error(error, 'Failed to get person')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to get person', 500)
		}
	}
}

@route.endpoint('PATCH', '/:id')
export class PeopleUpdateEndpoint extends Endpoint<{
	params: {
		id: string
	}
	body: Partial<PersonData>
}> {
	static onRequest = [hasPermission('people.update')]

	async handle() {
		const item = await new PeopleGetEndpoint(
			this.instance,
			this.request,
			this.reply,
		).handle()
		const data = pick(this.body, ['name'])

		try {
			return await item.assign(data).save()
		} catch (error) {
			this.console.error(error, 'Failed to update person')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to update person', 500)
		}
	}
}

@route.endpoint('DELETE', '/:id')
export class PeopleDeleteEndpoint extends Endpoint<{
	params: {
		id: string
	}
}> {
	static onRequest = [hasPermission('people.delete')]

	async handle() {
		const item = await new PeopleGetEndpoint(
			this.instance,
			this.request,
			this.reply,
		).handle()

		try {
			return await item.softRemove()
		} catch (error) {
			this.console.error(error, 'Failed to delete person')

			if (error instanceof ServerError) throw error
			throw new ServerError('Failed to delete person', 500)
		}
	}
}
