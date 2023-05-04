<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LoadingScreen',
})
</script>

<script setup lang="ts"></script>

<template>
	<div class="loading-screen">
		<h1>L.S.D.</h1>
		<span>loading...</span>
	</div>
</template>

<style lang="scss" scoped>
@keyframes slidedown {
	from {
		height: 100%;
	}
	to {
		height: 0%;
	}
}

.loading-screen {
	position: absolute;
	left: 0px;
	bottom: 0px;

	width: 100%;
	height: 100%;

	@include flex(column, center, center);
	background-color: black;
	z-index: 10;

	animation: slidedown 2s;
	animation-fill-mode: forwards;
	animation-timing-function: linear;
	animation-delay: 1s;

	overflow: hidden;
}
</style>
