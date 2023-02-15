<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  background-image: url("https://www.netguru.co/hubfs/Blog_posts_-_images/gititback%20blogpost%20cover.png");
  background-size: cover;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
