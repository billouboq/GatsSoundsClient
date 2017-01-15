'use strict';

import store from '../store/store';

export function authMiddleware(to, from, next) {
   if (to.matched.some(record => record.meta.auth)) {
      if (store.state.isAuth) {
         next();
      } else {
         const token = window.localStorage.getItem('gats');
         if (token) {
            store.dispatch('VERIFY')
               .then(response => {
                  next();
               })
               .catch(err => {
                  next('signin');
               })
         } else {
            next('signin');
         }
      }
   } else {
      next();
   }
}
