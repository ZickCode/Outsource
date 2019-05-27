<template>
    <div class="cate-content">
        <div :class="['cate-list-view']">
            <a
                class="cate-view"
                :href="'#/goods/list/'+item.id"
                v-for="item in dataList"
                :key="item.id"
            >
                <img v-lazy="util.reImg(item.img)">
                <span>{{item.name}}</span>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        dataList:{
            type:Array,
            default:function(){
                return [];
            }
        },
    }
}
</script>