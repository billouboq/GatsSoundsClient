<template>
<div class="playlist-video" v-if="playlist.length">
   <youtube class="video" :video-id="playlist[0].id"></youtube>
</div>
</template>

<script>
export default {
   data() {
      return {
      }
   },
   computed: {
      playlist() {
         return this.$store.state.playlist;
      },
   },
}
</script>

<style lang="scss" scoped>
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
