<template>
<div class="dashboard">
   <searchBar></searchBar>
   <!--<playlistVideo></playlistVideo>-->

   <div class="content">
      <router-view></router-view>
   </div>

   <bottomBar></bottomBar>
</div>
</template>

<script>
import searchBar from '../components/searchBar.vue';
import playlistVideo from '../components/playlistVideo.vue';
import bottomBar from '../components/bottomBar.vue';
import storeSocket from '../store/store-socket';

export default {
   mounted() {
      // init store-socket
      storeSocket();
   },
   components: {
      bottomBar,
      searchBar,
      playlistVideo
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
   min-height: 100%;
   background-color: $backgroundColor;
   padding: #{$padding + $barHeight}px #{$padding}px #{$padding + $barHeight}px #{$padding}px;
}
</style>
