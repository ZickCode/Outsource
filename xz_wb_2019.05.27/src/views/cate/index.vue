<template>
    <div>
        <van-nav-bar class="xz-nva-bar" title="分类" fixed :z-index="10" left-arrow>
            <xz-icon type="sousuo" slot="right" @click="go_sousuo"/>
        </van-nav-bar>
        <div class="cate-list">
            <div class="cate-tbas" v-if="level>1">
                <div
                    :class="['cate-tabs-item',active==item.id?'active':'']"
                    v-for="(item,index) in dataList"
                    :key="index"
                    :data-key="index"
                    @click="tabs_click"
                >{{item.name}}</div>
                <div class="cate-tbas-line" ref="line"></div>
            </div>
            <div
                class="cate-content"
                v-for="item in dataList"
                :key="item.id"
                v-if="item.level>1 && active==item.id"
            >
                <cate-tow :dataList="item" v-if="item.level==2"/>
                <cate-tow
                    :dataList="cate"
                    v-if="item.level==3"
                    v-for="cate in item.children"
                    :key="cate.id"
                >
                    <div class="cate-view-title">{{cate.name}}</div>
                </cate-tow>
            </div>
            <cate-one :dataList="dataList" v-if="level==1"/>
        </div>
    </div>
</template>
<script>
import cateOne from "./_temp/cateOne.vue";
import cateTow from "./_temp/cateTow.vue";
export default {
    data() {
        return {
            active: "1",
            dataList: [],
            level: 0
        };
    },
    components: {
        cateOne,
        cateTow,
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.goods.category.lists"
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        return;
                    }
                    _this.dataList = data.result.lists;
                    if (_this.dataList.length > 0) {
                        _this.active = _this.dataList[0].id;
                    }
                    _this.level = Number(data.result.level);
                }
            );
        },
        tabs_click(e) {
            let key = e.target.dataset.key;
            //console.log(e.target.offsetTop);
            let _data = this.dataList[key];
            this.active = _data.id;
            this.$refs.line.style.transform =
                "translateY(" + e.target.offsetTop + "px)";
                if(_data.children.length==0){
                    this.$router.push("/goods/list/" + _data.id);
                }
        },
        go_sousuo() {
            this.$router.push({
                    path: "/goods/search"
                });
        }
    }
};
</script>