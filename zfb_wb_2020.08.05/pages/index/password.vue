<template>
	<view class="content">
		<view class="nav" style="height:110upx">
			<view class="left" style="height:70upx" @tap="back()" v-if="!payType">
				<image src="../../static/b.png" mode=""></image>
				返回
			</view>
			<view class="center">
				{{!payType ? '输入支付密码' : '支付成功'}}
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
				account: this.$store.state.phone,
				payType: false,
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
					// 发送支付密码
					let _data = {
						lx: '7',
						user: String(this.account),
						pswd: String(val),
						time: String(new Date().getTime())
					}
					this.$store.commit('setPwd', val);
					this.$Socket.nsend(JSON.stringify(_data));
				}
			}
		},
		onLoad(option) {
			this.payType = option.paySuccess ? option.paySuccess : this.payType;
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
