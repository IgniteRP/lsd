<script lang="ts">
import { usePeople } from 'client/stores/people'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'PeopleCreatePage',
})
</script>

<script setup lang="ts">
const router = useRouter()
const people = usePeople()
const data = reactive({
	name: '',
})

async function create() {
	const item = await people.create(data)
	router.push(`/people/${item.id}`)
}
</script>

<template>
	<ConstructPage class="people-create-page">
		<form @submit.prevent="create">
			<header>
				<h1>Create a Person</h1>

				<ConstructButton type="submit">Save</ConstructButton>
			</header>

			<ConstructInput
				v-model="data.name"
				id="person-name"
				label="Name"
				:options="{
					required: true,
				}"
			/>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.people-create-page :deep() {
	.description {
		.input-area {
			flex: 1;

			textarea {
				resize: none;
				transition: none;
				padding-bottom: 2em;
			}
		}
	}
}

.people-create-page {
	padding: 1em 2em;

	form {
		@include flex(column);
		row-gap: 1em;
		width: 100%;
		height: 100%;

		header {
			@include flex(row, space-between, center);
			width: 100%;
		}

		.construct-input-box {
			width: 100%;
		}

		.description {
			flex: 1;
		}
	}
}
</style>
