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
		const {
			data: { sessionID, user },
		} = await api.post<{
			sessionID: string
			user: UserData
		}>('auth', creds)

		current.value = user
		localStorage.setItem('sessionID', sessionID)
	}

	async function logout() {
		current.value = null
		localStorage.removeItem('sessionID')

		await api.delete('auth')
	}

	return {
		current,
		fetch,
		login,
		logout,
	}
})
