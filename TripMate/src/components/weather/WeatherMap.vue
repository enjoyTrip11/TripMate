<template>
  <v-container fluid class="all-container">
    <div class="container">
      <h2>실시간 전국 날씨</h2>
      <div class="buttons">
        <div v-for="date in weekDates" :key="date" @click="selectDate(date)" :class="{ 'selected': selectedDate === date }" class="date-button">
          <span v-html="formatDate(date)" :class="{ 'selected': selectedDate === date }"></span>
          <hr :class="{ 'selected': selectedDate === date }">
        </div>
      </div>
      <div class="toggle-buttons">
        <v-btn :class="{ 'selected': selectedPeriod === 'AM' }" @click="selectPeriod('AM')">오전</v-btn>
        <v-btn :class="{ 'selected': selectedPeriod === 'PM' }" @click="selectPeriod('PM')">오후</v-btn>
      </div>
      <v-card class="map-card">
        <div class="weather-container">
          <div v-if="!loading">
            <div v-for="city in cities" :key="city.name" class="weather-info" :style="city.position">
              <div v-if="city.weatherData ">
                <img :src="city.weatherIcon" alt="Weather Icon" class="weather-icon" @click="selectCity(city)" />
                <div class="temperature">{{ city.name }} {{ city.weatherData.temp }}°C</div>
              </div>
              <div v-else>
                <p>날씨 정보를 불러오는 중...</p>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <div class="detail-container">
      <h2>상세 날씨</h2>
      <v-divider></v-divider>
      <div v-if="!scCity">
        <p class="mt-5">선택된 지역이 없어요!</p>
      </div>
      <div v-else>
        <h2 class="city">{{ selectedCityInfo.name }}</h2>
        
        <div class="img-temp">
          <img :src="selectedCityInfo.weatherIcon" class="detail-weather-icon">
          <h2 class="temp">{{ selectedCityInfo.weatherData.temp }}°C</h2>
        </div>
        <h2 class="hum">일자: {{  selectedDate }}</h2>
        <h2 class="describ">날씨 상세: {{ selectedCityInfo.weatherData.weatherDescrib }}</h2>
        <h2 class="hum">습도: {{ selectedCityInfo.weatherData.humidity }}</h2>
        <h2 class="wind">풍속: {{ selectedCityInfo.weatherData.wind_speed }}</h2>

        <router-link :to="{name:'map'}">
        <v-btn class="city-info-button" elevation="10">
          {{ selectedCityInfo.name }} 여행지 정보 찾기!
      </v-btn>
    </router-link>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const scCity = ref(false); 

const selectedCityInfo = ref(null); // selectedCity 변수를 selectedCityInfo로 변경

function selectCity(city) {
  console.log("Select!!!!! " , city)
  selectedCityInfo.value = city; // 변수명 변경
  scCity.value= true;
}

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

const selectDate = async (date) => {
  selectedDate.value = date;
  console.log('Selected date:', date);
  await fetchWeatherData(); // 날짜가 선택될 때마다 날씨 데이터 업데이트
};

const selectPeriod = async (period) => {
  selectedPeriod.value = period;
  console.log('Selected period:', period);
  await fetchWeatherData(); // 시간대가 변경될 때마다 날씨 데이터 업데이트
};

const fetchWeatherData = async () => {
  try {
    await Promise.all(cities.value.map(city => fetchWeather(city, selectedDate.value, selectedPeriod.value)));
    console.log("End Load..................")
  } catch (error) {
    console.error('Error fetching weather data:', error);
  } finally {
    loading.value = false; // 데이터 로딩 완료 후 로딩 상태를 false로 설정
  }
};

