<template>
	<div class="ui-md-notice" :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<div class="ui-md-notice-body">
			<i></i>
			<div class="ui-md-notice-content">
				<van-swipe :autoplay="3000" vertical :height="18" :touchable="false" :show-indicators="false">
					<van-swipe-item v-for="(item, index) in config.lists" :key="index" @click="handleJump(item.link)">{{item.title}}</van-swipe-item>
				</van-swipe>
			</div>
		</div>
	</div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
	name: 'notcie',
	components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem
    },
	props: {
		config: Object
	},
	methods: {
		handleJump(url) {
			if(url) {
				window.location.href = url;
			}
		}
	}
}
</script>

<style>
</style>