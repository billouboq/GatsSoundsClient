<template>
<div class="videoList">
   <md-card class="video" v-for="video of videos" :key="video.id">
      <md-card-header>
         <md-card-header-text>
            <div class="md-title">{{video.title}}</div>
            <div class="md-subhead">{{video.author.name}}</div>
         </md-card-header-text>
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
   width: 32.5%;
}
.md-card .md-title {
   font-size: 22px;
   line-height: 1.05;
}
</style>
