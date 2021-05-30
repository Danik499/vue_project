import firebase from "firebase/app"

export default {
    state: {
        loading: false,
        error: null,
    },
    getters: {
        loading: state => state.loading,
        error: state => state.error,
    },
    mutations: {
        setLoading: (state, loadingState) => state.loading = loadingState,
        setError: (state, errorState) => state.error = errorState,
    },
    actions: {
        async login({ commit, dispatch }, { email, password }) {
            try {
                commit("setLoading", true)
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
                dispatch("buildError", e.code)
                throw new Error(e)
            } finally {
                commit("setLoading", false)
            }
        },
        async registration({ commit, dispatch }, { email, password, name }) {
            try {
                commit("setLoading", true)
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const allUsers = (await firebase.database().ref("users").once("value")).val() || {}
                let usersId = Object.keys(allUsers)
                for (let id of usersId) {
                    if (name === allUsers[`${id}`].info.name) {
                        dispatch("buildError", { message: "The name must be unique" })
                        throw new Error()
                    }
                }
                console.log(name)
                const uid = await dispatch("getUid")
                await firebase.database().ref(`users/${uid}/info`).set({
                    name
                })
            } catch (e) {
                dispatch("buildError", e.code)
                throw new Error(e)
            } finally {
                commit("setLoading", false)
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout() {
            try {
                firebase.auth().signOut()
            } catch (error) {
                throw new Error(error)
            }
        },
        buildError({ commit }, message) {
            console.log(message)
            if (message === "auth/user-not-found" || message === "auth/wrong-password")
                commit("setError", "Wrong email or password")
            else if (message === "auth/email-already-in-use")
                commit("setError", "Such email is already in use")
            else if (message.message === "The name must be unique")
                commit("setError", "The name must be unique")
            else commit("setError", "Something went wrong")
        },
        async getUserName({ dispatch }) {
            try {
                return (await firebase.database().ref(`users/${await dispatch("getUid")}/info/name`).once("value")).val()
            } catch (error) {
                throw new Error(error)
            }
        }
    },

}