import Vue from 'vue'
import Vuex from 'vuex'
import questions from "./modules/questions"
import auth from "./modules/auth"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    questions, auth
  }
})
