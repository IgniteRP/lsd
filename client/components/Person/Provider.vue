<script lang="ts">
import { providePerson, type PersonData } from '@construct/client/stores/people'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'PersonProvider',
})
</script>

<script setup lang="ts">
const props = defineProps<{
	item: PersonData | null
}>()

const emit = defineEmits<{
	(event: 'update:item', value: PersonData | null): void
}>()

const item = computed({
	get: () => props.item,
	set: value => emit('update:item', value),
})

providePerson(item)
</script>

<template>
	<slot />
</template>
