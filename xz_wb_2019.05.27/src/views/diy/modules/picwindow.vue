<template>
	<div :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px', backgroundColor: config.bgcolor}">
		<div
			class="ui-md-picwindow"
			:class="{'window': config.showType == 0, 'col col-2': config.showType == 1, 'col col-3': config.showType == 2, 'col col-4': config.showType == 3}"
			:style="{backgroundColor: config.bgcolor}"
		>
			<div class="ui-md-picwindow-cell" v-for="(item, index) in config.lists" :class="'win-' + (index + 1)" v-if="!(index == 3 && config.showType == 2)">
				<div class="box" @click="handleJump(item)">
					<div class="ui-image-box">
						<img v-if="item.image" :src="item.image" />
					</div>
					<p v-if="item.title" class="title">{{item.title}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'picwindow',
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