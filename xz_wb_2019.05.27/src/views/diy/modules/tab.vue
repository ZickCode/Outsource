<template>
	<div class="ui-md-tab" ref="iframes" :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<van-tabs v-model="active" @click="handleClick" :title-active-color="config.textColor" :color="config.textColor">
		  	<van-tab v-for="(item, index) in config.lists" :title="item.title || '选项卡'" :key="index">
		  		<div v-if="config.loadType == 1">
		  			<iframe v-if="item.link" class="ui-md-iframe" @load="handleTest" :src="item.link"></iframe>
		  		</div>
		  	</van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { Tabs, Tab } from "vant";
export default {
	name: 'tab',
	components: {
		'van-tabs': Tabs,
		'van-tab': Tab
	},
	props: {
		config: Object
	},
	data() {
		return {
			active: 0
		}
	},
	methods: {
		handleClick(index) {
			if(this.config.loadType == '0') {
				if(this.config.lists[index].link) {
					window.location.href = 'http://' + this.config.lists[index].link;
				}
			}else if(this.config.loadType == 1) {
				this.$emit('on-change', index);
			}
		},
		handleSetIframeHeight(iframe) {
			if (iframe) {
				var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
				if (iframeWin.document.body) {
					iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
				}
			}
		},
		handleTest(e) {
			this.handleSetIframeHeight(e.target);
		}
	}
}
</script>

<style>
.ui-md-iframe {
	display: block; border: none; width: 100%;
}
</style>