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
      playlist: []
	},
	mutations: {
		LOGIN_SUCCESS(state, {user, token}) {
			console.log('LOGIN SUCCESS');
         window.localStorage.setItem(config.token, token);
			state.isAuth = true;
         state.self = user;
		},
		LOGIN_ERROR(state) {
			console.log('LOGIN ERROR');
         window.localStorage.removeItem(config.token);
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
			return fetch('signin', {
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
