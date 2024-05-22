<template>
    <v-container fluid>
        <!-- 여행지 정보 제목 -->
        <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">여행지 정보</h1>
                <hr>
            </v-col>
        </v-row>
        <MyKakaoMap class="map" />
    </v-container>
</template>

<script setup>
import MyKakaoMap from '@/components/map/MyKakaoMap.vue';
</script>

<style scoped>
.v-container--fluid {
    max-width: 100%;
}

</style>