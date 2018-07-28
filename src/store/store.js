import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        totalTips: 150,
        employees: [],
        newEmployee: {
            id: -1,
            name: '',
            hours: 0,
            tips: 0
        }
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
        },
        // calculateTips (state, payload) {
        //     for (var i = 0; i < state.employees.length; i++) {
        //         if (state.employees[i].hours > 0 && this.totalHours > 0 && state.totalTips > 0) {
        //             state.employees[i].tips = (state.employees[i].hours/this.totalHours) * state.totalTips
        //         }
        //     }
        // }
    }
})

export default store