<template>
  <div>
    <logged-in-navbar />
    <questions-list class="ques-list" :questions="userQuestions" />
  </div>
</template>

<script>
import LoggedInNavbar from "@/components/LoggedInNavbar";
import QuestionsList from "@/components/QuestionsList";
import { mapGetters } from "vuex";

export default {
  name: "MyQuestions",
  components: {
    LoggedInNavbar,
    QuestionsList
  },
  computed: mapGetters(["userQuestions"]),
  async mounted() {
    try {
      await this.$store.dispatch("userQuestions", 1);
    } catch (error) {
      throw new Error(error);
    }
  }
};
</script>

<style lang="css" scoped>
.ques-list {
  margin-top: 60px;
}
</style>