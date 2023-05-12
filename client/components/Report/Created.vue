<script lang="ts">
import { injectReport } from 'client/stores/reports'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportCreated',
})
</script>

<script setup lang="ts">
const report = injectReport()

const created = computed(() => {
	if (!report.value) return null

	const date = new Date(report.value.created)
	date.setFullYear(1985)

	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
	})
})
</script>

<template>
	<div
		v-if="report"
		class="report-created"
	>
		{{ created }}
	</div>
</template>

<style lang="scss" scoped>
.report-created {
}
</style>
