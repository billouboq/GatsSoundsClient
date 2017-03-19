<template>
<div class="playlist-video">
   <youtube class="video" :video-id="playlistVideo.id"></youtube>
</div>
</template>

<script>
export default {
   data() {
      return {
      }
   },
   computed: {
      playlistVideo() {
         return this.$store.state.playlistVideo;
      },
   },
}
</script>

<style lang="scss" scoped>
@import "~sass/variables.scss";
.playlist-video {
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   pointer-events: none;
   z-index: 1000
}
.video {
   position: absolute;
   bottom: 25px;
   left: 25px;
   width: 40%;
}
</style>
