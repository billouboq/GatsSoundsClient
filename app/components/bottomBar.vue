<template>
<md-bottom-bar class="bottom-bar" md-shift>
   <md-bottom-bar-item @click.native="linkTo('/dashboard/playlist')" md-icon="video_library">
      playlist
   </md-bottom-bar-item>
   <md-bottom-bar-item @click.native="linkTo('/dashboard/search')" md-icon="search" md-active>
      Search
   </md-bottom-bar-item>
   <md-bottom-bar-item @click.native="linkTo('/dashboard/favorite')" md-icon="stars">
      Favorite
   </md-bottom-bar-item>
   </router-link>
</md-bottom-bar>
</template>

<script>
export default {
   methods: {
      linkTo(path) {
         this.$router.push(path);
      }
   }
}
</script>

<style lang="scss" scoped>
@import "~sass/variables.scss";
.bottom-bar {
   position: fixed;
   bottom: 0;
   height: $barHeight + px;
   z-index: 500;
}
</style>
