import Vue from 'vue'
import axios from 'axios'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// import 'flex.css'

import App from './App'
import router from './router'
import store from './store'

// import './components'
import './assets/style/public.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
