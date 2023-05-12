<script lang="ts">
import { assign } from '@michealpearce/utils'
import { computed, defineComponent, provide, reactive, watch } from 'vue'
import { routeLocationKey } from 'vue-router'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'TabWindow',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	path: string
}>()

const router = useRouter()
const route = computed(() => router.resolve(props.path))
</script>

<template>
	<RouterView
		:route="route"
		v-slot="{ Component }"
	>
		<RouteProvider :route="route">
			<KeepAlive include="ConstructPage,ConstructLayout">
				<component
					:is="Component"
					class="tab-window"
				/>
			</KeepAlive>
		</RouteProvider>
	</RouterView>
</template>

<style lang="scss" scoped>
.tab-window {
	position: absolute !important;
	left: 0px;
	top: 0px;

	&.hide {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}
}
</style>
