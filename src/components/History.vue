<template>
     <v-container fluid grid-list-md text-xs-center>
         <v-layout column>
             <v-flex xs12 v-for="(day, index) in completedDays" :key="index">
                 <v-card>
                     <v-card-title primary-title>
                         <div>
                            <div class="headline">{{convertTimestampToDate(day.date.seconds)}}</div>
                            <div class="grey--text">Total Hours: {{sumHours(day.employees)}}</div>
                            <div class="grey--text">Total Tips: {{formatAsCurrency(sumTips(day.employees))}}</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="blue">View Details</v-btn>
                    </v-card-actions>
                 </v-card>
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
            return newDate.toLocaleDateString("en-US")
        },
        sumHours: function (day) {
            return day.reduce((total, emp) => total + emp.hours, 0)
        },
        sumTips: function (day) {
            return day.reduce((total, emp) => total + emp.tips, 0)
        },
        formatAsCurrency (value) {
            var formatter = new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            })

            return formatter.format(value)
        },
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