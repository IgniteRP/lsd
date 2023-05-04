<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useReports } from '../stores/reports'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'ReportsLayout',
})
</script>

<script setup lang="ts">
const route = useRoute()

const reports = useReports()
const search = ref('')

const routeKey = computed(() => {
	if (typeof route.params.id === 'string') {
		return route.params.id
	}
})

const items = computed(() => {
	return Array.from(reports.items)
		.filter(([_, item]) => {
			return item.title.toLowerCase().includes(search.value.toLowerCase())
		})
		.sort((a, b) => {
			return a[1].created > b[1].created ? -1 : 1
		})
})
</script>

<template>
	<ConstructLayout class="reports-layout">
		<aside>
			<header>
				<h3>Reports</h3>

				<ConstructLink to="/reports/create">Create</ConstructLink>
			</header>

			<ConstructInput
				v-model="search"
				id="reports-search"
				class="search"
				:options="{
					placeholder: 'Search...',
				}"
			/>

			<div class="items">
				<ConstructLink
					v-for="[id, item] of items"
					:key="id"
					:to="`/reports/${id}`"
					class="item"
				>
					{{ item.title }}
				</ConstructLink>
			</div>
		</aside>

		<RouterView
			:key="routeKey"
			class="content"
		/>
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.reports-layout {
	@include flex(row);

	aside {
		width: 10%;
		min-width: 400px;
		height: 100%;

		border-right: $line-width solid $color-green;

		header {
			@include flex(row, space-between, stretch);
			border-bottom: $line-width solid $color-green;

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

			:deep(input) {
				border: none !important;
			}
		}

		.items {
			width: 100%;
			flex: 1;

			.construct-link {
				display: block;
				padding: 0.5em 1em;
				border-bottom: $line-width solid $color-green;
			}
		}
	}
}
</style>
