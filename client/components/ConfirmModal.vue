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
		<div class="inner">
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
		</div>
	</dialog>
</template>

<style lang="scss" scoped>
.confirm-modal[open]::backdrop {
	background-color: rgba(0, 0, 0, 0);
}

.confirm-modal[open] {
	padding: 0px;
}

.confirm-modal[open] .inner {
	@include flex(column, center, center);
	row-gap: 1em;
	background-color: $bg-color;
	color: $text-color;
	border: $line-width solid $color-green;
	width: 100%;
	height: 100%;
	padding: 2em;

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

.confirm-modal[open]::after {
	content: ' ';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(18, 16, 16, 0.1);
	opacity: 0;
	z-index: 100000;
	pointer-events: none;
	animation: flicker 0.15s infinite;
}

.confirm-modal[open]::before {
	content: ' ';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
		linear-gradient(
			90deg,
			rgba(255, 0, 0, 0.06),
			rgba(0, 255, 0, 0.02),
			rgba(0, 0, 255, 0.06)
		);
	z-index: 100000;
	background-size: 100% 2px, 3px 100%;
	pointer-events: none;
}
</style>
