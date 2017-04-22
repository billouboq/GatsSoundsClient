<template>
<div class="top-bar">
   <div class="left-side">
      <md-icon class="toolbar-icon">search</md-icon>
      <input class="toolbar-input" placeholder="Search" type="text" v-model="searchQuery" @keyup.enter="research()"></input>
   </div>
   <div class="right-side">
      <md-button class="md-icon-button" @click.native="$router.push('/search')">
         <md-icon>search</md-icon>
      </md-button>

      <md-button class="md-icon-button" @click.native="$router.push('/playlist')">
         <md-icon>video_library</md-icon>
      </md-button>

      <md-button class="md-icon-button">
         <md-icon md-theme="green" class="icon-connected" v-if="connected">check_circle</md-icon>
         <md-icon md-theme="red" class="icon-disconnected" v-else>warning</md-icon>
      </md-button>

   </div>
</div>
</template>

<script>
export default {
   data() {
      return {
         searchQuery: ''
      }
   },
   computed: {
      connected() {
         return this.$store.state.connected;
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
.top-bar {
    position: fixed;
    top: 0;
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

.toolbar-icon {
    color: #a9a9a9;
}

.toolbar-input {
    font-size: 20px;
    margin-left: 16px;
    background-color: transparent;
    border: 0;
    outline: none;
    flex: 1;
}
</style>
