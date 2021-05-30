import firebase from "firebase/app"

export default {
    actions: {
        async getQuestions({ commit }, page) {
            page = page ? parseInt(page) : 1
            const questions = (await firebase.database().ref("questions").once("value")).val() || {},
                ques = Object.keys(questions).map(key => ({ ...questions[key], id: key })),
                firstIndex = (page - 1) * 10,
                lastIndex = firstIndex + 10,
                questionsList = ques.slice(firstIndex, lastIndex),
                isLast = !ques[lastIndex]
            commit("updateQuestions", { questionsList, isLast })
        },
        async getQuestion(ctx, id) {
            let question = (await firebase.database().ref(`questions/${id}`).once("value")).val()
            return { ...question, id }
        },
        async newQuestion({ dispatch }, { title, description }) {
            try {
                const userId = await dispatch("getUid")
                const author = await dispatch("getUserName")
                const response = await firebase.database().ref("questions").push({
                    title,
                    description,
                    author,
                    points: 0,
                    date: new Date().toLocaleDateString()
                })
                const str = JSON.stringify(response).split("/")
                const id = str[str.length - 1].slice(0, -1)
                const questionsList = (await firebase.database().ref(`users/${userId}/questionsList`).once("value")).val() || []
                await firebase.database().ref(`users/${userId}/questionsList`).set([...questionsList, id])
                return { title, description, id }
            } catch (error) {
                throw new Error(error)
            }
        },
        async userQuestions({ commit }) {
            const allQuestions = (await firebase.database().ref("questions").once("value")).val()
            const userQuestions = (await firebase.database().ref(`users/${firebase.auth().currentUser.uid}/questionsList`).once("value")).val() || []
            const result = []
            for (let id of userQuestions) {
                result.push({ ...allQuestions[`${id}`], id })
            }
            commit("updateUserQuestions", { questionsList: result, isLast: true })
        },
        async newAnswer({ dispatch }, { answer, id }) {
            try {
                const author = await dispatch("getUserName")
                await firebase.database().ref(`questions/${id}/answers`).push({
                    answer,
                    author,
                    points: 0,
                    date: new Date().toLocaleDateString()
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        async vote({ dispatch }, { voted, kind, id, points, questionId }) {
            try {
                const userId = await dispatch("getUid")
                const currentUser = await firebase.database().ref(`users/${userId}`)
                const itemVoted = (await currentUser.once("value")).val().voted || {}
                itemVoted[`${id}`] = voted
                if (kind === "question") {
                    const db = await firebase.database().ref(`questions/${id}`)
                    const question = (await db.once("value")).val()
                    await db.set({
                        ...question, points
                    })
                }
                else if (kind === "answer") {
                    const db = await firebase.database().ref(`questions/${questionId}/answers/${id}`)
                    const answer = (await db.once("value")).val()
                    await db.set({
                        ...answer, points
                    })
                }
                else throw new Error("Such kind does not exist")
                const user = (await currentUser.once("value")).val()
                await currentUser.set({
                    ...user, voted: itemVoted
                })
            } catch (e) {
                console.log(e)
            }
        },
        async isVoted({ dispatch }, id) {
            try {
                const uid = await dispatch("getUid")
                const votedList = (await firebase.database().ref(`users/${uid}/voted`).once("value")).val() || []
                return votedList[id]
            } catch (error) {
                throw new Error(error)
            }
        },
        async getInfo(ctx, { kind, id, questionId }) {
            if (kind === "question") {
                const response = (await firebase.database().ref(`questions/${id}`).once("value")).val()
                return [response.points, response.date]
            }
            else if (kind === "answer") {
                const response = (await firebase.database().ref(`questions/${questionId}/answers/${id}`).once("value")).val()
                return [response.points, response.date]
            }
            else throw new Error("Such kind does not exist")
        }
    },
    mutations: {
        updateQuestions(state, { questionsList, isLast }) {
            state.questionsList = { questionsList, isLast }
        },
        updateUserQuestions(state, { questionsList, isLast }) {
            state.userQuestions = { questionsList, isLast }
        }
    },
    state: {
        questionsList: () => { },
        userQuestions: () => { }
    },
    getters: {
        questions(state) {
            return state.questionsList
        },
        userQuestions(state) {
            return state.userQuestions
        }
    }
}