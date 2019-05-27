<template>
	<div class="ui-md-atlas" :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px', backgroundColor: config.bgcolor}">
		<div class="ui-md-atlas-cell" v-for="(item, index) in config.lists" v-if="item.image" @click="handleJump(item)" :key="index">
			<img :src="item.image" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'atlas',
	props: {
		config: {
			type: Object,
			default: function() {
				return {
					lists: []
				}
			}
		}
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