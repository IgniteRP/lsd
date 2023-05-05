<script lang="ts">
import {
	provideReport,
	type ReportData,
} from '@construct/client/stores/reports'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportProvider',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	item: ReportData | null
}>()

const emit = defineEmits<{
	(event: 'update:item', value: ReportData | null): void
}>()

const item = computed({
	get: () => props.item,
	set: value => emit('update:item', value),
})

provideReport(item)
</script>

<template>
	<slot />
</template>
