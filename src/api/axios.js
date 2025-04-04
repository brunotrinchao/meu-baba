import axios from 'axios';
import urls from './urls';
import Vue from 'vue';
import Swal from 'sweetalert2';

// import store from '@/store/auth';

const api = axios.create({
  baseURL: urls.BASE_API,
  withCredentials: false
});

let configAlert = {
  icon: 'error',
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false
};
// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    // Adiciona ou atualiza os headers
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    };

    Vue.prototype.$eventBus.$emit('loading:start');

    return config;
  },
  (error) => {
    Vue.prototype.$eventBus.$emit('loading:stop');
    console.error('Erro ao enviar a requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    Vue.prototype.$eventBus.$emit('loading:stop');
    const message = response?.data.error;
    let title = 'Erro';

    if (response.status >= 200 && response.status <= 299) {
      title = 'Sucesso';
      configAlert.icon = 'success';
      configAlert.showConfirmButton = false;
    }
    if (message) {
      if (typeof message === 'object') {
        Object.keys(message).forEach((key) => {
          Swal.fire({
            title: 'Erro',
            text: message[key][0],
            ...configAlert
          });
        });
      } else {
        Swal.fire({
          title,
          text: message,
          ...configAlert
        });
      }
    }

    return response;
  },
  (error) => {
    Vue.prototype.$eventBus.$emit('loading:stop');
    if (error.response?.status === 401) {
      Swal.fire({
        title: 'Sessão Expirada',
        text: 'Você será redirecionado para o login.',
        ...configAlert
      });
    } else {
      const msg = error.response?.data?.error || error.message;
      configAlert.toast = false;

      configAlert.position = 'center';
      Swal.fire({
        title: 'Erro na Requisição',
        text: msg,
        ...configAlert
      });
    }
    return Promise.reject(error);
  }
);

function getToken() {
  return process.env.VUE_APP_JWT_SECRET;
  // return sessionStorage.getItem(process.env.VUE_APP_SESSION_KEY);
}

export default api;
