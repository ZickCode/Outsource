<template>
    <div class="nav-main main-fff">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="更换手机" fixed left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="login_form">
            <div class="xz-lr-title">开始更换手机</div>
            <div class="xz-z-tip">请输入您希望绑定的手机号</div>
            <div class="xz-lr-box">
                <input class="box-input" v-model="formData.mobile" type="tel" placeholder="请输入手机号码">
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <!-- <router-link 
                    tag="button"
                    class="xz-btn btn-e43 xz-radius"
                    to="/user/chpcode">
                    下一步
                </router-link> -->
                <button type="button" class="xz-btn btn-e43 xz-radius" @click="changeMobile">下一步</button>
            </div>
        </xz-form>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import xzForm from "@/components/form";
export default {
    data() {
        let _this = this;
        return {
            formData: {
                mobile: ""
            },
            rules: {
                mobile: [
                    {
                        type: "string",
                        required: true,
                        message: "请输入手机号"
                    },
                    {
                        validator: _this.validata.mobile()
                    }
                ]
            }
        };
    },
    components: {
        xzForm
    },
    methods: {
        changeMobile(){
            this.$refs.login_form.validator(val=>{
                if(val){
                    this.$router.push('/user/chpcode/' + this.formData.mobile);
                }else{
                    
                }
            });
        }
    }
};
</script>