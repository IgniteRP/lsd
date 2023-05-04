<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportsIndexPage',
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructPage class="reports-index-page">
		<h1>Select a Report</h1>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.reports-index-page {
	@include flex(column, center, center);
}
</style>
