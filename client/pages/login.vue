<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'LoginPage',
})
</script>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const creds = reactive({
	username: '',
	password: '',
})

function login() {
	const redirect = route.query.redirect as string | undefined
	router.push(redirect || '/')
}
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
