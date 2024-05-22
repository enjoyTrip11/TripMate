<template>
  <v-container fluid
  >
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true" width="100%">
      <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
    </KakaoMap>
  </v-container>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};

</script>

<style scoped>
</style>