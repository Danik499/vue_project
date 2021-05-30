import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "./assets/styles.scss"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
console.log(process.env)
firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
})

Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
