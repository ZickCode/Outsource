<template>
    <div>
        <dl class="norm-items" v-for="item, key in list.result" :class="{hl: highKeys[key]}">
            <dt>{{ key }}</dt>
            <dd>
                <span
                    v-for="value in item"
                    @click="handleActive(key, value)"
                    v-bind:class="{active: value.active, disabled: !value.active && value.disabled}"
                >
                    <em>{{ value.name }}</em>
                </span>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    name: "sku",
    data() {
        return {
            data: [],
            skuId: "",
            skuName: ["sku_id", "sku_info"], // 此处列出的名字不会被列出
            // 属性名称信息
            keys: [],
            // 数据集合{list.result list.items}
            list: {},
            // 分隔符
            spliter: ",", // 结果分隔符 如： 红,大,A
            result: {},
            message: "",
            highKeys: {}
        };
    },
    props: {
        skuDatas: {
            type: Array,
            default: []
        },
        defaultSelSkuId: {
            type: String,
            default: ""
        }
    },
    methods: {
        powerset(arr) {
            let ps = [[]];
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0, len = ps.length; j < len; j++) {
                    ps.push(ps[j].concat(arr[i]));
                }
            }

            return ps;
        },

        /**
         * 初始化数据
         * @return
         */
        initData() {
            this.result = {};
            this.keys = this.getAllKeys();
            for (let i = 0; i < this.keys.length; i++) {
                this.highKeys[this.keys[i]] = false;
            }

            this.list = this.combineAttr(this.data, this.keys);
            this.initSeleted(this.defaultSelSkuId);
            this.buildResult(this.list.items);
            this.updateStatus(this.getSelectedItem());
            this.showResult();
        },

        /**
         * 获取输入表单中的数据进行初始化
         * @return
         */
        getTextareaData() {
            let data = this.skuDatas;
            try {
                this.data = data;
                this.initData();
            } catch (e) {
                this.data = [];
            }
        },

        /**
         * 正常属性点击
         */
        handleNormalClick(key, value) {
            for (let i in this.list.result[key]) {
                if (i != value.name) {
                    this.list.result[key][i].active = false;
                } else {
                    this.list.result[key][i].active = true;
                }
            }
        },

        /**
         * 点击事件处理
         * @param  key   点击的行
         * @param  value 点击的按钮的数据
         */
        handleActive: function(key, value) {
            var _this = this;
            // 如果当前为选中择取消选中
            if (value.active == true) {
                _this.list.result[key][value.name].active = false;
                this.updateStatus(this.getSelectedItem());
                this.showResult();
                return false;
            }
            if (value.disabled === true) {
                for (var item in _this.list.result) {
                    for (var inItem in _this.list.result[item]) {
                        console.log(
                            "inItem====" +
                                JSON.stringify(_this.list.result[item][inItem])
                        );
                        if (_this.list.result[item][inItem].active) {
                            _this.list.result[item][inItem].active = false;
                        }
                    }
                }
            }
            this.handleNormalClick(key, value);
            this.updateStatus(this.getSelectedItem());
            this.showResult();
        },

        /**
         * 计算属性
         * @param  {[type]} data [description]
         * @param  {[type]} keys [description]
         * @return {[type]}      [description]
         */
        combineAttr(data, keys) {
            let allKeys = [];
            let result = {};

            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let values = [];

                for (let j = 0; j < keys.length; j++) {
                    let key = keys[j];
                    if (!result[key]) {
                        result[key] = {};
                    }

                    if (!result[key][item[key]]) {
                        result[key][item[key]] = {
                            name: item[key],
                            active: false,
                            disabled: true
                        };
                    }

                    values.push(item[key]);
                }

                allKeys.push({
                    path: values.join(this.spliter),
                    sku: item["sku_id"]
                });
            }
            return {
                result: result,
                items: allKeys
            };
        },

        /**
         * 获取所有属性
         * @return {[type]} [description]
         */
        getAllKeys() {
            let arrKeys = [];
            for (let attribute in this.data[0]) {
                if (!this.data[0].hasOwnProperty(attribute)) {
                    continue;
                }
                var isHasFlag = false;
                for (let otherInfo in this.skuName) {
                    if (attribute == this.skuName[otherInfo]) {
                        isHasFlag = true;
                        break;
                    }
                }

                if (!isHasFlag) {
                    arrKeys.push(attribute);
                }
            }
            console.log(arrKeys);

            return arrKeys;
        },

        getAttruites(arr) {
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i].path);
            }

            return result;
        },

        /**
         * 生成所有子集是否可选、库存状态 map
         */
        buildResult(items) {
            let allKeys = this.getAttruites(items);

            for (let i = 0; i < allKeys.length; i++) {
                let curr = allKeys[i];
                let sku = items[i].sku;
                let values = curr.split(this.spliter);
                let allSets = this.powerset(values);

                // 每个组合的子集
                for (let j = 0; j < allSets.length; j++) {
                    let set = allSets[j];
                    let key = set.join(this.spliter);

                    if (this.result[key]) {
                        this.result[key].skus.push(sku);
                    } else {
                        this.result[key] = {
                            skus: [sku]
                        };
                    }
                }
            }
        },

        /**
         * 获取选中的信息
         * @return Array
         */
        getSelectedItem() {
            let result = [];
            for (let attr in this.list.result) {
                let attributeName = "";
                for (let attribute in this.list.result[attr]) {
                    if (this.list.result[attr][attribute].active === true) {
                        attributeName = attribute;
                    }
                }

                result.push(attributeName);
            }
            return result;
        },

        /**
         * 更新所有属性状态
         */
        updateStatus(selected) {
            for (let i = 0; i < this.keys.length; i++) {
                let key = this.keys[i],
                    data = this.list.result[key],
                    hasActive = !!selected[i],
                    copy = selected.slice();

                for (let j in data) {
                    let item = data[j]["name"];
                    if (selected[i] == item) {
                        continue;
                    }
                    copy[i] = item;
                    let curr = this.trimSpliter(
                        copy.join(this.spliter),
                        this.spliter
                    );
                    this.list.result[key][j]["disabled"] = this.result[curr]
                        ? false
                        : true;
                }
            }
        },

        trimSpliter(str, spliter) {
            let reLeft = new RegExp("^" + spliter + "+", "g");
            let reRight = new RegExp(spliter + "+$", "g");
            let reSpliter = new RegExp(spliter + "+", "g");
            return str
                .replace(reLeft, "")
                .replace(reRight, "")
                .replace(reSpliter, spliter);
        },

        /**
         * 初始化选中
         * @param  mixed|Int|String skuId 需要选中的skuId
         * @return {[type]}       [description]
         */
        initSeleted(skuId) {
            var skuName = this.skuName[0];
            for (let i in this.data) {
                if (this.data[i][skuName] == skuId) {
                    for (let x in this.data[i]) {
                        var isHasFlag = false;
                        for (let otherInfo in this.skuName) {
                            if (x == this.skuName[otherInfo]) {
                                isHasFlag = true;
                                break;
                            }
                        }
                        if (!isHasFlag) {
                            this.list.result[x][this.data[i][x]].active = true;
                        }
                    }
                    break;
                }
            }
        },

        /**
         * 显示选中的信息
         * @return
         */
        showResult() {
            let result = this.getSelectedItem();
            let s = [];
            for (let i = 0; i < result.length; i++) {
                let item = result[i];
                if (!!item) {
                    s.push(item);
                }
            }
            if (s.length == this.keys.length) {
                let curr = this.result[s.join(this.spliter)];
                if (curr.skus.length <= 2) {
                    // curr 不选中的时候会把所有规格列出来，当选中某个规格时候会列出当前规格
                    s = s.concat(curr.skus[0]);
                    this.skuId = curr.skus[0];
                }
                this.message = s;
                let selSkuObj = [];
                for (let skuid in this.skuDatas) {
                    if (this.skuDatas[skuid].sku_id == this.skuId) {
                        selSkuObj.push(this.skuDatas[skuid]);
                    }
                }

                this.$emit("selCallback", selSkuObj[0]);
            }
        }
    },

    created() {
        this.$nextTick(function() {
            this.getTextareaData();
        });
    }
};
</script>
