<script lang="ts">
import { useReports } from '@construct/client/stores/reports'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ReportsSinglePage',
})
</script>

<script setup lang="ts">
const reports = useReports()
const props = defineProps<{
	id: string
}>()

const item = computed(() => {
	return reports.items.get(parseInt(props.id))
})
</script>

<template>
	<ConstructPage
		v-if="item"
		class="reports-single-page"
	>
		<header>
			<span class="created">{{ item.created }}</span>
			<h1 class="title">{{ item.title }}</h1>
		</header>

		<div class="description">
			{{ item.description }}
		</div>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.reports-single-page {
	@include flex(column);
	row-gap: 1em;
	padding: 3em 10%;
	padding-bottom: 25%;

	header {
		@include flex(column);
	}

	.description {
		white-space: pre-wrap;
		font-family: 'Share Tech Mono', monospace;
	}
}
</style>
