<template>
    <div class="nav-main">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" title="重置密码" fixed left-arrow/>
        <xz-form class="xz-lr" :model="formData" :rules="rules" ref="repassword_form">
            <div class="xz-lr-title">更换密码</div>
            <div class="xz-z-tip">请输入新密码</div>
            <div class="xz-lr-box">
                <input class="box-input" 
                v-model="formData.password" 
                type="password" 
                placeholder="请输入密码">
                <!-- <span class="xz-message">{{message}}</span> -->
            </div>
            <div class="xz-lr-box">
                <input
                    class="box-input"
                    v-model="formData.repassword"
                    type="password"
                    placeholder="请再次输入密码"
                >
                <!-- <span class="xz-message">{{message}}</span> -->
            </div>
            <div class="xz-lr-box xz-lr-btn">
                <span class="xz-message">{{message}}</span>
                <button type="button" class="xz-btn btn-e43 xz-radius" :disabled="checkPassword" @click="nextChangePass">下一步</button>
            </div>
        </xz-form>
    </div>
</template>
<script>
import { mapActions, mapState,mapGetters } from "vuex";
import xzForm from "@/components/form";
export default {
    data() {
        let _this = this;
        return {
            checkPassword:false,
            password:'',
            repassword:'',
            formData: {
                password: "",
                repassword: "",
                mobile:''
            },
            checkFlag:false,
            rules: {
                password: [
                    {
                        type: "string",
                        required: true,
                        message: "请输入密码"
                    }
                    // {
                    //     validator: _this.validata.mobile()
                    // }
                ],               
            },
            message: ""
        };
    },
    components: {
        xzForm
    },
    watch: {
        formData: {
            handler(newVal, oldVal) {
                let password = newVal.password,
                    repassword = newVal.repassword;
                if (password != repassword) {
                    this.message = "您填写的密码前后不一致"
                }else{
                    this.message = ''
                    this.checkFlag = true
                }
            },
            deep: true
        },        
        repassword:{
            handler(newVal, oldVal) {
                if (this.password!= newVal) {
                    this.message = "您填写的密码前后不一致"
                }else{
                    this.message = ''
                    this.checkFlag = true
                }
            },           
        },
        password:{
            handler(newVal, oldVal) {               
                if (newVal != this.repassword) {
                    this.message = "您填写的密码前后不一致"
                }else{
                    this.message = ''
                    this.checkFlag = true
                }
            },            
        },
        getWeSit: function(newValue) {
            this.loadData();
        }
    },
    methods: {    
        nextChangePass (){
            let _this = this;
            _this.$refs.repassword_form.validator(val => {
                if (val && this.checkFlag) {                  
                    this.$router.push({name:'chppasswordCode',params:this.formData})
                }
            });           
        },
        loadData (){
            let _pass_complex = this.websit.data.reg_pass_complex;
            let _length = this.websit.data.reg_pass_lenght;
            let _rep = "";
            let _repMsg = [];
            if (!this.util.isEmpty(_pass_complex)) {
                _pass_complex.forEach(item => {
                    switch (item) {
                        case "1":
                            _rep += "(?=.*\\d)";
                            _repMsg.push("数字");
                            break;
                        case "2":
                            _rep += "(?=.*[a-z])";
                            _repMsg.push("小写字母");
                            break;
                        case "3":
                            _rep += "(?=.*[A-Z])";
                            _repMsg.push("大写字母");
                            break;
                        case "4":
                            _rep += "(?=.*[^a-zA-z0-9]+)";
                            _repMsg.push("特殊字符");
                            break;
                    }
                });
                let _rule = this.rules;
                _rule.password = [
                    {
                        type: "string",
                        required: true,
                        min: Number(_length),
                        message: "请输入" + _length + "位数以上密码"
                    },
                    {
                        type: "string",
                        pattern: new RegExp(_rep, "g"),
                        message: "请输入包含" + _repMsg.join(",") + "的密码"
                    }
                ];
                this.rules = _rule;
            }
            //console.log(this.rules);
        }   
    },
    computed:{
        ...mapState(["websit"]),
        ...mapGetters("websit", ["getWeSit"])
    },
    created (){
        this.loadData();
    },
    mounted (){        
        this.formData.mobile = this.$route.query.mobile;
    }
};
</script>
<style scoped>
/* .xz-lr-box{
    margin-top: 5px;
    margin-bottom: 10px;
} */
.xz-message {
    display: block;
    height: 25px;
    line-height: 25px;
    font-size: 25px;
    margin: 5% 20% 10% 20%;
    text-align: center;
    color: #e4393c;
}
</style>
