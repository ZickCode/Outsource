<template>
	<view class="content">
		<view class="nav" style="height:110upx">
			<view class="left" style="height:70upx" @tap="back()">
				<image src="../../static/b.png" mode=""></image>
				返回
			</view>
			<view class="center">
				选择付款方式
				<text style="display: block;">{{account}}</text>
			</view>
			<view class="right">
			</view>
		</view>
		<view class="ul">
			<view class="li" :class="index == indexs?'ling':''" v-for="(item,index) in all_y" :key="index" @tap="liClick(index)">
				{{item}}
			</view>
			<view class="li lied" v-for="(item,index) in all_n" :key="'i'+index" v-html="check(item)">

			</view>
		</view>
		<image class="logo" src="../../static/logo.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: 'ddd***@126.com',
				password: '',
				indexs: 0,
				all_y: ["花呗", "中国工商银行储蓄卡（2323）", "招商银行信用卡（5356）", "平安银行信用卡（9987）"],
				all_n: ["余额宝（剩余0.5）*h*余额不足", "花呗分期*h*该付款方式不支持当前交易"]
			};
		},
		onLoad(option) {
			console.log(option)
		},
		methods: {
			check(html) {
				var a = html.replace('*h*', '<br /><text style="font-size:10px">');
				a = a + '</text>'
				return a
			},
			liClick(index) {
				this.indexs = index;
				uni.navigateTo({
					url:'./payDetail'
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	};
</script>

<style lang="less">
	page {
		background-color: #F5F4F9;
	}

	.ul {
		border-top: 1rpx solid #eaeaea;
		border-bottom: 1rpx solid #eaeaea;
		background: #FFFFFF;
		margin-top: 40upx;

		.li {
			border-bottom: 1rpx solid #eaeaea;
			padding: 25upx 0upx 25upx 25upx;
			margin-left: 15upx;
			font-size: 35upx;
		}

		.li:last-child {
			border: 0px;
		}

		.ling {
			background: url(../../static/in.png) no-repeat right center;
			background-size: 40upx 40upx;
			background-position-x: 95%;
		}

		.lied {
			color: #cccccc;
			padding: 15upx 0upx 15upx 25upx;
		}
	}
</style>
