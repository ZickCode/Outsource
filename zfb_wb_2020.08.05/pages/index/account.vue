<template>
	<view class="content">
		<view class="nav">
			<view class="left" @tap="back()">
				<image src="../../static/b.png" mode=""></image>
				返回
			</view>
			<view class="center">
				选择账户
			</view>
			<view class="right">
			</view>
		</view>
		<view class="info">
			<view class="left">
				<image src="../../static/t.png" mode=""></image>
			</view>
			<view class="right">
				手机号{{account}}已关联以下支付宝账户，请选择。
			</view>
		</view>
		<view class="ul">
			<view class="li" v-for="(item,index) in accountList" :key="index">
				{{item}}
				<view class="text">
					<image src="../../static/b2.png" mode=""></image>
				</view>
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
				accountList:['898***@qq.com','sadf***@qq.com']
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
	.info{
		padding: 40upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FFFFFF;
		border-bottom: 1rpx solid #eaeaea;
		.left{
			image{
				width: 60upx;
				height: 60upx;
				margin-right: 40upx;
			}
		}
		.right{
			font-size: 34upx;
			font-weight: 600;
			color: #000000;
		}
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
