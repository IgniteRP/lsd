<script lang="ts">
import {
	computed,
	defineComponent,
	onBeforeMount,
	reactive,
	ref,
	watch,
} from 'vue'
import { usePeople } from '../stores/people'
import { useRoute, useRouter } from 'vue-router'
import { isString } from '@michealpearce/utils'
import type { PersonData } from 'server'
import { useAsync } from 'client/includes/useAsync'
import { debounce } from 'client/includes/functions'

export default defineComponent({
	name: 'PeopleLayout',
})
</script>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const people = usePeople()
const search = computed<string>({
	get: () => (isString(route.query.search) ? route.query.search : ''),
	set: value => {
		if (value === '')
			return router.push({ query: { ...route.query, search: undefined } })
		router.push({ query: { ...route.query, search: value } })
	},
})

const items: Set<PersonData> = reactive(new Set())
const page = ref(0)

const fetch = useAsync(async () => {
	try {
		const fetched = await people.list({
			page: page.value,
			query: search.value,
		})

		for (const item of fetched) items.add(item)
	} catch (error) {
		console.error(error)
	}
})

const searchUpdated = debounce(() => {
	page.value = 0
	items.clear()
	return fetch.trigger()
}, 500)

onBeforeMount(fetch.trigger)
watch(search, searchUpdated)
</script>

<template>
	<ConstructLayout class="people-layout">
		<aside>
			<header>
				<h3>People</h3>

				<ConstructLink
					:to="{
						path: '/people/create',
						query: route.query,
					}"
				>
					Create
				</ConstructLink>
			</header>

			<ConstructInput
				v-model="search"
				id="people-search"
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
						path: `/people/${item.id}`,
						query: route.query,
					}"
					class="item"
				>
					{{ item.name }}
				</ConstructLink>
			</div>
		</aside>

		<RouterView
			:key="route.path"
			class="content"
		/>
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.people-layout {
	@include flex(row);

	aside {
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
}
</style>
