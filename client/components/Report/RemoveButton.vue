<script lang="ts">
import { injectReport, useReports } from '@construct/client/stores/reports'
import { defineComponent, ref, useAttrs } from 'vue'

export default defineComponent({
	name: 'ReportRemoveButton',
	inheritAttrs: false,
})
</script>

<script setup lang="ts">
const attrs = useAttrs()
const emit = defineEmits<{
	(event: 'removed'): void
}>()

const reports = useReports()
const report = injectReport()

const showConfirm = ref(false)

function remove() {
	if (!report.value) return
	const reportID = report.value.id

	reports.remove(reportID)
	emit('removed')
}
</script>

<template>
	<ConfirmModal
		v-if="report"
		v-model:open="showConfirm"
		@confirmed="remove"
	>
		<template #label>
			Are you sure you want to remove report #{{ report.id }}?
		</template>
	</ConfirmModal>
	<ConstructButton
		v-if="report"
		v-bind="attrs"
		class="report-remove-button"
		@click="showConfirm = true"
	>
		Remove
	</ConstructButton>
</template>

<style lang="scss" scoped>
.report-remove-button {
}
</style>
