<script lang="ts">
import { injectReport } from 'client/stores/reports'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportID',
})
</script>

<script setup lang="ts">
const report = injectReport()
</script>

<template>
	<span
		v-if="report"
		class="report-id"
	>
		<slot :id="report.id">#{{ report.id }}</slot>
	</span>
</template>

<style lang="scss" scoped>
.report-id {
}
</style>
