<template>
    <div class="xz-model">
        <div class="xz-model-title">
            配送至
            <div class="xz-model-title-btn" @click="ok_click">确认</div>
        </div>
        <div class="xz-tabs xz-address-tabs">
            <div :class="['xz-tab',active=='1'?'active':'']" data-id="1" @click="tabs_click">省份</div>
            <div :class="['xz-tab',active=='2'?'active':'']" data-id="2" @click="tabs_click">城市</div>
            <div :class="['xz-tab',active=='3'?'active':'']" data-id="3" @click="tabs_click">区县</div>
            <div
                v-if="address_level=='4'"
                :class="['xz-tab',active=='4'?'active':'']"
                data-id="4"
                @click="tabs_click"
            >乡镇</div>
        </div>
        <div class="xz-model-content xz-address-model-content">
            <div class="model-address-list" v-if="active=='1'">
                <div
                    :class="['item',level1.id==item.id?'active':'']"
                    :data-id="item.id"
                    :data-level="2"
                    :data-name="item.name"
                    v-for="item in list1"
                    :key="item.id"
                    @click="item_click"
                >
                    {{item.name}}
                    <xz-icon type="dui"/>
                </div>
            </div>
            <div class="model-address-list" v-if="active=='2'">
                <div
                    :class="['item',level2.id==item.id?'active':'']"
                    :data-id="item.id"
                    :data-level="3"
                    :data-name="item.name"
                    v-for="item in list2"
                    :key="item.id"
                    @click="item_click"
                >
                    {{item.name}}
                    <xz-icon type="dui"/>
                </div>
            </div>
            <div class="model-address-list" v-if="active=='3'">
                <div
                    :class="['item',level3.id==item.id?'active':'']"
                    :data-id="item.id"
                    :data-level="4"
                    :data-name="item.name"
                    v-for="item in list3"
                    :key="item.id"
                    @click="item_click"
                >
                    {{item.name}}
                    <xz-icon type="dui"/>
                </div>
            </div>
            <div class="model-address-list" v-if="active=='4'">
                <div
                    :class="['item',level4.id==item.id?'active':'']"
                    :data-id="item.id"
                    :data-level="5"
                    :data-name="item.name"
                    v-for="item in list4"
                    :key="item.id"
                    @click="item_click"
                >
                    {{item.name}}
                    <xz-icon type="dui"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    props: {},
    data() {
        return {
            active: "1",
            address_level: 3,
            level1: { id: "", name: "" },
            level2: { id: "", name: "" },
            level3: { id: "", name: "" },
            level4: { id: "", name: "" },
            list1: [],
            list2: [],
            list3: [],
            list4: []
        };
    },
    created() {
        this.$nextTick(function() {
            this.address_level =
                this.websit.data.regional_classification == 1 ? 3 : 4;
            this.loadData("100000", 1);
        });
    },
    methods: {
        tabs_click(e) {
            let _this = this;
            let _active = e.target.dataset.id;
            if (_this.list2.length == 0 && _active !== "1") {
                _this.active = "1";
                _this.$toast({
                    message: "请选择省份",
                    position: "bottom"
                });
            } else if (
                _this.list3.length == 0 &&
                _active !== "1" &&
                _active !== "2"
            ) {
                _this.$toast({
                    message: "请选择城市",
                    position: "bottom"
                });
                _this.active = "2";
            } else if (
                _this.list4.length == 0 &&
                _active !== "1" &&
                _active !== "2" &&
                _active !== "3"
            ) {
                _this.$toast({
                    message: "请选择区县",
                    position: "bottom"
                });
                _this.active = "3";
            } else {
                _this.active = e.target.dataset.id;
            }
        },
        ok_click() {
            let _this = this;
            let result = { id: "", name: "" };
            if (
                _this.level4.id == "" &&
                _this.address_level == "4" &&
                _this.list4.length > 0
            ) {
                _this.$toast({
                    message: "请选择地区",
                    position: "bottom"
                });
            } else if (_this.level3.id == "") {
                _this.$toast({
                    message: "请选择地区",
                    position: "bottom"
                });
            }
            result.name =
                _this.level1.name +
                " " +
                _this.level2.name +
                " " +
                _this.level3.name;
            if (_this.address_level == "4" && _this.list4.length > 0) {
                result.id = _this.level4.id;
                result.name += " " + _this.level4.name;
            } else {
                result.id = _this.level3.id;
            }
            this.$emit("ok_cilck", result);
        },
        item_click(e) {
            let _this = this;
            let id = e.target.dataset.id;
            let level = e.target.dataset.level;
            let name = e.target.dataset.name;
            switch (level) {
                case "2":
                    _this.level1.id = id;
                    _this.level1.name = name;
                    _this.level2.id = _this.level3.id = _this.level4.id = "";
                    break;
                case "3":
                    _this.level2.id = id;
                    _this.level2.name = name;
                    _this.level3.id = _this.level4.id = "";
                    break;
                case "4":
                    _this.level3.id = id;
                    _this.level3.name = name;
                    _this.level4.id = "";
                    break;
                case "5":
                    _this.level4.id = id;
                    _this.level4.name = name;
                    break;
            }
            if (level <= _this.address_level) {
                _this.active = level;
                _this.loadData(id, level);
            }
            if (
                (_this.level4.id != "" && _this.address_level == "4") ||
                (_this.level3.id != "" && _this.address_level == "3")
            ) {
                _this.ok_click();
            }
        },
        loadData(id, level) {
            let _this = this;
            _this.post(
                {
                    method: "api.module.admin.district.get",
                    id: id
                },
                function(data) {
                    if (200 !== data.code) {
                        return;
                    }

                    let _result = data.result || [];

                    if (level == 1) {
                        _this.list1 = [];
                        _result.forEach(element => {
                            _this.list1.push(element);
                        });
                        _this.level2.id = "";
                        _this.level3.id = "";
                        _this.level4.id = "";
                        _this.list2 = [];
                        _this.list3 = [];
                        _this.list4 = [];
                    } else if (level == 2) {
                        _this.list2 = [];
                        _result.forEach(element => {
                            _this.list2.push(element);
                        });
                        _this.level3.id = "";
                        _this.level4.id = "";
                        _this.list3 = [];
                        _this.list4 = [];
                    } else if (level == 3) {
                        _this.list3 = [];
                        _result.forEach(element => {
                            _this.list3.push(element);
                        });
                        _this.level4.id = "";
                        _this.list4 = [];
                    } else if (level == 4) {
                        _this.list4 = [];
                        _result.forEach(element => {
                            _this.list4.push(element);
                        });
                    }
                    if (level == 4 && _result.length == 0) {
                        _this.active = '3';
                        _this.ok_click();
                    }
                }
            );
        }
    },
    computed: {
        ...mapState(["websit"])
    }
};
</script>