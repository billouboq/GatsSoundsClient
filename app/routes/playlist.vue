<template>
<div class="playlist-page">
   <div class="video" v-for="video of videos" :key="video.id">
      <img class="thumbnail" v-bind:src="video.thumbnail.medium">
      <div class="text-container">
         <div class="text-top">
            <div class="title">{{video.title}}</div>
            <div class="subhead">{{video.author.name}}</div>
         </div>
         <div class="text-bottom">
            <div class="description">{{video.description}}</div>
         </div>
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
   padding: 78px 0;
   width: 100%;
}

.video {
   height: 200px;
   padding: 15px;
   display: flex;
   align-items: flex-start;
   background-color: white;
   border-bottom: 1px solid #ececec;
   &:last-of-type {
      border: none;
   }
}

.thumbnail {
   width: 225px;
   margin-right: 30px;
}

.text-container {
   padding: 6px 0;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
}

.title {
   font-weight: bold;
   font-size: 18px;
   margin-bottom: 5px;
}

.subhead {
   color: #232323;
   font-size: 16px;
}

.description {
   display: block; /* Fallback for non-webkit */
   display: -webkit-box;
   font-size: 14px;
   height: 97px;
   -webkit-line-clamp: 5;
   -webkit-box-orient: vertical;
   overflow: hidden;
   text-overflow: ellipsis;
}
</style>
