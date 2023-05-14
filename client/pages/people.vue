<script lang="ts">
import { defineComponent } from 'vue'
import { usePeople } from '../stores/people'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'PeopleLayout',
})
</script>

<script setup lang="ts">
const route = useRoute()
const people = usePeople()

async function fetcher(params: Record<any, any>) {
	const items = await people.list(params)
	return items.map(item => ({
		id: item.id,
		title: item.name,
	}))
}
</script>

<template>
	<ConstructLayout class="people-layout">
		<PageQuerySidebar
			name="people"
			title="People"
			:fetcher="fetcher"
		/>

		<RouterView
			:key="route.path"
			class="content"
		/>
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.people-layout {
	@include flex(row);
}
</style>
