<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	.nav {
		height: 80upx;
		width: 100%;
		background: #1E222D;
		position: relative;
		display: flex;
		align-items: center;

		.left {
			display: flex;
			align-items: center;

			image {
				width: 40upx;
				height: 40upx;
				margin-right: 10upx;
			}

			font-size: 30rpx;
			color: #FFFFFF;
			position: absolute;
			left: 10px;
			top: 20upx;
		}

		.center {
			color: #FFFFFF;
			font-size: 30rpx;
			width: 100%;
			text-align: center;

			image {
				width: 40upx;
				height: 40upx;
				margin-right: 10upx;
			}
		}

		.right {
			position: absolute;
			right: 10px;
			top: 10upx;
			color: #1678FF;
			font-size: 32upx;
			line-height: 60upx;
		}
	}

	.navBlock {
		background: #FFFFFF;

		.left {
			color: #1678FF;
		}

		.center {
			color: #000000;
			font-size: 34upx;
			font-weight: 600;
		}
	}

	.btn {
		background: #1678FF;
		font-size: 36upx;
		text-align: center;
		display: block;
		margin: 30upx;
		width: auto;
		padding: 25upx 0upx;
		color: #FFFFFF;
		border-radius: 10upx;
	}
	.logo{
		width: 133upx;
		height: 46upx;
		position: absolute;
		bottom: 50upx;
		left: 0px;
		right: 0px;
		margin: auto;
	}
</style>
