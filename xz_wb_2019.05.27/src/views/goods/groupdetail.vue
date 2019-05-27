<template>
    <div class="main-view" style="position: relative;">
        <div class="tab-head detail-tabs">
            <div class="xz-tabs">
                <div :class="['xz-tab',active==0?'cur':'']" data-id="0" @click="jump($event,0)">商品</div>
                <div :class="['xz-tab',active==1?'cur':'']" data-id="1" @click="jump($event,1)">评价</div>
                <div :class="['xz-tab',active==2?'cur':'']" data-id="2" @click="jump($event,2)">推荐</div>
                <div :class="['xz-tab',active==3?'cur':'']" data-id="3" @click="jump($event,3)">详情</div>
            </div>
        </div>
        <div class="nav-main nav-main-bottom" style="position: relative; margin-bottom:50px">
            <div class="shop-wrap d_jump">
                <!-- 这个是商品对应的 -->
                <div class="swiper-wrap">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item v-for="(image, index) in imageData" :key="index">
                            <img v-lazy="image" />
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <div class="shop-msgbox">
                    <div class="shop-title">
                        <div class="xz-title">商品标题，最多占两行，超出部分省略号，标题包含规格名称</div>
                        <a class="share-btn" @click="handleClickShare">
                            <xz-icon type="fenxiang" />分享</a>
                    </div>
                    <div class="banner-tips">广告语内容，广告语内容字体颜色由后台设置，广告语不限制行数，此处测试显示第二行效果</div>
                    <div class="active-price">
                        <span>￥<strong>2899</strong>.00</span>
                        <i>单独购买：￥3199.00</i>
                        <div class="active-time">
                            <p>距离结束仅剩</p>
                            <h4 data-seconds="1687" class="J_time"><span>00</span>天<span>00</span>时<span>00</span>分<span>00</span>秒</h4>
                        </div>
                    </div>
                    <div class="pro-groupbuy detail-panel">
                        <div class="panel-hd">
                            <a href="javascript:void(0);" class="evaluate-more" @click="handleClickGroup">查看更多
                                <xz-icon type="forward" />
                            </a>
                            <h4>4人正在拼团，可直接参与</h4>
                        </div>
                        <div class="panel-bd">
                            <ul class="groupbuy-items">
                                <li class="groupbuy-item">
                                    <div class="user-msg">
                                        <span><img src="../../assets/images/temp__/dynamic-pic1.jpg" alt="" /></span>
                                        <strong>用户名</strong>
                                    </div>
                                    <div class="groupbuy-msg">
                                        <div class="g-pro-msg">
                                            <p>还差<span>1</span>人拼成</p>
                                            <time>剩余23:44:37</time>
                                        </div>
                                        <a href="javascript:void(0)">参团</a>
                                    </div>
                                </li>
                                <li class="groupbuy-item">
                                    <div class="user-msg">
                                        <span><img src="../../assets/images/temp__/dynamic-pic1.jpg" alt="" /></span>
                                        <strong>用户名</strong>
                                    </div>
                                    <div class="groupbuy-msg">
                                        <div class="g-pro-msg">
                                            <p>还差<span>1</span>人拼成</p>
                                            <time>剩余23:44:37</time>
                                        </div>
                                        <a href="javascript:void(0)">参团</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="xz-key">
                        <ul class="key-items">
                            <li class="key-item">
                                <span class="key-name">促销活动</span>
                                <div class="key-data" @click="handleClickActive">
                                    <input type="text" readonly="" value="">
                                    <xz-icon type="forward" />
                                </div>
                            </li>
                            <li class="key-item mb-20">
                                <span class="key-name">优惠券</span>
                                <div class="key-data" @click="handleClickCoupon">
                                    <input type="text" readonly="" value="">
                                    <xz-icon type="forward" />
                                </div>
                            </li>
                            <li class="key-item">
                                <span class="key-name">选择商品规格</span>
                                <div class="key-data" @click="handleClickNorm">
                                    <input type="text" readonly="" value="">
                                    <xz-icon type="forward" />
                                </div>
                            </li>
                            <li class="key-item mb-20">
                                <span class="key-name">商品参数</span>
                                <div class="key-data" @click="handleClickParameter">
                                    <input type="text" readonly="" value="">
                                    <xz-icon type="forward" />
                                </div>
                            </li>
                            <li class="key-item mb-20 address-item">
                                <span class="key-name">送至</span>
                                <div class="key-data" @click="handleClickAddress">
                                    <input type="text" readonly="" value="云南省昆明市盘龙区北京路635号小城故事A座">
                                    <p class="tips">运费 免运费</p>
                                    <xz-icon type="forward" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detail-panel d_jump">
                    <!-- 这个是评价 -->
                    <div class="panel-hd">
                        <span class="hd-more">好评度 <em>93%</em>
							<xz-icon type="forward" /></span>
                        <h4 class="col-title">评价<span>(13282)</span></h4>
                    </div>
                    <div class="panel-bd">
                        <section class="evaluate-items">
                            <article class="evaluate-item" v-for="item in reviewData" :key="item.id">
                                <div class="evaluate-hd">
                                    <span class="tips good">{{item.result}}</span>
                                    <div class="user-msgbox">
                                        <span class="user-pic"><img :src="item.userimage" alt="" /></span>
                                        <h5 class="user-name">{{item.username}}</h5>
                                    </div>
                                </div>
                                <div class="evaluate-bd">
                                    <div class="evaluate-desc">{{item.description}}</div>
                                    <ul class="evaluate-pic">
                                        <li class="pic-item" v-for="img in item.children">
                                            <div class="pic-cont"><img :src="img" alt="" /></div>
                                        </li>
                                    </ul>
                                </div>
                            </article>
                        </section>
                    </div>
                    <div class="panel-ftr">
                        <a href="#/user/allcomment">查看全部评价</a>
                        <a href="#/user/buyadvisory">购买咨询(198)</a>
                    </div>
                </div>
                <div class="detail-panel d_jump">
                    <!-- 这个是推荐 -->
                    <div class="panel-hd">
                        <h4 class="col-title">为你推荐</h4>
                    </div>
                    <div class="panel-bd">
                        <div class="recommend-swiper">
                            <van-swipe :autoplay="5000">
                                <van-swipe-item v-for="item in recomData" :key="item.id">
                                    <section class="rem-goods">
                                        <div class="goods-list" v-for="list in item.children">
                                            <a class="goods-item" href="#/goods/detail" target="_blank">
                                                <div class="pic-wrap"><img :src="list.listimg" alt></div>
                                                <div class="goods-title">
                                                    <div class="xz-title">{{list.listname}}</div>
                                                </div>
                                                <div class="goods-price">
                                                    <span>￥</span>{{list.listprice}}
                                                </div>
                                            </a>
                                        </div>
                                    </section>
                                </van-swipe-item>
                            </van-swipe>
                        </div>
                    </div>
                </div>
                <div class="detail-panel d_jump">
                    <!-- 这个是详情 -->
                    <div class="panel-hd">
                        <h4 class="col-title">商品详情</h4>
                    </div>
                    <div class="panel-bd">
                        <div class="details-panel">
                            <img src="../../assets/images/temp__/pic.jpg" alt="" />
                            <img src="../../assets/images/temp__/pic.jpg" alt="" />
                            <img src="../../assets/images/temp__/pic.jpg" alt="" />
                            <img src="../../assets/images/temp__/pic.jpg" alt="" />
                            <img src="../../assets/images/temp__/pic.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <van-goods-action>
            <van-goods-action-mini-btn icon="x xz-icon xz-icon-kefu" text="客服" />
            <van-goods-action-mini-btn icon="x xz-icon xz-icon-shoucang1" text="收藏" />
            <van-goods-action-mini-btn icon="x xz-icon xz-icon-cart" text="购物车" :info="cartNumInfo" />
            <button class="group-btn"><span>单独购买</span><em>￥3199.00</em></button>
            <button class="group-btn"><span>开团</span><em>￥2899.00</em></button>
        </van-goods-action>
        <!-- 分享弹窗-->
        <van-actionsheet v-model="isShowShare">
            <xz-popup class="share" title="分享到" btnName="我知道了" :isShowBtn="false" :clickFlag="isShowShare" @addClose="listenClose">
                <ul class="share-items" slot="content">
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon"><img src="../../assets/images/common/share-ico1.png" alt=""></span>
                            <p>微信好友</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon"><img src="../../assets/images/common/share-ico2.png" alt=""></span>
                            <p>朋友圈</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon"><img src="../../assets/images/common/share-ico3.png" alt=""></span>
                            <p>QQ好友</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon"><img src="../../assets/images/common/share-ico4.png" alt=""></span>
                            <p>QQ空间</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon"><img src="../../assets/images/common/share-ico5.png" alt=""></span>
                            <p>新浪微博</p>
                        </a>
                    </li>
                    <li class="item">
                        <a href="javascript:void(0);">
                            <span class="icon"><img src="../../assets/images/common/share-ico6.png" alt=""></span>
                            <p>复制链接</p>
                        </a>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 促销活动弹窗-->
        <van-actionsheet v-model="isShowActive">
            <xz-popup title="活动" btnName="我知道了" :clickFlag="isShowActive" @addClose="listenClose" @clickBottomBtn="isShowActive = !isShowActive">
                <ul class="popup-items" slot="content">
                    <li class="item" v-for="item in activeData" :key="item.id">
                        <span class="type">{{item.type}}</span>
                        <p class="desc">{{item.description}}</p>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 优惠券弹窗-->
        <van-actionsheet v-model="isShowCoupon">
            <xz-popup title="优惠券" btnName="确定" :clickFlag="isShowCoupon" @addClose="listenClose" @clickBottomBtn="isShowCoupon = !isShowCoupon">
                <ul class="coupon-items" slot="content">
                    <li class="item" v-for="item in couponData" :key="item.id">
                        <div class="item-cont">
                            <div class="coupon-msg">
                                <span>￥<strong>{{item.price}}</strong>{{item.term}}</span>
                                <p>{{item.description}}</p>
                                <p>{{item.date}}</p>
                            </div>
                            <span class="coupon-btn">{{item.btntxt}}</span>
                        </div>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 商品规格弹窗-->
        <van-actionsheet v-model="isShowNorm">
            <xz-popup class="norm" :btnName="popupBottomBtnText" :clickType="clickType" :clickFlag="isShowNorm" @clickBottomBtn="addCartOrBuy" :isShowHd="true">
                <div class="popup-hd norm-hd" slot="title">
                    <div class="goods-msgtxt">
                        <span class="msg-pic" @click="showBigImg(curSelSkuDate.skuOtherInfo.skuImg)"><img :src="curSelSkuDate.skuOtherInfo.skuImg"
							 alt=""></span>
                        <div class="txt-box">
                            <span class="price">￥<strong>{{ curSelSkuDate.skuOtherInfo.skuPrice }}</strong></span>
                            <p class="goods-desc">库存：{{ curSelSkuDate.skuOtherInfo.skuStore }}</p>
                            <p class="goods-desc">编号：{{ curSelSkuDate.skuOtherInfo.skuNumbers }}</p>
                        </div>
                    </div>
                    <xz-icon type="guanbi" @click="handleClickCloseNorm" />
                </div>
                <div class="good-norm" slot="content">
                    <!-- 选择成功后返回选择的对象  -->
                    <xz-sku :skuDatas="skuDatas" :defaultSelSkuId="skuDatas[0].skuId" @selCallback="selCallback"></xz-sku>
                </div>
                <div class="number-wrap" slot="footer">
                    <span>数量</span>
                    <van-stepper v-model="addProductNumModel" integer :min="1" :max="curSelSkuDate.skuOtherInfo.skuStore" :step="1" disable-input @change="addProductNum" />
                </div>
            </xz-popup>
        </van-actionsheet>
        <!-- 商品参数弹窗-->
        <van-actionsheet v-model="isShowParameter">
            <xz-popup title="商品参数" btnName="我知道了" :clickFlag="isShowParameter" @addClose="listenClose" @clickBottomBtn="isShowParameter = !isShowParameter">
                <ul class="popup-items parameter" slot="content">
                    <li class="item" v-for="item in parameterData" :key="item.id">
                        <span class="type">{{item.type}}:</span>
                        <p class="desc">{{item.description}}</p>
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <!-- 配送至弹窗-->
        <van-actionsheet v-model="isShowAddress">
            <xz-popup title="配送至" btnName="选择其他地区" :clickFlag="isShowAddress" @addClose="listenClose">
                <ul class="popup-items address" slot="content">
                    <li class="item" :class="[addID==item.id ?'active' :'']" v-for="item in addressData" @click="handleClickSelAdd(item.id)" :key="item.id">
                        <xz-icon type="shouhuodizhi1" />
                        <p class="desc">{{item.address}}</p>
                        <xz-icon type="dui" />
                    </li>
                </ul>
            </xz-popup>
        </van-actionsheet>
        <xz-menu></xz-menu>
        <!-- 右侧菜单导航 -->
        <van-popup v-model="isShowGroupBuy" class="group-popup">
            <div class="popup-hd">
                <h4>正在进行中的拼单</h4>
                <xz-icon type="tubiao-" @click="handleClickClose" />
            </div>
            <div class="popup-bd">
                <ul class="groupbuy-items">
                    <li class="groupbuy-item p-groupbuy-item">
                        <a href="javascript:void(0)">参团</a>
                        <div class="user-msg">
                            <span><img src="../../assets/images/temp__/dynamic-pic1.jpg" alt="" /></span>
                            <div class="g-pro-msg">
                                <p>用户名 <em>还差1人</em></p>
                                <time>剩余23:44:37</time>
                            </div>
                        </div>
                    </li>
                    <li class="groupbuy-item p-groupbuy-item">
                        <a href="javascript:void(0)">参团</a>
                        <div class="user-msg">
                            <span><img src="../../assets/images/temp__/dynamic-pic1.jpg" alt="" /></span>
                            <div class="g-pro-msg">
                                <p>用户名 <em>还差1人</em></p>
                                <time>剩余23:44:37</time>
                            </div>
                        </div>
                    </li>
                    <li class="groupbuy-item p-groupbuy-item">
                        <a href="javascript:void(0)">参团</a>
                        <div class="user-msg">
                            <span><img src="../../assets/images/temp__/dynamic-pic1.jpg" alt="" /></span>
                            <div class="g-pro-msg">
                                <p>用户名 <em>还差1人</em></p>
                                <time>剩余23:44:37</time>
                            </div>
                        </div>
                    </li>
                    <li class="groupbuy-item p-groupbuy-item">
                        <a href="javascript:void(0)">参团</a>
                        <div class="user-msg">
                            <span><img src="../../assets/images/temp__/dynamic-pic1.jpg" alt="" /></span>
                            <div class="g-pro-msg">
                                <p>用户名 <em>还差1人</em></p>
                                <time>剩余23:44:37</time>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import popup from "../../components/goods/index.vue";
    import menu from "../../components/goods/menu.vue";
    import sku from "../../components/sku/index.vue";
    import {
        Swipe,
        SwipeItem,
        GoodsAction,
        GoodsActionBigBtn,
        GoodsActionMiniBtn,
        ImagePreview
    } from 'vant';
    export default {
        name: 'detail',
        components: {
            vanSwipe: Swipe,
            vanSwipeItem: SwipeItem,
            vanGoodsAction: GoodsAction,
            vanGoodsActionBigBtn: GoodsActionBigBtn,
            vanGoodsActionMiniBtn: GoodsActionMiniBtn,
            "xz-popup": popup,
            "xz-menu": menu,
            "xz-sku": sku,
        },
        data() {
            return {
                cartNumInfo: 0, // 当前购物车数量
                active: 0,
                isShowShare: false,
                isShowActive: false,
                isShowCoupon: false,
                isShowParameter: false,
                isShowAddress: false,
                isShowGroupBuy: false,
                popupBottomBtnText: '加入购物车', // 弹出层底部固定按钮的显示文字
                clickType: 'addCart', // 点击的类型，用以判断是加入购物车，还是立即购买，根据此type来做购买还是加入购物车的逻辑,默认为加入购物车addCart，立即购买为： buy
                isShowNorm: false,
                addID: 1,
                addProductNumModel: 1,
                imageData: [
                    'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
                    'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
                    'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
                    'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'
                ],
                curSelSkuDate: { // 当前选中的sku对象
                    "颜色": "红色",
                    "尺码": "大",
                    "型号": "A",
                    "skuId": "3158085",
                    "skuOtherInfo": { // 规格的其他信息填写在此对象下面，填写其他地方会有问题
                        "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
                        "skuPrice": "199.00",
                        "skuStore": "10",
                        "skuNumbers": "2934567899", // 规格编号
                    }
                },
                skuDatas: [{
                        "颜色": "红色",
                        "尺码": "大",
                        "型号": "A",
                        "skuId": "3158055",
                        "skuOtherInfo": { // 规格的其他信息填写在此对象下面，填写其他地方会有问题
                            "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg",
                            "skuPrice": "989.00",
                            "skuStore": "4",
                            "skuNumbers": "1234567899", // 规格编号
                        }
                    },
                    {
                        "颜色": "白色",
                        "尺码": "大",
                        "型号": "A",
                        "skuId": "3x58054",
                        "skuOtherInfo": {
                            "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
                            "skuPrice": "990.00",
                            "skuStore": "10",
                            "skuNumbers": "1234567890", // 规格编号
                        }
                    },
                    {
                        "颜色": "白色",
                        "尺码": "中",
                        "型号": "B",
                        "skuId": "3103859",
                        "skuOtherInfo": {
                            "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg",
                            "skuPrice": "9.00",
                            "skuStore": "20",
                            "skuNumbers": "187467899", // 规格编号
                        }
                    },
                    {
                        "颜色": "蓝色",
                        "尺码": "小",
                        "型号": "C",
                        "skuId": "3516733",
                        "skuOtherInfo": {
                            "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
                            "skuPrice": "919.00",
                            "skuStore": "5",
                            "skuNumbers": "1234567899", // 规格编号
                        }
                    },
                    {
                        "颜色": "蓝色",
                        "尺码": "bb",
                        "型号": "C",
                        "skuId": "3916834",
                        "skuOtherInfo": {
                            "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
                            "skuPrice": "99.00",
                            "skuStore": "6",
                            "skuNumbers": "1234567899", // 规格编号
                        }
                    },
                    {
                        "颜色": "蓝色",
                        "尺码": "xyz",
                        "型号": "D",
                        "skuId": "3616835",
                        "skuOtherInfo": {
                            "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
                            "skuPrice": "99.00",
                            "skuStore": "2",
                            "skuNumbers": "1234567899", // 规格编号
                        }
                    },
                    {
                        "颜色": "黑",
                        "尺码": "黑尺码",
                        "型号": "E",
                        "skuId": "3513839",
                        "skuOtherInfo": {
                            "skuImg": "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg",
                            "skuPrice": "99.00",
                            "skuStore": "7",
                            "skuNumbers": "1234567899", // 规格编号
                        }
                    }
                ],
                reviewData: [{
                        username: '182****5020',
                        userimage: require('../../assets/images/user-pic.png'),
                        result: '好评',
                        description: '总体来说确实不错，现在这个价格还是可以入手的，比我手上的小米5要快得多，而且不怎么重，小米5可以作为备用机了，支',
                        children: [
                            require('../../assets/images/temp__/dynamic-pic1.jpg'),
                            require('../../assets/images/temp__/dynamic-pic2.jpg'),
                            require('../../assets/images/temp__/dynamic-pic3.jpg'),
                            require('../../assets/images/temp__/dynamic-pic4.jpg'),
                            require('../../assets/images/temp__/dynamic-pic5.jpg'),
                        ],
                    },
                    {
                        username: '138****3992',
                        userimage: require('../../assets/images/user-pic.png'),
                        result: '好评',
                        description: '这么辛苦评价，要不要多给我点代金券？收到的产品非常满意，iPhone的品质一如既往的好，作为五年的果粉，几乎每一代',
                        children: [
                            require('../../assets/images/temp__/dynamic-pic1.jpg'),
                            require('../../assets/images/temp__/dynamic-pic2.jpg'),
                            require('../../assets/images/temp__/dynamic-pic3.jpg'),
                            require('../../assets/images/temp__/dynamic-pic4.jpg'),
                            require('../../assets/images/temp__/dynamic-pic5.jpg'),
                        ],
                    },
                    {
                        username: '138****1067',
                        userimage: require('../../assets/images/user-pic.png'),
                        result: '好评',
                        description: 'iOS 11说实话是苹果系统中BUG最多的一代，但机器没什么问题，物流也非常给力，下次继续支持！',
                        children: [
                            require('../../assets/images/temp__/dynamic-pic1.jpg'),
                            require('../../assets/images/temp__/dynamic-pic2.jpg'),
                            require('../../assets/images/temp__/dynamic-pic3.jpg'),
                            require('../../assets/images/temp__/dynamic-pic4.jpg'),
                            require('../../assets/images/temp__/dynamic-pic5.jpg'),
                        ],
                    },
                ],
                recomData: [{
                        children: [{
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2199.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2299.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2399.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2499.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2599.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2699.00',
                            },
                        ]
                    },
                    {
                        children: [{
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2799.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2899.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '2999.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3099.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3199.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3299.00',
                            },
                        ]
                    },
                    {
                        children: [{
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3399.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3499.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3599.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3699.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3799.00',
                            },
                            {
                                listimg: require('../../assets/images/temp__/pic.jpg'),
                                listname: '商品标题，最多占两行，超出部分省略',
                                listprice: '3899.00',
                            },
                        ]
                    },
                ],
                activeData: [{
                        type: '满减',
                        description: '单品满100立减15元',
                    },
                    {
                        type: '满赠',
                        description: '满1000送 iPhone 数据线一条',
                    },
                    {
                        type: '限购',
                        description: '此商品每人限购2件',
                    },
                ],
                couponData: [{
                        price: '10',
                        description: '兑换全场通用券',
                        date: '有效期  2017.10.19 10:00:00 ~ 2017.10.31 10:00:00',
                        btntxt: '1000积分兑换'
                    },
                    {
                        price: '10',
                        term: '满300可用',
                        description: '手机分类商品可用',
                        date: '有效期  2017.10.19 10:00:00 ~ 2017.10.31 10:00:00',
                        btntxt: '领取'
                    }
                ],
                parameterData: [{
                        type: '品牌',
                        description: '苹果(apple)',
                    },
                    {
                        type: '操作系统',
                        description: '苹果(iOS)',
                    },
                    {
                        type: '摄像头',
                        description: '1200W像素',
                    },
                    {
                        type: '无线充电',
                        description: '支持',
                    },
                    {
                        type: 'CPU型号',
                        description: '64位苹果 A11+ M11 运动协处理器',
                    },
                    {
                        type: '电池',
                        description: '2675mAh',
                    },
                ],
                addressData: [{
                        id: 1,
                        address: '云南省昆明市盘龙区鼓楼街道北京路635号小城故事A座309室'
                    },
                    {
                        id: 2,
                        address: '云南省昆明市盘龙区鼓楼街道北京路636号小城故事A座310室'
                    },
                    {
                        id: 3,
                        address: '云南省昆明市盘龙区鼓楼街道北京路637号小城故事A座311室'
                    },
                ],
            };
        },
        methods: {
            selCallback(selVal) { // 选择规格参数成功后回调 返回所选的规格对象，此处应该刷新页面数据，呈现当前选择的规格的数据
                if(selVal.skuId === this.curSelSkuDate.skuId) return;
                this.curSelSkuDate = selVal;
                this.addProductNumModel = 1;

            },
            showBigImg(url) { // 展示规格大图
                ImagePreview({
                    images: [url],
                    asyncClose: true
                });
            },
            addCartOrBuy(clickType) { // 点击加入购物车
                var curAddCartGoodsObj = JSON.stringify(this.curSelSkuDate); // 此种拷贝方式在操作拷贝的数据时，不影响原来的数据
                curAddCartGoodsObj = JSON.parse(curAddCartGoodsObj);
                curAddCartGoodsObj.skuOtherInfo.addCartNum = this.addProductNumModel; // curAddCartGoodsObj 为加入购物车数据
                if(clickType === 'buy') { // 如果点击的是立即购买
                    this.$toast("跳转购买页面，待开发");

                } else if(clickType === 'addCart') {
                    this.cartNumInfo = parseInt(this.cartNumInfo) + parseInt(curAddCartGoodsObj.skuOtherInfo.addCartNum); // 更新购物车角标数量
                    this.$toast.success('加入购物车成功'); // 此处差服务器加入验证，暂时提示成功
                }

            },
            addProductNum(curNum) { // 点击添加数量按钮
                if(curNum >= this.curSelSkuDate.skuOtherInfo.skuStore) {
                    this.$toast('该商品最多可购买' + this.curSelSkuDate.skuOtherInfo.skuStore + "件");
                }

            },
            handleClickGroup() {
                this.isShowGroupBuy = true //开团点击查看更多
            },
            handleClickClose() {
                this.isShowGroupBuy = false //开团点击查看更多
            },

            handleClickShare() {
                this.isShowShare = true //点击分享
            },
            handleClickActive() {
                this.isShowActive = true //点击促销活动
            },
            handleClickCoupon() {
                this.isShowCoupon = true //点击优惠券
            },
            handleClickParameter() {
                this.isShowParameter = true //点击商品参数
            },
            handleClickAddress() {
                this.isShowAddress = true //点击配送至
            },
            handleClickNorm(type) {
                this.isShowNorm = true; //点击商品规格和加入购入车
                switch(type) {
                    case 'buy':
                        this.popupBottomBtnText = "立即购买";
                        this.clickType = "buy"; // 设置点击type
                        break;
                    case 'addCart':
                        this.popupBottomBtnText = "加入购物车";
                        this.clickType = "addCart"; // 设置点击type
                        break;
                    default:
                        break;
                }
                this.isShowNorm = true
            },
            // 选择地址
            handleClickSelAdd(id) {
                this.addID = id;
            },
            handleClickCloseNorm() {
                this.isShowNorm = false;
            },
            listenClose(value) {
                //如果分享打开
                if(this.isShowShare) {
                    this.isShowShare = value;
                } else if(this.isShowActive) {
                    this.isShowActive = value;
                } else if(this.isShowCoupon) {
                    this.isShowCoupon = value;
                } else if(this.isShowParameter) {
                    this.isShowParameter = value;
                } else if(this.isShowAddress) {
                    this.isShowAddress = value;
                } else if(this.isShowNorm) {
                    this.isShowNorm = value;
                }
            },
            jump(e, index) {
                // 用 class="d_jump" 添加锚点
                let jump = document.querySelectorAll('.d_jump')
                let total = jump[index].offsetTop
                let distance = document.documentElement.scrollTop || document.body.scrollTop
                // 平滑滚动，时长500ms，每10ms一跳，共50跳
                let step = total / 50
                if(total > distance) {
                    smoothDown()
                } else {
                    let newTotal = distance - total
                    step = newTotal / 50
                    smoothUp()
                }
                this.active = e.target.dataset.id;

                function smoothDown() {
                    if(distance < total) {
                        distance += step
                        document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        setTimeout(smoothDown, 10)
                    } else {
                        document.body.scrollTop = total
                        document.documentElement.scrollTop = total
                    }
                }

                function smoothUp() {
                    if(distance > total) {
                        distance -= step
                        document.body.scrollTop = distance
                        document.documentElement.scrollTop = distance
                        setTimeout(smoothUp, 10)
                    } else {
                        document.body.scrollTop = total
                        document.documentElement.scrollTop = total
                    }
                }
            },
            onScroll() {
                let _this = this;
                let scrolled = document.documentElement.scrollTop || document.body.scrollTop
                if(scrolled >= document.querySelectorAll('.d_jump')[3].offsetTop) {
                    _this.active = 3
                } else if(scrolled < document.querySelectorAll('.d_jump')[3].offsetTop && scrolled >= document.querySelectorAll(
                        '.d_jump')[2].offsetTop) {
                    _this.active = 2
                } else if(scrolled < document.querySelectorAll('.d_jump')[2].offsetTop && scrolled >= document.querySelectorAll(
                        '.d_jump')[1].offsetTop) {
                    _this.active = 1
                } else {
                    _this.active = 0
                }
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                window.addEventListener('scroll', this.onScroll)
            })

        }
    };
</script>