'use strict';

import config from '../config';

const httpRegex = /^http|https/;

export default (url, options = {}) => {

   // default url is config.server.url + url
	const uri = httpRegex.test(url) ? url : config.server.url + url;

   // set correct header
   if (options.method && (options.method.toLowerCase() === 'post' || options.method.toLowerCase() === 'put')) {
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
