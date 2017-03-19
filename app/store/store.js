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
      searchVideos: null,
      searchQuery: '',
      searchNextPageToken: '',
      searchLoading: false,

      // playlist
      playlist: null,

		// favorites
		favorites: null
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
         if (!state.playlist) {
            state.playlist = [video];
         } else {
            state.playlist.push(video);
         }
      },
      PLAYLIST_NEXT(state) {
         console.log('PLAYLIST_NEXT');
         state.playlist.pop();
      },
		FAVORITE_ADD(state, video) {
         console.log(video);
			console.log('FAVORITE_ADD');
         if (!state.favorites) {
            state.favorites = [video];
         } else {
            state.favorites.push(video);
         }
		},
      FAVORITE_REMOVE(state, id) {
         console.log('FAVORITE_REMOVE');
         if (state.favorites) {
            state.favorites = state.favorites.filter(fav => fav.id !== id);
         }
		},
      FAVORITE_SET(state, favorites) {
			console.log('FAVORITE_SET');
			state.favorites = favorites
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
		SEARCH_VIDEO({state, commit}, query) {
         commit('SEARCH_LOADING');
         return youtube.listVideo(query)
            .then(data => {
               if (data.items && data.items.length) {
                  addFavoriteProperty(data.items, state.favorites);
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
							addFavoriteProperty(data.items, state.favorites);
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
         client.socket.emit('addToPlaylist', video);
		},
      GET_FAVORITES({state, commit}) {
			return fetch('api/favorites', {
				headers: new Headers({'Authorization': state.token}),
				method: 'get'
			}).then(data => {
				console.log('GET_FAVORITES');
            commit('FAVORITE_SET', data);
			}).catch(err => {
				console.log(err);
				throw err;
			});
      },
		ADD_TO_FAVORITES({state, commit}, video) {
         return fetch('api/favorites', {
				headers: new Headers({'Authorization': state.token}),
				method: 'post',
            body: JSON.stringify(video)
			}).then(data => {
				console.log('ADD_TO_FAVORITES SUCCESS');
				commit('FAVORITE_ADD', video);
			}).catch(err => {
				console.log(err);
				throw err;
			});
		},
		REMOVE_FROM_FAVORITES({state, commit}, video) {
			return fetch('api/favorites/' + video.id, {
				headers: new Headers({'Authorization': state.token}),
				method: 'delete',
			}).then(data => {
				console.log('ADD_TO_FAVORITES SUCCESS');
				commit('FAVORITE_REMOVE', video.id);
			}).catch(err => {
				console.log(err);
				throw err;
			});
		}
	},
});

function addFavoriteProperty(videos, favorites) {
   if (favorites) {
      videos.forEach(video => {
         let fav = false;
         for (let i = 0; i < favorites.length; i++) {
            const favorite = favorites[i];
            if (favorite.id === video.id) {
               fav = true;
            }
         }
         video.favorite = fav;
      });
   }
}
