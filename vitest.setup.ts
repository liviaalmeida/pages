import { config } from '@vue/test-utils';

import 'intersection-observer';
import { ObserveVisibility }  from 'vue-observe-visibility';

import i18n from '@/i18n.ts';
import router from '@/router.ts';

config.global.directives = {
  'visible': ObserveVisibility,
};

config.global.plugins = [
  ...config.global.plugins,
  i18n,
  router,
];
