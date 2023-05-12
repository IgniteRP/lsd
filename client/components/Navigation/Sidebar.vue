<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'NavigationSidebar',
})
</script>

<script setup lang="ts">
const router = useRouter()
</script>

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

		<div class="directions">
			<ConstructButton @click="router.back()">&lt;</ConstructButton>
			<ConstructButton @click="router.forward()">&gt;</ConstructButton>
		</div>
	</nav>
</template>

<style lang="scss" scoped>
.construct-menu :deep() {
	.construct-menu-item {
		width: 100%;
	}
}

.navigation-sidebar {
	@include flex(column);
	width: 200px;
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

	.construct-menu {
		flex: 1;
	}

	.directions {
		@include flex(row, stretch, center);
		width: 100%;

		.construct-button {
			flex: 1;
			height: 3.4em;
			border: none !important;
			border-top: $line-width solid $color-green !important;

			&:first-child {
				border-right: $line-width solid $color-green !important;
			}
		}
	}
}
</style>
