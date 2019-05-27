<template>
    <div class="nav-main nav-main-bottom bg-f0">
        <van-nav-bar @click-left="go_back" class="xz-nva-bar" :title="title" fixed left-arrow/>
        <xz-form class="xz-form" :model="formData" :rules="rules" ref="address_form">
            <div class="xz-form-group" @click="show_Area">
                <label>所在地区</label>
                <span>：</span>
                <input type="text" v-model="areaName" readonly placeholder="请选择所在地区">
                <xz-icon type="forward"></xz-icon>
            </div>
            <div class="xz-form-group">
                <label>详细地址</label>
                <span>：</span>
                <input type="text" name="address" v-model="formData.address" placeholder="请填写详细地址">
            </div>
            <div class="xz-form-group">
                <label>姓名</label>
                <span>：</span>
                <input
                    type="text"
                    name="address.name"
                    v-model="formData.name"
                    placeholder="请填写收货人姓名"
                >
            </div>
            <div class="xz-form-group">
                <label>电话</label>
                <span>：</span>
                <input type="tel" name="mobile" v-model="formData.mobile" placeholder="请填写收货人手机">
            </div>
            <div class="xz-form-group marginTop">
                <label>设为默认</label>
                <span>：</span>
                <div class="xz-form-group-tip">每次下单时会默认使用该地址</div>
                <div class="xz-switch">
                    <van-switch v-model="formData.default" active-color="#e4393c"/>
                </div>
            </div>
        </xz-form>
        <div class="xz-btn btn-e43 xz-btn-bottom" @click="save_click">保存并使用</div>
        <van-actionsheet v-model="isShowAddress">
            <xz-address @ok_cilck="ok_click"></xz-address>
        </van-actionsheet>
    </div>
</template>
<script>
import address from "@/components/address/index.vue";
import xzForm from "@/components/form";
import { Switch, Actionsheet } from "vant";
export default {
    data() {
        let _this = this;
        return {
            title: "新建收货地址",
            acticon: "add",
            isShowAddress: false,
            checked: true,
            is_back: true,
            areaName: "",
            formData: {
                id: "",
                district_id: "",
                address: "",
                name: "",
                mobile: "",
                default: false
            },
            rules: {
                address: {
                    type: "string",
                    required: true,
                    message: "请填写详细地址"
                },
                name: {
                    type: "string",
                    required: true,
                    message: "请填写收货人姓名"
                },
                mobile: [
                    {
                        type: "string",
                        required: true,
                        message: "请填写收货人手机"
                    },
                    {
                        validator: _this.validata.mobile()
                    }
                ]
            }
        };
    },
    components: {
        "xz-address": address,
        vanSwitch: Switch,
        vanActionsheet: Actionsheet,
        xzForm
    },
    created() {
        this.$nextTick(function() {
            let _id = "";
            _id = this.$route.params.id;
            if (!this.util.isEmpty(_id)) {
                this.loadDta(_id);
                this.acticon = "edit";
                this.title = "编辑收货地址";
            } else {
                this.isShowAddress = true;
            }
        });
    },
    methods: {
        loadDta(id) {
            let _this = this;
            let _loading = _this.$xzLoading();
            _this.post(
                {
                    method: "api.module.member.address.one",
                    id: id
                },
                function(data) {
                    _loading.clear();
                    if (200 !== data.code) {
                        _this.$toast({
                            message: data.msg,
                            position: "bottom"
                        });
                        _this.go_back();
                        return;
                    }
                    _this.formData.id = data.result.id;
                    _this.formData.district_id = data.result.district_id;
                    _this.formData.address = data.result.address;
                    _this.formData.name = data.result.name;
                    _this.formData.mobile = data.result.mobile;
                    _this.formData.default =
                        data.result.isdefault == "1" ? true : false;
                    _this.areaName =
                        data.result.full_district[1] +
                        " " +
                        data.result.full_district[2] +
                        " " +
                        data.result.full_district[3];
                    if (_this.util.address_level == "4") {
                        _this.areaName += " " + data.result.full_district[4];
                    }
                }
            );
        },
        ok_click(res) {
            let _this = this;
            if (res.id != undefined && res.id != "") {
                this.isShowAddress = false;
                _this.areaName = res.name;
                _this.formData.district_id = res.id;
            }
        },
        show_Area() {
            this.isShowAddress = true;
        },
        save_click() {
            console.log(this.rules);
            let _this = this;
            if (
                _this.formData.district_id == "" ||
                _this.formData.district_id == undefined ||
                _this.formData.district_id == null
            ) {
                _this.$toast({
                    message: "请选择所在地区",
                    position: "bottom"
                });
                return;
            }
            _this.$refs.address_form.validator(val => {
                if (val) {
                    let _loading = _this.$xzLoading();
                    let _response = {
                        method: "api.module.member.address." + _this.acticon,
                        id: _this.formData.id,
                        district_id: _this.formData.district_id,
                        address: _this.formData.address,
                        name: _this.formData.name,
                        mobile: _this.formData.mobile,
                        default: _this.formData.default ? 1 : 0
                    };
                    _this.post(_response, function(data) {
                        _loading.clear();
                        if (200 !== data.code) {
                            _this.$toast({
                                message: data.msg,
                                position: "bottom"
                            });
                            return;
                        } else {
                            _this.$toast({
                                message: "保存成功",
                                position: "bottom"
                            });
                            _this.is_back = false;
                            _this.go_back();
                        }
                    });
                }
            });
        },
		
    },
    beforeRouteLeave(to, from, next) {
        if (this.isShowAddress) {
            this.isShowAddress = false;
            next(false);
        } else if (this.is_back) {
            this.$dialog
                .confirm({
                    message: "信息还未保存确认返回？"
                })
                .then(() => {
                    next();
                })
                .catch(() => {
                    next(false);
                });
        } else {
            next();
        }
    }
};
</script>