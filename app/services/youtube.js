'use strict';

import config from '../config';
import fetch from './fetch';
const google = config.google;
const apiKey = `&key=${google.key}`;

export default {
	listVideo
}

function listVideo(query, limit = 10) {

	const url = `${google.url}search/?maxResults=${limit}&type=video&part=id&q=${query}${apiKey}`;

	return fetch(url)
		.then(getVideoData)
		.then(getChannelData)
		.then(format)
		.catch(err => {
			console.log(err);
		});
}

function getVideoData(data) {

	// get the list of id like this 'id1,id2,id3                                                                                                                                                                                                                                                                                                                                                                                                              '
	const ids = data.items.map(item => item.id.videoId).join(',');
	const url = `${google.url}videos/?id=${ids}&part=snippet,contentDetails${apiKey}`;

	return fetch(url)
		.then(getChannelData)
		.catch(err => {
			console.log(err);
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
		.catch(err => {
			console.log(err);
		});

}

function format(data) {
	return data.items.map((item, index) => {
		return {
			id: item.id,
			type: 'youtube',
			title: item.snippet.title,
			// url: item.link,
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
}

function YTDurationToSeconds(duration) {
	const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
	const hours =   (parseInt(match[1]) || 0);
	const minutes = (parseInt(match[2]) || 0);
	const seconds = (parseInt(match[3]) || 0);
	return hours * 3600 + minutes * 60 + seconds;
}
