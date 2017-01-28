'use strict';

import store from './store/store';

import Signin from './routes/signin.vue'
import Signup from './routes/signup.vue'
import Dashboard from './routes/dashboard.vue'
import Search from './routes/dashboard/search.vue';
import Favorite from './routes/dashboard/favorite.vue';
import Playlist from './routes/dashboard/playlist.vue';

export default [
   {
		path: '/',
		redirect: '/signin'
	},
	{
		path: '/signin',
		component: Signin
	},
	{
		path: '/signup',
		component: Signup
	},
	{
		path: '/logout',
		meta: {auth: true},
		beforeEnter(to, from, next) {
			store.commit('LOGIN_ERROR');
			next('signin');
		}
	},
	{
		path: '/dashboard',
		component: Dashboard,
		meta: {auth: true},
      children: [
         {
            path: 'playlist',
            component: Playlist
         },
         {
            path: 'search',
            component: Search
         },
         {
            path: 'favorite',
            component: Favorite
         }
      ]
	}
]
