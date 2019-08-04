import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router/routers'
import permission from './components/permission'
import store from './store'

import '@/icons' // icon
import './router/index' // permission control
import i18n from './lang/lang'

Vue.use(mavonEditor)
Vue.use(permission)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
require('babel-polyfill')

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
