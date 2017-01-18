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
      selectedVideo: {},
      searchVideos: [],
      playlistVideo: {},
      playlist: []
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
      SELECT_VIDEO(state, video) {
         console.log('SELECT_VIDEO');
         state.selectedVideo = video;
      },
      PLAYLIST_ADD(state, video) {
         console.log('PLAYLIST_ADD');
         state.playlist.push(video);
      },
      PLAYLIST_NEXT(state) {
         console.log('PLAYLIST_NEXT');
         state.playlistVideo = state.playlist.shift();
      }
	},
	actions: {
      SIGNUP({commit}, data) {
			return fetch('signup', {
				method: 'post',
				body: JSON.stringify(data)
			}).then(response => {
				console.log('signup success');
			}).catch(err => {
				console.log('signup error');
				throw err;
			});
		},
		LOGIN({commit}, data) {
			return fetch('signin', {
				method: 'post',
				body: JSON.stringify(data)
			}).then(response => {
				console.log('login success');
				// window.localStorage.setItem('gats', response.token);
				commit('LOGIN_SUCCESS', response.user);
			}).catch(err => {
				console.log('login error');
				commit('LOGIN_ERROR');
            throw err;
			});
		},
		SEARCH_VIDEO({commit}, query) {
         return youtube.listVideo(query)
            .then(videos => {
               commit('SEARCH_VIDEO_SUCCESS', videos);
            })
            .catch(err => {
               commit('SEARCH VIDEO ERROR');
               throw err;
            });
		}
	},
})
