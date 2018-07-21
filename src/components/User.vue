<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center justify-center>
        <v-container>
            <v-layout align-center justify-center>
                <v-flex xs6>
                    <v-text-field v-model="user.name" label="Name" clearable>{{user.name}}</v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model="user.hours" label="Hours" clearable>{{user.hours}}</v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model="user.tips" label="Tips" outline readonly>{{user.tips}}</v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: 'User',
        props: ['user']
    }
</script>