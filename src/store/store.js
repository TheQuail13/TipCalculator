import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        totalTips: 150,
        employees: []
    },
    getters: {
        totalHours(state) {
            return state.employees.reduce((total, emp) => total + emp.hours, 0);
        },
        totalCalculatedTips(state) {
            return state.employees.reduce((total, emp) => total + emp.tips, 0);
        }
    },
    mutations: {
        setTotalTips (state, payload) {
            state.totalTips = payload
        },
        setTotalHours (state, payload) {
            state.totalHours = payload
        },
        setEmployees (state, payload) {
            state.employees = payload
        }
    }
})

export default store