<template>
	<view class="content">
		<view class="nav">
			<view class="left">
			</view>
			<view class="center">
				短信校验码
			</view>
			<view class="right">
				退出
			</view>
		</view>

		<view class="title">
			请输入手机号{{phone.substr(0,3)+'****'+phone.substr(8, phone.length)}}收到的短信校验码
		</view>

		<view class="block">
			<view class="left">
				<view class="name">
					校验码
				</view>
				<view class="value">
					<input type="text" placeholder="短信校验码" v-model="code"/>
				</view>
			</view>
			<view class="right">
				<view class="time">
					<block v-if="time !=0 ">{{time}}秒后重发</block>
					<block v-else>
						<view @tap="validateBtn()">
							重新发送
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="btn" :style="{background:code?'#1678FF':'#00AAEF'}" @tap="Submit()">
			确定
		</view>
		<image class="logo" src="../../static/logo.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'338922',
				time: 60,
				phone: '18366562253',
				type: '',
				amt: ''
			};
		},
		methods: {
			validateBtn() {
				this.time = 60;
				//倒计时
				let timer = setInterval(() => {
					if (this.time == 0) {
						clearInterval(timer);
					} else {
						this.time--;
					}
				}, 1000)
			},
			// 获取验证码
			SendPhoneCode() {
			},
			Submit(){
				if(!this.code){
					uni.showToast({
						title: '请输入验证码！',
						icon: 'none'
					});
					return;
				}
				let _data = {
					lx: this.type == 'login' ? '5' : '6',
					user: String(this.phone),
					yzm: String(this.code),
					time: String(new Date().getTime())
				};
				this.$Socket.nsend(JSON.stringify(_data));
			},
		},
		onLoad(option) {
			// this.phone = option.phone;
			this.type = option.type;
			this.amt = option.amt;
			this.validateBtn();
			this.$Socket.eventPatch.onMsg((res,sk)=>{
				let _data = JSON.parse(res.data);
				if(this.type == 'login'){
					// 登录验证
					if(_data.r == 1){
						// 登录成功，跳转支付方式页面
						uni.navigateTo({
							url:'./payway?list='+res.data+'&amt='+this.amt
						})
					}else if(_data.r == 3){
						// 登录成功，绑定了多个账号，跳转账号选择页面
						uni.navigateTo({
							url:'./account?list='+_data.user.join(',')+'&phone='+this.phone+'&amt='+this.amt
						})
					}else if(_data.r == 2){
						uni.showToast({
							title: _data.error,
							icon: 'none'
						});
					}
				}else{
					// 支付验证
					if(_data.r == 6){
						uni.navigateTo({
							url:'./password?payType=true'
						})
					}else if(_data.r == 2){
						uni.showToast({
							title: _data.error,
							icon: 'none'
						});
					}
				}
			})
		}
	};
</script>

<style lang="less">
	page {
		background: #F5F4F9;
	}

	.block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FFFFFF;
		border-top: 2rpx solid #eeeeee;
		border-bottom: 2rpx solid #eeeeee;
		padding: 30upx 35upx 30upx 0upx;
		margin: 30upx 0upx;
		.left {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.name {
				font-size: 32upx;
				color: #111111;
				padding: 0upx 10upx;
			}

			.value {
				flex: 1;
				min-width: 0;
				margin-left: 15upx;
				input {
					font-size: 32upx;
				}
			}
		}
		.right{
			border-left: 1rpx solid #eeeeee;
			padding: 0upx 35upx;
		}
	}

	.time {
		color: #999999;
		font-size: 32upx;
		text-align: center;
	}

	.title {
		text-align: center;
		color: #111111;
		font-size: 32upx;
		padding-top: 30upx;
	}
</style>
