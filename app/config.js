'use strict';

export default {
   server: {
      url: 'http://127.0.0.1:5000/api/'
   },
   video : {
     limit: 10,
     types: {
        YOUTUBE: 1,
        DAILYMOTION: 2,
        VIMEO: 3
     }
   },
   google: {
     key: 'AIzaSyAeD194OlWhlVT6ksW-lRw7HdQpH-LID8A',
     url: 'https://www.googleapis.com/youtube/v3/',
   },
   vimeo: {
     key: '817fdf671f86de107f8f718d0a165184',
     url: 'https://api.vimeo.com/'
   },
   dailymotion: {
     key: 'c875afbe22070bb8abe4',
     url: 'https://api.dailymotion.com/',
     fields: [
       'id',
       'title',
       'url',
       'description',
       'taken_time',
       'duration',
       'owner.screenname',
       'owner.cover_100_url',
       'thumbnail_120_url',
       'thumbnail_480_url',
       'thumbnail_url'
     ]
   }
}