<template>
<div class="dashboard">
   <searchBar></searchBar>

   <div class="content">
      <videoList :videos="videos"></videoList>
      <!--<videoList :videos="playlist"></videoList>-->
   </div>

   <!--<youtube class="youtube-video" v-show="playlistVideo.id" :video-id="playlistVideo.id"></youtube>-->
   <youtube class="youtube-video" v-show="selectedVideo.id" :video-id="selectedVideo.id"></youtube>
   <md-bottom-bar class="bottom-bar" md-shift>
     <md-bottom-bar-item md-icon="video_library">Playlist</md-bottom-bar-item>
     <md-bottom-bar-item md-icon="search">Search</md-bottom-bar-item>
     <md-bottom-bar-item md-icon="starts" md-active>Favorites</md-bottom-bar-item>
   </md-bottom-bar>
</div>
</template>

<script>
import searchBar from '../components/searchBar.vue';
import videoList from '../components/videoList.vue';

export default {
   computed: {
      selectedVideo() {
         return this.$store.state.selectedVideo;
      },
      videos() {
         return this.$store.state.searchVideos;
      },
      playlist() {
         return this.$store.state.playlist;
      },
      playlistVideo() {
         return this.$store.state.playlistVideo;
      },
   },
   mounted() {
      this.$socket.emit('test');
   },
   components: {
      videoList,
      searchBar,
   },
}
</script>

<style lang="scss">
@import "~sass/variables.scss";

.dashboard {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.content {
   position: absolute;
   top: $searchBarHeight + px;
   left: 0;
   right: 0;
   min-height: 100%;
   background-color: $backgroundColor;
   padding: #{$padding}px #{$padding}px #{$bottomBarHeight + $padding}px #{$padding}px;
}
.youtube-video {
   position: fixed;
   bottom: 25px;
   left: 25px;
   width: 40%;
   z-index: 500;
}
.bottom-bar {
   position: fixed;
   bottom: 0;
   z-index: 500;
}
.toolbar {
   z-index: 500;
}
</style>
