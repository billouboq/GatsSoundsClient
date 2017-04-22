'use strict';

import Vue from 'vue';
import io from 'socket.io-client';
import config from '../config';

const socket = io(config.server.url, {
   forceNew: true,
   timeout: 5000,
   reconnectionAttempts: 20,
   reconnectionDelay: 2000,
   reconnectionDelayMax: 4000,
   transports: ['websocket'],
});

// Vue.use(install) => you can now use this.$socket in vue js files
export default function VueSocket (Vue, option) {

   // add socket io to all vue instance
   Object.defineProperty(Vue.prototype, '$socket', {
      get: function get () { return socket }
   })

}
