<template>
    <v-container>
        <v-card>
            <v-container fluid grid-list-lg>
                <v-layout v-bind="binding">
                    <v-flex v-for="(employee, index) in employees" :key="index" v-if="!employee.isDeleted">
                        <v-card color="blue" class="white--text">
                            <!-- <v-card-media :src="card.src" height="200px"> -->
                            <v-container fill-height fluid pa-3>
                                <v-layout fill-height>
                                    <v-flex sm12 align-end flexbox>
                                        <span class="headline white--text" v-text="employee.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <!-- </v-card-media> -->

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="softDeleteEmployee(employee, index)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>

        <v-snackbar v-model="showSnackbar" :timeout="2000" color="success" top>{{ snackbarText }}</v-snackbar>
        <add-employee-modal :visible="showModal" @closeModal="showModal=false" @addEmployee="addEmployee"></add-employee-modal>
    </v-container>
</template>

<script>
import AddEmployeeModal from '@/components/AddEmployeeModal'
import { mapGetters } from 'vuex'
import db from '../firebaseInit.js'

export default {
    components: {
        AddEmployeeModal
    },
    data () {
        return {
            showModal: false,
            showSnackbar: false,
            snackbarText: '',
        }
    },
    methods: {
        addEmployee: function (name) {
            var newId = this.maxEmployeeId + 1

            db.collection('employees').add({
                id: newId,
                name: name
            }).then(() => {
                this.showSnackbar = true
                this.snackbarText = 'Employee Successfully Added!'
                this.getEmployeeList()
            })
        },
        softDeleteEmployee: function (employee, index) {
            console.log(employee)
            employee.isDeleted = true
            this.$store.state.workDayEmployeeInfoList.splice(index, 1, employee)
        },
        ...mapGetters([
            'maxEmployeeId'
        ])
    },
    computed: {
        employees: {
            get () {
                return this.$store.state.employees
            },
            set (value) {
                this.$store.commit('setEmployees', value)
            }
        },
        binding () {
            // this adjusts the v-layout to be row for larger screen sizes, and columns for smaller screen sizes
            const binding = {}

            if (this.$vuetify.breakpoint.mdAndUp) {
                binding.row = true
            } 
            else {
                binding.column = true
            }

            return binding
        }
    }
}
</script>