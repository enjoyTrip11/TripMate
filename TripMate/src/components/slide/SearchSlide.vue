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
          <h2 @click="toggleRandomPlace" @mouseover="stopAutoChange" @mouseleave="startAutoChange"> 
            {{ placeDescription }} 
            <span :style="{ color: textColor }" class="place">{{ place }}</span> 
          </h2>
        </div>
        <div class="mt-10"></div>
        <v-btn color="primary" @click="goToSearchPage">장소 더보기</v-btn>
      </v-col>

      <!-- 이미지 영역 -->
      <v-col cols="4" offset="1" class="image-column">
        <v-img :src="defalutImg" @click="toggleRandomPlace" @mouseover="stopAutoChange" @mouseleave="startAutoChange" class="page-image"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SearchImage from '@/assets/img/main/search.png'

export default {
  data() {
    return {
      defalutImg: SearchImage,
      descriptionLine1: '오늘은 ',
      descriptionLine2: '어디로 떠나볼까?',
      locations: [
        {
          location: '경기도 가평군',
          placeDescription: '비오는 날엔',
          place: '가평 레일바이크',
        },
        {
          location: '강원도 춘천시',
          placeDescription: '가을에는',
          place: '춘천 명동 카페거리',
        },
        {
          location: '전라북도 전주시 완산구',
          placeDescription: '봄에 더 아름다운',
          place: '전주 한옥마을',
        },
        {
          location: '경기도 용인시',
          placeDescription: '가족과 함께 놀러가기 좋은',
          place: '에버랜드',
        },
        {
          location: '서울특별시 송파구',
          placeDescription: '여름에는',
          place: '롯데월드 아쿠아리움',
        },
        {
          location: '부산광역시 해운대구',
          placeDescription: '해수욕 즐기러',
          place: '해운대 바닷가',
        },
        {
          location: '전라남도 순천시',
          placeDescription: '가을 단풍이 아름다운',
          place: '순천만 국가정원',
        },
        {
          location: '경기도 화성시',
          placeDescription: '가족과 함께 즐기는',
          place: '화성 헤이리아트밸리',
        },
        {
          location: '경상북도 경주시',
          placeDescription: '벚꽃 명소',
          place: '첨성대',
        },
        {
          location: '전라남도 여수시',
          placeDescription: '달빛 배타러',
          place: '여수 밤바다',
        },
        {
          location: '충청남도 대전시',
          placeDescription: '가을 데이트에는',
          place: '대전 유성온천',
        },
        {
          location: '강원도 속초시',
          placeDescription: '겨울 산책에는',
          place: '속초 해변',
        },
        {
          location: '서울특별시 마포구',
          placeDescription: '스트릿 푸드 즐기러',
          place: '홍대 거리',
        },
        {
          location: '경기도 포천시',
          placeDescription: '가을 산책로로 유명한',
          place: '도담삼봉',
        },
        {
          location: '인천광역시 중구',
          placeDescription: '가을 산책로로 유명한',
          place: '송도 센트럴파크',
        },
        {
          location: '경상남도 통영시',
          placeDescription: '여름엔',
          place: '통영 동피랑마을 물놀이장',
        },
        {
          location: '충청북도 청주시',
          placeDescription: '가을의 단풍으로 물든',
          place: '백석예술대학교',
        },
        {
          location: '대구광역시 중구',
          placeDescription: '겨울에는',
          place: '대구 이월드 스노우파크',
        },
        {
          location: '전라남도 해남군',
          placeDescription: '봄꽃이 아름다운',
          place: '덕연산 자연휴양림',
        },
        {
          location: '경상북도 포항시',
          placeDescription: '여름 바다는',
          place: '포항 구룡포 해수욕장',
        },
      ],
      currentIndex: 0,
      hueRotation: 0, // 색상 변경을 위한 변수 추가
      textColor: '', // 텍스트 색상 변경을 위한 변수 추가
      intervalId: null, // 자동 변경을 위한 setInterval 아이디 변수 추가
    };
  },
  computed: {
    location() {
      return this.locations[this.currentIndex].location;
    },
    placeDescription() {
      return this.locations[this.currentIndex].placeDescription;
    },
    place() {
      return this.locations[this.currentIndex].place;
    },
  },
  methods: {
    goToSearchPage() {
      this.$router.push('/search');
    },
    startAutoChange() {
      // 자동 변경 시작
      this.intervalId = setInterval(() => {
        this.toggleRandomPlace();
      }, 1000); 
    },
    stopAutoChange() {
      // 자동 변경 멈춤
      clearInterval(this.intervalId);
    },
    toggleRandomPlace() {
      // 랜덤 위치로 변경
      const newIndex = Math.floor(Math.random() * this.locations.length);
      this.currentIndex = newIndex === this.currentIndex ? newIndex + 1 : newIndex;
      if (this.currentIndex >= this.locations.length) {
        this.currentIndex = 0;
      }
      
      // 랜덤 색상으로 변경
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      this.textColor = randomColor;
      
      // 랜덤한 색상으로 이미지 필터 적용
      this.hueRotation = Math.floor(Math.random() * 360);
    },
  },
  mounted() {
    // 컴포넌트가 마운트되면 자동 변경 시작
    this.startAutoChange();
  },
  beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 자동 변경 멈춤
    this.stopAutoChange();
  },
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

.page-image {
  width: 100%;
  max-height: 80vh;
  /* 이미지의 최대 높이 설정 */
  margin: auto;
  /* 가운데 정렬 */
}

.place {
  color: rgb(109, 194, 237);
}

</style>
