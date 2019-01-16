import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 组件
import Alert from '../src/components/alert/alert.js'

// 关闭产品提示
Vue.config.productionTip = false

// 全局
Vue.prototype.$Alert = Alert

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
