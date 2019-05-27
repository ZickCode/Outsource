<template>
	<div class="ui-start-wrap" v-if="show" :style="{backgroundImage: 'url('+ config.img +')'}">
		<div class="ui-start-close" @click="handleClose">{{config.enter == 0 ? countDownTimer + 's 跳过' : '点击关闭'}}</div>
		<!--<div class="ui-image-box">
			<img v-if="config.img" :src="config.img" />
		</div>-->
	</div>
</template>

<script>
export default {
	name: 'mdStart',
	props: {
		config: Object
	},
	data() {
		return {
			show: false,
			countDownTimer: 0
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
				if(!sessionStorage.getItem('showStarted')) {
					this.show = true;
					if(this.config.enter == 0) {
						this.countDownTimer = this.config.time;
						let interval = window.setInterval(() => {
							if(this.countDownTimer == 0) {
								this.handleClose();
								window.clearInterval(interval);
								return;
							}
							this.countDownTimer = this.countDownTimer - 1;
						}, 1000)
					}
				}
			}
		},
		handleClose() {
			this.show = false;
			sessionStorage.setItem('showStarted', 'true');
		}
	}
}
</script>

<style>
</style>