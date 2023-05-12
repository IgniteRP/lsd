<script lang="ts">
import { useAsync } from 'client/includes/useAsync'
import { useReports } from 'client/stores/reports'
import { computed, defineComponent, onBeforeMount, useAttrs, watch } from 'vue'

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

const reportID = computed(() => props.id)

const fetch = useAsync(async () => {
	const reportID = parseInt(props.id)
	return await reports.fetch(reportID)
})

watch(reportID, fetch.trigger, { immediate: true })
</script>

<template>
	<ReportProvider :item="fetch.result">
		<RouterView
			:key="props.id"
			v-bind="attrs"
		/>
	</ReportProvider>
</template>
