<template>
	<div class="ui-md-diy">
		<van-nav-bar @click-left="go_back" class="xz-nva-bar navbar" id="xz-diy-bar" :title="title" left-arrow :z-index="99" />
		<DiyPage></DiyPage>
	</div>
</template>

<script>
import DiyPage from '@/views/diy/diy.vue';
export default {
	name: 'homepage',
	components: {
		DiyPage
	},
	data() {
		return {
			title: ''
		}
	}
}
</script>

<style>
.ui-md-diy .ui-md-diy-body {
	padding-top: 1.2rem;
	min-height: 100vh;
}
.ui-md-diy .ui-md-loading {
	bottom: 0;
}
</style>