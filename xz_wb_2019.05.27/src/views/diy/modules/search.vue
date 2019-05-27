<template>
	<div ref="mdsearch" :style="{height: searchHeight + 'px'}">
		<div class="ui-md-search" ref="mdsearchbox" :class="{'fixed': fixed}" :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px', color: config.color, backgroundColor: config.bgcolor, top: top + 'px'}" @click="handleJump">
			<van-search
				:background="config.inputbg"
				:placeholder="config.placeholder || '请输入搜索关键词'"
				:style="{borderRadius: config.radius + 'Px'}"
				:disabled="true"
			>
				<xz-icon class="icon" type="sousuo" slot="left-icon" />
			</van-search>
		</div>
	</div>
</template>

<script>
import { Search } from "vant";
export default {
	name: 'search',
	components: {
        "van-search": Search
    },
	props: {
		config: Object,
		keyid: String
	},
	data() {
		return {
			fixed: false,
			top: 0,
			barHeight: 0,
			searchHeight: 0
		}
	},
	mounted() {
		this.searchHeight = this.$refs['mdsearchbox'].clientHeight;
		if(this.config.istop == 1) {
			if(document.getElementById('xz-diy-bar')) {
				this.barHeight = document.getElementById('xz-diy-bar').clientHeight;
			}
			window.addEventListener("scroll", this.handleScroll, false);
		}
	},
	methods: {
		handleJump() {
			this.$router.push({
                path: "/goods/search"
            });
		},
		handleScroll(e) {
			if(this.config.istop != 1) return false;
			var scrollTop = 0;
			if(document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if(document.body) {
				scrollTop = document.body.scrollTop;
			}
			if(scrollTop >= this.$refs['mdsearch'].offsetTop - this.barHeight) {
				if(this.fixed) return false;
				this.fixed = true;
				if(this.barHeight > 0) {
					this.top = this.barHeight;
				}
			}else{
				this.fixed = false;
				this.top = 0;
			}
		}
	},
	destroyed() {
		if(this.config.istop == 1) {
			window.removeEventListener('scroll', this.handleScroll, false);
		}
	}
}
</script>

<style>
</style>