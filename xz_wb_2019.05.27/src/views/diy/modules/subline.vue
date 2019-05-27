<template>
	<div :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<div class="ui-md-subline" :style="{borderStyle: config.style, borderColor: config.color, borderBottomWidth: config.height + 'Px'}"></div>
	</div>
</template>

<script>
export default {
	name: 'subline',
	props: {
		config: Object
	}
}
</script>

<style>
</style>