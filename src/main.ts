import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false
Vue.use(BootstrapVue);

library.add(faCog);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
