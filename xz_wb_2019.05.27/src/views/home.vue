<template>
    <div class="home-main">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <van-tabbar class="xz-tabbar" v-model="active" :z-index="20">
            <van-tabbar-item to="/" icon="x xz-icon xz-icon-home">首页</van-tabbar-item>
            <van-tabbar-item to="cate" icon="x xz-icon xz-icon-cate">分类</van-tabbar-item>
            <van-tabbar-item to="/carOwnerCenter/shopList" class="shop-box">
                <img src="../assets/images/common/icon-tabbar.png" />
            </van-tabbar-item>
            <van-tabbar-item to="cart" :info="Shoplen" icon="x xz-icon xz-icon-cart" v-if="Shoplen>0">购物车</van-tabbar-item>
            <van-tabbar-item to="cart"  icon="x xz-icon xz-icon-cart" v-else>购物车</van-tabbar-item>
            <van-tabbar-item to="user" icon="x xz-icon xz-icon-user">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            active: 0,
            dlen:0
        };
    },
    methods: {
        ...mapActions("userMessage", ["getUser"]),
        ...mapActions("shopCar", ["updateShop"]),
        handleGetShopCar() {
    		let shopcar = window.localStorage.getItem("shopCar");
    		if(!shopcar && shopcar != 'undefined') {
    			return JSON.parse(shopcar);
    		}
    		return undefined;
    	}
    },
    components: {
        vanTabbar: Tabbar,
        vanTabbarItem: TabbarItem
    },
    computed: {
        ...mapState(["userMessage"]),
        ...mapGetters("shopCar", ["Shoplen"])
    },
    created() {
        let _u = sessionStorage.getItem("userData");
        this.getUser();
        
    },
    updated() {             
    },
    mounted() {},
    beforeRouteEnter(to, from, next) {
        next(vm => {
            switch (to.name) {
                case "home":
                    vm.active = 0;
                    break;
                case "cate":
                    vm.active = 1;
                    break;
                case "cart":
                    vm.active = 2;
                    break;
                case "user":
                    vm.active = 3;
                    break;
            }
        });
    },
    beforeRouteUpdate(to, from, next) {
        switch (to.name) {
            case "home":
                this.active = 0;
                break;
            case "cate":
                this.active = 1;
                break;
            case "cart":
                this.active = 2;
                break;
            case "user":
                this.active = 3;
                break;
        }
        next();
    }
};
</script>
<style lang="less" scoped>
.shop-box{
    width: 120px;
    height: 107px;
    img{
        width: 100%;
        transform: translate(0, -50px)
    }
}
</style>
