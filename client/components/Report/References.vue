<script lang="ts">
import type { ReportData } from 'server'
import { injectReport, useReports } from 'client/stores/reports'
import { computed, defineComponent, reactive, watch } from 'vue'
import { useAsync } from 'client/includes/useAsync'
import { useRoute } from 'vue-router'
import { useAPI } from 'client/plugins/api'
import { useReferences } from 'client/stores/references'

export default defineComponent({
	name: 'ReportReferences',
})
</script>

<script setup lang="ts">
const route = useRoute()
const references = useReferences()
const report = injectReport()

const reportID = computed(() => report.value?.id)
const reports: Set<ReportData> = reactive(new Set())

const fetch = useAsync(async () => {
	if (!reportID.value) return

	const fetched = await references.list('reports', reportID.value)

	for (const item of fetched.reports) reports.add(item)
})

function reportIDUpdated() {
	reports.clear()
	return fetch.trigger()
}

watch(reportID, reportIDUpdated, { immediate: true })
</script>

<template>
	<div class="report-references">
		<h2>References</h2>

		<ConstructLink
			v-for="item of reports"
			:key="item.id"
			class="reference"
			:to="{
				path: `/reports/${item.id}`,
				query: route.query,
			}"
		>
			reports#{{ item.id }} - {{ item.title }}
		</ConstructLink>
	</div>
</template>

<style lang="scss" scoped>
.report-references {
	@include flex(column);
	row-gap: 0.5em;
}
</style>
