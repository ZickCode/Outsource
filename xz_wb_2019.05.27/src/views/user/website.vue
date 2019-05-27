<template>
	<div>
		<div class="hot-wrap">
           <h3 class="hot-cont">
			  <a href="javascript:" class="idx-hotnews">
				  <p class="idxhot-txt">成为小小推广员，简单几步，让您轻松月收入过万</p>
				  <xz-icon type="forward"/>
			  </a>
		   </h3>
		</div>
		<div class="performance-wrap">
			<div class="performance-hd">
				<h3 class="slogin">小折电商建站，比您想象的<span>更加容易</span></h3>
				<p class="abstract">5分钟智能生成您的电商平台， 让您把精力聚焦于业务本身，剩下的难题交给我们就好。 </p>
			</div>
			<div class="bd">
				<ul class="performance-list">
					<li v-for="item in perlists">
						<a href="javascript:void(0)" class="per-link">
							<span class="pic-box"><img src="'+item.imgUrl+'" /></span>
							<h4 class="per-tit">{{item.theme}}</h4>
							<p class="per-describe">{{item.describe}}</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
        <div class="channel-wrap">
			<div class="performance-hd">
				<h3 class="slogin"><span>完美适配</span>所有销售渠道</h3>
				<p class="abstract">5分钟智能生成您的电商平台， 让您把精力聚焦于业务本身，剩下的难题交给我们就好。 </p>
			</div>
			<div class="">
				<ul class="performance-list">
					<li v-for="item in perlists">
						<a href="javascript:void(0)" class="per-link">
							<span class="pic-box"><img src="'+item.imgUrl+'" /></span>
							<h4 class="per-tit">PC</h4>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
               perlists:[
				   {
					   imgUrl:'',
					   theme:'便捷',
					   describe:'无需掌握任何技术，智能生 成专属于您的电商平台',
				   },
				   {
					   imgUrl:'',
					   theme:'安全',
					   describe:'权威认证，全面的安全保护阻止数据丢失',
				   },
				   {
					   imgUrl:'',
					   theme:'高效',
					   describe:'一键生成囊括移动端、电脑端和微信小程序，而且它完全独立(包括域名)',
				   },
				   {
					   imgUrl:'',
					   theme:'稳定',
					   describe:'完美适配所有销售渠道，天猫、京东商品数据一键导入',
				   },
				   {
					   imgUrl:'',
					   theme:'专业',
					   describe:'系统化统计管理，帮您了解 客户，实现精准营销',
				   },
				   {
					   imgUrl:'',
					   theme:'全面',
					   describe:'从服务器到宽带，从域名到 上线电脑端、移动端、微信 小程序，全方位帮你解决',
                   }
			   ]
			};
		},
	};
</script>
<style lang="less">
	.performance-wrap{
		background-color: #f7f7f7;
	}
	
	.performance-list{
		display: flex;
		flex-wrap:wrap;
		justify-content:center;
	}
	.performance-list li{
		display: inline-block;
		width: 300px;
		height: 300px;
		margin:0 15px 30px;
		border-radius: 20px;
		background-color: #fff;
		box-shadow:0 0 40px rgba(0, 0, 0, .1);
		& a{
			display: block;
			width: 100%;
			height: 100%;
			padding:20px 30px;
			text-align: center;
		}
	}
	.pic-box{
		width: 120px;
		height:90px;
		display: block;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		& img{
			display:block;
			margin: auto;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
		}
	}
	.per-tit{
		color: #333333;
		font-size:28px;
		line-height:38px;
		height: 38px;
		margin:10px 0 20px;
		overflow: hidden;
		word-wrap: normal;
		white-space: nowrap;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		font-weight: normal;
	}
	.per-describe{
		color:#999999;
		font-size:20px;
		line-height: 30px;
		height: 90px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-wrap: break-word;
		text-overflow: ellipsis;
	}
	.performance-hd{
		padding: 80px 30px 60px;
		text-align: center;
	}
	.abstract{
		color: #999999;
		font-size: 24px;
		line-height: 34px;
	}
	.slogin{
		color: #4c4c4c;
		font-size: 36px;
		line-height: 46px;
		margin:0 0 40px;
		font-weight: normal;
		& span{
			color:#00a0ff;
		}
	}
	.hot-wrap{
		background-color: #1a68c4;
		height: 88px;
		line-height: 88px;
		padding:0 30px;
	}
	.idx-hotnews{
		display: flex;
		& .xz-icon-forward{
			width: 50px;
			text-align: right;
			&:before{
				color: #fff;
				font-size: 25px;
			}
		}
	}
	.idxhot-txt{
		flex: 1;
		overflow: hidden;
		word-wrap: normal;
		white-space: nowrap;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		font-weight: normal;
		color: #fff;
		font-size: 20px;
	}
	/*==================渠道=================*/
	.channel-wrap{
		background-color: #fff;
	}
</style>

