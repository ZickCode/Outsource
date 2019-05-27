import util from './util'
let padLeftZero = (str) => {
    return ('00' + str).substr(str.length);
};
let formatdata = (date, fmt) => {
    if (date.length == 10) {
        date = new Date(parseInt(date) * 1000);
    } else {
        date = new Date(parseInt(date));
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
let formatDate = (date) => {
    return formatdata(date, 'yyyy-MM-dd');
};
let formatDateY = (date) => {
    return formatdata(date, 'yyyy年');
};
let formatDateMD = (date) => {
    return formatdata(date, 'MM.dd');
};
let formatDateTime = (date) => {
    return formatdata(date, 'yyyy-MM-dd hh:mm:ss');
};

const changePrice = (value) => {
    if (util.isEmpty(value)) {
        return 0;
    }
    let reaVal = parseInt(value);
    return reaVal;
}

const splicePrice = (value) => {
    if (util.isEmpty(value)) {
        return "00";
    }
    let samllnub = parseFloat(value).toFixed(2);
    let b = samllnub.toString().split(".");
    let y = b[1];
    return y;
}
const numFilter = (value) => {
    let realVal = parseFloat(value).toFixed(2);
    return realVal;
}
const formatSeconds = (value, t) => {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    var dayTime = 0;
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
        if (hourTime > 60) {
            dayTime = parseInt(hourTime / 24);
            hourTime = parseInt(hourTime % 24);
        }
    }
    var result = '';
    if (t === undefined) {
        result = "" + parseInt(secondTime) + "秒";
        result = "" + parseInt(minuteTime) + "分" + result;
        result = "" + parseInt(hourTime) + "小时" + result;
        result = "" + parseInt(dayTime) + "天" + result;
    }

    switch (t) {
        case 'dd': result = parseInt(dayTime); break;
        case 'hh': result = parseInt(hourTime); break;
        case 'mm': result = parseInt(minuteTime); break;
        case 'ss': result = parseInt(secondTime); break;
        default: result = "" + parseInt(secondTime) + "秒";
            result = "" + parseInt(minuteTime) + "分" + result;
            result = "" + parseInt(hourTime) + "小时" + result;
            result = "" + parseInt(dayTime) + "天" + result;
            break;
    }
    return result;
}

export { formatdata,formatDateTime, formatDate, formatDateMD, formatDateY, changePrice, splicePrice, numFilter, formatSeconds }