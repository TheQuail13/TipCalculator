<template>
     <v-container fluid grid-list-md text-xs-center>
         <v-layout column>
             <v-flex xs12 v-for="(days, index) in completedDays" :key="index">
                  <div>{{convertTimestampToDate(days.date.seconds)}}</div>
             </v-flex>
         </v-layout>
     </v-container>
</template>

<script>
import db from '../firebaseInit.js'

export default {
    data () {
        return {

        }
    },
    methods: {
        getCompletedDays: function () {
            db.collection('completedDays').get().then((query) => {
                query.forEach((doc) => {
                    this.$store.commit('setCompletedDays', doc.data())
                })
            })
        },
        convertTimestampToDate: function (timeStampSeconds) {
            var newDate = new Date(0)
            newDate.setUTCSeconds(timeStampSeconds);
            return newDate
        }
    },
    computed: {
        completedDays: {
            get () {
                return this.$store.state.completedDays
            },
            set (value) {
                this.$store.commit('setCompletedDays', value)
            }
        },
    },
    created () {
        this.getCompletedDays()
    }
}
</script>