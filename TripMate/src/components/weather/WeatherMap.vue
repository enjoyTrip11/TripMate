<template>
  <v-container fluid class="container">
    <h2>실시간 전국 날씨</h2>
    <div class="buttons">
      <div v-for="date in weekDates" :key="date" @click="selectDate(date)" :class="{ 'selected': selectedDate === date }" class="date-button">
        <span v-html="formatDate(date)" :class="{ 'selected': selectedDate === date }"></span>
        <hr :class="{ 'selected': selectedDate === date }">
      </div>
    </div>
    <v-card class="map-card">
      <div class="toggle-buttons">
        <v-btn :class="{ 'selected': selectedPeriod === 'AM' }" @click="selectPeriod('AM')">오전</v-btn>
        <v-btn :class="{ 'selected': selectedPeriod === 'PM' }" @click="selectPeriod('PM')">오후</v-btn>
      </div>
      <div class="weather-container">
        <div v-if="loading">
          <v-progress-circular class="loadingBar" indeterminate></v-progress-circular>
        </div>
        <div v-else>
            <div v-for="city in cities" :key="city.name" class="weather-info" :style="city.position">
              <div v-if="city.weatherData">
                <img :src="city.weatherIcon" alt="Weather Icon" class="weather-icon" />
                <div class="">{{ city.name }} {{ city.weatherData.temp.toFixed(1) }}°C</div>
              </div>
              <div v-else>
                <p>날씨 정보를 불러오는 중...</p>
              </div>
            </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const getWeekDates = () => {
  const today = new Date();
  const startOfWeek = today.getDate() - today.getDay() + 1; // 이번 주 월요일
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today.setDate(startOfWeek + i));
    return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  });
  return weekDates;
};

const weekDates = ref(getWeekDates());
const selectedDate = ref(new Date().toISOString().split('T')[0]); // 기본값은 오늘 날짜로 설정
const selectedPeriod = ref('AM'); // 기본값은 오전으로 설정

const selectDate = (date) => {
  selectedDate.value = date;
  console.log('Selected date:', date);
};

const selectPeriod = (period) => {
  selectedPeriod.value = period;
  console.log('Selected period:', period);
};

const formatDate = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const parsedDate = new Date(date);
  const dayOfWeek = days[parsedDate.getDay()];
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  return `<div style="text-align: center;">${dayOfWeek} <br><span style="font-size: 0.8em;">${month}.${day}</span></div>`;
};

const cities = ref([
  { name: '서울', lat: 37.5665, lon: 126.9780, position: { top: '19%', left: '22%' } },
  { name: '춘천', lat: 37.8813, lon: 127.7298, position: { top: '7%', left: '47%' } },
  { name: '강릉', lat: 37.7519, lon: 128.8761, position: { top: '16%', left: '62%' } },
  { name: '청주', lat: 36.6424, lon: 127.4890, position: { top: '20%', left: '48%' } },
  { name: '울릉/독도', lat: 37.5000, lon: 130.8714, position: { top: '20%', left: '80%' } },
  { name: '수원', lat: 37.2636, lon: 127.0286, position: { top: '28%', left: '28%' } },
  { name: '안동', lat: 36.5684, lon: 128.7294, position: { top: '30%', left: '58%' } },
  { name: '대전', lat: 36.3504, lon: 127.3845, position: { top: '38%', left: '38%' } },
  { name: '전주', lat: 35.8242, lon: 127.1480, position: { top: '44%', left: '24%' } },
  { name: '대구', lat: 35.8722, lon: 128.6014, position: { top: '43%', left: '58%' } },
  { name: '광주', lat: 35.1595, lon: 126.8526, position: { top: '59%', left: '25%' } },
  { name: '목포', lat: 34.8118, lon: 126.3926, position: { top: '65%', left: '12%' } },
  { name: '여수', lat: 34.7604, lon: 127.6622, position: { top: '60%', left: '43%' } },
  { name: '부산', lat: 35.1796, lon: 129.0756, position: { top: '58%', left: '65%' } },
  { name: '울산', lat: 35.5384, lon: 129.3114, position: { top: '46%', left: '79%' } },
  { name: '제주', lat: 33.4996, lon: 126.5312, position: { top: '82%', left: '14%' } },
]);

const loading = ref(true); // 로딩 상태 추가

