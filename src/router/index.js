import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import EmployeeManagement from '@/components/EmployeeManagement'
import History from '@/components/History'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/employeeManagement',
      name: 'EmployeeManagement',
      component: EmployeeManagement
    },
    {
      path: '/history',
      name: 'History',
      component: History
    }
  ]
})
