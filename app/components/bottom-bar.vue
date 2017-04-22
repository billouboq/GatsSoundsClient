<template>
<div class="bottom-bar" v-if="currentVideo">
   <div class="left-side">
      <strong @click="showVideo">{{currentVideo.title}}</strong>
   </div>
   <div class="right-side">
      <md-button class="md-icon-button" @click.native="muteUnmuteVideo">
         <md-icon v-if="videoMuted">volume_off</md-icon>
         <md-icon v-else>volume_up</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click.native="playPauseVideo">
         <md-icon v-if="videoPaused">play_arrow</md-icon>
         <md-icon v-else>pause</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click.native="nextVideo" v-if="playlist.length > 1">
         <md-icon>skip_next</md-icon>
      </md-button>
   </div>
</div>
</template>

<script>
export default {
   computed: {
      playlist() {
         return this.$store.state.playlist;
      },
      currentVideo() {
         return this.$store.getters.currentVideo;
      },
      videoMuted() {
         return this.$store.state.videoMuted;
      },
      videoPaused() {
         return this.$store.state.videoPaused;
      },
   },
   methods: {
      showVideo() {
         this.$store.commit('SHOW_VIDEO');
      },
      nextVideo() {
         this.$socket.emit('nextVideo');
      },
      playPauseVideo() {
         if (this.videoPaused) {
            this.$socket.emit('unpauseVideo');
         } else {
            this.$socket.emit('pauseVideo');
         }
      },
      muteUnmuteVideo() {
         if (this.videoMuted) {
            this.$store.commit('UNMUTE_VIDEO');
         } else {
            this.$store.commit('MUTE_VIDEO');
         }
      },
   },
}
</script>

<style lang="scss" scoped>
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    z-index: 500;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.left-side,
.right-side {
    display: flex;
    align-items: center;
}

.left-side {
   white-space: nowrap;
   overflow: hidden;
}

.right-side {
    padding-left: 15px;
    height: 100%;
    .md-button {
        margin: 0;
    }
}
</style>
