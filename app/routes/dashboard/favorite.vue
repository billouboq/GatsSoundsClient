<template>
   <div class="favoriteList">
      <md-card class="video" v-for="video of favorites">
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
                  <md-menu-item @click="addToPlaylist(video)">
                     <span>Add to playlist</span>
                     <md-icon>library_add</md-icon>
                  </md-menu-item>
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
      favorites() {
         return this.$store.state.favorites;
      }
   },
   mounted() {
      if (!this.$store.state.favorites) {
         this.$store.dispatch('GET_FAVORITES');
      }
   }
}
</script>

<style lang="scss" scoped>

</style>
