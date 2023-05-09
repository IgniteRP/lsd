<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PersonActions',
})
</script>

<script setup lang="ts">
const emit = defineEmits<{
	(event: 'removed'): void
}>()
</script>

<template>
	<div class="person-actions">
		<PersonEditButton />
		<PersonRemoveButton @removed="emit('removed')" />
	</div>
</template>

<style lang="scss" scoped>
.person-actions {
	@include flex(row, flex-start, center);
	gap: 1em;
}
</style>
