<template>
  <div>
    <not-logged-in-navbar v-if="!isLoggedIn" />
    <logged-in-navbar v-else />
    <div class="content">
      <div class="question">
        <h2>{{question.title}}</h2>
        <div class="description">{{question.description}}</div>
        <br />
        <div class="question-footer">
          <div class="info">
            <info :name="question.author" :id="question.id" kind="question" v-if="question.id" />
          </div>
          <span v-if="question.answers">
            Sorted by
            <select v-model="sortedBy" v-on:change="rerenderAnswers">
              <option>date</option>
              <option>points</option>
            </select>
          </span>
        </div>
      </div>
      <hr />
      <answers-list
        :answersProp="question.answers"
        v-if="question.answers"
        :sortedBy="sortedBy"
        :key="keyForRerender"
      />
      <add-answer v-if="isLoggedIn" />
      <p v-else class="text">
        <router-link class="link" to="/login">Log in</router-link>&nbsp;to leave an answer
      </p>
    </div>
  </div>
</template>

<script>
import NotLoggedInNavbar from "@/components/NotLoggedInNavbar";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import AnswersList from "@/components/AnswersList";
import AddAnswer from "@/components/AddAnswer";
import Info from "@/components/Info";
import firebase from "firebase/app";

export default {
  components: {
    NotLoggedInNavbar,
    LoggedInNavbar,
    AnswersList,
    AddAnswer,
    Info
  },
  data() {
    return {
      question: () => {},
      sortedBy: "date",
      keyForRerender: 1
    };
  },
  computed: {
    isLoggedIn() {
      return firebase.auth().currentUser;
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      this.question = await this.$store.dispatch("getQuestion", id);
    } catch (error) {
      throw new Error(error);
    }
  },
  methods: {
    rerenderAnswers() {
      this.keyForRerender += 1;
    }
  }
};
</script>

<style lang="css" scoped>
.content {
  padding: 1rem 2rem;
}

.question,
.text {
  text-align: left;
}

.link {
  text-decoration: none;
}

.question-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

select {
  padding: 0px 5px;
  margin-top: 2.5px;
  font-size: 15px;
  border: 3px solid #c4c4c4;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.description {
  margin-top: 2vh;
}
</style>