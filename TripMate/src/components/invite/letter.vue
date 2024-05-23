<template>
    <v-card class="invitation-card">
      <v-card-title>
        초대장
      </v-card-title>
      <v-card-text>
        <p>{{ message }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" @click="rejectInvitation">거절</v-btn>
        <v-btn color="green" @click="acceptInvitation">승낙</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    },
    methods: {
      rejectInvitation() {
        this.$emit('reject');
      },
      acceptInvitation() {
        this.$emit('accept');
      }
    }
  }
  </script>
  
  <style scoped>
  .invitation-card {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
  }
  </style>
  