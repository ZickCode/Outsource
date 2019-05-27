<template>
	<div :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px', backgroundColor: config.bgcolor}">
		<!--单页显示-->
		<template v-if="config.showType == 0">
			<div class="ui-md-btns">
				<div class="ui-md-btns-cell" :class="'cell-' + config.showNumber" v-for="(item, index) in config.lists" :key="index" @click="handleJump(item)">
					<div class="image">
						<img :src="item.image" />
					</div>
					<p class="title van-ellipsis">{{item.title}}</p>
				</div>
			</div>
		</template>
		<!--多页滚动显示-->
		<template v-else>
			<van-swipe :autoplay="0" :loop="false">
				<van-swipe-item v-for="(item, index) in swipeLists" :key="index">
					<div class="ui-md-btns">
						<div class="ui-md-btns-cell" :class="'cell-' + config.showNumber" v-for="(cell, i) in item" :key="index +'_'+ i" @click="handleJump(item)">
							<div class="image">
								<img :src="cell.image" />
							</div>
							<p class="title van-ellipsis">{{cell.title}}</p>
						</div>
					</div>
				</van-swipe-item>
			</van-swipe>
		</template>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Row, Col  } from "vant";
export default {
	name: 'btns',
	components: {
        'van-swipe': Swipe,
		'van-swipe-item': SwipeItem,
		'van-row': Row,
		'van-col': Col
    },
	props: {
		config: Object
	},
	data() {
		return {
			swipeLists: []
		}
	},
	mounted() {
		if(this.config.showType == 1) {
			let results = [], ind = 0;
			let showNumber = this.config.showNumber;
			this.config.lists.forEach((item, index) => {
				if(index % showNumber == 0) {
					ind = ind + 1;
					results.push([]);
				}
				results[ind - 1].push(item)
			})
			this.swipeLists = results;
		}
	},
	methods: {
		// 页面跳转
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