<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
        <v-container>
            <v-layout align-center>
                <v-flex xs6>
                    <v-text-field v-model="employee.name" label="Name" clearable>{{employee.name}}</v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model="employee.hours" label="Hours" clearable>{{employee.hours}}</v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model="employee.tips" label="Tips" disabled outline></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: 'Employees',
        props: ['employee']
    }
</script>