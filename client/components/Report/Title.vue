<script lang="ts">
import { injectReport } from 'client/stores/reports'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportTitle',
})
</script>

<script setup lang="ts">
const report = injectReport()
</script>

<template>
	<ConstructTitle
		v-if="report"
		class="report-title"
	>
		<slot :title="report.title">
			{{ report.title }}
		</slot>
	</ConstructTitle>
</template>

<style lang="scss" scoped>
.report-title {
}
</style>
