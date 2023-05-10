<template>
	<div>
		<!-- 三級連動組件 -->
		<TypeNav />
		<ListContainer />
		<Rank />
		<Like />
		<Floor
			v-for="floor in floorList"
			:key="floor.id"
			:floor-info="floor" />
		<Brand />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	import ListContainer from '@/pages/Home/ListContainer';
	import Recommend from '@/pages/Home/Recommend';
	import Rank from '@/pages/Home/Rank';
	import Like from '@/pages/Home/Like';
	import Floor from '@/pages/Home/Floor';
	import Brand from '@/pages/Home/Brand';

	export default {
		name: 'Home',
		components: {
			ListContainer,
			Recommend,
			Rank,
			Like,
			Floor,
			Brand,
		},
		methods: {
			...mapActions('home', ['getFloorList']),
		},
		computed: {
			...mapState('home', ['floorList']),
		},
		mounted() {
			this.getFloorList();
		},
	};
</script>

<style></style>
