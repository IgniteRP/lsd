<script lang="ts">
import { defineComponent } from 'vue'
import { useReports } from '../stores/reports'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'ReportsLayout',
})
</script>

<script setup lang="ts">
const route = useRoute()
const reports = useReports()
</script>

<template>
	<ConstructLayout class="reports-layout">
		<PageQuerySidebar
			name="reports"
			title="Reports"
			:fetcher="reports.list"
		/>

		<RouterView
			:key="route.path"
			class="content"
		/>
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.reports-layout {
	@include flex(row);
}
</style>
