import Vue from 'vue';
import App from './App.vue';
import VueGtag from 'vue-gtag';
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

import VueApexCharts from 'vue-apexcharts';
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

Vue.prototype.$eventBus = new Vue();

Vue.use(VueGtag, {
  config: {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_PROPERTY_ID
  }
});

// Importa o DialogDetails
import DialogDetails from '@/components/DialogDetails';

Vue.component('DialogDetails', DialogDetails);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
