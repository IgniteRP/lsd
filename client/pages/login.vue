<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

export default defineComponent({
	name: 'LoginPage',
})
</script>

<script setup lang="ts">
const auth = useAuth()
const router = useRouter()
const route = useRoute()
const creds = reactive({
	username: '',
	password: '',
})

const redirect = computed(() => route.query.redirect as string | undefined)

async function login() {
	try {
		await auth.login(creds)
		router.push(redirect.value || '/')
	} catch (error) {
		console.error(error)
	}
}

onBeforeMount(async () => {
	const logout = route.query.logout as string | undefined
	if (logout) {
		await auth.logout()
		window.location.href = '/login'
		return
	}

	if (auth.current) return router.push(redirect.value || '/')
})
</script>

<template>
	<ConstructPage class="login-page">
		<h1>L.S.D.</h1>

		<form @submit.prevent="login">
			<ConstructInput
				v-model="creds.username"
				id="username"
				label="Username"
			/>

			<ConstructInput
				v-model="creds.password"
				id="password"
				label="Password"
				:options="{
					type: 'password',
				}"
			/>

			<ConstructButton type="submit">LOGIN</ConstructButton>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.login-page {
	@include flex(column, center, center);

	h1 {
		margin-bottom: 1em;
	}

	form {
		@include flex(column, center, stretch);
		row-gap: 1em;
	}
}
</style>

<route lang="yaml">
meta:
  layout: no-layout
</route>
