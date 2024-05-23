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
        <router-link :to="{ name: 'weather' }">
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
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import summerImage from '@/assets/img/weather/summer.png';
import snowImage from '@/assets/img/weather/snow.png';
import rainyImage from '@/assets/img/weather/rainy.png';
import defaultImage from '@/assets/img/weather/summer.png';

export default {
  setup() {
    const descriptionLine1 = ref('바다 수영 전');
    const descriptionLine2 = ref('선크림은 필수!');
    const location = ref('위치 정보를 가져오는 중...');
    const time = ref('오전');
    const weather = ref('맑음');
    const airQuality = ref('좋음');
    const weatherImage = ref(summerImage);

    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      location.value = storedLocation;
    }

    const getCurrentLocation = () => {
      if (!storedLocation) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              await reverseGeocode(lat, lng);
            },
            (error) => {
              console.error('Error getting location:', error);
              location.value = '위치 정보를 가져올 수 없습니다.';
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          location.value = '위치 정보를 가져올 수 없습니다.';
        }
      }
    };

    const reverseGeocode = async (lat, lng) => {
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

            location.value = `${city} ${district} ${subdistrict}`;
            localStorage.setItem('location', location.value);
          } else {
            console.log('No results found');
            location.value = '위치 정보를 가져올 수 없습니다.';
          }
        } else {
          console.error('Geocoding failed:', response.data.status);
          location.value = '위치 정보를 가져올 수 없습니다.';
        }
      } catch (error) {
        console.error('Error during geocoding request:', error);
        location.value = '위치 정보를 가져올 수 없습니다.';
      }
    };

    const getWeatherImage = (weather) => {
      switch (weather) {
        case '눈':
          return snowImage;
        case '비':
          return rainyImage;
        default:
          return defaultImage;
      }
    };

    weatherImage.value = getWeatherImage(weather.value);

    onMounted(() => {
      getCurrentLocation();
    });

    return {
      descriptionLine1,
      descriptionLine2,
      location,
      time,
      weather,
      airQuality,
      weatherImage
    };
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
