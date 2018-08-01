<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
        <v-container>
            <v-layout align-center>
                <v-flex xs5>
                    <v-text-field v-model="employee.name" label="Name" clearable></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field v-model.number="employee.hours" @change="updateEmployeeData(employee.hours, index)" label="Hours" clearable></v-text-field>
                </v-flex>
                <v-flex xs3>
                    <p><strong>Tips: {{formatAsCurrency(employee.tips)}}</strong></p>
                </v-flex>
                <v-btn class="button-override" fab dark small color="pink" @click="deleteUser(index)">
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
    methods: {
        calculateTipsPerEmployee(employeesHours, totalHours, totalTips) {
            if (employeesHours > 0 && totalHours > 0 && totalTips > 0) {
                this.employee.tips = (employeesHours/totalHours) * totalTips
            }
        },
        updateEmployeeData(employee, index) {      
            console.log(this.employee)
            this.$store.state.workDayEmployeeInfoList.splice(index, 1, this.employee)
            this.calculateTipsPerEmployee(this.employee.hours, this.$store.getters.totalHours, this.$store.state.totalTips)
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
            this.$store.state.workDayEmployeeInfoList.splice(index, 1)
        }
    },
}
</script>

<style scoped>
    .button-override {
        height: 35px;
        width: 35px;
    }
</style>