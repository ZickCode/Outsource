import vue from 'vue'
import loadingComponent from './loading.vue'

let singleton = true;
let queue = [];
// 返回一个 扩展实例构造器
const LoadingConstructor = vue.extend(loadingComponent)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function createInstance() {
    if (!queue.length || !singleton) {
        // 实例化一个 loading.vue
        const loadingDom = new LoadingConstructor({
            el: document.createElement('div')
        })
        // 把 实例化的 loading.vue 添加到 body 里
        document.body.appendChild(loadingDom.$el)
        queue.push(loadingDom);
    }
    return queue[queue.length - 1];
}
function showLoading(options={}){
    const loadingDom = createInstance();
    loadingDom.message =typeof options === 'string' ? loadingDom : loadingDom.message;
    loadingDom.isShow=true;
    return loadingDom;
}

showLoading.clear = all => {
    if (queue.length) {
      if (all) {
        queue.forEach(toast => {
          toast.clear();
        });
        queue = [];
      } else if (singleton) {
        queue[0].clear();
      } else {
        queue.shift().clear();
      }
    }
  };
// 注册为全局组件的函数
function xzLoading() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$toast()
    vue.prototype.$xzLoading = showLoading
}

export default xzLoading