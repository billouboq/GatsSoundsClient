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

      // video
      showVideo: false,
      videoPaused: false,
      videoMuted: false,
	},
   getters: {
      currentVideo(state) {
         return state.playlist[0];
      }
   },
	mutations: {
      CONNECTION_SUCCESS(state) {
         state.connected = true;
      },
      CONNECTION_ERROR(state) {
         state.connected = false;
      },
      SHOW_VIDEO(state) {
         state.showVideo = true;
      },
      HIDE_VIDEO(state) {
         state.showVideo = false;
      },
      PAUSE_VIDEO(state) {
         state.videoPaused = true;
      },
      UNPAUSE_VIDEO(state) {
         state.videoPaused = false;
      },
      MUTE_VIDEO(state) {
         state.videoMuted = true;
      },
      UNMUTE_VIDEO(state) {
         state.videoMuted = false;
      },
      SEARCH_LOADING(state) {
         state.searchLoading = true;
      },
		SEARCH_VIDEO_SUCCESS(state, {query, nextPageToken, videos}) {
         state.searchNextPageToken = nextPageToken;
         state.searchQuery = query;
         state.searchVideos = videos;
         state.searchLoading = false;
		},
      SEARCH_VIDEO_ERROR(state) {
         state.searchLoading = false;
         state.searchNextPageToken = '';
      },
		SEARCH_VIDEO_RESET(state) {
         state.searchVideos = null;
	      state.searchQuery = '';
	      state.searchNextPageToken = '';
	      state.searchLoading = false;
      },
      SEARCH_NEXT_VIDEO_SUCCESS(state, {nextPageToken, videos}) {
         state.searchNextPageToken = nextPageToken;
         videos.forEach(video => state.searchVideos.push(video));
         state.searchLoading = false;
		},
      SEARCH_NEXT_VIDEO_ERROR(state) {
         state.searchLoading = false;
         state.searchNextPageToken = '';
		},
      PLAYLIST_ADD(state, video) {
         state.playlist.push(video);
      },
      PLAYLIST_NEXT(state) {
         state.playlist.shift();
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
