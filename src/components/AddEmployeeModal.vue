<template>
  <v-layout row justify-center>
    <v-dialog v-model="showModal" persistent max-width="250px">
      <v-card>
        <v-card-title>
          <span class="headline">Add User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Name" v-model="name" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.stop="showModal=false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="saveNewEmployee">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
    props: [
        'visible'
    ],
    data () {
        return {
            name: ''
        }
    },
    methods: {
        saveNewEmployee: function () {
            this.showModal = false
            this.$emit('addEmployee', this.name)
        }
    },
    computed: {
        showModal: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('closeModal')
                }
            }
        }
    }
}
</script>