<template>
  <div>
    <span v-on:click="reload">
      <router-link :to="`${page - 1}`" v-if="!isFirst" class="nav-link">«prev</router-link>&nbsp;
    </span>
    &nbsp;
    <span v-on:click="reload">
      <router-link :to="`${parseInt(page) + 1}`" v-if="!isLast" class="nav-link">next»</router-link>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    isLast: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isFirst() {
      return this.$route.params.page === "1" || !this.$route.params.page;
    },
    page() {
      return this.$route.params.page || 1;
    }
  },
  methods: {
    reload() {
      document.location.reload();
    }
  }
};
</script>

<style lang="css" scoped>
div {
  text-align: left;
  margin-top: 10px;
  padding: 0 2rem;
}

.nav-link {
  text-decoration: none;
}
</style>