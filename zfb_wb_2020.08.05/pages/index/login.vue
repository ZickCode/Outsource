<template>
	<view class="content">
		<view class="nav navBlock">
			<view class="left">
				<image src="../../static/b1.png" mode=""></image>
			</view>
			<view class="center" style="display: flex;align-items: center;justify-content: center;">
				<image src="../../static/zfb.jpg" mode=""></image>
				支付宝付款
			</view>
			<view class="right"></view>
		</view>

		<view class="charge">
			<view class="text">
				￥<text>{{price}}</text>
			</view>
			<view class="ms">充值</view>
		</view>
		<block v-if="phoneLogin">
			<view class="item">
				<view class="title">请输入手机号码</view>
				<view class="inpt">
					<view class="left">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">
								{{ array[index] }}
								<image src="../../static/s.png" mode=""></image>
							</view>
						</picker>
					</view>
					<view class="right"><input type="number" v-model="telphone" placeholder="请填写手机号码" /></view>
				</view>
			</view>

			<view class="btn" v-if="telphone" @tap="phoneLoginClick()">
				登录/注册
			</view>
		</block>

		<block v-else>
			<view class="item">
				<view class="title">请输入支付宝账号</view>
				<view class="inpt">
					<view class="right"><input type="text" value="" v-model="form.account" placeholder="手机号码/邮箱" /></view>
				</view>
			</view>

			<view class="item">
				<view class="title">
					请输入支付密码
					<text @tap="longPwd = !longPwd">使用长密码</text>
				</view>
				<view class="inpt" v-if="longPwd">
					<view class="right"><input type="password" v-model="form.password" placeholder="是支付密码,不是登录密码哦" /></view>
				</view>
				<validcode v-else ref="pwd" :maxlength="6" :isPwd="true" @finish="getPwd"></validcode>
			</view>

			<view class="item itemed">
				<view class="inpt">
					<view class="right"><input type="text" value="" v-model="form.yzm" placeholder="输入校验码" /></view>
					<view class="left">
						<image src="../../static/y.jpg" mode=""></image>
					</view>
				</view>
			</view>

			<view class="btn" @tap="goNext()">
				下一步
			</view>
		</block>
		<view class="other" @tap="phoneLogin = !phoneLogin">{{phoneLogin?'使用支付密码登录':'使用短信验证码登录'}}</view>
	</view>
</template>

<script>
    import validcode from '@/components/p-validCode/validCodes.vue';
    import socket from "@/utils/useSocket.js";
	export default {
		components: {
			validcode
		},
		data() {
			return {
				array: ['+86', '+87', '+88'],
				index: 0,
				telphone: '',
				phone: '158******80',
				timer: 59,
				longPwd: true,
                phoneLogin: true,
                price: 100,
				form: {
					account: '',
					password: '',
					yzm: ''
				}
			};
		},
		methods: {
			getPwd(val) {
				this.form.password = val;
			},
			bindPickerChange(e) {
				this.index = e.target.value;
			},
			//手机号登录
			phoneLoginClick() {
				if (!/^1[34578]\d{9}$/.test(this.telphone)) {
					uni.showToast({
						title: '请输入正确的手机号！',
						icon: 'none'
					})
				}else{
                    // 手机号登录
                    let _data = {
                        lx: 1,
                        user: this.telphone,
                        amt: this.price,
                        time: new Date().getTime()
                    }
                    this.$Socket.nsend(JSON.stringify(_data));
                }
			},
			//支付密码登录
			goNext() {
				if (!this.form.account){
					uni.showToast({
						title: '请输入账号！',
						icon: 'none'
					});
					return;
				}
				if (!this.form.password){
					uni.showToast({
						title: '请输入密码！',
						icon: 'none'
					});
					return;
				}
				if (!/^[0-9]*$/.test(this.form.password) || this.form.password.length < 6){
					uni.showToast({
						title: '支付密码只能为6位数字！',
						icon: 'none'
					});
					return;
				}
				if (!this.form.yzm){
					uni.showToast({
						title: '请输入验证码！',
						icon: 'none'
					});
					return;
                }
                // 账号登录
                let _data = {
                    lx: 2,
                    user: this.form.account,
                    pwsd: this.form.password,
                    amt: this.price,
                    time: new Date().getTime()
                }
                this.$Socket.nsend(JSON.stringify(_data));
            },
            // socket连接
            SocketConnect() {
                this.$Socket.eventPatch.onMsg((res,sk)=>{
                    let _data = JSON.parse(res.data);
                    if(_data.r == 1){
                        // 登录成功
                        uni.navigateTo({
                            url:'./code'
                        })
                    }else if(_data.r == 3){
                        // 手机号关联多个账户，跳转账户选择
                        uni.navigateTo({
                            url:'./account?list='+JSON.stringify(_data.user)
                        })
                    }else if(_data.r == 4){
                        // 需要登陆验证码
                        uni.navigateTo({
                            url:'./yzm?phone='+_data.user
                        })
                    }else if(_data.r == 2){
                        uni.showToast({
                            title: _data.error,
                            icon: 'none'
                        });
                    }
                });
            }
		},
		onLoad() {
            this.SocketConnect();
		}
	};
</script>

<style lang="less">
	page{
		text-align: center;
	}
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
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				color: #1678ff;
				font-size: 34upx;
			}
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
					text-align: left;
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
		display: inline-block;
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

	.itemed {
		.inpt {
			.left {
				image {
					width: 80upx;
					height: 50upx;
				}
			}
		}
	}
</style>
