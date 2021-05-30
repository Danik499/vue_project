<template>
  <div class="container">
    <span class="title">
      <router-link :to="`/question/${question.id}`" class="link">{{question.title}}</router-link>
    </span>
    <span class="answers-count">
      {{answersCount}}
      <span v-if="answersCount == 0 || answersCount > 1">answers</span>
      <span v-else>answer</span>
    </span>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    question: Object
  },
  computed: {
    answersCount() {
      if (this.question.answers) {
        return Object.keys(this.question.answers).length;
      }
      return 0;
    }
  }
};
</script>

<style lang="css" scoped>
.container {
  padding: 10px 0px;
}

.link {
  text-decoration: none;
  color: blue;
  font-size: 16px;
}

.link:hover {
  text-decoration: underline;
}

.title {
  float: left;
}

.answers-count {
  float: right;
}
</style>