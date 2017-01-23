'use strict';

import io from 'socket.io-client';
import config from '../config';

// socket client class
export class socketClient {

   constructor(url) {
      this.socket = null;
      this.url = url;
   }

   connection(jwt) {
      console.log(this);
      // connect to server
      const tick = io(this.url, {
         forceNew: true,
         transports: ['websocket']
      });

      return new Promise((resolve, reject) => {
         // send the jwt
         tick.emit('authenticate', {token: jwt}) ;

         // if user is authenticated
         tick.on('authenticated', () => {
            this.socket = tick;
            resolve();
         });

         // if user is unauthorized
         tick.on('unauthorized', reject);
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
