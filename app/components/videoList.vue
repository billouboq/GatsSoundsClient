<template>
<div class="videoList"
   v-infinite-scroll="getMoreVideos"
   infinite-scroll-disabled="searchLoading"
   infinite-scroll-distance="200"
   infinite-scroll-immediate-check="false">
   <md-card class="video" v-for="video of videos">
      <md-card-header>
         <md-card-header-text>
            <div class="md-title">{{video.title}}</div>
            <div class="md-subhead">{{video.author.name}}</div>
         </md-card-header-text>

         <md-menu md-size="4" md-direction="bottom left">
            <md-button class="md-icon-button" md-menu-trigger>
               <md-icon>more_vert</md-icon>
            </md-button>

            <md-menu-content>
               <md-menu-item @click="selectVideo(video)">
                  <span>Add to playlist</span>
                  <md-icon>library_add</md-icon>
               </md-menu-item>

            </md-menu-content>
         </md-menu>
      </md-card-header>

      <md-card-media>
         <img v-bind:src="video.thumbnail.medium">
      </md-card-media>
   </md-card>
   <div class="loader" v-show="searchLoading"></div>
</div>
</template>

<script>
export default {
   props: ['videos'],
   computed: {
      searchLoading() {
         return this.$store.state.searchLoading;
      }
   },
   methods: {
      getMoreVideos() {
         this.$store.dispatch('SEARCH_NEXT_VIDEO');
      },
      selectVideo(video) {
         this.$store.commit('SELECT_VIDEO', video);
      },
      addToPlaylist(video) {
         this.$store.commit('PLAYLIST_ADD', video);
      },
   }
}
</script>

<style lang="scss">
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
.md-card .md-title {
   font-size: 22px;
   line-height: 1.05;
}
.loader {
   margin: 40px auto;
   width: 60px;
   height: 60px;
   background: url('../../assets/images/ring-alt.svg') center no-repeat;
   background-size: contain;
}
</style>
