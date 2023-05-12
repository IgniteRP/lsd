<script lang="ts">
import { useReports } from 'client/stores/reports'
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'ReportsCreatePage',
})
</script>

<script setup lang="ts">
const router = useRouter()
const reports = useReports()
const data = reactive({
	title: '',
	description: '',
})

function create() {
	const item = reports.create(data)
	router.push(`/reports/${item.id}`)
}
</script>

<template>
	<ConstructPage class="reports-create-page">
		<form @submit.prevent="create">
			<header>
				<h1>Create a Report</h1>

				<ConstructButton type="submit">Save</ConstructButton>
			</header>

			<ConstructInput
				v-model="data.title"
				id="report-title"
				label="Title"
				:options="{
					required: true,
				}"
			/>

			<ConstructTextArea
				v-model="data.description"
				id="report-description"
				label="Description"
				class="description"
			/>
		</form>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.reports-create-page :deep() {
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

.reports-create-page {
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
