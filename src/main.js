import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import store from './store';

import { createRouter } from './router';

import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from '@fortawesome/vue-fontawesome';

import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faSlash } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrownOpen } from '@fortawesome/free-solid-svg-icons';

library.add(
  faFilter,
  faArrowUpWideShort,
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faCircleExclamation,
  faPersonChalkboard,
  faCalendar,
  faUsers,
  faSlash,
  faBolt,
  faCircleInfo,
  faHouse,
  faFaceFrownOpen
);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('font-awesome-layers', FontAwesomeLayers)
  .use(createRouter(App))
  .use(FloatingVue)
  .use(store)
  .mount('#app');
