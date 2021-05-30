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
          <router-link to="/new_question" class="nav-link">
            <font color="black">New question</font>
          </router-link>
        </span>
        |
        <span class="nav-item">
          <router-link to="/my_questions" class="nav-link">
            <font color="black">My questions</font>
          </router-link>
        </span>
        |
        <span class="nav-item" v-on:click="logout">
          <a href="#" class="nav-link">
            <font color="black">Logout</font>
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  position: relative;
  height: 5vh;
  border-bottom: 1px solid grey;
  padding: 1rem 2rem;
  background-color: #f6f6f6;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
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
/* #container {
  display: block;
  width: 100%;
  height: 40px;
  padding-top: 20px;
}

.logo {
  float: left;
}

.nav-item {
  float: right;
}

.nav-item:not(last-child) {
  margin-left: 10%;
}

.nav-link {
  text-decoration: none;
} */
</style>