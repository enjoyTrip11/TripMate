<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <NavBar />
      <!--MainPage /-->
      <v-main>
        <RouterView></RouterView>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MainPage from './views/MainPage.vue';

export default {
  components: {
    NavBar,
    MainPage,
  },
};
</script>

<style scoped>
</style>