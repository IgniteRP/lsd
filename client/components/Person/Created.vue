<script lang="ts">
import { injectPerson } from '@construct/client/stores/people'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'PersonCreated',
})
</script>

<script setup lang="ts">
const person = injectPerson()

const created = computed(() => {
	if (!person.value) return null

	const date = new Date(person.value.created)
	date.setFullYear(1985)

	return date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
	})
})
</script>

<template>
	<div
		v-if="person"
		class="person-created"
	>
		{{ created }}
	</div>
</template>

<style lang="scss" scoped>
.person-created {
}
</style>
