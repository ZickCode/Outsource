import Vue from 'vue'
import Router from 'vue-router'
import util from '@/libs/util'
import store from '@/store/'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/views/home.vue'),
            children: [
                { path: '/', name: "home", component: () => import('@/views/home/index.vue'), meta: { title: '首页' } },
                { path: 'user', name: "user", component: () => import('@/views/user/index.vue'), meta: { title: '会员中心' } },
                { path: 'cate', name: "cate", component: () => import('@/views/cate/index.vue'), meta: { title: '分类列表' } },
                { path: 'cart', name: "cart", component: () => import('@/views/car/shopcar.vue'), meta: { title: '购物车' } },//购物车
            ]
        },
        {
            path: '/register',
            component: () => import('@/views/other.vue'),
            children: [
                { path: 'index', component: () => import('@/views/register/index.vue'), meta: { title: '注册' } },
                { path: 'code', component: () => import('@/views/register/code.vue'), meta: { title: '注册验证码' } },
                { path: 'pwd', component: () => import('@/views/register/pwd.vue'), meta: { title: '设置密码' } },
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/other.vue'),
            children: [
                { path: '', component: () => import('@/views/login/index.vue'), meta: { title: '登录' } },
                { path: 'clogin', component: () => import('@/views/login/clogin.vue'), meta: { title: '验证码登录' } },
                { path: 'code', name: "logingCode", component: () => import('@/views/login/code.vue'), meta: { title: '验证码登录' } },
            ]
        },
        {
            path: '/retrieve',
            component: () => import('@/views/other.vue'),
            children: [
                { path: '', component: () => import('@/views/retrieve/index.vue'), meta: { title: '找回密码' } },
                { path: 'code', name: 'retrieveCode', component: () => import('@/views/retrieve/code.vue'), meta: { title: '找回密码' } },
                { path: 'pwd', name: "retrievePwd", component: () => import('@/views/retrieve/pwd.vue'), meta: { title: '找回密码' } },
            ]
        },
        {
            path: '/goods',
            component: () => import('@/views/other.vue'),
            children: [
                { path: 'search', component: () => import('@/views/goods/search.vue'), meta: { title: '搜索' } },
                { path: 'list/:id?', component: () => import('@/views/goods/list.vue'), meta: { title: '商品列表' } },
                { path: 'detail/:id', component: () => import('@/views/goods/detail.vue'), meta: { title: '商品详情' } },
                { path: 'groupdetail', component: () => import('@/views/goods/groupdetail.vue'), meta: { title: '拼团详情' } },
                { path: 'advisory', name: 'goodsadvisory', component: () => import('@/views/goods/buyadvisory.vue'), meta: { title: '购买咨询' } },
                { path: 'provadvice', name: 'goodsprovadvice', component: () => import('@/views/goods/provadvice.vue'), meta: { title: '发表咨询', isLogin: true } },
                { path: 'allcomment/:id', component: () => import('@/views/goods/allcomment.vue'), meta: { title: '全部评论' } },
            ]
        },
        {
            path: '/car',
            component: () => import('@/views/other.vue'),
            children: [
                { path: 'redemption', component: () => import('@/views/car/redemption.vue'), meta: { title: '超值换购' } },
                { path: 'reduction',name:'reduction', component: () => import('@/views/car/full_reduction.vue'), meta: { title: '超值换购', isLogin: true } },
            ]
        },
        {
            path: '/order',
            component: () => import('@/views/other.vue'),
            children: [
                { path: 'confirm', name: "orderconfirm", component: () => import('@/views/order/confirmorders.vue'), meta: { title: '确认订单', isLogin: true } },//确认订单
                { path: 'detail/:sn', component: () => import('@/views/order/details.vue'), meta: { title: '订单详情', isLogin: true } },
                { path: 'list/:id?', component: () => import('@/views/order/myorder.vue'), meta: { title: '我的订单', isLogin: true } },
                { path: 'common', component: () => import('@/views/order/evaluategoods.vue'), meta: { title: '订单评价列表', isLogin: true } },
                { path: 'Logistics/:id', component: () => import('@/views/order/Logistics.vue'), meta: { title: '查看物流', isLogin: true } },
                { path: 'pay/:sn', name: "pay", component: () => import('@/views/order/pay.vue'), meta: { title: '订单支付', isLogin: true } },
                { path: 'payend/:sn', name: "payend", component: () => import('@/views/order/payend.vue'), meta: { title: '下单成功', isLogin: true } },
                { path: 'comment', name: "ordercommon", component: () => import('@/views/order/comments.vue'), meta: { title: '评论商品', isLogin: true } },
                { path: 'coupon', name: "ordercoupon", component: () => import('@/views/order/coupon.vue'), meta: { title: '选择优惠券', isLogin: true } },
                { path: 'afsale/detail', name: "afsaledetail", component: () => import('@/views/order/afsale/success.vue'), meta: { title: '售后申请成功', isLogin: true } },
                { path: 'afsale/service', component: () => import('@/views/order/afsale/service.vue'), meta: { title: '售后服务', isLogin: true } },
                { path: 'afsale/apply/:id?', name: "orderafsaleapply", component: () => import('@/views/order/afsale/apply.vue'), meta: { title: '售后服务', isLogin: true } },
                { path: 'afsale/select', name: "orderafsaleselect", component: () => import('@/views/order/afsale/select.vue'), meta: { title: '选择售后商品', isLogin: true } },
                { path: 'afsale/returngoods/:id', name: "returngoods", component: () => import('@/views/order/afsale/returngoods.vue'), meta: { title: '退款退货', isLogin: true } },
                { path: 'afsale/returnlogistics/:id', name: "returnlogistics", component: () => import('@/views/order/afsale/returnlogistics.vue'), meta: { title: '邮寄信息', isLogin: true } },
                { path: 'invoicelist', name: 'invoicelist', component: () => import('@/views/order/invoic_list.vue'), meta: { title: '发票抬头', isLogin: true } },
                { path: 'invoiceinfor/:id', name: 'invoiceinfor', component: () => import('@/views/order/invoiceinfor.vue'), meta: { title: '发票信息', isLogin: true } },
                { path: 'afsale/salesuccess/:id', component: () => import('@/views/order/afsale/salesuccess.vue'), meta: { title: '售后服务', isLogin: true } },
            ]
        },
        {
            path: '/user',
            component: () => import('@/views/other.vue'),
            children: [
                { path: 'address', component: () => import('@/views/user/address/list.vue'), meta: { title: '我的收货地址', isLogin: true } },
                { path: 'address/edit/:id?', component: () => import('@/views/user/address/edit.vue'), meta: { title: '添加收货地址', isLogin: true } },
                { path: 'collect', component: () => import('@/views/user/collect.vue'), meta: { title: '我的收藏', isLogin: true } },
                { path: 'myconsult', component: () => import('@/views/user/myconsult.vue'), meta: { title: '我的咨询', isLogin: true } },
                { path: 'brecharged', component: () => import('@/views/user/brecharged.vue'), name: 'brecharged', meta: { title: '余额充值', isLogin: true } },
                { path: 'brecharged/success/:id', component: () => import('@/views/user/recharge_success.vue'), meta: { title: '余额充值', isLogin: true } },
                { path: 'balancewallet', component: () => import('@/views/user/balancewallet.vue'), meta: { title: '余额钱包', isLogin: true } },
                { path: 'coupon', component: () => import('@/views/user/coupon.vue'), meta: { title: '优惠券', isLogin: true } },
                { path: 'footprint', component: () => import('@/views/user/footprint.vue'), meta: { title: '我的足迹' } },
                { path: 'accountdesign', component: () => import('@/views/user/accountdesign.vue'), meta: { title: '账号设置', isLogin: true } },
                { path: 'accountsafe', component: () => import('@/views/user/accountsafe.vue'), meta: { title: '账号安全', isLogin: true } },
                { path: 'chphone', component: () => import('@/views/user/chphone.vue'), meta: { title: '更换手机', isLogin: true } },
                { path: 'chpcode/:id', component: () => import('@/views/user/chpcode.vue'), meta: { title: '更换手机', isLogin: true } },
                { path: 'chpassword/:id', name: 'chpassword', component: () => import('@/views/user/chpassword.vue'), meta: { title: '修改密码', isLogin: true } },
                { path: 'chppasswordCode/:id', name: 'chppasswordCode', component: () => import('@/views/user/chppasswordCode.vue'), meta: { title: '修改密码', isLogin: true } },
            ]
        },
        {
            path: '/diy',
            component: () => import('@/views/diy/index.vue'),
            meta: { title: '自定义页面' }
        },
        {
            path: '/wechat',
            component: () => import('@/views/other.vue'),
            children: [
                { path: 'bind', component: () => import('@/views/WeChat_login/bind.vue'), meta: { title: '微信绑定' } },
                { path: 'code', component: () => import('@/views/WeChat_login/code.vue'), name: 'wechatCode', meta: { title: '微信绑定' } },
            ]
        },
        { path: '/error/404', component: () => import('@/views/error/404.vue'), meta: { title: '页面不存在' } },
        {
            path: '*', redirect: '/error/404'
        },
        {
            path: '/carOwnerCenter',
            component: () => import('@/views/other.vue'),
            children: [
                { path: 'index', component: () => import('@/views/carOwnerCenter/index.vue'), meta: { title: '车主中心' } },
                { path: 'chooseArea', component: () => import('@/views/carOwnerCenter/chooseArea.vue'), name: 'chooseArea', meta: { title: '选择地区' } },
                { path: 'vinQuery', component: () => import('@/views/carOwnerCenter/vinQuery.vue'), name: 'vinQuery', meta: { title: 'VIN码查询' } },
                { path: 'oilPrice', component: () => import('@/views/carOwnerCenter/oilPrice.vue'), name: 'oilPrice', meta: { title: '全国油价' } },
                { path: 'myGarage', component: () => import('@/views/carOwnerCenter/myGarage.vue'), name: 'myGarage', meta: { title: '我的车库' } },
                { path: 'chooseCarType', component: () => import('@/views/carOwnerCenter/chooseCarType.vue'), name: 'chooseCarType', meta: { title: '自助选车' } },
            ]
        }
    ]
})
let _loading = null;
router.beforeEach((to, from, next) => {
    if (window.location.href != window.parent.location.href && from.name) {
        let _parent = window.parent.location;
        window.parent.location.href = _parent.origin + '/#' + to.path;
        next(false);
    }
    _loading = window.vm.$xzLoading();
    if (to.meta.isLogin && util.isEmpty(util.getLS('token', 7))) {
        if (store.state.websit.isWeix) {
            store.commit('userMessage/updataWechatLogin', true);
        } else {
            router.push('/login')
        }
        // router.push('/login')
        next(false);
        _loading.clear();
    } else {
        /* 路由发生变化修改页面meta */
        if (to.meta.content) {
            let head = document.getElementsByTagName('head');
            let meta = document.createElement('meta');
            meta.content = to.meta.content;
            head[0].appendChild(meta)
        }
        /* 路由发生变化修改页面title */
        if (to.meta.title) {
            // let _i = document.title.indexOf('-');
            // if (_i > -1) {
            //     document.title = document.title.substring(0, _i + 1) + to.meta.title;
            // } else {
            //     document.title = to.meta.title;
            // }
        }
        next();
    }
});

router.afterEach(route => {
    _loading.clear();
});
export default router;
