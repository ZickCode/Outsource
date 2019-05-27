import axios from 'axios'
const qs = require('qs')
import util from './util'
import store from '@/store/'
let $appid = util.appid;
let url = util.url + '/api.php'
let timestamp = new Date().getTime();
let token = '';
/**因为是vuex拿的token,如果调接口时vuex还没有token,会导致在create拿不到token,故设置拦截器拿 */
const $axios = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'token':token        
    }
});
//初始化默认header
$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
$axios.interceptors.request.use(
    config => {
        if (util.getLS('token', 7)) {
            token = util.getLS('token', 7);
        }
        if (token != null) {
            config.headers.token = token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
);
const api = {
    async get(url, data) {
        try {
            let res = await $axios.get(url, { params: data })
            res = res.data
            return new Promise((resolve) => {
                if (res.code === 200) {
                    resolve(res)
                } else {
                    resolve(res)
                }
            })
        } catch (err) {
            window.vm.$xzLoading().clear();
            window.vm.$toast({
                message: "网络错误",
                position: "bottom"
            });
            window.console.log(err)
        }
    },
    async post(data) {
        //console.log(store.state.userMessage.user);
        try {
            data.appid = $appid
            data.timestamp = timestamp
            if (data.hasOwnProperty('token')) {
                //$axios.headers.token = data.token
            }
            let res = await $axios.post(url, qs.stringify(data))
            res = res.data
            return new Promise((resolve, rejects) => {
                if (res.code == '200') {
                    resolve(res)
                    //console.log(res)                                               
                } else {
                    window.vm.$toast({
                        duration: 3000,
                        message: res.msg,
                        position: "bottom"
                    });
                    resolve(res);
                    //rejects(res)                   
                }
            })
        } catch (err) {
            window.vm.$xzLoading().clear();
            window.vm.$toast({
                message: "网络错误",
                position: "bottom"
            });
            window.console.log(err)
        }
    }
}

export { api }