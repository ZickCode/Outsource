<template>
	<div :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<van-swipe :autoplay="config.speed * 1000" class="ui-md-swipe" :style="{borderRadius: config.radius + 'px'}">
		  	<van-swipe-item v-for="(item, index) in config.lists" :key="index" @click="handleJump(item)">
		    	<img :src="item.image" />
		    	<h4>{{item.title}}</h4>
		  	</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
	name: 'banner',
	components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem
    },
	props: {
		config: Object
	},
	methods: {
		handleJump(item) {
			if(item.link) {
				window.location.href = 'http://' + item.link;
			}
		}
	}
}
</script>

<style>
</style>