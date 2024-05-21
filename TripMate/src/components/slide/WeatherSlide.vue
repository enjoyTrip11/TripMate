<template>
  <v-container fluid class="content">
    <v-row>
      <!-- 설명 영역 -->
      <v-col cols="5" offset="1">
        <h1 class="main-title">{{ descriptionLine1 }}</h1>
        <h1 class="main-title">{{ descriptionLine2 }}</h1>
        <div class="mt-4"></div>

        <div>
          <small>{{ location }}</small>
          <h2>{{ time }} <span class="weather">{{ weather }}</span> 미세먼지 <span class="air-condition">{{ airQuality }}</span></h2>
        </div>
        <div class="mt-10"></div>
        <router-link :to="{name:'weather'}">
        <v-btn color="primary">날씨 정보 더보기</v-btn>
      </router-link>
      </v-col>

      <!-- 이미지 영역 -->
      <v-col cols="4" offset="1" class="image-column">
        <v-img :src="weatherImage" alt="Weather Image" class="weather-image"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import summerImage from '@/assets/img/weather/summer.png';
import snowImage from '@/assets/img/weather/snow.png';
import rainyImage from '@/assets/img/weather/rainy.png';
import defaultImage from '@/assets/img/weather/summer.png';

export default {
  data() {
    return {
      descriptionLine1: '바다 수영 전',
      descriptionLine2: '선크림은 필수!',
      location: '위치 정보를 가져오는 중...',
      time: '오전',
      weather: '맑음',
      airQuality: '좋음',
      weatherImage: summerImage // 기본 이미지 설정
    };
  },
  methods: {
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            await this.reverseGeocode(lat, lng);
          },
          (error) => {
            console.error('Error getting location:', error);
            this.location = '위치 정보를 가져올 수 없습니다.';
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        this.location = '위치 정보를 가져올 수 없습니다.';
      }
    },
    async reverseGeocode(lat, lng) {
      const API_KEY = 'AIzaSyCbS8vLn5Eiq3QUbqwwoR1iCLr3yGAVsCI'; // 여기에 Google Maps API 키를 입력하세요
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
        );
        console.log('역 지오코딩 응답:', response.data); // 응답 데이터를 콘솔에 출력
        if (response.data.status === 'OK') {
          const results = response.data.results;
          if (results.length > 0) {
            const addressComponents = results[0].address_components;
            let city = '';
            let district = '';
            let subdistrict = '';

            addressComponents.forEach((component) => {
              if (component.types.includes('administrative_area_level_1')) {
                city = component.long_name; // 시도 정보
              }
              if (component.types.includes('administrative_area_level_2')) {
                district = component.long_name; // 구 정보
              }
              if (component.types.includes('sublocality_level_1') || component.types.includes('locality')) {
                subdistrict = component.long_name; // 동 정보
              }
            });

            this.location = `${city} ${district} ${subdistrict}`;
          } else {
            console.log('No results found');
            this.location = '위치 정보를 가져올 수 없습니다.';
          }
        } else {
          console.error('Geocoding failed:', response.data.status);
          this.location = '위치 정보를 가져올 수 없습니다.';
        }
      } catch (error) {
        console.error('Error during geocoding request:', error);
        this.location = '위치 정보를 가져올 수 없습니다.';
      }
    },
    getWeatherImage(weather) {
      switch (weather) {
        case '눈':
          return snowImage;
        case '비':
          return rainyImage;
        default:
          return defaultImage;
      }
    }
  },
  mounted() {
    this.getCurrentLocation();
  }
};
</script>

<style scoped>
.content {
  margin: 40px;
}

.main-title {
  font-size: 55px;
  font-weight: bold;
  margin: 0;
  margin-bottom: -20px;
}
.weather-image {
  width: 100%;
  max-height: 500vh; /* 이미지의 최대 높이 설정 */
  margin: auto; /* 가운데 정렬 */
}
.weather {
  color: rgb(75, 179, 232); /* 파란색으로 설정 */
}
.air-condition {
  color: rgb(100, 238, 90); /* 녹색으로 설정 */
}
</style>