const fetchWeather = async (city, selectedDate, selectedPeriod) => {
  try {
    const dateParts = selectedDate.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JavaScript에서 월은 0부터 시작하므로 1을 빼줍니다.
    const day = parseInt(dateParts[2]);
    
    // 오전(AM)과 오후(PM)에 따라 시간 설정
    let hour;
    if (selectedPeriod === 'AM') {
        hour = 9; // 오전 9시
    } else if (selectedPeriod === 'PM') {
        hour = 17; // 오후 5시
    }

    // UTC로 변환된 Date 객체 생성
    const utcDate = new Date(Date.UTC(year, month, day, hour));

    // UTC로 변환된 시간을 Unix 타임스탬프로 변환
    const unixTimestamp = Math.floor(utcDate.getTime() / 1000);


    // const API_KEY = '8430f2617a70526220926352e6e5b931'; // 여기에 OpenWeather API 키를 입력하세요

    // const API_KEY = '1f09897afa096adff2de1a848b199eaa';
    const API_KEY = '5bdccf9869de90e5f15337311bbdf4b9';
    
    // const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${city.lat}&lon=${city.lon}&date=${selectedDate}&tz=+09:00&appid=${API_KEY}`);
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${city.lat}&lon=${city.lon}&dt=${unixTimestamp}&tz=+09:00&appid=${API_KEY}&lang=kr&units=metric`);
    console.log(response.data.data);
    
    city.weatherData = {
      temp: response.data.data[0].temp,
      humidity: response.data.data[0].humidity,
      wind_speed: response.data.data[0].speed,
      weather: response.data.data[0].weather[0].main,
      weatherDescrib: response.data.data[0].weather[0].description,
    };
    city.weatherIcon = `http://openweathermap.org/img/wn/${response.data.data[0].weather[0].icon}@2x.png`;
    console.log("Weather......", city.weatherData)
  } catch (error) {
    console.error(`Error fetching weather data for ${city.name}:`, error);
    city.weatherData = null;
  }
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

onMounted(async () => {
  try {
    await Promise.all(cities.value.map(city => fetchWeather(city, selectedDate.value, selectedPeriod.value)));

    console.log("End Load..................")
  } catch (error) {
    console.error('Error fetching weather data:', error);
  } finally {
    loading.value = false; // 데이터 로딩 완료 후 로딩 상태를 false로 설정
  }
});
</script>

<style scoped>
.all-container {
  display: flex;
  width: 100%;
}

.container {
  margin-left: 20px; /* 왼쪽 마진 설정 */
  width: 600px;
}

.detail-container {
  margin-left: 60px; /* 왼쪽 마진 설정 */
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
  position: relative; /* 상대 위치로 설정하여 하위 요소의 절대 위치를 지정하기 위한 기준으로 사용합니다. */
  margin: 0;
  text-align: center;
  background-color: rgb(208, 243, 255);
  background-image: url('@/assets/img/weather/map.png');
  background-size: cover;
  background-position: center;
  height: 600px;
}

.toggle-buttons {
  display: flex;
  position: absolute; /* 절대 위치로 설정하여 부모 요소(map-card)를 기준으로 배치합니다. */
  bottom: 50px; /* 아래쪽 여백 설정 */
  left: 485px; /* 오른쪽 여백 설정 */
  z-index: 1;
}

.toggle-buttons .v-btn {
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
  font-size: 1.2em; /* 온도 글자 크기 설정 */
  /* font-weight: bold;  */
  margin-top: -10px;
}

.detail-weather-icon {
  width: 180px;
  height: 180px;;
}

.img-temp {
  display: flex;
  flex-direction:  row;
  align-items: center;
  margin-left: -40px;
}

.temp {
  margin-left: -30px;
  margin-top: 10px;
  font-size: 80px;
} 

.city {
  margin-top: 80px;
  margin-bottom: -30px;
  font-size: 40px;
} 
.wind .hum .describ {
  font-weight: normal;
}
.hum {
  font-weight: normal;
}

.describ {
  font-weight: normal;
}

.city-info-button {
  margin-top: 70px;
  border-radius: 30px; /* 둥근 타원형 모양으로 만듭니다. */
  /* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); 그림자를 추가합니다. */
  background-color: transparent; /* 배경색을 없앱니다. */
  /* color: rgb(0, 153, 255); 버튼의 텍스트 색상을 지정합니다. */
  font-weight: bold; /* 버튼 텍스트의 글꼴 두껍게 설정합니다. */
  width: 400px;
  height: 60px;
  font-size : 25px
}
</style>

