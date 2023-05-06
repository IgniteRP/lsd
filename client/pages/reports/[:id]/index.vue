<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'ReportsSingleIndexPage',
})
</script>

<script setup lang="ts">
const router = useRouter()
</script>

<template>
	<ConstructPage class="reports-single-index-page">
		<header>
			<ReportID />
			<ReportCreated />
			<ReportTitle />

			<ReportActions @removed="router.push('/reports')" />
		</header>

		<ReportDescription />
	</ConstructPage>
</template>

<style lang="scss" scoped>
.reports-single-index-page {
	@include flex(column);
	row-gap: 1em;
	padding: 3em 8%;
	padding-bottom: 45vh;

	header,
	.report-description {
		width: 100%;
	}

	header {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			'created id'
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
