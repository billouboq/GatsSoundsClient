'use strict';

import config from '../config';

export default (url, options) => {

	const uri = /^http|https/.test(url)
      ? url
      : config.server.url + url;

   // set correct header
   if (options && options.method.toLowerCase() === 'post') {
      if (options.headers && !options.headers.has('Content-Type')) {
         options.headers.set('Content-Type', 'application/json');
      } else {
         options.headers = new Headers({
      		'Content-Type': 'application/json'
      	});
      }
   }

	return fetch(uri, options).then(response => {
		var contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
         return response.json().then(json => {
   			return response.ok ? json : Promise.reject(json);
   		});
		} else {
         return response.text().then(text => {
   			return response.ok ? text : Promise.reject(text);
   		});
		}
	});
}
