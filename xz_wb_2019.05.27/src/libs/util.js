const util = {
    url: baseUrl,
    mobileUrl: mobileUrl,
    sourceUrl: sourceUrl,
    appid: appID,
    defaultImg: "this.src='" + require('../assets/images/temp__/ph_1.jpg') + "'",//默认图片
    defaultAvatar: "this.src='" + require('../assets/images/user-pic.png') + "'",//默认头像
    addPicture: "this.src='" + require('../assets/images/Add.png') + "'",//默认上传图片
    /**A
     * 将url中的html字符转义， 仅转义  ', ", <, > 四个字符
     * @param  { String } str 需要转义的字符串
     * @param  { RegExp } reg 自定义的正则
     * @return { String }     转义后的字符串
     */
    unhtmlForUrl: function (str, reg) {
        return str ? str.replace(reg || /[<">'&]/g, function (a) {
            return {
                '<': '&lt;',
                '&': '&amp;',
                '"': '&quot;',
                '>': '&gt;',
                "'": '&#39;',
            }
        }) : '';
    },
    /**
     * 将str中的转义字符还原成html字符
     * @see UE.utils.unhtml(String);
     * @method html
     * @param { String } str 需要逆转义的字符串
     * @return { String } 逆转义后的字符串
     * @example
     * ```javascript
     *
     * var str = '&lt;body&gt;&amp;&lt;/body&gt;';
     *
     * //output: <body>&</body>
     * console.log( util.html( str ) );
     *
     * ```
     */
    html: function (str) {
        return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
            return {
                '&lt;': '<',
                '&amp;': '&',
                '&quot;': '"',
                '&gt;': '>',
                '&#39;': "'",
                '&nbsp;': ' '
            }[m]
        }) : '';
    },
    /**
     * 验证是否为空
     * @param {*} 字符串 
     */
    isEmpty(obj) {
        if (typeof obj == "undefined" || obj == null || obj == "") {
            return true;
        } else {
            return false;
        }
    },
    reHtml(html) {
        if (this.isEmpty(html)) {
            return "";
        }
        return html.replace(/src=[\'\"][\.]/g, "src=\"" + util.sourceUrl);
    },
    toSku_spec(object) {
        let skuspec = "";
        for (let item in object) {
            if (item != 'sku_id' && item != "sku_info") {
                skuspec += item + ":" + object[item] + "&nbsp;";
            }
        }
        return skuspec;
    },
    reImg(url) {
        if (this.isEmpty(url)) {
            return "";
        }
        else if (!/(http|https):\/\/([\w.]+\/?)\S*/.test(url)) {
            return util.sourceUrl + url;
        } else {
            return url;
        }
    },
    setLS(key, value) {
        var curTime = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
    },
    getLS(key, day) {
        var data = localStorage.getItem(key);
        if (this.isEmpty(data)) {
            return null;
        }
        var dataObj = JSON.parse(data);
        if (new Date().getTime() - dataObj.time > (day * 24 * 60 * 60 * 1000)) {
            localStorage.removeItem(key);
            return null;
        } else {
            var curTime = new Date().getTime();
            localStorage.setItem(key, JSON.stringify({ data: dataObj.data, time: curTime }));
            return dataObj.data;
        }

    },
    pp(_data){
        let _d = JSON.stringify(_data);
        return JSON.parse(_d);
    }

}
export default util;