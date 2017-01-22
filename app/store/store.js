'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import fetch from '../services/fetch';
import youtube from '../services/youtube';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
      // auth
		isAuth: false,

      // search
      searchVideos: [],
      searchQuery: '',
      searchNextPageToken: '',
      searchLoading: false,

      // video
      selectedVideo: {},

      // playlist
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
      SEARCH_LOADING(state) {
         state.searchLoading = true;
      },
		SEARCH_VIDEO_SUCCESS(state, {query, nextPageToken, videos}) {
			console.log('SEARCH VIDEO SUCCESS');
         state.searchNextPageToken = nextPageToken;
         state.searchQuery = query;
         state.searchVideos = videos;
         state.searchLoading = false;
		},
      SEARCH_VIDEO_ERROR(state) {
         console.log('SEARCH VIDEO ERROR');
         state.searchLoading = false;
      },
      SEARCH_NEXT_VIDEO_SUCCESS(state, {nextPageToken, videos}) {
         console.log('SEARCH NEXT VIDEO SUCCESS');
         state.searchNextPageToken = nextPageToken;
         videos.forEach(video => state.searchVideos.push(video));
         state.searchLoading = false;
		},
      SEARCH_NEXT_VIDEO_ERROR(state) {
         state.searchLoading = false;
         console.log('SEARCH NEXT VIDEO ERROR');
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
         commit('SEARCH_LOADING');
         return youtube.listVideo(query)
            .then(data => {
               commit('SEARCH_VIDEO_SUCCESS', {
                  query: query,
                  nextPageToken: data.nextPageToken,
                  videos: data.items,
               });
            })
            .catch(err => {
               commit('SEARCH VIDEO ERROR');
               throw err;
            });
		},
      SEARCH_NEXT_VIDEO({commit, state}) {
         commit('SEARCH_LOADING');
         return youtube.listNextVideo(state.searchQuery, state.searchNextPageToken)
            .then(data => {
               console.log(data);
               commit('SEARCH_NEXT_VIDEO_SUCCESS', {
                  nextPageToken: data.nextPageToken,
                  videos: data.items,
               });
            })
            .catch(err => {
               commit('SEARCH_NEXT_VIDEO_SUCCESS');
               throw err;
            });
		},
	},
})
