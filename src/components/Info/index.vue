<template>
  <div>
    <div v-if="voted">
      <span>Posted by {{name}}</span>
      |
      <span>{{date}}</span>
      |
      <span v-on:click="upvote" class="vote" :class="{voted: voted == 'up'}">upvote&nbsp;</span>
      |
      <span
        v-on:click="downvote"
        class="vote"
        :class="{voted: voted == 'down'}"
      >downvote&nbsp;</span>
      |
      <span>{{points}} points</span>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Info",
  data() {
    return {
      points: 0,
      voted: "",
      date: ""
    };
  },
  computed: {
    isLoggedIn() {
      return firebase.auth().currentUser;
    }
  },
  props: {
    name: {
      type: String,
      default: "user"
    },
    id: {
      type: String,
      default: ""
    },
    kind: {
      type: String,
      default: ""
    }
  },
  methods: {
    async upvote() {
      if (!this.isLoggedIn) {
        this.$router.push("/login");
        return;
      }
      if (this.voted === "up") {
        this.points--;
        this.voted = " ";
      } else {
        if (this.voted === "down") this.points++;
        this.points++;
        this.voted = "up";
      }
      await this.$store.dispatch("vote", {
        voted: this.voted,
        kind: this.kind,
        id: this.id,
        points: this.points,
        questionId: this.$route.params.id
      });
    },
    async downvote() {
      if (!this.isLoggedIn) {
        this.$router.push("/login");
        return;
      }
      if (this.voted === "down") {
        this.points++;
        this.voted = " ";
      } else {
        if (this.voted === "up") this.points--;
        this.points--;
        this.voted = "down";
      }
      await this.$store.dispatch("vote", {
        voted: this.voted,
        kind: this.kind,
        id: this.id,
        points: this.points,
        questionId: this.$route.params.id
      });
    }
  },
  async mounted() {
    try {
      [this.points, this.date] =
        (await this.$store.dispatch("getInfo", {
          kind: this.kind,
          id: this.id,
          questionId: this.$route.params.id
        })) || 0;
      this.voted = (await this.$store.dispatch("isVoted", this.id)) || " ";
    } catch (error) {
      throw new Error(error);
    }
  }
};
</script>

<style lang="css" scoped>
.voted {
  color: orange;
}

.vote {
  cursor: pointer;
}
</style>