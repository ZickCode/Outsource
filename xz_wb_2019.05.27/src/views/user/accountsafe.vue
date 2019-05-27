<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="账号安全" fixed left-arrow/>
        <div class="setaccount-box">
            <form class="g-form">
                <div class="safe">
                    <ul class="accoun-list">
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">手机号</span>
                            <a href="#/user/chphone" class="flex-one a-link cout-bg">
                                <p class="safe-text">{{mobile}}</p>
                            </a>
                        </li>
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">修改密码</span>
                            <router-link :to="{name:'chpassword',query:{'mobile':mobile}}" class="flex-one a-link cout-bg" tag="a">&nbsp;</router-link>
                            <!-- <a href="#/user/chpassword" class="flex-one a-link cout-bg">&nbsp;</a> -->
                        </li>
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">微信账号</span>
                            <a href="javascript:void(0)" class="flex-one a-link cout-bg">
                                <p class="safe-text">{{util.isEmpty(userMessage.user.wx_openid)?'未绑定':'已绑定'}}</p>
                            </a>
                        </li>
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">微博账号</span>
                            <a href="javascript:void(0)" class="flex-one a-link cout-bg">
                                <p class="safe-text">未绑定</p>
                            </a>
                        </li>
                        <li class="flex-wrap accoun-item">
                            <span class="flex-wd accttxt">QQ账号</span>
                            <a href="javascript:void(0)" class="flex-one a-link cout-bg">
                                <p class="safe-text">未绑定</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "accountdesign",
    data() {
        return {
            userMsg: {},
            mobile: ""
        };
    },
    computed: {
        ...mapState(["userMessage"])
    },
    methods: {},
    created() {
        if (this.userMessage.user.mobile == undefined) {
            let userHist = JSON.parse(
                window.sessionStorage.getItem("userData")
            );
            if (userHist != undefined) {
                this.userMsg = userHist;
                this.mobile = userHist.mobile;
            }
        } else {
            /**初始化用户信息 */
            this.userMsg = this.userMessage.user;
            this.mobile = this.userMessage.user.mobile;
        }
    },
    beforeMount() {}
};
</script>
