'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import fetch from '../services/fetch';
import youtube from '../services/youtube';
import config from '../config';
import {client} from '../services/socket';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
      // auth
      token: '',
		isAuth: false,
      self: {},

      // search
      searchVideos: [],
      searchQuery: '',
      searchNextPageToken: '',
      searchLoading: false,

      // video
      selectedVideo: {},

      // playlist
      playlistVideo: {},
      playlist: [],

		// favorites
		favorites: []
	},
	mutations: {
		LOGIN_SUCCESS(state, {user, token}) {
			console.log('LOGIN SUCCESS');
         window.localStorage.setItem(config.token, token);
         state.token = token;
			state.isAuth = true;
         state.self = user;
		},
		LOGIN_ERROR(state) {
			console.log('LOGIN ERROR');
         window.localStorage.removeItem(config.token);
         state.token = '';
			state.self = {};
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
         state.searchNextPageToken = '';
      },
		SEARCH_VIDEO_RESET(state) {
         console.log('SEARCH VIDEO ERROR');
         state.searchVideos = [];
	      state.searchQuery = '';
	      state.searchNextPageToken = '';
	      state.searchLoading = false;
      },
      SEARCH_NEXT_VIDEO_SUCCESS(state, {nextPageToken, videos}) {
         console.log('SEARCH NEXT VIDEO SUCCESS');
         state.searchNextPageToken = nextPageToken;
         videos.forEach(video => state.searchVideos.push(video));
         state.searchLoading = false;
		},
      SEARCH_NEXT_VIDEO_ERROR(state) {
         console.log('SEARCH NEXT VIDEO ERROR');
         state.searchLoading = false;
         state.searchNextPageToken = '';
		},
      SELECT_VIDEO(state, video) {
         console.log('SELECT_VIDEO');
         state.selectedVideo = video;
      },
      PLAYLIST_ADD(state, video) {
         console.log('PLAYLIST_ADD');
         state.playlist.push(video);
         // no video in playlist
         if (!state.playlistVideo.id) {
            console.log('in playlistvideo');
            state.playlistVideo = video;
         }
      },
      PLAYLIST_NEXT(state) {
         console.log('PLAYLIST_NEXT');
         state.playlistVideo = state.playlist[state.playlist.length - 1];
      },
		FAVORITE_ADD(state, video) {
			console.log('FAVORITE_ADD');
			state.favorites.push(video);
		}
	},
	actions: {
      SIGNUP({commit}, data) {
			return fetch('login/signup', {
				method: 'post',
				body: JSON.stringify(data)
			}).then(token => {
            return client.connection(token)
         }).then(data => {
            console.log(data);
            commit('LOGIN_SUCCESS', data);
				console.log('signup success');
			}).catch(err => {
            console.log(err);
				console.log('signup error');
            commit('LOGIN_ERROR');
				throw err;
			});
		},
		SIGNIN({commit}, data) {
			return fetch('login/signin', {
				method: 'post',
				body: JSON.stringify(data)
			}).then(token => {
            return client.connection(token)
         }).then(data => {
				console.log('signin success');
				commit('LOGIN_SUCCESS', data);
			}).catch(err => {
            console.log(err);
				console.log('signin error');
				commit('LOGIN_ERROR');
            throw err;
			});
		},
		SEARCH_VIDEO({commit}, query) {
         commit('SEARCH_LOADING');
         return youtube.listVideo(query)
            .then(data => {
               if (data.items && data.items.length) {
                  commit('SEARCH_VIDEO_SUCCESS', {
                     query: query,
                     nextPageToken: data.nextPageToken,
                     videos: data.items,
                  });
               } else {
                  commit('SEARCH VIDEO ERROR');
               }
            })
            .catch(err => {
               commit('SEARCH VIDEO ERROR');
               throw err;
            });
		},
      SEARCH_NEXT_VIDEO({commit, state}) {
         return new Promise((resolve, reject) => {
            if (!state.searchNextPageToken) {
               return reject();
            }
            commit('SEARCH_LOADING');
            return youtube.listNextVideo(state.searchQuery, state.searchNextPageToken)
               .then(data => {
                  if (data.items && data.items.length) {
                     commit('SEARCH_NEXT_VIDEO_SUCCESS', {
                        nextPageToken: data.nextPageToken,
                        videos: data.items,
                     });
                  } else {
                     commit('SEARCH_NEXT_VIDEO_ERROR');
                  }
               })
               .catch(err => {
                  commit('SEARCH_NEXT_VIDEO_ERROR');
                  throw err;
               });
         });
		},
      ADD_TO_PLAYLIST({commit, state}, video) {
         console.log('ADD TO PLAYLIST');
         console.log(video)
         client.socket.emit('addToPlaylist', video);
		},
		ADD_TO_FAVORITES({state, commit}, video) {
         return fetch('api/favorites', {
            headers: new Headers({
               'Authorization': state.token
            }),
            method: 'post',
            body: JSON.stringify(video)
         }).then(data => {
            console.log('ADD_TO_FAVORITES SUCCESS');
            commit('FAVORITE_ADD', video);
         }).catch(err => {
            console.log(err);
            throw err;
         });
		}
	},
})
