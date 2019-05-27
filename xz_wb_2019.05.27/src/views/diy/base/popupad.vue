<template>
	<div class="ui-popupad" v-if="show && config.img">
		<div class="ui-popupad-box">
			<div @click="handleJump" style="cursor: pointer;">
				<img :src="config.img" />
			</div>
			<div class="ui-popupad-close" @click="handleClose">
				<van-icon name="close" />
			</div>
		</div>
		<div class="ui-popupad-mask"></div>
	</div>
</template>

<script>
import { Icon } from 'vant';
export default {
	name: 'mdpopupad',
	components: {
		'van-icon': Icon
	},
	props: {
		config: Object
	},
	data() {
		return {
			show: false
		}
	},
	mounted() {
		this.init();
	},
	watch: {
		config() {
			this.init();
		}
	},
	methods: {
		init() {
			if(this.config.type == 1) {
				// 如果未缓存广告是否打开过
				if(!sessionStorage.getItem('showPopupaded')) {
					this.show = true;
				}
			}
		},
		handleClose() {
			this.show = false;
			sessionStorage.setItem('showPopupaded', 'true');
		},
		// 页面跳转
		handleJump() {
			if(!this.config.url) return;
			window.location.href = this.config.url;
		}
	}
}
</script>

<style>
</style>