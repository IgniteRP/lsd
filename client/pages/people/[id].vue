<script lang="ts">
import { useAsync } from 'client/includes/useAsync'
import { usePeople } from 'client/stores/people'
import { computed, defineComponent, useAttrs, watch } from 'vue'

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

const personID = computed(() => parseInt(props.id))

const isRedacted = computed(() => {
	if (!fetch.result) return false
	return !!fetch.result.deleted
})

const fetch = useAsync(() => people.fetch(personID.value))

watch(personID, fetch.trigger, { immediate: true })
</script>

<template>
	<ConstructPage
		v-if="fetch.error || isRedacted"
		class="people-single-page error"
	>
		<h1 v-if="fetch.error">[Person not found]</h1>
		<h1 v-else-if="isRedacted">[Person Redacted]</h1>
	</ConstructPage>
	<PersonProvider
		v-else-if="fetch.result"
		:item="fetch.result"
	>
		<RouterView
			:key="props.id"
			v-bind="attrs"
		/>
	</PersonProvider>
</template>

<style lang="scss" scoped>
.people-single-page.error {
	@include flex(column);
	justify-content: center;
	align-items: center;
}
</style>
