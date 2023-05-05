<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
	name: 'ConfirmModal',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	open: boolean
}>()

const emit = defineEmits<{
	(event: 'update:open', value: boolean): void
	(event: 'confirmed'): void
	(event: 'cancelled'): void
}>()

const dialogElement = ref<HTMLDialogElement>()
const open = computed({
	get: () => props.open,
	set: value => emit('update:open', value),
})

function accept(accepted: boolean) {
	open.value = false

	if (accepted) emit('confirmed')
	else emit('cancelled')
}

function toggleModalElement(state: boolean) {
	if (state) dialogElement.value?.showModal()
	else dialogElement.value?.close()
}

watch(open, toggleModalElement, { immediate: true })
</script>

<template>
	<dialog
		ref="dialogElement"
		class="confirm-modal"
	>
		<h1>
			<slot name="label">Are you sure?</slot>
		</h1>

		<div class="actions">
			<ConstructButton
				class="confirm"
				@click="accept(true)"
			>
				<slot name="confirm-text">Yes</slot>
			</ConstructButton>
			<ConstructButton
				class="cancel"
				@click="accept(false)"
			>
				<slot name="cancel-text">Cancel</slot>
			</ConstructButton>
		</div>
	</dialog>
</template>

<style lang="scss" scoped>
.confirm-modal[open] {
	@include flex(column, center, center);
	row-gap: 1em;
	background-color: $bg-color;
	color: $text-color;
	max-width: 60%;

	h1 {
		text-align: center;
	}

	.actions {
		@include flex(row, space-between, center);
		column-gap: 1em;
		font-size: 1.25em;

		.confirm {
			border-color: red !important;
			color: red !important;

			&:hover,
			&:focus {
				background-color: red !important;
				color: $bg-color !important;
			}
		}
	}
}
</style>
