<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <form>
          <v-text-field v-model="tipTotal" label="Tips" required></v-text-field>
        </form>
        <v-flex>
          <user v-for="user in users" :key="user.id" v-bind:user="user"></user>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-btn absolute dark fab bottom right color="blue" @click="addUser">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import User from '@/components/User'

export default {
  components: {
    User
  },
  data () {
    return {
      tipTotal: 0,
      hoursTotal: 0,
      users: [
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
    }
  },
  methods: {
    getUsers: function () {
      console.log('Return user info here')
    },    
    addUser: function () {
      
    }
  },
  created() {
    this.getUsers()
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
