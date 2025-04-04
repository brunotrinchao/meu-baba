let BASE = process.env.VUE_APP_API_URL;
let BASE_API = `${BASE}/${process.env.VUE_APP_PREFIX_API}`;
let BASE_IMG = `${BASE}`;
let SERVER = process.env.NODE_ENV === 'development' ? 'D' : 'P';
let ENVIRONMENT = process.env.VUE_APP_ENVIRONMENT || 'production';

export default {
  BASE_API: BASE_API,
  BASE_IMG: BASE_IMG,
  SERVER: SERVER,
  ENVIRONMENT: ENVIRONMENT
};
