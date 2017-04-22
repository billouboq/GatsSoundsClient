'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

import Base from './routes/base.vue'
import Search from './routes/search.vue';
import Playlist from './routes/playlist.vue';

Vue.use(VueRouter);

// config routes
const router = new VueRouter({
	base: __dirname,
	mode: 'history',
	routes: [{
		path: '/',
		component: Base,
		redirect: '/search',
		children: [
         {
				path: 'playlist',
				component: Playlist
			},
			{
				path: 'search',
				component: Search
			}
		]
	}]
});

export default	router;
