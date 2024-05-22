<template>
  <v-container fluid>
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" width="100%">
      <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>
  </v-container>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const coordinate = {
  lat: 37.501328668708,
  lng: 127.03953821497
};
</script>

<style scoped>
.v-container--fluid {
  max-width: 100%;
  margin: 0;
  padding: 0;
}
</style>
