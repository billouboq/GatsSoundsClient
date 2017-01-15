'use strict';

import config from '../config';

export default (url, options) => {

   const uri = /^http|https/.test(url)
      ? url
      : config.server.url + url;

   return fetch(uri, options).then(response => {
      return response.json().then(json => {
         return response.ok ? json : Promise.reject(json);
      });
   });

}
