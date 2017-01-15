<template>
<div class="dashboard">
   <md-toolbar>
      <md-input-container>
         <md-icon>search</md-icon>
         <input type="text" v-model="searchData" @keyup.enter="research()"></input>
      </md-input-container>
   </md-toolbar>

   <div class="content">
      <videoList :videos="videos"></videoList>
   </div>

   <videoModal v-if="selectedVideo" :video="selectedVideo"></videoModal>
</div>
</template>
y
<script>
import videoList from '../components/videoList.vue';
import videoModal from '../components/videoModal.vue';

export default {
   data() {
      return {
         searchData: ''
      }
   },
   computed: {
      selectedVideo() {
         return this.$store.state.selectedVideo;
      },
      videos() {
         return this.$store.state.searchVideos;
      },
   },
   methods: {
      research() {
         if (this.searchData) {
            this.$store.dispatch('SEARCH_VIDEO', this.searchData);
         }
      },
   },
   components: {
      videoList,
      videoModal
   },
}
</script>

<style lang="scss">
.content,
.dashboard {
    width: 100%;
    height: 100%;
}
.dashboard {
   position: relative;
}
.content {
   padding: 20px;
}
</style>
