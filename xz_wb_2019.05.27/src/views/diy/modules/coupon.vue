<template>
	<div class="ui-md-coupon-cells" :class="{'lists-style': config.style == 0}" :style="{marginTop: config.margin + 'px', padding: config.paddingy + 'px ' + config.paddingx + 'px'}">
		<template v-if="config.style == 1">
			<div class="ui-md-coupon-cell" v-for="item in dataLists">
				<div style="position: relative; height: 100%; overflow: hidden;">
					<div class="ui-md-coupon-cell-body">
						<div class="ui-md-coupon-cell-box">
							<div class="table-cell">
								<span class="price" :style="{color: config.color}">￥{{item.string_price}}</span>
								<span class="condition" :style="{color: config.color}">{{item.string_amount}}</span>
							</div>
							<div class="table-cell" style="text-align: right; width: 70Px;">
								<div class="btn" :style="{backgroundColor: config.btnColor}" @click="handleReceive(item.id)">立即领取</div>
								<p v-if="config.showType == 2" class="number">{{item.grant}}人领取</p>
								<p v-if="config.showType == 1" class="number">剩余{{item.total - item.grant}}</p>
							</div>
						</div>
						<div class="desc">
							<p>{{item.coupon_type_text}}，{{item.coupon_name}}</p>
						</div>
					</div>
				</div>
			</div>
		</template>
		<template v-else-if="config.style == 2">
			<van-swipe :autoplay="0" :loop="false">
				<van-swipe-item v-for="(item, index) in swipeLists" :key="index">
					<div class="ui-md-coupon-cell" v-for="cell in swipeLists[index]">
						<div style="position: relative; height: 100%; overflow: hidden;">
							<div class="ui-md-coupon-cell-body">
								<div class="ui-md-coupon-cell-box">
									<div class="table-cell">
										<span class="price" :style="{color: config.color}">￥{{cell.string_price}}</span>
										<span class="condition" :style="{color: config.color}">{{cell.string_amount}}</span>
									</div>
									<div class="table-cell" style="text-align: right; width: 70Px;">
										<div class="btn" :style="{backgroundColor: config.btnColor}" @click="handleReceive(cell.id)">立即领取</div>
										<p v-if="config.showType == 2" class="number">{{cell.grant}}人领取</p>
										<p v-if="config.showType == 1" class="number">剩余{{cell.total - cell.grant}}</p>
									</div>
								</div>
								<div class="desc">
									<p>{{cell.coupon_type_text}}，{{cell.coupon_name}}</p>
								</div>
							</div>
						</div>
					</div>
				</van-swipe-item>
			</van-swipe>
		</template>
		<template v-else>
			<div class="ui-md-coupon-cell" v-for="item in dataLists">
				<div style="position: relative; height: 100%; overflow: hidden;">
					<div class="ui-md-coupon-cell-body">
						<div class="cell1">
							<span class="price" :style="{color: config.color}">￥{{item.string_price}}</span>
							<span class="condition">{{item.string_amount}}</span>
						</div>
						<div class="cell2">
							<p class="title">{{item.coupon_name}}</p>
							<span class="type">{{item.coupon_type_text}}</span>
						</div>
						<div class="cell3">
							<p v-if="config.showType == 2" class="number" :style="{color: config.color}">{{item.grant}}人领取</p>
							<p v-if="config.showType == 1" class="number" :style="{color: config.color}">剩余{{item.total - item.grant}}</p>
							<div class="btn" :style="{backgroundColor: config.btnColor}" @click="handleReceive(item.id)">立即领取</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Toast } from "vant";
export default {
	name: 'coupon',
	components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        Toast
    },
	props: {
		config: Object
	},
	data() {
		return {
			swipeLists: [],
			dataLists: [],
			dataTypes: []
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.config.lists.forEach(list => {
				this.post({
					method: 'api.module.diy.diy.coupon_detail',
					id: list.id
				}, (res) => {
					this.dataLists.push(res.result);
					if(this.config.style == 2) {
						let results = [], ind = 0;
						this.dataLists.forEach((item, index) => {
							if(index % 2 == 0) {
								ind = ind + 1;
								results.push([]);
							}
							results[ind - 1].push(item)
						})
						this.swipeLists = results;
					}
				})
			})
		},
		handleReceive(id) {
			this.post({
				method: 'api.module.coupon.coupon.receive',
				coupon_id: id
			}, (res) => {
				if(res.result) {
					// 领取成功
					Toast('领取成功！');
				}else{
					// 领取失败
					Toast(res.msg);
				}
			})
		}
	}
}
</script>

<style>
</style>