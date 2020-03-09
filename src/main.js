import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'flex.css'
import VueClipboard from 'vue-clipboard2'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './component'
import Notify from './plugin/vue.notify'
import './assets/style/public.scss'
import 'fabric'

Vue.use(Antd)
Vue.use(VueClipboard)
Vue.use(Notify)
Vue.use(VueVirtualScroller)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
