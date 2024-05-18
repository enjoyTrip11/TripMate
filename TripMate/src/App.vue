<template>
  <v-app>
    <router-view></router-view>
    <NavBar />
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h1>메인 페이지</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style scoped>
</style>