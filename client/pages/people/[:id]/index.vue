<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'PeopleSingleIndexPage',
})
</script>

<script setup lang="ts">
const router = useRouter()
</script>

<template>
	<ConstructPage class="people-single-index-page">
		<header>
			<PersonID />
			<PersonCreated />
			<PersonName />

			<PersonActions @removed="router.push('/persons')" />
		</header>
	</ConstructPage>
</template>

<style lang="scss" scoped>
.people-single-index-page {
	@include flex(column);
	row-gap: 1em;
	padding: 3em 8%;
	padding-bottom: 45vh;

	header,
	.person-description {
		width: 100%;
	}

	header {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			'created id'
			'title title'
			'actions actions';
		row-gap: 1em;

		.person-id {
			grid-area: id;
		}

		.person-created {
			grid-area: created;
		}

		.person-title {
			grid-area: title;
			padding: 0px !important;
		}

		.person-actions {
			grid-area: actions;
		}
	}

	.person-description {
		white-space: pre-wrap;
		font-family: 'Share Tech Mono', monospace;
	}
}
</style>
