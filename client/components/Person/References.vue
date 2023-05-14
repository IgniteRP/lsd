<script lang="ts">
import type { ReportData } from 'server'
import { useReports } from 'client/stores/reports'
import { computed, defineComponent, reactive, watch } from 'vue'
import { useAsync } from 'client/includes/useAsync'
import { injectPerson } from 'client/stores/people'

export default defineComponent({
	name: 'PersonReferences',
})
</script>

<script setup lang="ts">
const reports = useReports()
const person = injectPerson()

const personID = computed(() => person.value?.id)
const references: Set<ReportData> = reactive(new Set())

const fetch = useAsync(async () => {
	if (!personID.value) return

	const fetched = await reports.list({
		limit: 1000,
		query: `description~[people#${personID.value}]`,
	})

	for (const item of fetched) references.add(item)
})

function personIDUpdated() {
	references.clear()
	return fetch.trigger()
}

watch(personID, personIDUpdated, { immediate: true })
</script>

<template>
	<div class="person-references">
		<h2>References</h2>

		<ConstructLink
			v-for="refReport of references"
			:key="refReport.id"
			class="reference"
			:to="`/reports/${refReport.id}`"
		>
			reports#{{ refReport.id }} - {{ refReport.title }}
		</ConstructLink>
	</div>
</template>

<style lang="scss" scoped>
.person-references {
	@include flex(column);
	row-gap: 0.5em;
}
</style>
