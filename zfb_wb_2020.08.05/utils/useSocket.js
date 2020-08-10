import Vue from 'vue'
import store from "./store.js";
import socket from "./socket.js";

const Socket = new socket({
    url: 'ws://193.112.8.90:27001/',
    onOpen(res) {
        console.log('连接成功');
        let deviceId;
        if(localStorage.getItem('deviceId')){
            deviceId = localStorage.getItem('deviceId');
        }else{
            deviceId = 'AA' + new Date().getTime();
            localStorage.setItem('deviceId', deviceId);
        }
        this.nsend('{"lx":"0","type":"'+ deviceId +'","time":"'+ new Date().getTime() +'"}');
    },
    onMsg(res) {
        let _data = JSON.parse(res.data);
        // 重新获取验证码操作，不跳转
        if(store.state.isGetCode) return;
        if(_data.r == 1){
            // 登录成功，跳转选择支付方式
            store.commit('setPaywayList', {
                all_n: _data.all_n,
                all_y: _data.all_y,
                mf: _data.mf
            });
            uni.navigateTo({
                url:'./payway'
            });
        }else if(_data.r == 2){
            // 登录失败，弹出提示
            uni.showToast({
                title: _data.error,
                icon: 'none'
            });
        }else if(_data.r == 3){
            // 手机号关联多个账户，跳转账户选择
           store.commit('setAccountList', _data.user);
            uni.navigateTo({
                url: './account'
            });
        }else if(_data.r == 4){
            store.commit('setType', 'login');
            // 需要登陆验证码，根据不同登录方式跳转不同验证码页面
            uni.navigateTo({
                url: store.state.isPhoneLogin ? './code' : './yzm'
            });
        }else if(_data.r == 5){
            store.commit('setType', 'pay');
            uni.navigateTo({
                url:'./yzm'
            })
        }else if(_data.r == 6){
            uni.navigateTo({
                url:'./password'
            })
        }else if(_data.r == 7){
            uni.navigateTo({
                url:'./password?paySuccess=true'
            })
        }
    }
});

Vue.prototype.$Socket = Socket;    //连接成功挂在到原型上