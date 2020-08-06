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
    }
});

Vue.prototype.$Socket = Socket;    //连接成功挂在到原型上