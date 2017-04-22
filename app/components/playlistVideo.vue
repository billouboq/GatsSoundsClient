<template>
<div class="playlist-video" v-if="currentVideo" :class="{'open': showVideo}" @click="hideVideo">
   <md-button class="close-icon md-icon-button">
      <md-icon>close</md-icon>
   </md-button>
   <youtube
      class="video"
      :player-vars="playerVars"
      :video-id="currentVideo.id"
      @paused="onVideoPause"
      @playing="onVideoPlay"
      @ended="onVideoEnd"
      @ready="onPlayerReady"
      @click.stop.native>
   </youtube>
</div>
</template>

<script>
export default {
   data() {
      return {
         player: {},
         playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            rel: 0,
         }
      }
   },
   computed: {
      currentVideo() {
         return this.$store.getters.currentVideo;
      },
      showVideo() {
         return this.$store.state.showVideo;
      },
      videoMuted() {
         return this.$store.state.videoMuted;
      },
      videoPaused() {
         return this.$store.state.videoPaused;
      }
   },
   methods: {
      onPlayerReady(player) {
         this.player = player;
      },
      onVideoEnd() {
         this.$store.commit('PLAYLIST_NEXT');
      },
      hideVideo() {
         this.$store.commit('HIDE_VIDEO');
      },
      onVideoPlay() {
         this.$socket.emit('unpauseVideo');
      },
      onVideoPause() {
         this.$socket.emit('pauseVideo');
      }
   },
   watch: {
      videoMuted(muted) {
         if (muted) {
            this.player.mute();
         } else {
            this.player.unMute();
         }
      },
      videoPaused(paused) {
         if (paused) {
            this.player.pauseVideo();
         } else {
            this.player.playVideo();
         }
      },
   }
}
</script>

<style lang="scss">
.playlist-video {
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 1000;
   display: flex;
   align-items: center;
   justify-content: center;
   pointer-events: none;
   opacity: 0;
   background-color: rgba(0, 0, 0, 0.8);
   transition: all .4s ease;

   &.open {
      position: fixed;
      opacity: 1;
      pointer-events: all;
   }

   .video {
      position: relative;
      width: 100%;
   	padding-bottom: 56.25%; /* 16:9 */
   	padding-top: 25px;
   	height: 0;
   }

   iframe {
      position: absolute;
   	top: 0;
   	left: 0;
   	width: 100%;
   	height: 100%;
   }

   .close-icon {
      position: absolute;
      top: 10px;
      right: 5px;

      .md-icon {
         color: white;
         font-size: 30px;
         height: 30px;
         min-height: 30px;
         width: 30px;
         min-width: 30px;
      }
   }
}
</style>
