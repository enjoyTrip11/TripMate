<template>
  <v-app>
    <NavBar />
    <v-main>
        <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useStore } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import { onMounted } from 'vue';

const store = useStore();

onMounted(() => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    store.dispatch('saveAccessToken', token);
  }
});
</script>

<style scoped>
</style>