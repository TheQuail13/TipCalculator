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
        totalHours (state) {
            return state.workDayEmployeeInfoList.reduce((total, emp) => total + emp.hours, 0)
        },
        totalCalculatedTips (state) {
            return state.workDayEmployeeInfoList.reduce((total, emp) => total + emp.tips, 0)
        },
        maxEmployeeId (state) {
            var map = state.employees.map((emp) => { return emp.id })
            return Math.max.apply(Math, map)
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
            state.employees.push(payload)
        },
        setWorkDayEmployeeInfoList (state, payload) {
            state.workDayEmployeeInfoList.push(payload)
        }
    }
})

export default store