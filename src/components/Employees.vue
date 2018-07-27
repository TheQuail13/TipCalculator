<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap align-center>
        <v-container>
            <v-layout align-center>
                <v-flex xs6>
                    <v-text-field v-model="employee.name" label="Name" clearable></v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field v-model.number="employee.hours" @change="updateEmployeeList(employee, index)" label="Hours" clearable></v-text-field>
                </v-flex>
                <v-flex xs3>
                    <p>Tips: {{formatAsCurrency(employee.tips)}}</p>
                </v-flex>
            </v-layout>
        </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    name: 'Employees',
    props: ['employee', 'index'],
    methods: {
        calculateTipsPerEmployee(employeesHours, totalHours, totalTips) {
            if (employeesHours > 0 && totalHours > 0 && totalTips > 0) {
                this.employee.tips = (employeesHours/totalHours) * totalTips
            }
        },
        updateEmployeeList(employee, index) {                
            this.$store.state.employees.splice(index, 1, employee)
            this.calculateTipsPerEmployee(employee.hours, this.$store.getters.totalHours, this.$store.state.totalTips)
        },
        formatAsCurrency (value) {
            var formatter = new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            })

            return formatter.format(value)
        },
    }
}
</script>