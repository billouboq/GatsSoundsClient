import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import VueYouTubeEmbed from 'vue-youtube-embed'
import store from './store/store';
import routes from './routes';
import {authMiddleware} from './services/auth';

// init all the things
Vue.use(VueRouter);
Vue.use(VueYouTubeEmbed)
Vue.use(VueMaterial.MdCore);
Vue.use(VueMaterial.MdCard);
Vue.use(VueMaterial.MdMenu);
Vue.use(VueMaterial.MdWhiteframe);
Vue.use(VueMaterial.MdInputContainer);
Vue.use(VueMaterial.MdButton);
Vue.use(VueMaterial.MdIcon);
Vue.use(VueMaterial.MdToolbar);
Vue.use(VueMaterial.MdSidenav);
Vue.use(VueMaterial.MdList);
Vue.use(VueMaterial.MdBackdrop);

// config routes
const router = new VueRouter({
   mode: 'history',
   routes: routes,
});

// router.beforeEach(authMiddleware);

// mount a root Vue instance
new Vue({
   router,
   store,
   data: {
      loading: false
   }
}).$mount('#app');
