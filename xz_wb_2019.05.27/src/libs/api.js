//自定义POST GET BY Leo 2018-10-25 10:34:09
import axios from 'axios';
import util from './util'
import store from '@/store/'
import { Toast } from 'vant';

let $appid = util.appid;
const ajax = axios.create({
    baseURL: util.url + '/api.php', // url前缀
    timeout: 10000 // 超时毫秒数
});
//添加请求拦截器
ajax.interceptors.request.use(function (config) {
    //在发送请求之前做某事
    return config;
}, function (error) {
    //请求错误时做些事
    return Promise.reject(error);
});

//添加响应拦截器
ajax.interceptors.response.use(function (response) {
    //对响应数据做些事
    store.commit('websit/upTimestamp', response.headers['config-timestamp']);
    if (response.data.code == -500) {
        sessionStorage.clear();
        location.replace('#/login');
    }
    return response;
}, function (error) {
    //请求错误时做些事
    return Promise.reject(error);
});
/**
 * @DateTime 2018-10-24
 * @param    {[type]}   params   [description]
 * @param    {Function} callback [description] 成功回调
 * @param    {Function} errCallback [description] 失败回调
 * @param    {Function} doneCallback [description] 不管成功或失败都回调
 * @return   {[type]}            [description]
 */
const post = function (params, callback, doneCallback, errCallback, onUpload) {
    ajax(getConfig('post', params, onUpload)).then(function (res) {
        callback && callback(res.data);
        doneCallback && doneCallback(res.data);
        return;
    }).catch(function (error) {
        doneCallback && doneCallback(error);
        errback(error);
        errCallback && errCallback(error);

    });
}

const get = function (params, callback, doneCallback, errCallback, onUpload) {
    ajax(getConfig('get', params, onUpload)).then(function (res) {
        callback && res.hasOwnProperty('data') && callback(res.data);
        doneCallback && doneCallback(res.data);
        return;
    }).catch(function (error) {
        doneCallback && doneCallback(error);
        errback(error);
        errCallback && errCallback(error);
    });
}

// 参数转换
const param2String = function (data) {
    if (typeof data === 'string') {
        return data;
    }
    let ret = '';
    for (let it in data) {
        let val = data[it];
        if (typeof val === 'object' && //
            (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
            val = JSON.stringify(val);
        }
        ret += it + '=' + encodeURIComponent(val) + '&';
    }
    if (ret.length > 0) {
        ret = ret.substring(0, ret.length - 1);
    }
    return ret;
};

// 错误回调函数
const errback = function (error) {
    window.vm.$xzLoading().clear();
    Toast({
        message: "网络错误",
        position: "bottom"
    });
};

/**
 * @param method get,post,put,delete
 * @param params 参数
 * @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
 */
const getConfig = function (method, params, onUpload) {
    var timestamp = new Date().getTime();
    let config_ = {
        method,
        headers: {},
        onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
            if (progressEvent.lengthComputable) {
                onUpload && onUpload(progressEvent);
            }
        },
    };
    var token = util.getLS('token',7);
    if (params instanceof FormData) { // formData 对象提交，用于二进制表单图片提交
        params.set('appid', $appid);
        params.set('timestamp', timestamp);
        config_.headers = {
            token,
            'Content-Type': 'multipart/form-data'
        };
        config_.processData = false;
        config_.contentType = false;

    } else {
        //插入appid
        config_.method = method;
        config_.headers = {
            token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        params.timestamp = timestamp;
        params.appid = $appid;
        config_.responseType = 'text';
        config_.transformRequest = [function (data) {
            return param2String(data);
        }];
    }
    // 设置参数
    if (method in {
        'get': true,
        'delete': true
    }) {
        config_.params = params;
    } else if (method in {
        'post': true,
        'put': true
    }) {
        config_.data = params;
    }
    return config_;
};

// 统一方法输出口

export {
    post,
    get
};