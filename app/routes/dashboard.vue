<template>
<div class="dashboard">
   <topbar></topbar>
   <!--<playlistVideo></playlistVideo>-->

   <div class="content">
      <router-view></router-view>
   </div>

</div>
</template>

<script>
import topbar from '../components/topbar.vue';
import playlistVideo from '../components/playlistVideo.vue';
import storeSocket from '../store/store-socket';

export default {
   mounted() {
      // init store-socket
      storeSocket();
      // get favorites
      this.$store.dispatch('GET_FAVORITES');
   },
   components: {
      topbar,
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
   padding: #{$padding + $barHeight}px #{$padding}px #{$padding}px #{$padding}px;
}
</style>
