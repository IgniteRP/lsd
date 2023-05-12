<script lang="ts">
import { objectKeys } from '@michealpearce/utils'
import { computed, defineComponent, provide, reactive } from 'vue'
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

// needs to be done this way to make it reactive
// learned this from:
// https://github.com/vuejs/router/blob/2abecb71500e08f11e1686a57110afb71f625433/packages/router/src/router.ts#L1228-L1240
const route = reactive<RouteLocationNormalizedLoaded>(
	objectKeys(props.route).reduce((acc, key) => {
		acc[key] = computed(() => props.route[key])
		return acc
	}, {} as any),
)

provide(routeLocationKey, route)
</script>

<template>
	<slot />
</template>
