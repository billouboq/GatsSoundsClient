<template>
<div class="dashboard">
   <top-bar></top-bar>
   <playlistVideo></playlistVideo>

   <div class="content">
      <router-view></router-view>
   </div>

   <bottom-bar></bottom-bar>
</div>
</template>

<script>
import io from 'socket.io-client';
import bottomBar from '../components/bottom-bar.vue';
import topBar from '../components/top-bar.vue';
import playlistVideo from '../components/playlistVideo.vue';

export default {
   data() {
      return {
         isConnected: false
      }
   },
   mounted() {
      this.$socket.on('connect', () => {
         this.$store.commit('CONNECTION_SUCCESS');
      });

      this.$socket.on('disconnect', () => {
         this.$store.commit('CONNECTION_ERROR');
      });

      this.$socket.on('addToPlaylist', (video) => {
         this.$store.commit('PLAYLIST_ADD', video);
      });

      this.$socket.on('pauseVideo', () => {
         this.$store.commit('PAUSE_VIDEO');
      });

      this.$socket.on('unpauseVideo', () => {
         this.$store.commit('UNPAUSE_VIDEO');
      });

      this.$socket.on('nextVideo', () => {
         console.log('next video');
         this.$store.commit('PLAYLIST_NEXT');
      });
   },
   components: {
      topBar,
      bottomBar,
      playlistVideo
   },
}
</script>

<style lang="scss">

.dashboard {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.content {
   height: 100%;
   background-color: #F6F6F6;
}
</style>
