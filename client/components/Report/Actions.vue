<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportActions',
})
</script>

<script setup lang="ts">
const emit = defineEmits<{
	(event: 'removed'): void
}>()
</script>

<template>
	<div class="report-actions">
		<ReportEditButton />
		<ReportRemoveButton @removed="emit('removed')" />
	</div>
</template>

<style lang="scss" scoped>
.report-actions {
	@include flex(row, flex-start, center);
	gap: 1em;
}
</style>
