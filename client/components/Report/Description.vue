<script lang="ts">
import { injectReport } from '@construct/client/stores/reports'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportDescription',
})
</script>

<script setup lang="ts">
const report = injectReport()
</script>

<template>
	<div
		v-if="report"
		class="report-description"
	>
		{{ report.description }}
	</div>
</template>

<style lang="scss" scoped>
.report-description {
}
</style>
