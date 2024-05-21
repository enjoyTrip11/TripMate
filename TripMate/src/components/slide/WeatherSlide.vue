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
            <h2>{{ time }} <span class="weather">{{ weather }}</span> 미세먼지 <span class="air-condition">{{ airQuality }}</span> </h2>
          </div>
          <div class="mt-10"></div> 
          <v-btn color="primary" @click="goToWeatherPage">날씨 정보 더보기</v-btn>
          <!-- <div class="btn">
              <h3>날씨 정보 더보기🌦️ </h3>
          </div> -->
        </v-col>
  
        <!-- 이미지 영역 -->
        <v-col cols="4" offset="1" class="image-column">
          <v-img :src="weatherImage" alt="Weather Image" class="weather-image"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import summerImage from '@/assets/img/weather/summer.png';
  import snowImage from '@/assets/img/weather/snow.png';
  import rainyImage from '@/assets/img/weather/rainy.png';
  import defaultImage from '@/assets/img/weather/summer.png';
  
  export default {
    data() {
      return {
        descriptionLine1: '바다 수영 전',
        descriptionLine2: '선크림은 필수!',
        location: '부산특별시 해운대구 중동',
        time: '오전',
        weather: '맑음',
        airQuality: '좋음',
        weatherImage: summerImage // 기본 이미지 설정
      };
    },
    methods: {
      goToWeatherPage() {
        this.$router.push('/weather'); // 라우터 경로를 실제 경로로 변경하세요
      },
      getLocation() {
        return new Promise((resolve) => {
          resolve({
            city: '부산',
            region: '해운대구'
          });
        });
      },
      getWeather() {
        return new Promise((resolve) => {
          resolve({
            main: '맑음',
            temp: 25,
            airQuality: '좋음'
          });
        });
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
      // this.fetchWeatherData();
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
  