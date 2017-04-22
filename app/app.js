import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import VueYouTubeEmbed from 'vue-youtube-embed';
import infiniteScroll from 'vue-infinite-scroll';
import VueSocket from './services/socket';
import store from './store/store';
import router from './routes';

// init all the things
Vue.use(VueSocket);
Vue.use(VueYouTubeEmbed);
Vue.use(infiniteScroll)
Vue.use(VueMaterial.MdCore);
Vue.use(VueMaterial.MdCard);
Vue.use(VueMaterial.MdMenu);
Vue.use(VueMaterial.MdWhiteframe);
Vue.use(VueMaterial.MdInputContainer);
Vue.use(VueMaterial.MdButton);
Vue.use(VueMaterial.MdIcon);
Vue.use(VueMaterial.MdList);
Vue.use(VueMaterial.MdBackdrop);
Vue.use(VueMaterial.MdBottomBar);
Vue.use(VueMaterial.MdButtonToggle);
Vue.use(VueMaterial.MdAvatar);

// mount a root Vue instance
new Vue({
   router,
   store,
   data: {
      loading: false
   }
}).$mount('#app');
