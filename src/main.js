import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'

Vue.use(ElementUi)

new Vue({
  el: '#app',
  render: h => h(App)
})
