<template>
<div class="videoList">
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
               <md-menu-item @click="addToFavorite(video)">
                  <span>Add to favorite</span>
                  <md-icon>star</md-icon>
               </md-menu-item>

            </md-menu-content>
         </md-menu>
      </md-card-header>

      <md-card-media>
         <img v-bind:src="video.thumbnail.medium">
      </md-card-media>
   </md-card>
</div>
</template>

<script>
export default {
   computed: {
      videos() {
         return this.$store.state.playlist;
      },
   },
   methods: {
      addToPlaylist(video) {
         this.$store.dispatch('ADD_TO_PLAYLIST', video);
      },
   },
}
</script>

<style lang="scss" scoped>
@import "~sass/variables.scss";
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
   width: 32.5%;
}
.md-card .md-title {
   font-size: 22px;
   line-height: 1.05;
}
</style>
