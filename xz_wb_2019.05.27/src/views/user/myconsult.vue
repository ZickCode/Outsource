<template>
	<div class="consult-view scroller-view">
		<van-nav-bar @click-left="go_back" fixed class="xz-nva-bar navbar" title="我的咨询" left-arrow />
		<pull-up :postData="postData" @loadListSuccFn="loadListSuccFn">
			<div slot="listContent">
			<div class="advisory-wrap" v-for="item in dataList" :key="item.id">
				<article class="s-shop-item">
					<a :href="'#/goods/detail/'+item.sku_id">
						<span class="s-shop-pic">
							<img v-lazy="url + item.thumb" />
						</span>
						<div class="s-msg-cont">
							<h4>{{item.sku_name}}</h4>
							<p>{{item.spec}}</p>
						</div>
					</a>
				</article>
				<article class="purchase-bd">
					<span class="p-time">{{item.dateline}}</span>
					<ul class="purchase-list">
						<li>
							<div class="person-q">
								<xz-icon type="yonghuzhongxin-QA" />
								<p>{{item.question}}</p>
							</div>
							<div class="person-a" v-if="item.reply_content!==''">
								<xz-icon type="huida" />
								<p>{{item.reply_content}}</p>
							</div>
						</li>
					</ul>
				</article>
			</div>
			</div>
		</pull-up>
	</div>
</template>
<script>
	//import pullUp from '../../components/pull/index.vue';
	import pullUp from 'components/pull/index';
	export default {
		name: 'myconsult',
		data() {
			return {
				postData: {
					method: "api.module.member.member.advice",
					mid: this.util.mid,
					appid: this.util.appid,
					limit: 10,
				},
				url:this.util.url,
				dataList: []
			}
		},
		components: {
			pullUp: pullUp
		},
		methods: {
			loadListSuccFn(dataList, data) { //数据加载成功以后回调
				console.log(JSON.stringify(data));
				this.dataList = dataList;
			}
		}
	}
</script>
