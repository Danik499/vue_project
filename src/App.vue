<template>
  <div class="background">
    <div class="app">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 3vh !important;
  color: #2c3e50;
  width: 60%;
  padding-bottom: 2rem;
  border: 1px solid grey;
  border-radius: 6px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 0 10px #c4c4c4;
}

.background {
  background-color: #fbfbfb;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}
</style>
