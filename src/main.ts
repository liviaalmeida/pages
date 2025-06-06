import 'intersection-observer';

import '@/assets/scss/reset.scss';
import '@/assets/scss/fonts.scss';
import './App.scss';

import { createApp } from 'vue';
import Mixpanel from 'mixpanel-browser';
import { ObserveVisibility } from 'vue-observe-visibility';

import App from './App.vue';
import i18n from './i18n.ts';
import router from './router.ts';

Mixpanel.init(import.meta.env.VITE_MP_KEY, {
  debug: import.meta.env.DEV ? true : false,
  ignore_dnt: import.meta.env.DEV ? true : false,
});

const app = createApp(App);
app.directive('visible', ObserveVisibility);
app.use(i18n);
app.use(router);

app.mount('#app');
