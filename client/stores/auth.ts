import { defineStore } from 'client/includes/functions'
import { ref } from 'vue'
import type { UserData, LoginCreds } from 'server'

export const useAuth = defineStore('auth', context => {
	const { api } = context

	const current = ref<UserData | null>(null)

	async function fetch() {
		const { data } = await api.get<UserData>('auth')

		current.value = data
		return data
	}

	async function login(creds: LoginCreds) {
		const { data } = await api.post<UserData>('auth', creds)

		current.value = data
		localStorage.setItem('userID', data.id.toString())
	}

	async function logout() {
		current.value = null
		localStorage.removeItem('userID')

		await api.delete('auth')
	}

	return {
		current,
		fetch,
		login,
		logout,
	}
})
