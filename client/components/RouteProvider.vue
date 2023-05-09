<script lang="ts">
import { defineComponent, provide, reactive } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { routeLocationKey } from 'vue-router'

export default defineComponent({
	name: 'RouteProvider',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	route: RouteLocationNormalizedLoaded
}>()

const route = reactive(props.route)
provide(routeLocationKey, route)
</script>

<template>
	<slot />
</template>
