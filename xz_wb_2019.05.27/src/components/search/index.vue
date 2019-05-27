<template>
    <van-search v-model="keyword" placeholder="请输入商品关键词" show-action @search="onSearch" v-focus >
        <div slot="action" @click="onSearch">搜索</div>
    </van-search>
</template>
<script>
import { Search } from "vant";
export default {
    props: {
        value: ""
    },
    components: {
        vanSearch: Search
    },
    data() {
        return {
            keyword: ""
        };
	},
	created(){
		this.keyword = this.value;
	},
    methods: {
        onSearch() {
            this.$emit("search", this.value);
        }
    },
    watch: {
        keyword(newValue, oldValue) {
            this.$emit("input", newValue);
		}
    },
    mounted() {
    	// 300ms后自动获取input焦点
    	setTimeout(function() {
    		document.getElementById("xzSearch").select();
    	}, 300)
    }
};
</script>
