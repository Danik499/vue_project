import Vue from 'vue'
import VueRouter from 'vue-router'
import Registration from "@/views/Registration"
import Login from "@/views/Login"
import MyQuestions from "@/views/MyQuestions"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/registration",
    component: Registration
  },
  {
    path: "/my_questions",
    name: "MyQuestions",
    component: MyQuestions
  },
  {
    path: "/new_question",
    name: "NewQuestion",
    component: () => import("@/views/NewQuestion")
  },
  {
    path: "/question/:id",
    name: "Question",
    component: () => import("@/views/QuestionPage")
  },
  {
    path: "/:page",
    name: "Main",
    component: () => import("@/views/Main")
  },
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/Main")
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
