<template>
  <div class="container">
    <div v-for="(answer, index) in answers" :key="index">
      <div class="answer-text">{{answer.answer}}</div>
      <br />
      <info :name="answer.author" :id="answer.id" kind="answer" class="info" />
      <hr />
    </div>
  </div>
</template>

<script>
import Info from "@/components/Info";

export default {
  name: "AnswersList",
  components: {
    Info
  },
  props: {
    answersProp: {
      type: Object,
      default: () => {}
    },
    sortedBy: {
      type: String,
      default: "date"
    }
  },
  data() {
    return {
      answersId: () => [],
      answers: this.answersProp,
      sortedByDate: () => []
    };
  },
  computed: {
    answersList() {
      let result = {};
      Object.keys(this.answers)
        .reverse()
        .forEach(index => (result[index] = this.answers[index]));
      return result;
    }
  },
  mounted() {
    this.answersId = Object.keys(this.answersList);
    this.answers = this.answersId.map(e => this.answersList[e]);
    this.answers.forEach((e, i) => (e.id = this.answersId[i]));
    this.sortedByDate = this.answers;
    this.sortBy(this.sortedBy);
  },
  methods: {
    sortBy(kind) {
      if (kind === "points")
        this.answers.sort((a, b) => (a.points > b.points ? -1 : 1));
      else if (kind === "date") this.answers = this.sortedByDate;
      else throw new Error(`Kind ${kind} does not exist`);
    }
  }
};
</script>

<style lang="css" scoped>
.answer-text,
.info {
  text-align: left;
}

.answer-text {
  margin-top: 2vh;
}

.container {
  width: 98%;
  margin: 0 auto;
}
</style>