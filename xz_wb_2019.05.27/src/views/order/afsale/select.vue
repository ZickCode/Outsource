<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="选择售后商品" fixed left-arrow/>
        <article class="s-shop-item mb-20 select">
            <a href="javascript:void(0);">
                <van-checkbox class="item-check"></van-checkbox>
                <span class="s-shop-pic">
                    <img v-lazy="util.reImg('')" alt>
                </span>
                <div class="s-msg-cont">
                    <h4>商品标题</h4>
                    <p>商品属性</p>
                </div>
            </a>
            <div class="tool">
                <span>申请数量</span>
                <div class="number-wrap">
                    <van-stepper integer :min="1" :step="1"/>
                </div>
            </div>
        </article>
        <article class="s-shop-item mb-20 select">
            <a href="javascript:void(0);">
                <van-checkbox class="item-check"></van-checkbox>
                <span class="s-shop-pic">
                    <img v-lazy="util.reImg('')" alt>
                </span>
                <div class="s-msg-cont">
                    <h4>商品标题</h4>
                    <p>商品属性</p>
                </div>
            </a>
            <div class="tool">
                <span>申请数量</span>
                <div class="number-wrap">
                    <van-stepper integer :min="1" :step="1"/>
                </div>
            </div>
        </article>
        <article class="s-shop-item mb-20 select">
            <a href="javascript:void(0);">
                <van-checkbox class="item-check"></van-checkbox>
                <span class="s-shop-pic">
                    <img v-lazy="util.reImg('')" alt>
                </span>
                <div class="s-msg-cont">
                    <h4>商品标题</h4>
                    <p>商品属性</p>
                </div>
            </a>
            <div class="tool">
                <span>申请数量</span>
                <div class="number-wrap">
                    <van-stepper integer :min="1" :step="1"/>
                </div>
            </div>
        </article>
        <div class="xz-btn btn-e43 xz-btn-bottom" >提交申请</div>
    </div>
</template>
<script>
import { Checkbox } from "vant";
export default {
    data() {
        return {
            dataList: []
        };
    },
    components: {
        vanCheckbox: Checkbox
    }
};
</script>