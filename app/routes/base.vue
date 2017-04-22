<template>
<div class="dashboard">
   <topbar></topbar>
   <playlistVideo></playlistVideo>

   <div class="content">
      <router-view></router-view>
   </div>

   <bottom-bar></bottom-bar>
</div>
</template>

<script>
import io from 'socket.io-client';
import topBar from '../components/bottom-bar.vue';
import bottomBar from '../components/top-bar.vue';
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

      this.$socket.on('addToPlaylist', ({video, play}) => {
         this.$store.dispatch('ADD_TO_PLAYLIST', video);
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.content {
   height: 100%;
   overflow: auto;
   background-color: #F6F6F6;
   padding: 78px 18px 18px 18px;
}
</style>
