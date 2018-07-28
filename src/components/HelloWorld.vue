<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <form>
          <v-text-field v-model="totalTips" label="Total Tips" required outline></v-text-field>
        </form>
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

export default {
  components: {
    Employees
  },
  methods: {
    getEmployees: function () {
      this.employees = [
            {
              id: 1,
              name: 'Towelie',
              hours: 0,
              tips: 0
            },
            {
              id: 2,
              name: 'Washcloth',
              hours: 0,
              tips: 0
            }
          ]
    },    
    addEmployee: function () {
      this.employees.push(this.$store.state.newEmployee)
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
    }
  },
  created() {
    this.getEmployees()
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
