<template>
  <div>
    <not-logged-in-navbar />
    <form id="form" @submit.prevent="submitHandler">
      <input type="email" placeholder="email" class="form-input" v-model="email" />
      <br />
      <input type="text" placeholder="name" class="form-input" v-model="name" />
      <br />
      <input type="password" placeholder="password" class="form-input" v-model="password" />
      <br />
      <input
        type="password"
        placeholder="confirm password"
        class="form-input"
        v-model="confirmPassword"
      />
      <br />
      <loader class="loader" v-if="loading" />
      <p>{{errorMessage}}</p>
      <button class="submit-btn">Registration</button>
    </form>
  </div>
</template>

<script>
import NotLoggedInNavbar from "@/components/NotLoggedInNavbar";
import Loader from "@/components/Loader";
import { mapGetters } from "vuex";

export default {
  components: {
    NotLoggedInNavbar,
    Loader
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      errorMessage: ""
    };
  },
  computed: mapGetters(["loading", "error"]),
  methods: {
    async submitHandler() {
      if (
        !this.email ||
        !this.name ||
        !this.password ||
        !this.confirmPassword
      ) {
        this.errorMessage = "All fields must be filled";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "passwords do not match";
        return;
      }
      try {
        await this.$store.dispatch("registration", {
          email: this.email,
          password: this.password,
          name: this.name
        });
        this.$router.push("/my_questions");
      } catch (error) {
        console.log(this.error);
        this.errorMessage = this.error;
        console.log(this.errorMessage);
      }
    }
  }
};
</script>

<style lang="css" scoped>
#form {
  margin-top: 10%;
}

.form-input {
  margin: 5px 0;
  font-size: 16px;
  padding: 10px;
  border: 3px solid #c4c4c4;
  border-radius: 5px;
  width: 35%;
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

.loader {
  width: 95px !important;
  margin: 0 auto;
  padding-top: 10px;
}
</style>