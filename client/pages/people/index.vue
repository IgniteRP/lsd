<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PeopleIndexPage',
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructPage class="people-index-page">
		<h1>Select a Person</h1>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.people-index-page {
	@include flex(column, center, center);
}
</style>
