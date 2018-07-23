<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <form>
          <v-text-field v-model="totalTips" label="Total Tips" required outline></v-text-field>
        </form>
        <v-flex>
          <Employees v-for="employee in employees" :key="employee.id" v-bind:employee="employee"></Employees>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-btn absolute dark fab bottom right color="blue" @click="addEmployee">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import Employees from '@/components/Employees'

export default {
  components: {
    Employees
  },
  data () {
    return {
      hoursTotal: 0
    }
  },
  methods: {
    getEmployees: function () {
      this.employees = [
            {
              id: 1,
              name: 'Towelie',
              hours: 6,
              tips: 0
            },
            {
              id: 2,
              name: 'Washcloth',
              hours: 8,
              tips: 0
            }
          ]
    },    
    addEmployee: function () {
      
    }
  },
  created() {
    this.getEmployees()
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
      }
    }
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
