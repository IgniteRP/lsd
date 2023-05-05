<script lang="ts">
import { useReports } from '@construct/client/stores/reports'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'ReportsSinglePage',
})
</script>

<script setup lang="ts">
const router = useRouter()
const reports = useReports()
const props = defineProps<{
	id: string
}>()

const item = computed(() => {
	const reportID = parseInt(props.id)
	return reports.items.get(reportID) ?? null
})
</script>

<template>
	<ConstructPage
		v-if="item"
		class="reports-single-page"
	>
		<ReportProvider :item="item">
			<header>
				<ReportID />
				<ReportCreated />
				<ReportTitle />

				<ReportActions @removed="router.push('/reports')" />
			</header>

			<ReportDescription />
		</ReportProvider>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.reports-single-page {
	@include flex(column);
	row-gap: 1em;
	padding: 3em 10%;
	padding-bottom: 25%;

	header,
	.report-description {
		width: 100%;
	}

	header {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			'id created'
			'title title'
			'actions actions';
		row-gap: 1em;

		.report-id {
			grid-area: id;
		}

		.report-created {
			grid-area: created;
		}

		.report-title {
			grid-area: title;
			padding: 0px !important;
		}

		.report-actions {
			grid-area: actions;
		}
	}

	.report-description {
		white-space: pre-wrap;
		font-family: 'Share Tech Mono', monospace;
	}
}
</style>
