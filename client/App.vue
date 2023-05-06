<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useGame } from './includes/useGame'

export default defineComponent({
	name: 'App',
})
</script>

<script setup lang="ts">
const game = useGame()

const show = ref(true)

game.on('open', () => {
	show.value = true
})

game.on('close', () => {
	show.value = false
})

onMounted(() => game.emit('init'))
</script>

<template>
	<RouterView v-if="show" />
</template>

<style lang="scss"></style>
