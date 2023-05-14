import { defaults, isString } from '@michealpearce/utils'
import { compare, hash } from 'bcrypt'
import { randomBytes } from 'crypto'
import {
	Like,
	type FindManyOptions,
	type FindOptionsOrder,
	type FindOptionsWhere,
} from 'typeorm'

export function parseListQuery(
	query: Record<string, any>,
	maxLimit = 100,
): FindManyOptions & {
	where?: FindOptionsWhere<any>
} {
	const opts = defaults(query, {
		limit: 10,
		page: 0,
	})

	const take = parseLimitQuery(opts.limit, maxLimit)
	const skip = parsePageQuery(opts.page, take)

	const options: FindManyOptions = {
		take,
		skip,
	}

	if (isString(opts.query)) {
		const q = opts.query as string
		const orderRegex = / ?(\w+:(?:DESC|ASC|desc|asc)) ?/g
		const whereRegex = / ?((?<prop>\w+)(?<like>~)?\[(?<value>[^\]]*)\]) ?/g

		opts.order = Array.from(q.matchAll(orderRegex))
			.map(match => match[1])
			.filter(isString)
			.join(',')
		opts.where = Array.from(q.matchAll(whereRegex))
			.map(match => match[1])
			.filter(isString)
			.join(',')
	}

	if (isString(opts.order)) options.order = parseOrderQuery(opts.order)
	if (isString(opts.where)) options.where = parseWhereQuery(opts.where)

	return options
}

export function parseLimitQuery(limit: number = 10, maxLimit = 100) {
	return Math.min(Math.max(limit, 1), maxLimit)
}

export function parsePageQuery(page: number = 1, take: number) {
	return (Math.max(page, 1) - 1) * take
}

export function parseOrderQuery(input: string): FindOptionsOrder<any> {
	return input.split(',').reduce((acc, cur) => {
		const [key, direction] = cur.split(':')
		acc[key] = direction
		return acc
	}, {} as Record<string, any>)
}

export function parseWhereQuery(input: string): FindOptionsWhere<any> {
	const regex = / ?((?<prop>\w+)(?<like>~)?\[(?<value>[^\]]*)\]) ?/g
	const matches = Array.from(input.matchAll(regex))
	return matches.reduce((acc, { groups }) => {
		if (!groups) return acc
		let value = groups.value as any

		//check if value is a number
		if (!isNaN(Number(value))) value = Number(value)

		if (groups.like) {
			if (isString(value) && value.includes('%')) acc[groups.prop] = Like(value)
			else acc[groups.prop] = Like(`%${value}%`)
		} else acc[groups.prop] = value

		return acc
	}, {} as Record<string, any>)
}

export function hashPassword(password: string) {
	return hash(`${import.meta.env.SERVER_PASSWORD_SALT}${password}`, 10)
}

export function comparePassword(password: string, hash: string) {
	return compare(`${import.meta.env.SERVER_PASSWORD_SALT}${password}`, hash)
}

export function generateAPIKey() {
	return randomBytes(32).toString('hex')
}
