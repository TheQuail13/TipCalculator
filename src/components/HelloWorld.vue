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
            <!-- <v-text-field v-model.number="totalHours" label="Total Hours" required outline></v-text-field> -->
            <p><Strong>Total Hours: {{totalHours}}</strong></p>
          </v-flex>
        </v-layout>
        <v-flex>
          <Employees v-for="(employee, index) in employees" :key="index" :employee="employee" :index="index"></Employees>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-btn dark fab fixed bottom right color="blue" @click="addEmployee">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import Employees from '@/components/Employees'
import { mapGetters } from 'vuex'
import db from '../firebaseInit.js'

export default {
  components: {
    Employees
  },
  methods: {
    addEmployee: function () {
      var newEmployee = {
        id: this.employees.length,
        name: '',
        hours: 0,
        tips: 0
      }
      this.employees.push(newEmployee)

      // db.collection('employees').add({
      //   employees: this.employees[0]
      // })
    },
    calculateTips: function () {
      for (var i = 0; i < this.employees.length; i++) {
          if (this.employees[i].hours > 0 && this.totalHours > 0 && this.totalTips > 0) {
              this.employees[i].tips = (this.employees[i].hours/this.totalHours) * this.totalTips
          }
      }
    },
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
    ...mapGetters([
      'totalHours'
    ])
  },
  watch: {
    totalHours: {
      handler: function () {
        this.calculateTips()
      },
      deep: true
    },
    totalTips: {
      handler: function () {
        this.calculateTips()
      }
    }
  },
  created() {
    db.collection('employees').get().then((query) => {
      query.forEach((doc) => {
        this.employees.push(doc.data())
      })
    })
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