const fetchWeather = async (city) => {
  const API_KEY = '8430f2617a70526220926352e6e5b931'; // 여기에 OpenWeather API 키를 입력하세요
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}&lang=kr`);
    city.weatherData = {
      temp: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
      weather: response.data.weather,
    };
    city.weatherIcon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    console.log("Weather......", city.weatherData)
  } catch (error) {
    console.error(`Error fetching weather data for ${city.name}:`, error);
    city.weatherData = null;
  }
};

onMounted(async () => {
  try {
    await Promise.all(cities.value.map(city => fetchWeather(city)));
    console.log("End Load..................")
  } catch (error) {
    console.error('Error fetching weather data:', error);
  } finally {
    loading.value = false; // 데이터 로딩 완료 후 로딩 상태를 false로 설정
  }
});
</script>

<style scoped>
.container {
  margin-left: 20px; /* 왼쪽 마진 설정 */
  width: 500px;
}

.container > * {
  margin-left: 20px; /* 하위 요소의 왼쪽 마진 설정 */
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px; 
    margin-left: 0px;
    /* max-width: 450px; */
}

.date-button {
    width: max-content; /* 버튼의 너비를 내부 요소의 크기에 맞게 설정 */
    text-align: center; /* 버튼 안의 텍스트 가운데 정렬 */
    box-shadow: none !important; /* 그림자 제거 */
    padding: 0; /* 내부 패딩 제거 */
    cursor: pointer; /* 마우스를 올리면 클릭 가능한 커서로 설정 */
    position: relative; /* 하위 요소에 대한 절대 위치를 설정하기 위해 부모 요소의 상대 위치를 설정 */
    margin-bottom: 10px;
}

.loadingBar {
  position: fixed;
  top: 60%;
}

hr {
    border: none;
    border-top: 1px solid #ccc; /* 선 스타일 지정 */
    position: absolute; /* 절대 위치 지정 */
    width: 120%; /* 부모 요소에 맞게 가로 길이 지정 */
    bottom: 0; /* 아래쪽으로 위치 지정 */
    left: 50%; /* 가운데 정렬 */
    transform: translateX(-50%); /* 부모 요소의 가운데로 이동 */
}

.selected hr {
    border-top-color: rgb(0, 153, 255); /* 선택된 부분의 선 색상 변경 */
    border-width: 2px; /* 선택된 부분의 선 굵기 변경 */
}

.selected span {
    font-weight: bold; /* 선택된 부분의 글자 굵게 변경 */
}

.selected span span {
    font-weight: normal; /* 선택된 부분의 날짜 텍스트 원래대로 변경 */
}

.map-card {
    margin: 0;
    text-align: center;
    background-color: rgb(208, 243, 255);
    background-image: url('@/assets/img/weather/map.png'); /* 배경 이미지 설정 */
    background-size: cover; /* 이미지 크기를 맞추기 위해 커버로 설정 */
    background-position: center; /* 이미지 위치를 가운데로 설정 */
    height: 600px; /* 카드 높이 설정 */ 
    position: relative; /* 버튼을 위치시키기 위해 상대 위치 설정 */
}

/* 오전/오후 버튼 */
.toggle-buttons {
    display: flex;
    position: absolute;
    top: 566px;
    left: 340px
}

.toggle-buttons .v-btn {
    margin: 0; /* 버튼 간격 제거 */
    background-color: white;
    color: black;
    border-radius: 0;
}

.toggle-buttons .v-btn.selected {
    background-color: rgb(0, 153, 255);
    color: white;
}

.weather-container {
  position: relative; /* 절대 위치 요소를 위한 상대 위치 설정 */
  width: 100%;
  height: 100%;
}

.weather-info {
  position: absolute; /* 절대 위치 설정 */
  /* background-color: white;  배경색 흰색 설정 */
  padding: 10px; /* 내부 여백 설정 */ 
  padding-bottom: 0;
  border-radius: 10px; /* 둥근 모서리 설정 */
  text-align: center; /* 텍스트 가운데 정렬 */
  font-size: 0.8rem;
}

.city-name {
  font-weight: bold; /* 도시 이름 굵게 설정 */
}

.weather-icon {
  width: 50px; /* 날씨 아이콘 크기 설정 */
  height: 50px; /* 날씨 아이콘 크기 설정 */
}

.temperature {
  font-size: 1em; /* 온도 글자 크기 설정 */
  font-weight: bold; /* 온도 글자 굵게 설정 */
}
</style>
