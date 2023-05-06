<script lang="ts">
import { useReports } from '@construct/client/stores/reports'
import { computed, defineComponent, useAttrs } from 'vue'

export default defineComponent({
	name: 'ReportsSinglePage',
	inheritAttrs: false,
})
</script>

<script setup lang="ts">
const attrs = useAttrs()
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
	<ReportProvider :item="item">
		<RouterView v-bind="attrs" />
	</ReportProvider>
</template>
