import Vue from 'vue'
import store from "./store.js";
import socket from "./socket.js";

const Socket = new socket({
    url: 'ws://193.112.8.90:27001/',
    onOpen(res) {
        console.log('连接成功');
        this.nsend('{"lx":"0","type":"A666","ip":"121.131.141.151","time":"1596608759714"}');
    }
});

Vue.prototype.$Socket = Socket;    //连接成功挂在到原型上