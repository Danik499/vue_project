<template>
  <form @submit.prevent="submitHandler" class="submit-form">
    <textarea class="text" placeholder="write your answer here" v-model="answer"></textarea>
    <br />
    <p>{{errorMessage}}</p>
    <button class="submit-btn">Submit</button>
  </form>
</template>

<script>
export default {
  name: "AddAnswer",
  data() {
    return {
      answer: "",
      errorMessage: ""
    };
  },
  methods: {
    async submitHandler() {
      try {
        if (!this.answer) {
          this.errorMessage = "Answer can't be empty";
          return;
        }
        await this.$store.dispatch("newAnswer", {
          answer: this.answer,
          id: this.$route.params.id
        });
        location.reload();
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style lang="css" scoped>
.text {
  font: 16px "Fira Sans", sans-serif;
  width: 40%;
  margin: 5px 0;
  padding: 10px;
  border: 3px solid #c4c4c4;
  border-radius: 5px;
  resize: vertical;
}

.submit-btn {
  padding: 5px 15px;
  margin-top: 2.5px;
  font-size: 16px;
  border: 3px solid #c4c4c4;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.submit-btn:hover {
  box-shadow: 0 0 10px #c4c4c4;
}

.submit-form {
  margin-top: 40px;
  text-align: left;
}
</style>