<template>
  <v-card>
    <!-- 이미지 -->
    <v-img :src="imageURL" height="200px" width="250px" class="ml-4"></v-img>
    <!-- 하트 아이콘 아래에 hits 값 출력 -->
    <v-card-text class="text-center">
      <v-icon>mdi-heart</v-icon> {{ hitCount }}
    </v-card-text>

    <!-- Title 출력 -->
    <v-card-title class="text-center">{{ title }}</v-card-title>

    <!-- addr1 출력 -->
    <v-card-text class="text-center">{{ addr1 }}</v-card-text>
  </v-card>
</template>

<script setup>
import { computed, toRefs } from 'vue'; // Import toRefs from Vue reactivity package

// Define props
const props = defineProps({
  hitCount: Number,
  imageURL: String,
  title: String,
  addr1: String,
});

// Compute imageURL based on props
const imageURL = computed(() => props.imageURL || props.secondImage);

// Convert reactive properties to plain references
const { hitCount, title, addr1 } = toRefs(props);

</script>

<style>
/* 필요한 스타일링 추가 */
</style>
