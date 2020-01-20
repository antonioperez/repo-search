import moment from "moment";
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('dateFormat', function(date) {
  return moment(date).format("MMMM Do YYYY");
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
