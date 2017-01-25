'use strict';

import config from '../config';
import fetch from './fetch';

const google = config.google;
const apiKey = `&key=${google.key}`;

export default {
	listVideo,
   listNextVideo
}

function listVideo(query, limit = config.video.limit) {
	const url = `${google.url}search/?maxResults=${limit}&type=video&part=id&q=${query}${apiKey}`;
	return fetch(url)
		.then(getVideoData)
		.then(getChannelData)
		.then(format)
		.catch(onError);
}

function listNextVideo(query, next, limit = config.video.limit) {
	const url = `${google.url}search/?pageToken=${next}&maxResults=${limit}&type=video&part=id&q=${query}${apiKey}`;
	return fetch(url)
		.then(getVideoData)
		.then(getChannelData)
		.then(format)
		.catch(onError);
}

function getVideoData(data) {

	// get the list of id like this 'id1,id2,id3                                                                                                                                                                                                                                                                                                                                                                                                              '
	const ids = data.items.map(item => item.id.videoId).join(',');
	const url = `${google.url}videos/?id=${ids}&part=snippet,contentDetails${apiKey}`;

	return fetch(url)
      .then(response => {
         data.items = response.items;
         return data;
      });
}

function getChannelData(data) {

	const ids = data.items.map(item => item.snippet.channelId).join(',');
	const url = `${google.url}channels/?id=${ids}&part=snippet,contentDetails${apiKey}`;

	return fetch(url)
		.then(response => {
			response.items.forEach((item, index) => {
				data.items[index].snippet.channelThumbnail = item.snippet.thumbnails.default.url;
			});
			return data;
		})
		.catch(onError);
}

function format(data) {
	data.items = data.items.map((item, index) => {
		return {
			id: item.id,
			type: 'youtube',
			title: item.snippet.title,
			url: item.link,
			description: item.snippet.description,
			date: item.snippet.publishedAt,
			duration: YTDurationToSeconds(item.contentDetails.duration),
			author: {
				name: item.snippet.channelTitle,
				picture: item.snippet.channelThumbnail
			},
			thumbnail: {
				small: item.snippet.thumbnails.default.url,
				medium: item.snippet.thumbnails.high.url,
				large: (item.snippet.thumbnails.maxres || item.snippet.thumbnails.high).url
			}
		}
	});
   return data;
}

function YTDurationToSeconds(duration) {
	const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
	const hours =   (parseInt(match[1]) || 0);
	const minutes = (parseInt(match[2]) || 0);
	const seconds = (parseInt(match[3]) || 0);
	return hours * 3600 + minutes * 60 + seconds;
}

function onError(err) {
   throw err;
}
