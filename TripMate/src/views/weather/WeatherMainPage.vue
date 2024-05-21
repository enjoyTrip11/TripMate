<template>
  <v-container fluid>
     <!-- 날씨 정보 제목 -->
     <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">날씨 정보</h1>
                <hr>
            </v-col>
        </v-row>

    <v-row>
      <v-col cols="5" class="no-padding">
        <WeatherMap />
      </v-col>
      <v-col cols="7" class="no-padding">
        <WeatherDetail />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import WeatherMap from '@/components/weather/WeatherMap.vue'
import WeatherDetail from '@/components/weather/WeatherDetail.vue'
</script>

<style scoped>
</style>
