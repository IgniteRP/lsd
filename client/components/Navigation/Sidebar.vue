<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'NavigationSidebar',
})
</script>

<script setup lang="ts"></script>

<template>
	<nav class="navigation-sidebar">
		<div class="branding">
			<h1 class="brand-name">L.S.D.</h1>
		</div>

		<ConstructMenu
			:items="[
				{
					to: '/',
					label: 'Dashboard',
				},
				{
					to: '/reports',
					label: 'Reports',
				},
				{
					to: '/people',
					label: 'People',
				},
				{
					to: '/login',
					label: 'Login',
				},
			]"
		/>
	</nav>
</template>

<style lang="scss" scoped>
.construct-menu :deep() {
	.construct-menu-item {
		width: 100%;
	}
}

.navigation-sidebar {
	width: 10%;
	min-width: 200px;
	height: 100%;
	border-right: $line-width solid $color-green;

	.branding,
	.construct-menu {
		width: 100%;
	}

	.branding {
		@include flex(column, center, center);
		padding: 1em;
	}
}
</style>
