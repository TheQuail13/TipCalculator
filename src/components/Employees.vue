<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
        <v-container>
            <v-layout align-center>
                <v-flex xs6>
                    <v-text-field v-model="employee.name" label="Name" clearable></v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model.number="hours" @change="updateEmployeeList(employee, index)" label="Hours" clearable></v-text-field>
                </v-flex>
                <v-flex xs3>
                    <p><strong>Tips: {{formatAsCurrency(tips)}}</strong></p>
                </v-flex>
                <v-btn fab dark small color="pink" @click="deleteUser(index)">
                    <v-icon dark>remove</v-icon>
                </v-btn>
            </v-layout>
        </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    props: ['employee', 'index'],
    data () {
        return {
            hours: 0,
            tips: 0,
            employeeObject: {}
        }
    },
    methods: {
        calculateTipsPerEmployee(employeesHours, totalHours, totalTips) {
            if (employeesHours > 0 && totalHours > 0 && totalTips > 0) {
                this.employee.tips = (employeesHours/totalHours) * totalTips
            }
        },
        updateEmployeeList(employee, index) {      
            this.employeeObject = {
                name: this.employee.name,
                hours: this.hours,
                tips: this.tips
            }        
            this.$store.state.workDayEmployeeInfoList.splice(index, 1, this.employeeObject)
            console.log(this.$store.state.workDayEmployeeInfoList)
            // this.calculateTipsPerEmployee(employee.hours, this.$store.getters.totalHours, this.$store.state.totalTips)
        },
        formatAsCurrency (value) {
            var formatter = new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            })

            return formatter.format(value)
        },
        deleteUser (index) {
            this.$store.state.employees.splice(index, 1)
        }
    },
}
</script>