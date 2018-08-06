<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link class="link" :to="item.link">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import db from './firebaseInit.js'

export default {
  name: 'App',
  data () {
    return {
      clipped: true,
      drawer: false,
      items: [{
        icon: 'history',
        title: 'History',
        link: '/history'
        },
        {
        icon: 'people',
        title: 'Employee Management',
        link: '/employeeManagement'
        }],
      miniVariant: false,
      title: 'Just The Tip',
      employeeObject: {
        name: '',
        hours: 0,
        tips: 0,
        isDeleted: false,
        firestoreDocId: ''
      }
    }
  },
  methods: {
    getEmployeeList: function () {
      // clear array
      this.workDayEmployeeInfoList.length = 0

      // get data from Firestore and populate store
      db.collection('employees').get().then((query) => {
        query.forEach((doc) => {
          this.employeeObject = {
            name: doc.data().name,
            isDeleted: doc.data().isDeleted,
            hours: 0,
            tips: 0,
            firestoreDocId: doc.id
          }
          
          this.$store.commit('setEmployees', doc.data())
          this.$store.commit('setWorkDayEmployeeInfoList', this.employeeObject)
        })
      })
    }
  },
  computed: {
    workDayEmployeeInfoList: {
      get () {
        return this.$store.state.workDayEmployeeInfoList
      },
      set (value) {
        this.$store.commit('setWorkDayEmployeeInfoList', value)
      }
    },
  },
  created() {
    this.getEmployeeList()
  }
}
</script>

<style scoped>
  .link {
    text-decoration-line: none;
  }
</style>