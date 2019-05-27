<template>
    <div class="scroller-view">
        <van-nav-bar @click-left="go_back" fixed class="xz-nva-bar navbar" title="全部评论" left-arrow/>
        <pull-up
            :postData="postData"
            @loadListSuccFn="loadListSuccFn"
            ablePull="true"
            ableLoad="true"
        >
            <section class="evaluate-items all-comment" slot="listContent">
                <article class="evaluate-item" v-for="item in reviewData" :key="item.id">
                    <div class="evaluate-hd">
                        <span class="tips" v-if="item.mood == 'positive'">好评</span>
                        <span class="tips" v-if="item.mood == 'neutral'">中评</span>
                        <span class="tips" v-if="item.mood == 'negative'">差评</span>
                        <div class="user-msgbox">
                            <span class="user-pic">
                                <img v-lazy="item.avatar" alt>
                            </span>
                            <h5 class="user-name">{{item.username}}</h5>
                        </div>
                    </div>
                    <div class="evaluate-bd">
                        <div class="evaluate-guide">
                            <span>{{item.datetime}}</span>
                            <span>{{item._sku.sku_name}}</span>
                        </div>
                        <div class="evaluate-desc">{{item.content}}</div>
                        <ul class="evaluate-pic">
                            <li class="pic-item" v-for="(img,index) in item.imgs" :key="index" @click="showBigImg(item.imgs,index)">
                                <div class="pic-cont">
                                    <img v-lazy="util.reImg(img)" alt>
                                </div>
                            </li>
                        </ul>
                        <div class="reply" v-if="!util.isEmpty(item.reply_content)">
                            <span>卖家回复：</span>
                            {{item.reply_content}}
                        </div>
                    </div>
                </article>
            </section>
        </pull-up>
    </div>
</template>
<script>
import pullUp from "../../components/pull/index.vue";
import {ImagePreview} from "vant";
export default {
    name: "comment",
    data() {
        return {
            postData: {
                method: "api.module.goods.goods.spu_lists",
                type: 1, //商品详情进去的商品评价
                spu_id: "", //spu_id
                limit: 10
            },
            reviewData: [],
            imagePreview: {},
            isImagePreview: false
        };
    },
    components: {
        pullUp: pullUp
    },
    created() {
        this.postData.spu_id = this.$route.params.id;
    },
    methods: {
        loadListSuccFn(reviewData, data) {
            //数据加载成功以后回调
            this.reviewData = reviewData;
        },
        showBigImg(url, index) {
            // 展示规格大图
            let _this = this;
            let imgarray = [];
            if (url.constructor === Array) {
                url.forEach(item => {
                    imgarray.push(_this.util.reImg(item));
                });
            } else {
                imgarray.push(_this.util.reImg(url));
            }
            this.imagePreview = ImagePreview({
                images: imgarray,
                loop: false,
                startPosition: index,
                onClose: () => {
                    _this.isImagePreview = false;
                }
            });
            _this.isImagePreview = true;
        }
	},
	beforeRouteLeave(to, from, next) {
        if (this.isImagePreview) {
            this.imagePreview.close();
            this.isImagePreview = false;
            next(false);
        } else {
            next();
        }
    }
};
</script>
