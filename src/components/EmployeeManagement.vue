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

        <v-snackbar v-model="showSnackbar" :timeout="1500" color="success" top>{{ snackbarText }}</v-snackbar>
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
            employeeInfoObject: {
                name: '',
                hours: 0,
                tips: 0,
                isDeleted: false
            },
            employeeObject: {
                name: '',
                id: 0,
                isDeleted: false,
                firestoreDocId: ''
            }
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
                this.snackbarText = 'Employee Added!'
                this.getEmployeeList()
            })
        },
        softDeleteEmployee: function (employee, index) {
            employee.isDeleted = true

            // update firestore
            db.collection('employees').doc(employee.firestoreDocId.toString()).update({
                isDeleted: true
            }).then(() => {
                this.showSnackbar = true
                this.snackbarText = 'Employee Deleted.'
            })
        },
        getEmployeeList: function () {
            // clear array
            this.workDayEmployeeInfoList.length = 0
            this.employees.length = 0

            // get data from Firestore and populate store
            db.collection('employees').get().then((query) => {
                query.forEach((doc) => {
                this.employeeInfoObject = {
                    name: doc.data().name,
                    isDeleted: doc.data().isDeleted,
                    hours: 0,
                    tips: 0
                }

                this.employeeObject = {
                    name: doc.data().name,
                    id: doc.data().id,
                    isDeleted: doc.data().isDeleted,
                    firestoreDocId: doc.id
                }

                this.$store.commit('setEmployees', this.employeeObject)
                this.$store.commit('setWorkDayEmployeeInfoList', this.employeeInfoObject)
                })
            })
        }
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
        workDayEmployeeInfoList: {
            get () {
                return this.$store.state.workDayEmployeeInfoList
            },
            set (value) {
                this.$store.commit('setWorkDayEmployeeInfoList', value)
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
        },
        ...mapGetters([
            'maxEmployeeId'
        ])
    }
}
</script>