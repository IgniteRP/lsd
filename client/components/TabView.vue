<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
	name: 'TabView',
})
</script>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const routeFullPath = computed(() => route.fullPath)

const currentTab = ref(0)
const tabs = reactive<string[]>([])

function selectTab(tab: string, index: number) {
	currentTab.value = index
	return router.push(tab)
}

function removeTab(tab: string, index: number) {
	if (tabs.length === 1) return router.push('/')

	tabs.splice(index, 1)

	if (index === currentTab.value) {
		currentTab.value = Math.max(0, index - 1)
		router.push(tabs[currentTab.value])
	}
}

function createNewTab() {
	const cur = tabs[currentTab.value]
	currentTab.value = tabs.length
	tabs.push(cur)
}

watch(
	routeFullPath,
	fullPath => {
		tabs[currentTab.value] = fullPath
	},
	{ immediate: true },
)
</script>

<template>
	<div class="tab-view">
		<slot :currentTab="currentTab" />

		<div class="tabs">
			<ConstructButton
				v-for="(tab, index) of tabs"
				:key="index"
				:class="{ active: index === currentTab }"
				:title="tab"
				@click="selectTab(tab, index)"
			>
				<span>{{ tab }}</span>

				<ConstructButton
					class="close"
					@click.stop="removeTab(tab, index)"
				>
					X
				</ConstructButton>
			</ConstructButton>

			<ConstructButton @click="createNewTab">+</ConstructButton>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.tab-view {
	@include flex(column);
	width: 100%;
	height: 100%;

	.tabs {
		@include flex(row, flex-start, stretch);
		width: 100%;
		border-top: $line-width solid $color-green;
		overflow: hidden;
		overflow-x: auto;

		& > .construct-button {
			@include flex(row, space-between, center);
			column-gap: 1em;
			border: none !important;
			border-right: $line-width solid $color-green !important;
			border-bottom: $line-width solid $color-green !important;
			padding: 1em 2em;
			font-size: 0.9em;

			span {
				max-width: 150px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			& > .construct-button {
				padding: 0.25em 0.5em !important;
				border: $line-width solid $bg-color !important;
			}

			&.active {
				background-color: $color-green !important;
				color: black !important;
			}
		}
	}
}
</style>
