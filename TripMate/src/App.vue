<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <NavBar />
      <router-view />
    </v-layout>
  </v-app>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<style scoped>
</style>
