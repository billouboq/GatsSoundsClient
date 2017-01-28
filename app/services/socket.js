'use strict';

import io from 'socket.io-client';
import config from '../config';

// socket client class
export class socketClient {

   constructor(url) {
      this.socket = null;
      this.url = url;
   }

   connection(token) {
      // connect to server
      const tick = io(this.url, {
         forceNew: true,
         timeout: 5000,
         reconnectionAttempts: 20,
         reconnectionDelay: 2000,
         reconnectionDelayMax: 4000,
         transports: ['websocket'],
      });

      return new Promise((resolve, reject) => {
         // send the jwt
         tick.emit('authenticate', {token}) ;

         // if user is authenticated
         tick.once('authenticated', (user) => {
            this.socket = tick;
            resolve({token, user});
         });

         // if user is unauthorized
         tick.once('unauthorized', reject);

         // if connection failed
         tick.once('connect_error', reject);
      });
   }
}

// need to have only one socketClient for the entire app
export const client = new socketClient(config.server.url);

// Vue.use(install) => you can now use this.$socket in vue js files
export function VueSocket (Vue, option) {

   // add socket io to all vue instance
   Object.defineProperty(Vue.prototype, '$socket', {
      get: function get () { return client.socket }
   })

}
