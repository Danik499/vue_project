<template>
  <div>
    <not-logged-in-navbar v-if="!isLoggedIn" />
    <logged-in-navbar v-else />
    <questions-list id="ques-list" :questions="list" />
    <paginator :isLast="list.isLast" />
  </div>
</template>

<script>
import NotLoggedInNavbar from "@/components/NotLoggedInNavbar";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import QuestionsList from "@/components/QuestionsList";
import Paginator from "@/components/Paginator";
import { mapGetters } from "vuex";
import firebase from "firebase/app";

export default {
  components: {
    LoggedInNavbar,
    NotLoggedInNavbar,
    QuestionsList,
    Paginator
  },
  data() {
    return {
      list: {}
    };
  },
  computed: {
    ...mapGetters(["questions"]),
    isLoggedIn() {
      return firebase.auth().currentUser;
    }
  },
  async mounted() {
    const page = this.$route.params.page;
    await this.$store.dispatch("getQuestions", page);
    this.list = this.questions;
  }
};
</script>

<style lang="css" scoped>
#ques-list {
  margin-top: 30px;
  padding: 0 2rem;
}
</style>