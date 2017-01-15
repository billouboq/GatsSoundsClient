'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import fetch from '../services/fetch';
import youtube from '../services/youtube';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isAuth: false,
		self: {},
		users: [],
      selectedVideo: null,
		searchVideos: []
	},
	mutations: {
		LOGIN_SUCCESS(state, user) {
			console.log('LOGIN SUCCESS');
			console.log(user);
			state.self = user;
			state.isAuth = true;
		},
		LOGIN_ERROR(state) {
			console.log('LOGIN ERROR');
			state.self = null;
			state.isAuth = false;
		},
		SEARCH_VIDEO_SUCCESS(state, videos) {
			console.log('SEARCH VIDEO SUCCESS');
         state.searchVideos = videos;
		},
      SEARCH_VIDEO_ERROR(state, videos) {
			console.log('SEARCH VIDEO ERROR');
		},
      SELECT_VIDEO(state, id) {
         console.log('SELECT_VIDEO');
         var filteredArray = state.searchVideos.filter(video => video.id === id);
         var selectedVideo = (filteredArray.length)
            ? filteredArray[0]
            : null;

         state.selectedVideo = selectedVideo;
      }
	},
	actions: {
		LOGIN({commit}, data) {
			return fetch('signin', {
				method: 'post',
				body: JSON.stringify(data)
			}).then(response => {
				console.log('login success');
				window.localStorage.setItem('gats', response.token);
				commit('LOGIN_SUCCESS', response.user);
			}).catch(err => {
				console.log('login error');
				commit('LOGIN_ERROR');
				Promise.reject(err);
			});
		},
		VERIFY({commit}) {
			return fetch('verify', {
				method: 'get',
				headers: new Headers({
					'Authorization': window.localStorage.getItem('gats')
				})
			}).then(response => {
				console.log('verify success');
				console.log(response);
				commit('LOGIN_SUCCESS', response);
			}).catch(err => {
				console.log('verify error');
				commit('LOGIN_ERROR');
				Promise.reject(err);
			});
		},
		SEARCH_VIDEO({commit}, query) {
         return youtube.listVideo(query)
            .then(videos => {
               commit('SEARCH_VIDEO_SUCCESS', videos);
            })
            .catch(err => {
               commit('SEARCH VIDEO ERROR');
            });
		}
	},
})
