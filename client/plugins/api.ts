import { useContext } from 'client/includes/functions'
import type { ClientContext } from 'client/types'
import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'
import { useAuth } from '../stores/auth'

declare module 'client/types' {
	interface ClientContext {
		api: AxiosInstance
	}
}

export async function setupAPI(context: ClientContext) {
	const config: CreateAxiosDefaults<any> = {
		baseURL: '/api',
	}

	const api = axios.create(config)

	context.api = api
	context.app.provide('api', api)

	if (localStorage.getItem('userID')) {
		const auth = useAuth(context)
		await auth.fetch().catch(() => localStorage.removeItem('userID'))
	}
}

export function useAPI(context: ClientContext = useContext()) {
	return context.api
}
