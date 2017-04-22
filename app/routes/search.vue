<template>
   <div class="videoList" v-infinite-scroll="getMoreVideos" infinite-scroll-disabled="searchLoading" infinite-scroll-distance="800" infinite-scroll-immediate-check="false">
      <md-card class="video" md-with-hover v-for="video of videos" :key="video.id">
         <md-card-header>
            <md-avatar>
               <img v-bind:src="video.author.picture">
            </md-avatar>

            <div class="md-title">{{video.title}}</div>
            <div class="md-subhead">{{video.author.name}}</div>
         </md-card-header>

         <md-card-media>
            <img v-bind:src="video.thumbnail.medium">
         </md-card-media>

         <md-card-actions>
            <md-button class="md-icon-button" @click.native="addToPlaylist(video)">
               <md-icon>video_library</md-icon>
            </md-button>
         </md-card-actions>
      </md-card>
      <div class="loader" v-show="searchLoading"></div>
   </div>
</template>

<script>
export default {
   computed: {
      searchLoading() {
         return this.$store.state.searchLoading;
      },
      videos() {
         return this.$store.state.searchVideos;
      },
   },
   methods: {
      getMoreVideos() {
         this.$store.dispatch('SEARCH_NEXT_VIDEO');
      },
      addToPlaylist(video) {
         this.$socket.emit('sendVideo', video);
      },
   },
}
</script>

<style lang="scss" scoped>
.videoList {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.video {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 49%;
}
.video .md-icon {
    width: 28px;
    min-width: 28px;
    height: 28px;
    min-height: 28px;
    font-size: 28px;
}
.active .md-icon {
    color: #fde200 !important;
}
.loader {
    margin: 40px auto;
    width: 60px;
    height: 60px;
    background: url('../../assets/images/ring-alt.svg') center no-repeat;
    background-size: contain;
}
.md-title, .md-subhead {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
}
</style>
