<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <v-layout row align-center>
          <v-flex xs6>
            <v-text-field v-model.number="totalTips" label="Total Tips" required outline></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6>
            <p><Strong>Total Hours: {{totalHours}}</strong></p>
          </v-flex>
        </v-layout>
        <v-flex>
          <Employees v-for="(employee, index) in this.workDayEmployeeInfoList" :key="index" :employee="employee" :index="index"></Employees>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>

    <v-snackbar v-model="showSnackbar" :timeout="2000" color="success" top>{{ snackbarText }}</v-snackbar>

    <v-speed-dial fixed bottom right slide-y-reverse-transition>
      <v-btn slot="activator" color="blue darken-2" dark fab>
        <v-icon>account_circle</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn fab dark small color="green" @click="saveWorkDay">
        <v-icon>check</v-icon>
      </v-btn>
      <v-btn fab dark small color="blue" @click.stop="showModal=true">
        <v-icon>person_add</v-icon>
      </v-btn>
    </v-speed-dial>
    <add-user-modal :visible="showModal" @closeModal="showModal=false" @addEmployee="addEmployee"></add-user-modal>
  </v-container>
</template>

<script>
import Employees from '@/components/Employees'
import AddUserModal from '@/components/AddUserModal'
import { mapGetters } from 'vuex'
import db from '../firebaseInit.js'

export default {
  components: {
    Employees,
    AddUserModal
  },
  data () {
    return {
      showModal: false,
      showSnackbar: false,
      snackbarText: '',
      employeeObject: {
        name: '',
        hours: 0,
        tips: 0
      }
    }
  },
  methods: {
    calculateTips: function () {
      for (var i = 0; i < this.workDayEmployeeInfoList.length; i++) {
          if (this.workDayEmployeeInfoList[i].hours > 0 && this.totalHours > 0 && this.totalTips > 0) {
              this.workDayEmployeeInfoList[i].tips = (this.workDayEmployeeInfoList[i].hours/this.totalHours) * this.totalTips
          }
      }
    },
    addEmployee: function (name) {
      var newId = this.maxEmployeeId + 1

      db.collection('employees').add({
        id: newId,
        name: name
      }).then(() => {
        this.showSnackbar = true
        this.snackbarText = 'Employee Successfully Added!'
        this.getEmployeeList()
      })
    },
    deleteEmployee: function () {
      // logic here
    },
    getEmployeeList: function () {
      // clear array
      this.workDayEmployeeInfoList.length = 0

      // get data from Firestore and populate store
      db.collection('employees').get().then((query) => {
        query.forEach((doc) => {
          this.employeeObject = {
            name: doc.data().name,
            hours: 0,
            tips: 0
          }
          this.$store.commit('setEmployees', doc.data())
          this.$store.commit('setWorkDayEmployeeInfoList', this.employeeObject)
        })
      })
    },
    saveWorkDay: function () {
      db.collection('completedDays').add({
        date: new Date(),
        employees: this.workDayEmployeeInfoList
      }).then(() => {
        this.showSnackbar = true
        this.snackbarText = 'Employee Successfully Added!'
        }
      )
    }
  },
  computed: {
    totalTips: {
      get () {
        return this.$store.state.totalTips
      },
      set (value) {
        this.$store.commit('setTotalTips', value)
      }
    },
    employees: {
      get () {
        return this.$store.state.employees
      },
      set (value) {
        this.$store.commit('setEmployees', value)
      },
    },
    workDayEmployeeInfoList: {
      get () {
        return this.$store.state.workDayEmployeeInfoList
      },
      set (value) {
        this.$store.commit('setWorkDayEmployeeInfoList', value)
      },
    },
    ...mapGetters([
      'totalHours',
      'totalCalculatedTips',
      'maxEmployeeId'
    ])
  },
  watch: {
    totalHours: {
      handler: function () {
        this.calculateTips()
      },
      deep: true
    },
    totalCalculatedTips: {
      handler: function () {
        this.calculateTips()
      }
    },
    workDayEmployeeInfoList: {
      handler: function () {
        this.calculateTips()
      },
      deep: true
    }
  },
  created() {
    this.getEmployeeList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
