'use strict';

import store from '../store/store';
import config from '../config';
import {client} from './socket';

export function authMiddleware(to, from, next) {
   if (to.matched.some(record => record.meta.auth)) {
      if (store.state.isAuth) {
         next();
      } else {
         const jwttoken = getToken();
         if (jwtToken) {
            console.log('in jwt token');
         } else {
            next('signin');
         }
      }
   } else {
      next();
   }
}

export function getToken() {
   return window.localStorage.getItem(config.localToken);
}

export function storeToken(token) {
   if (token) {
      window.localStorage.getItem(config.localToken, token);
   }
}
