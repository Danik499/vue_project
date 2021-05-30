<template>
  <div>
    <logged-in-navbar />
    <form @submit.prevent="submitHandler" id="form">
      <input type="text" id="title" placeholder="title" v-model="title" />
      <br />
      <textarea id="desc" placeholder="description" v-model="description"></textarea>
      <br />
      <p>{{errorMessage}}</p>
      <button id="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script>
import LoggedInNavbar from "@/components/LoggedInNavbar";
export default {
  components: {
    LoggedInNavbar
  },
  data() {
    return {
      title: "",
      description: "",
      errorMessage: ""
    };
  },
  methods: {
    async submitHandler() {
      if (!this.title || !this.description) {
        this.errorMessage = "All field must be filled";
        return;
      }
      try {
        const question = await this.$store.dispatch("newQuestion", {
          title: this.title,
          description: this.description
        });
        this.$router.push(`/question/${question.id}`);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style lang="css" scoped>
#form {
  margin-top: 10%;
}

#title {
  width: 40%;
  margin: 5px 0;
  font-size: 16px;
  padding: 10px;
  border: 3px solid #c4c4c4;
  border-radius: 5px;
}

#desc {
  font: 16px "Fira Sans", sans-serif;
  width: 40%;
  margin: 5px 0;
  padding: 10px;
  border: 3px solid #c4c4c4;
  border-radius: 5px;
  resize: vertical;
}

#submit-btn {
  padding: 5px 15px;
  margin-top: 2.5px;
  font-size: 16px;
  border: 3px solid #c4c4c4;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

#submit-btn:hover {
  box-shadow: 0 0 10px #c4c4c4;
}
</style>