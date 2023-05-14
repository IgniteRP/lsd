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
		<ReportHeader @removed="router.push('/reports')" />

		<ReportDescription />

		<ReportReferences />
	</ConstructPage>
</template>

<style lang="scss" scoped>
.reports-single-index-page {
	@include flex(column);
	row-gap: 1em;
	padding: 3em 8%;
	padding-bottom: 45vh;

	.report-header,
	.report-description {
		width: 100%;
	}

	.report-description {
		padding: 1em 0px;
		white-space: pre-wrap;
		font-family: 'Share Tech Mono', monospace;
	}
}
</style>
