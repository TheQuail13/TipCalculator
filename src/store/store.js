import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        totalTips: 150,
        employees: [],
        workDayEmployeeInfoList: []
    },
    getters: {
        totalHours(state) {
            return state.workDayEmployeeInfoList.reduce((total, emp) => total + emp.hours, 0)
        },
        // totalCalculatedTips(state) {
        //     return state.employees.map(employee => employee.employees).reduce((total, emp) => total + emp.tips, 0);
        // }
    },
    mutations: {
        setTotalTips (state, payload) {
            state.totalTips = payload
        },
        setTotalHours (state, payload) {
            state.totalHours = payload
        },
        setEmployees (state, payload) {
            state.employees.push(payload)
        },
    }
})

export default store