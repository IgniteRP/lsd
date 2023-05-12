<script lang="ts">
import { injectPerson } from 'client/stores/people'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PersonName',
})
</script>

<script setup lang="ts">
const person = injectPerson()
</script>

<template>
	<ConstructTitle
		v-if="person"
		class="person-name"
	>
		<slot :name="person.name">
			{{ person.name }}
		</slot>
	</ConstructTitle>
</template>

<style lang="scss" scoped>
.person-name {
}
</style>
