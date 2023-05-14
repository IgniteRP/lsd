<script lang="ts">
import { isString } from '@michealpearce/utils'
import { ConstructScrollNotifier } from '@sa-net/components'
import { debounce } from 'client/includes/functions'
import { useAsync } from 'client/includes/useAsync'
import {
	computed,
	defineComponent,
	onBeforeMount,
	reactive,
	ref,
	watch,
} from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

export interface PageQuerySidebarItem {
	id: number
	title: string
}

export interface PageQuerySidebarProps {
	name: string
	title: string
	fetcher: (params: Record<any, any>) => Promise<PageQuerySidebarItem[]>
}

export default defineComponent({
	name: 'PageQuerySidebar',
	components: { ConstructScrollNotifier },
})
</script>

<script setup lang="ts">
const props = defineProps<PageQuerySidebarProps>()
const emit = defineEmits<{
	'next-page': []
}>()

const router = useRouter()
const route = useRoute()

const items: Set<PageQuerySidebarItem> = reactive(new Set())

const search = computed<string>({
	get: () => (isString(route.query.search) ? route.query.search : ''),
	set: value => {
		if (value === '')
			return router.push({ query: { ...route.query, search: undefined } })
		router.push({ query: { ...route.query, search: value } })
	},
})

const page = ref(0)

let errorTimeout: any = null
const fetch = useAsync(async () => {
	if (errorTimeout) return
	page.value++

	try {
		const fetched = await props.fetcher({
			page: page.value,
			query: search.value,
		})

		for (const item of fetched) items.add(item)
	} catch (error) {
		page.value--

		errorTimeout = setTimeout(() => {
			errorTimeout = null
		}, 5000)

		throw error
	}
})

const searchUpdated = debounce(function searchUpdated() {
	page.value = 0
	items.clear()

	if (errorTimeout) {
		clearTimeout(errorTimeout)
		errorTimeout = null
	}

	return fetch.trigger()
}, 500)

const onNextPage = debounce(function onNextPage(percent: number) {
	if (fetch.pending) return
	else if (percent > 70) return fetch.trigger()
}, 250)

onBeforeMount(fetch.trigger)
watch(search, searchUpdated)
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

		<ConstructScrollNotifier
			@scrolled="onNextPage"
			v-slot="{ onScroll }"
		>
			<div
				class="items"
				@scroll.self="onScroll"
				@wheel.self="onScroll"
			>
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
		</ConstructScrollNotifier>
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
