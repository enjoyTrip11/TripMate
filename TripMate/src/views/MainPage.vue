<template>
    <v-carousel height="85vh" :show-arrows="false" cycle hide-delimiter-background>
        <v-carousel-item v-for="(slide, i) in mainPageContents" :key="i">
            <v-sheet color="white" height="100%">
                <div class="d-flex fill-height justify-center align-center">
                    <component :is="slide.component" />
                </div>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import WeatherSlide from '@/components/slide/WeatherSlide.vue';
import SearchSlide from '@/components/slide/SearchSlide.vue';
import PlaceSlide from '@/components/slide/PlaceSlide.vue';
import PlanSlide from '@/components/slide/PlanSlide.vue';
import BoardSlide from '@/components/slide/BoardSlide.vue';

export default {
    data() {
        return {
            activeSlide: 0,
            mainPageContents: [
                { component: WeatherSlide },
                { component: SearchSlide },
                { component: PlaceSlide },
                { component: PlanSlide },
                { component: BoardSlide }
            ]
        };
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
    bottom: 10px;
    /* 인디케이터와 캐로셀 사이의 간격 조절 */
}
</style>
