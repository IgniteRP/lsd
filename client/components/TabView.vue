<script lang="ts">
import { attempt, isArray, isNumber } from '@michealpearce/utils'
import {
	computed,
	defineComponent,
	onBeforeMount,
	reactive,
	ref,
	watch,
} from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
	name: 'TabView',
})
</script>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const tabsContainer = ref<HTMLElement | undefined>()

const routeFullPath = computed(() => route.fullPath)

const currentTab = ref(0)
const tabs = reactive<string[]>([])

function selectTab(tab: string, index: number) {
	currentTab.value = index
	return router.push(tab)
}

function removeTab(index: number) {
	if (tabs.length === 1) return router.push('/')

	tabs.splice(index, 1)

	if (index === currentTab.value) {
		currentTab.value = Math.max(0, index - 1)
		router.push(tabs[currentTab.value])
	}
}

function createNewTab() {
	// push returns the new length of the array, minus 1 to get the index of the added item
	currentTab.value = tabs.push('/') - 1
	return router.push('/')
}

// redirects vertical scrolling to horizontal scroll
function onScroll(event: WheelEvent) {
	if (!tabsContainer.value) return
	tabsContainer.value.scrollLeft += event.deltaY
}

watch(currentTab, index => localStorage.setItem('currentTab', index.toString()))
watch(tabs, updated => localStorage.setItem('tabs', JSON.stringify(updated)))
watch(routeFullPath, fullPath => {
	tabs[currentTab.value] = fullPath

	// scroll to the selected tab if it's not in view
	if (!tabsContainer.value) return
	const tabsContainerEl = tabsContainer.value
	const selected = tabsContainerEl.children.item(currentTab.value)

	if (!selected) return
	const tabsContainerRect = tabsContainerEl.getBoundingClientRect()
	const selectedRect = selected.getBoundingClientRect()

	if (selectedRect.right > tabsContainerRect.right)
		tabsContainerEl.scrollTo({
			left:
				selectedRect.right -
				tabsContainerRect.right +
				tabsContainerEl.scrollLeft,
		})
	else if (selectedRect.left < tabsContainerRect.left)
		tabsContainerEl.scrollTo({
			left:
				selectedRect.left - tabsContainerRect.left + tabsContainerEl.scrollLeft,
		})
})

onBeforeMount(() => {
	const savedCurrentTab = Number(localStorage.getItem('currentTab'))
	const savedTabs = localStorage.getItem('tabs')

	if (isNumber(savedCurrentTab)) currentTab.value = savedCurrentTab
	if (savedTabs) {
		const parsedTabs = attempt(() => JSON.parse(savedTabs) as string[])

		if (isArray(parsedTabs)) tabs.push(...parsedTabs)
		else {
			console.warn('error parsing saved tabs', parsedTabs)
			localStorage.removeItem('tabs')
		}
	}
})
</script>

<template>
	<div class="tab-view">
		<slot :currentTab="currentTab" />

		<div
			ref="tabsContainer"
			class="tabs"
			@wheel.passive="onScroll"
		>
			<ConstructButton
				v-for="(tab, index) of tabs"
				:key="index"
				:class="{ active: index === currentTab }"
				:title="tab"
				@click="selectTab(tab, index)"
			>
				<span>{{ tab }}</span>

				<ConstructButton
					v-if="tabs.length > 1"
					class="close"
					@click.stop="removeTab(index)"
				>
					X
				</ConstructButton>
			</ConstructButton>

			<ConstructButton
				v-if="tabs.length < 10"
				@click="createNewTab"
				>+</ConstructButton
			>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.tab-view {
	@include flex(column);
	width: 100%;
	height: 100%;
	overflow: hidden;

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
