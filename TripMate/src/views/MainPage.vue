<template>
    <v-carousel height="100vh" :show-arrows="false" cycle hide-delimiter-background>
    <v-carousel-item v-for="(slide, i) in mainPageContents" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <!-- <div class="text-h2">{{ slide.title }}</div> -->
          <!-- <WeatherSlide/> -->
          <!-- <SearchSlide/> -->
          <!-- <PlaceSlide/> -->
          <PlanSlide />
        </div> 
      </v-sheet> 
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import WeatherSlide from '@/components/slide/WeatherSlide.vue';
import SearchSlide from '../components/slide/SearchSlide.vue';
import PlaceSlide from '../components/slide/PlaceSlide.vue';
import PlanSlide from '../components/slide/PlanSlide.vue';

export default {
  data() {
    return {
      activeSlide: 0,
      mainPageContents: [
        { title: 'Slide 1', content: '내용 1' },
        // { title: 'Slide 2', content: '내용 2' },
        // { title: 'Slide 3', content: '내용 3' },
        // { title: 'Slide 4', content: '내용 4' },
        // { title: 'Slide 5', content: '내용 5' },
      ],
      colors: ['red', 'green', 'blue', 'black', 'white']
    };
  },

  components: {
    WeatherSlide,
    SearchSlide,
    PlaceSlide,
    PlanSlide,
  },
};
</script>

<style scoped>
.text-h2 {
  font-size: 24px;
  color: white;
}
.carousel-indicators-left {
  position: absolute;
  left: 0;
  bottom: 10px; /* 인디케이터와 캐로셀 사이의 간격 조절 */
}
</style>
