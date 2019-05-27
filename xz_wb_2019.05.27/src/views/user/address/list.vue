<template>
    <div class="scroller-view">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" fixed title="收货地址" left-arrow/>
        <pull-up
            :postData="postData"
            @loadListSuccFn="loadListSuccFn"
            ablePull="true"
            ableLoad="true"
            ref="listPull"
        >
            <div class="address-list" slot="listContent">
                <van-swipe-cell :right-width="120" v-for="item in addressList" :key="item.id">
                    <div class="address-list-item">
                        <div class="item-title">收货人</div>
                        <div class="content">
                            <span>{{item.name}}</span>
                            <div class="content-address">
                                <div class="xz-title">{{item.address_info}}</div>
                            </div>
                        </div>
                        <van-radio
                            class="item-check"
                            checked-color="#e4393c"
                            v-if="item.isdefault=='1'"
                        ></van-radio>
                    </div>
                    <div slot="right" class="swipe-btns">
                        <a class="xz-btn btn-8c swipe-btn" :href="'#/user/address/edit/'+item.id">编辑</a>
                        <a
                            class="xz-btn btn-e43 swipe-btn"
                            :data-id="item.id"
                            href="javascript:void(0);"
                            @click="on_delete"
                        >删除</a>
                    </div>
                </van-swipe-cell>
            </div>
            <div slot="noView" class="scroller-tip">
                <xz-icon type="shouhuodizhi1"/>
                <span>您还没有收货地址</span>
            </div>
        </pull-up>
        <a class="xz-btn btn-e43 xz-btn-bottom" href="#/user/address/edit">添加新地址</a>
    </div>
</template>
<script>
    import { SwipeCell,Radio  } from "vant";
    import pullUp from '../../../components/pull/index.vue';
    export default {
        data() {
            return {
                postData: {
					method: "api.module.member.address.lists",
					limit: 10,
				},
                addressList: []
            };
        },
        components: {
            vanSwipeCell: SwipeCell,
            vanRadio:Radio,
            pullUp
        },
        methods: {
            loadListSuccFn(reviewData, data) { //数据加载成功以后回调
				this.addressList = reviewData;
			},
            on_delete(e) {
                let _this = this;
                let _id = e.target.dataset.id;
                _this.$dialog
                    .confirm({
                        message: "确定删除收货地址？"
                    })
                    .then(() => {
                        let _loading = _this.$xzLoading();
                        _this.post({
                                method: "api.module.member.address.del",
                                id: _id
                            },
                            function(data) {
                                _loading.clear();
                                if(200 !== data.code) {
                                    _this.$toast({
                                        message: data.msg,
                                        position: "bottom"
                                    });
                                    return;
                                }
                                _this.$toast({
                                    message: "删除成功",
                                    position: "bottom"
                                });
                                _this.$refs.listPull.onRefresh();
                            }
                        );
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        }
    };
</script>