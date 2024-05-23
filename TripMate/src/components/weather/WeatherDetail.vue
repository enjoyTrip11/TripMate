<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>{{ city }} 상세정보</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';



const city = ref('');

const fetchWeather = (city) => {
  // 여기에 날씨 정보를 가져오는 API 호출 등의 로직을 추가하세요.
  console.log(`Fetching weather data for ${city.name}...`);
};

onMounted(() => {
  const cities = [
  { name: '서울', lat: 37.5665, lon: 126.9780 },
  { name: '춘천', lat: 37.8813, lon: 127.7298 },
  { name: '강릉', lat: 37.7519, lon: 128.8761 },
  { name: '청주', lat: 36.6424, lon: 127.4890 },
  { name: '울릉/독도', lat: 37.5000, lon: 130.8714 },
  { name: '수원', lat: 37.2636, lon: 127.0286 },
  { name: '안동', lat: 36.5684, lon: 128.7294 },
  { name: '대전', lat: 36.3504, lon: 127.3845 },
  { name: '전주', lat: 35.8242, lon: 127.1480 },
  { name: '대구', lat: 35.8722, lon: 128.6014 },
  { name: '광주', lat: 35.1595, lon: 126.8526 },
  { name: '목포', lat: 34.8118, lon: 126.3926 },
  { name: '여수', lat: 34.7604, lon: 127.6622 },
  { name: '부산', lat: 35.1796, lon: 129.0756 },
  { name: '울산', lat: 35.5384, lon: 129.3114 },
  { name: '제주', lat: 33.4996, lon: 126.5312 },
];

  cities.forEach((city) => {
    fetchWeather(city);
  });
});
</script>

<style scoped>
.content {
  margin: 40px;
}

.weather-info {
  display: flex;
  align-items: center;
}

.weather-icon {
  width: 50px;
  height: 50px;
}

.weather-details {
  margin-top: 20px;
}
</style>
