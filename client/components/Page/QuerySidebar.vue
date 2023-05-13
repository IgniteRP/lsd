<script lang="ts">
import { isString } from '@michealpearce/utils'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'PageQuerySidebar',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	name: string
	title: string
	items: Iterable<{ id: string; title: string }>
}>()

const router = useRouter()
const route = useRoute()

const search = computed<string>({
	get: () => (isString(route.query.search) ? route.query.search : ''),
	set: value => {
		if (value === '')
			return router.push({ query: { ...route.query, search: undefined } })
		router.push({ query: { ...route.query, search: value } })
	},
})
</script>

<template>
	<aside class="page-query-sidebar">
		<header>
			<h3>{{ props.title }}</h3>

			<ConstructLink
				:to="{
					path: `/${props.name}/create`,
					query: route.query,
				}"
			>
				Create
			</ConstructLink>
		</header>

		<ConstructInput
			v-model="search"
			:id="`${props.name}-search`"
			class="search"
			:options="{
				placeholder: 'Query...',
			}"
		/>

		<div class="items">
			<ConstructLink
				v-for="item of items"
				:key="item.id"
				:to="{
					path: `/${props.name}/${item.id}`,
					query: route.query,
				}"
				class="item"
			>
				{{ item.title }}
			</ConstructLink>
		</div>
	</aside>
</template>

<style lang="scss" scoped>
.page-query-sidebar {
	@include flex(column);
	width: 325px;
	height: 100%;
	flex-shrink: 0;

	border-right: $line-width solid $color-green;

	header {
		@include flex(row, space-between, stretch);
		border-bottom: $line-width solid $color-green;
		width: 100%;

		.construct-link,
		h3 {
			display: block;
			padding: 0.5em 1em;
			line-height: initial;
		}

		.construct-link {
			@include flex(column, center, center);
			border-left: $line-width solid $color-green;
		}
	}

	.search {
		border-bottom: $line-width solid $color-green;
		width: 100%;

		:deep(input) {
			border: none !important;
		}
	}

	.items {
		@include flex(column);
		width: 100%;
		flex: 1;

		overflow: hidden;
		overflow-y: auto;

		.construct-link {
			display: block;
			width: 100%;
			padding: 0.75em 1em;
			border-bottom: $line-width solid $color-green;
			flex-shrink: 0;
			border-right: $line-width solid $color-green;
		}
	}
}
</style>
