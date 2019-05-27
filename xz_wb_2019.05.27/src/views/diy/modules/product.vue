<template>
	<div class="ui-md-product" :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<div class="ui-md-product-cell" v-for="(item, index) in goods" :key="index" @click="handleGoGoodsDetail(item)">
			<div class="image">
				<div class="image-box">
					<div class="ui-image-box">
						<img :src="baseUrl+item.thumb" />
					</div>
				</div>
				<span
					class="superscript"
					v-show="config.showSub"
					:class="styleClassName[config.subStyle]"
					:style="{color: config.subTextColor, backgroundColor: config.subBgColor}"
				>
					<span v-if="config.subText == 4">{{config.subTextCustom}}</span>
					<span v-else>{{subTexts[config.subText]}}</span>
				</span>
			</div>
			<div class="content">
				<h4 class="title">{{item.sku_name}}</h4>
				<div class="text">
					<span class="price" :style="{color: config.priceColor}" v-html="handleSplitPrice(item._preferential?item._preferential.price:item.shop_price)"></span>
					<span class="sale" v-show="config.showNumber">销量：{{item.sales}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
	name: 'product',
	components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem
    },
	props: {
		appid: Number | String,
		config: Object
	},
	data() {
		return {
			goods: [],
			baseUrl: baseUrl,
			styleClassName: ['style-1', 'style-2', 'style-3', 'style-4'],
			subTexts: ['促销', '推荐', '新上', '热销']
		}
	},
	mounted() {
		this.init();
	},
	watch: {
		config() {
			this.init();
		}
	},
	methods: {
		init() {
			if(!this.appid) return false;
			// 获取商品来源信息
			let source = this.config.source;
			if(!source || source.length == 0) {
				return false;
			}
			let catid = source[source.length - 1];
			// 根据分类，获取商品数据
			this.post({
                method: "api.module.goods.goods.lists",
                appid: this.appid,
                catid: catid,
                limit: this.config.number,
                page: 1
           }, (res) => {
           		this.goods = res.result.lists || [];
            })
		},
		handleSplitPrice(price) {
			let arr = ['0', '00']
			if(price) {
				arr = parseFloat(price).toFixed(2).split('.');
			}
			return '￥<b>'+ arr[0] +'</b>.'+ arr[1];
		},
		handleGoGoodsDetail(item) {
			this.$router.push({
                path: "/goods/detail/" + item.sku_id
            });
		}
	}
}
</script>

<style>
</style>