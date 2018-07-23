import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        totalTips: 0,
        employees: []
    },
    mutations: {
        setTotalTips (state, payload) {
            state.totalTips = payload
        },
        setEmployees (state, payload) {
            state.employees = payload
        }
    }
})

export default store