import Vue from 'vue'
import App from './App'
import io from 'weapp.socket.io'

Vue.config.productionTip = false

Vue.prototype.serverUrl = 'http://192.168.1.103:2333'
Vue.prototype.socket = io('http://192.168.1.103:3000')

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
