<template>
<div class="search-bar">
   <md-icon class="toolbar-icon">search</md-icon>
   <input class="toolbar-input" placeholder="Search" type="text"
          v-model="searchQuery" @keyup.enter="research()"></input>
</div>
</template>

<script>
export default {
   data() {
      return {
         searchQuery: ''
      }
   },
   methods: {
      research() {
         if (this.searchQuery) {
            this.$store.dispatch('SEARCH_VIDEO', this.searchQuery);
         }
      },
   },
}
</script>

<style lang="scss" scoped>
@import "~sass/variables.scss";

.search-bar {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   padding: 0 $padding + px;
   height: $barHeight + px;
   display: flex;
   align-items: center;
   background-color: white;
   z-index: 500;
   box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
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
