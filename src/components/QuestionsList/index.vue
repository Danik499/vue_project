<template>
  <div id="container">
    <div v-if="isLoaded">
      <div v-if="questions.questionsList.length">
        <question
          v-for="(question, index) in questions.questionsList"
          :key="index"
          :question="question"
        />
      </div>
      <p v-else>You haven't asked any questions yet</p>
    </div>
    <div id="loader" v-else>
      <loader />
    </div>
  </div>
</template>

<script>
import Question from "./Question";
import Loader from "@/components/Loader";

export default {
  components: {
    Question,
    Loader
  },
  props: {
    questions: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isLoaded() {
      return this.questions.questionsList;
    }
  }
};
</script>

<style lang="css" scoped>
#loader {
  width: 60px;
  margin: 0 auto;
}

#container {
  padding: 0 2rem;
}
</style>