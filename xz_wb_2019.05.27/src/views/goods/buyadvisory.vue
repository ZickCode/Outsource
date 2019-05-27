<template>
    <div class="scroller-view">
        <van-nav-bar @click-left="go_back" fixed class="xz-nva-bar nav-fix" title="购买咨询" left-arrow>
            <xz-icon type="tubiao109" slot="right" @click="go_publish"/>
        </van-nav-bar>
        <pull-up class="advisory" :postData="postData" @loadListSuccFn="loadListSuccFn">
            <div slot="listContent">
                <div class="advisory-wrap" v-for="item in dataList" :key="item.index">
                    <article class="purchase-bd">
                        <div class="advisory-txt">
                            <span>{{item._datetime}}</span>
                            <h4>{{item.username}}</h4>
                        </div>
                        <ul class="purchase-list">
                            <li>
                                <div class="person-q">
                                    <xz-icon type="yonghuzhongxin-QA"/>
                                    <p>{{item.question}}</p>
                                </div>
                                <div class="person-a" v-if="item.reply_content!==''">
                                    <xz-icon type="huida"/>
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
import pullUp from "../../components/pull/index.vue";
export default {
    name: "buyadvisory",
    data() {
        return {
            postData: {
                method: "api.module.goods.consult.lists",
                spu_id: "", //spu_id
                limit: 10
            },
            sku_id: "",
            dataList: []
        };
    },
    components: {
        pullUp: pullUp
    },
    created() {
        this.postData.spu_id = this.$route.query.sp;
        this.sku_id = this.$route.query.sk;
    },
    methods: {
        go_publish() {
            this.$router.push({
                name: "goodsprovadvice",
                params: { spu_id: this.postData.spu_id, sku_id: this.sku_id }
            });
        },
        loadListSuccFn(dataList, data) {
            this.dataList = dataList;
        }
    }
};
</script>
