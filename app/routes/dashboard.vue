<template>
<div class="dashboard">
   <md-toolbar>
      <md-input-container>
         <md-icon>search</md-icon>
         <input type="text" v-model="searchQuery" @keyup.enter="research()"></input>
      </md-input-container>
   </md-toolbar>

   <div class="content">
      <videoList :videos="videos"></videoList>
      <!--<videoList :videos="playlist"></videoList>-->
   </div>

   <!--<youtube class="youtube-video" v-show="playlistVideo.id" :video-id="playlistVideo.id"></youtube>-->
   <youtube class="youtube-video" v-show="selectedVideo.id" :video-id="selectedVideo.id"></youtube>
</div>
</template>

<script>
import videoList from '../components/videoList.vue';

export default {
   data() {
      return {
         searchQuery: ''
      }
   },
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
   methods: {
      research() {
         if (this.searchQuery) {
            this.$store.dispatch('SEARCH_VIDEO', this.searchQuery);
         }
      },
   },
   mounted() {
      this.$socket.emit('test');
   },
   components: {
      videoList,
   },
}
</script>

<style lang="scss">
.content,
.dashboard {
    width: 100%;
    height: 100%;
}
.dashboard {
   position: relative;
}
.content {
   padding: 20px;
}
.youtube-video {
   position: fixed;
   bottom: 25px;
   left: 25px;
   width: 40%;
   z-index: 500;
}
</style>
