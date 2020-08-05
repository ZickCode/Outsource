<template>
	<view class="content">
		<view class="nav" style="height:110upx">
			<view class="left" style="height:70upx" @tap="back()" v-if="!payType">
				<image src="../../static/b.png" mode=""></image>
				返回
			</view>
			<view class="center">
				输入支付密码
				<text style="display: block;">{{account}}</text>
			</view>
			<view class="right">
				{{payType?'完成':''}}
			</view>
		</view>
		<block v-if="!payType">
			<view class="title">
				输入支付密码，以完成支付
			</view>
			<validcode ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd"></validcode>
		</block>
		<block v-else>
			<view class="success">
				<image src="../../static/success.png" mode=""></image>
				<text>付款成功</text>
			</view>
		</block>
		<image class="logo" src="../../static/logo.png" mode=""></image>
	</view>
</template>

<script>
	import validcode from '@/components/p-validCode/validCode.vue';
	export default {
		components: {
			validcode
		},
		data() {
			return {
				account: 'ddd***@126.com',
				password: '',
				payType:false,
			};
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			getPwd(val) {
				var _this = this;
				this.password = val;
				if(val.length == 6){
					uni.showLoading({
					    title: '支付中...'
					});
					setTimeout(function(){
						uni.hideLoading();
						_this.payType = true
					},1500)
				}
			}
		},
		onLoad(option) {
			this.account = option.account;
			this.payType = option.payType ? option.payType : this.payType;
		}
	};
</script>

<style lang="less">
	page {
		background-color: #F5F4F9;
	}

	.title {
		color: #333333;
		font-size: 36upx;
		text-align: center;
		padding: 80upx 0upx 50upx 0upx;
		font-weight: 600;
	}
	.success{
		padding: 100upx 0upx;
		text-align: center;
		background: #FFFFFF;
		image{
			width: 200upx;
			height: 200upx;
		}
		text{
			color: #00AAEF;
			display: block;
		font-weight: 600;
		font-size: 36upx;
		}
	}
</style>
