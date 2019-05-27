<template>
	<div :style="{marginTop: config.margin + 'px', height: config.height + 'Px', backgroundColor: config.color}"></div>
</template>

<script>
export default {
	name: 'blank',
	props: {
		config: Object
	}
}
</script>

<style>
</style>