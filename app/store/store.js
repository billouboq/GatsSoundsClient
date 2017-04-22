'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import fetch from '../services/fetch';
import youtube from '../services/youtube';
import config from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		connected: false,
      // search
      searchVideos: [],
      searchQuery: '',
      searchNextPageToken: '',
      searchLoading: false,

      // playlist
      playlist: [],
	},
	mutations: {
      CONNECTION_SUCCESS(state) {
         state.connected = true;
      },
      CONNECTION_ERROR(state) {
         state.connected = false;
      },
      SEARCH_LOADING(state) {
         console.log('SEARCH_LOADING')
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
         console.log('SEARCH VIDEO RESET');
         state.searchVideos = null;
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
      PLAYLIST_ADD(state, video) {
         console.log('PLAYLIST_ADD');
         state.playlist.push(video);
      },
      PLAYLIST_NEXT(state) {
         console.log('PLAYLIST_NEXT');
         state.playlist.pop();
      },
	},
	actions: {
		SEARCH_VIDEO({state, commit}, query) {
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
      SEARCH_NEXT_VIDEO({state, commit}) {
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
	},
});
