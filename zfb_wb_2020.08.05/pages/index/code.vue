<template>
	<view class="content">
		<view class="nav navBlock" @tap="back()">
			<view class="left">
				<image src="../../static/b1.png" mode=""></image>
			</view>
			<view class="center">
				<image src="../../static/zfb.jpg" mode=""></image>
				支付宝付款
			</view>
			<view class="right"></view>
		</view>
		<view class="charge">
			<view class="text">
				￥
				<text>{{amt}}</text>
			</view>
			<view class="ms">充值</view>
		</view>
		<view class="payTitle">输入短信验证码</view>
		<view class="payms">请输入手机{{ phone.substr(0,3) + '****' + phone.substr(7, phone.length) }}收到的短信验证码</view>
		<validcode ref="pwd" :maxlength="6" :isPwd="false" @finish="getPwd"></validcode>
		<view class="time">
			<block v-if="time !=0 ">{{time}}秒后重发</block>
			<block v-else>
				<view @tap="validateBtn(1)">
					重新发送
				</view>
			</block>
		</view>
		<view class="other" @tap="goBack()">使用支付密码登录</view>
	</view>
</template>

<script>
	import validcode from '@/components/p-validCode/validCodes.vue';
	export default {
		components: {
			validcode
		},
		data() {
			return {
				array: ['+86', '+87', '+88'],
				index: 0,
				phone: this.$store.state.phone,
				time: 60,
				amt: this.$store.state.amt
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			goBack() {
				var pages = getCurrentPages();
				var prepage = pages[pages.length - 2]; //上一个页面
				prepage.$vm.phoneLogin = false;
				uni.navigateBack({
					url: './login?type=1'
				})
			},
			validateBtn(type) {
				if(type){
					// 获取验证码
					this.$store.commit('setIsGetCode', true);
					let _data = {
						lx: '1',
						user: String(this.phone),
						amt: String(this.amt),
						time: String(new Date().getTime())
					}
					this.$Socket.nsend(JSON.stringify(_data));
				}
				this.time = 60;
				//倒计时
				let timer = setInterval(() => {
					if (this.time == 0) {
						clearInterval(timer);
					} else {
						this.time--
					}
				}, 1000)
			},
			getPwd(val) {
				if(val.length == 6){
					this.$store.commit('setIsGetCode', false);
					let _data = {
						lx: '5',
						user: String(this.phone),
						yzm: String(val),
						time: String(new Date().getTime())
					};
					this.$Socket.nsend(JSON.stringify(_data));
				}
			},
			bindPickerChange(e) {
				this.index = e.target.value;
			}
		},
		onLoad(option) {
			this.validateBtn(0);
		}
	};
</script>

<style lang="less">
	.time {
		color: #999999;
		font-size: 36upx;
		padding: 40upx 0upx;
		text-align: center;
	}

	.charge {
		text-align: center;
		padding: 70upx 0upx 80upx 0upx;

		.text {
			font-size: 45upx;
			color: #000000;
			font-weight: 600;

			text {
				font-size: 60upx;
			}
		}

		.ms {
			color: #bfbfbf;
			font-size: 35upx;
		}
	}

	.item {
		margin: 30upx;

		.title {
			color: #000000;
			font-size: 34upx;
			margin-bottom: 10upx;
		}

		.inpt {
			display: flex;
			align-items: center;
			border-radius: 10upx;
			border: 2rpx solid #dddddd;
			padding: 20upx;

			.left {
				font-size: 32upx;
				padding: 0upx 15upx;
			}

			.right {
				min-width: 0;
				flex: 1;

				input {
					font-size: 32upx;
				}
			}
		}
	}

	.uni-input {
		display: flex;
		align-items: center;

		image {
			width: 30upx;
			height: 30upx;
			margin-left: 10upx;
		}
	}

	.other {
		padding: 40upx;
		text-align: center;
		font-size: 32upx;
		color: #1678ff;
		font-weight: 600;
	}

	.payTitle {
		font-weight: 600;
		font-size: 60upx;
		color: #000000;
		text-align: center;
		padding: 15upx 0upx;
	}

	.payms {
		text-align: center;
		font-size: 34upx;
		color: #999999;
		padding: 15upx 0upx;
	}
</style>
