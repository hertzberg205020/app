<template>
	<div>
		<h3>Search</h3>
		<h3>keyword from params: {{ this.$route.params.keyword }}</h3>
		<h3>keyword from query: {{ this.$route.query.k }}</h3>
	</div>
</template>

<script>
	export default {
		name: 'Search',
	};
</script>

<style></style>
