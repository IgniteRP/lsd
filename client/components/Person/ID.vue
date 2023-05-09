<script lang="ts">
import { injectPerson } from '@construct/client/stores/people'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PersonID',
})
</script>

<script setup lang="ts">
const person = injectPerson()
</script>

<template>
	<span
		v-if="person"
		class="person-id"
	>
		<slot :id="person.id">#{{ person.id }}</slot>
	</span>
</template>

<style lang="scss" scoped>
.person-id {
}
</style>
