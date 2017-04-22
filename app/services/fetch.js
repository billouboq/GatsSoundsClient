'use strict';

import config from '../config';

export default (url, options = {}) => {
	return fetch(url, options).then(response => {
		const contentType = response.headers.get("content-type");
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
