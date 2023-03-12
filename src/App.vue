<script setup lang="ts">
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
}
body {
  height: 100%;
}
html {
  height: 100%;
}
/* 定义滚动条的宽度和颜色 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b9b9b9;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eeeeee;
}
</style>
