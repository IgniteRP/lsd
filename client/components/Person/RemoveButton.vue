<script lang="ts">
import { injectPerson, usePeople } from 'client/stores/people'
import { defineComponent, ref, useAttrs } from 'vue'

export default defineComponent({
	name: 'PersonRemoveButton',
	inheritAttrs: false,
})
</script>

<script setup lang="ts">
const attrs = useAttrs()
const emit = defineEmits<{
	(event: 'removed'): void
}>()

const persons = usePeople()
const person = injectPerson()

const showConfirm = ref(false)

function remove() {
	if (!person.value) return
	const personID = person.value.id

	persons.remove(personID)
	emit('removed')
}
</script>

<template>
	<ConfirmModal
		v-if="person"
		v-model:open="showConfirm"
		@confirmed="remove"
	>
		<template #label>
			Are you sure you want to remove person #{{ person.id }}?
		</template>
	</ConfirmModal>
	<ConstructButton
		v-if="person"
		v-bind="attrs"
		class="person-remove-button"
		@click="showConfirm = true"
	>
		Remove
	</ConstructButton>
</template>

<style lang="scss" scoped>
.person-remove-button {
}
</style>
