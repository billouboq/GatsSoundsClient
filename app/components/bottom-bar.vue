<template>
<div class="bottom-bar">
   <div class="left-side">
      <p>Musique: {{video.title}}</p>
      <md-icon class="toolbar-icon">search</md-icon>
      <input class="toolbar-input" placeholder="Search" type="text" v-model="searchQuery" @keyup.enter="research()"></input>
   </div>
   <div class="right-side">
      <md-button class="md-icon-button" @click.native="$router.push('/playlist')">
         <md-icon>video_library</md-icon>
      </md-button>
   </div>
</div>
</template>

<script>
export default {
   computed: {
      video() {
         return this.$store.state.playlist[0];
      }
   },
   methods: {
      research() {
         if (this.searchQuery) {
            this.$store.dispatch('SEARCH_VIDEO', this.searchQuery).then(() => {
               this.$router.push('/search');
            });
         }
      },
   },
}
</script>

<style lang="scss" scoped>
.topbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    z-index: 500;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.left-side,
.right-side {
    display: flex;
    align-items: center;
}

.right-side {
    height: 100%;
    .md-button {
        margin: 0;
    }
}
</style>
