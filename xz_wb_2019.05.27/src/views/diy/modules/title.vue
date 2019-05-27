<template>
	<div :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<h3 class="ui-md-title" :style="{color: config.color, backgroundColor: config.bgcolor, lineHeight: config.height + 'Px', textAlign: config.align}">{{config.text || '请输入标题内容'}}</h3>
	</div>
</template>

<script>
export default {
	name: 'titlebar',
	props: {
		config: Object
	}
}
</script>

<style>
</style>