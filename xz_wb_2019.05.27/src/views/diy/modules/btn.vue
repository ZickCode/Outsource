<template>
	<div :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<van-button class="ui-md-btn" type="default" block :style="{lineHeight: config.height + 'Px', borderRadius: config.radius + 'Px', color: config.color, backgroundColor: config.bgcolor}" @click="handleJump">{{config.text}}</van-button>
	</div>
</template>

<script>
import { Button } from "vant";
export default {
	name: 'btn',
	components: {
        "van-button": Button
    },
	props: {
		config: Object
	},
	methods: {
		handleJump() {
			if(this.config.link) {
				window.location.href = 'http://' + this.config.link;
			}
		}
	}
}
</script>

<style>
</style>