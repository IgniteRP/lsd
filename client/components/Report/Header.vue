<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportHeader',
})
</script>

<script setup lang="ts">
const emit = defineEmits<{
	removed: []
}>()
</script>

<template>
	<header class="report-header">
		<ReportID />
		<ReportCreated />
		<ReportTitle />

		<ReportActions @removed="emit('removed')" />
	</header>
</template>

<style lang="scss" scoped>
.report-header {
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-rows: auto auto auto;
	grid-template-areas:
		'created id'
		'title title'
		'actions actions';
	row-gap: 1em;

	.report-id {
		grid-area: id;
	}

	.report-created {
		grid-area: created;
	}

	.report-title {
		grid-area: title;
		padding: 0px !important;
	}

	.report-actions {
		grid-area: actions;
	}
}
</style>
