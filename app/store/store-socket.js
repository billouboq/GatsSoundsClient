'use strict';

import store from './store';
import {client} from '../services/socket';

export default function() {

   const socket = client.socket;

   // all socket listener
   socket.on('sendVideo', (video) => {
      console.log('sendVideo');
      console.log(video);
      store.commit('PLAYLIST_ADD', video);
   });

}
