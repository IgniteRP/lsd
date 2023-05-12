<script lang="ts">
import { injectReport } from 'client/stores/reports'
import { ConstructLink } from '@sa-net/components'
import { computed, defineComponent, h } from 'vue'

export default defineComponent({
	name: 'ReportDescription',
})
</script>

<script setup lang="ts">
const report = injectReport()

function replaceLinks(input: any[]): any[] {
	return input.map(line => {
		if (!(typeof line === 'string')) return line
		const match = line.match(/(?<link>\/(reports|people)\/\d*)/)
		if (!match?.groups?.link) return line

		const { link } = match.groups
		return h(
			ConstructLink,
			{
				to: link,
			},
			{ default: () => link },
		)
	})
}

const rendered = computed(() => {
	if (!report.value) return h('div', {})
	const { description } = report.value

	return h('div', {}, replaceLinks(description.split(/( |\n)/gm)))
})
</script>

<template>
	<component
		v-if="report"
		:is="rendered"
		class="report-description"
	/>
</template>

<style lang="scss" scoped>
.report-description {
}
</style>
