import Vue from 'vue'
import App from './App'

import store from './store'
// import utils from './utils/index.js'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
// Vue.prototype.utils = utils
// Vue.use(utils);
const app = new Vue(App)
app.$mount()
