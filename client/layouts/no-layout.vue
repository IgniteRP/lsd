<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NoLayout',
})
</script>

<script setup lang="ts"></script>

<template>
	<ConstructLayout class="no-layout">
		<main>
			<RouterView />
		</main>
	</ConstructLayout>
</template>

<style lang="scss" scoped>
.no-layout {
	padding: 1%;
	background-color: $bg-color;

	&.hide {
		display: none;
	}
}

.no-layout main {
	@include flex(row);
	width: 100%;
	height: 100%;
	letter-spacing: 0.2em;
	background-color: #000;
	color: $text-color;
	font-family: 'Share Tech Mono', monospace;
	border: $line-width solid $color-green;
	overflow: hidden;
	animation: textShadow 0.01s infinite;
	line-height: 1.5em;

	.inner {
		@include flex(column);
		width: 100%;
		height: 100%;
		overflow: hidden;

		.tab {
			flex: 1;
		}
	}
}

.no-layout main::after {
	content: ' ';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(18, 16, 16, 0.1);
	opacity: 0;
	z-index: 100000;
	pointer-events: none;
	animation: flicker 0.15s infinite;
}

.no-layout main::before {
	content: ' ';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
		linear-gradient(
			90deg,
			rgba(255, 0, 0, 0.06),
			rgba(0, 255, 0, 0.02),
			rgba(0, 0, 255, 0.06)
		);
	z-index: 100000;
	background-size: 100% 2px, 3px 100%;
	pointer-events: none;
}
</style>
