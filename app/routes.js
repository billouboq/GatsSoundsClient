'use strict';

import store from './store/store';
import Signin from './routes/signin.vue'
import Dashboard from './routes/dashboard.vue'

export default [
   {
      path: '/',
      redirect: 'dashboard'
   },
   /*{
      path: '/signin',
      name: 'signin',
      component: Signin
   },
   {
      path: '/logout',
      name: 'logout',
      beforeEnter(to, from, next) {
         store.commit('LOGIN_ERROR');
         window.localStorage.removeItem('gats');
         next('signin');
      }
   },*/
   {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      /*meta: {
         auth: true
      }*/
   }
]
