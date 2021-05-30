<template>
  <div class="container">
    <div class="navbar">
      <span class="logo">REDDDIT</span>
      <div class="nav-items">
        <span class="nav-item">
          <router-link to="/1" class="nav-link">
            <font color="black">Main</font>
          </router-link>
        </span>
        |
        <span class="nav-item">
          <router-link to="/login" class="nav-link">
            <font color="black">Login</font>
          </router-link>
        </span>
        |
        <span class="nav-item">
          <router-link to="/registration" class="nav-link">
            <font color="black">Registration</font>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
/* @import url("/../../assets/navBarStyles.css"); */
.container {
  position: relative;
  height: 5vh;
  padding: 1rem 2rem;
  background-color: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid grey;
}

.navbar {
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-item:hover {
  text-decoration: underline;
}

.nav-link {
  text-decoration: none;
}
</style>