<template>
<div class="videoModal">
   <md-card>
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
               <md-menu-item>
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
         <img v-bind:src="video.thumbnail.large">
      </md-card-media>
   </md-card>
</div>
</template>

<script>
export default {
   props: ['video']
}
</script>

<style lang="scss">
.videoModal {
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background-color: grey;
   z-index: 1000;
}
</style>
