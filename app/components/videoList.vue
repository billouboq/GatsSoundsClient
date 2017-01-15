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
               <md-menu-item @click="selectVideo(video.id)">
                  <span>Call</span>
                  <md-icon>phone</md-icon>
               </md-menu-item>

               <md-menu-item>
                  <span>Send a message</span>
                  <md-icon>message</md-icon>
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
   props: ['videos'],
   methods: {
      selectVideo(id) {
         if (id) {
            this.$store.commit('SELECT_VIDEO', id);
         }
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
   margin-bottom: 20px;
   width: 49%;
}
</style>
