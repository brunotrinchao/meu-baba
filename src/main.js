import Vue from 'vue';
import App from './App.vue';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import Vuex from 'vuex';
import router from './router';
import store from './store';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import '@/assets/scss/theme.scss';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Importa os estilos do Vuetify 2

Vue.use(Vuetify); // Habilita o Vuetify

const vuetify = new Vuetify();

Vue.config.productionTip = false;
document.title = process.env.VUE_APP_APPLICATION_NAME;
// Vue.use(BootstrapVue);
// Vue.use(IconsPlugin);
Vue.use(Vuex);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
