'use strict';

import store from '../store/store';
import config from '../config';
import {client} from './socket';

export default function authMiddleware(to, from, next) {
   // need auth
   if (to.matched.some(record => record.meta.auth)) {
      checkIfIsAuth()
         .then(() => {
            next();
         })
         .catch(() => {
            next('/signin');
         })
   // don't need auth
   } else {
      checkIfIsAuth()
         .then(() => {
            next('/dashboard/search');
         })
         .catch(() => {
            next();
         });
   }
}

function checkIfIsAuth() {
   return new Promise((resolve, reject) => {
      // already auth
      if (store.state.isAuth) {
         resolve();
      // not already auth
      } else {
         const jwtToken = window.localStorage.getItem(config.token);
         // has a jwt token
         if (jwtToken) {
            client.connection(jwtToken)
               // jwt is ok
               .then(data => {
                  store.commit('LOGIN_SUCCESS', data);
                  resolve();
               })
               // jwt not ok
               .catch(err => {
                  store.commit('LOGIN_ERROR');
                  reject();
               });
         // no jwt token
         } else {
            reject();
         }
      }
   });
}
