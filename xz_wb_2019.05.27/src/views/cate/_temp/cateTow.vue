<template>
    <div :class="['cate-list-view','cate-view-tow']">
        <slot v-if="dataList.children.length>0"/>
        <a
            class="cate-view"
            :href="'#/goods/list/'+item.id"
            v-for="item in dataList.children"
            :key="item.id"
        >
            <img v-lazy="util.reImg(item.img)">
            <span>{{item.name}}</span>
        </a>
        <a
            class="cate-view"
            :href="'#/goods/list/'+dataList.id"
            v-if="dataList.children.length==0"
        >
            <img v-lazy="util.reImg(dataList.img)">
            <span>{{dataList.name}}</span>
        </a>
    </div>
</template>
<script>
export default {
    props: {
        dataList: {
            type: Object,
            default: function() {
                return {};
            }
        }
    }
};
</script>