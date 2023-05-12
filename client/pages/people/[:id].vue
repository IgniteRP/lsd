<script lang="ts">
import { usePeople } from 'client/stores/people'
import { computed, defineComponent, useAttrs } from 'vue'

export default defineComponent({
	name: 'PeopleSinglePage',
	inheritAttrs: false,
})
</script>

<script setup lang="ts">
const attrs = useAttrs()
const people = usePeople()
const props = defineProps<{
	id: string
}>()

const item = computed(() => {
	const personID = parseInt(props.id)
	return people.items.get(personID) ?? null
})
</script>

<template>
	<PersonProvider :item="item">
		<RouterView
			:key="props.id"
			v-bind="attrs"
		/>
	</PersonProvider>
</template>
