<template>
<div class="playlist-page">
   <div class="playlist-container" v-for="video of videos" :key="video.id">
      <img v-bind:src="video.thumbnail.medium">
      <div class="text-container">
         <div class="title">{{video.title}}</div>
         <div class="subhead">{{video.author.name}}</div>
      </div>
   </div>
</div>
</template>

<script>
export default {
   computed: {
      videos() {
         return this.$store.state.playlist;
      },
   },
}
</script>

<style lang="scss" scoped>
.playlist-page {

}
</style>
