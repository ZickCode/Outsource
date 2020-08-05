<template>
	<view class="content">
		<view class="nav" style="height:110upx">
			<view class="left" style="height:70upx" @tap="back()">
				<image src="../../static/b.png" mode=""></image>
				返回
			</view>
			<view class="center">
				付款详情
				<text style="display: block;">{{account}}</text>
			</view>
			<view class="right">
			</view>
		</view>
		<view class="ul">
			<view class="li">
				订单信息
				<view class="text" style="color: #333333;">充值</view>
			</view>
			<view class="li lied">
				支付宝账户
				<view class="text">{{account}}<image src="../../static/b2.png" mode=""></image></view>
			</view>
			<view class="li">
				支付方式
				<view class="text">花呗<image src="../../static/b2.png" mode=""></image></view>
			</view>
			<view class="li">
				<view style="color: #333333;font-size: 37upx;font-weight: 500">需付款</view>
				<view class="text" style="color: #333333;font-size: 37upx;font-weight: 500;">1.00元</view>
			</view>
		</view>
		<view class="btn" @tap="pay()">
			确认付款
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
			};
		},
		onLoad(option) {
			console.log(option)
		},
		methods: {
			pay(){
				uni.navigateTo({
					url:'./password'
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
			padding: 25upx;
			margin-left: 15upx;
			font-size: 32upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #cccccc;
			.text{
			display: flex;
			align-items: center;
				image{
					width: 35upx;
					height: 35upx;
					margin-left: 10upx;
				}
			}
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
		}
	}
</style>
