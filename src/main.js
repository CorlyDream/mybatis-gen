import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueHighlightJS from 'vue-highlightjs'
import '@/assets/atom-one-dark.css'

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)
Vue.use(ElementUi)

new Vue({
  el: '#app',
  render: h => h(App)
})
