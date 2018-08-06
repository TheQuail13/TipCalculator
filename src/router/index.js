import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import EmployeeManagement from '@/components/EmployeeManagement'

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
      component: EmployeeManagement
    }
  ]
})
