<template>
  <v-card class="place-card">
    <!-- 이미지 -->
    <v-img :src="imageURL" height="200px" class="place-image"></v-img>

    <!-- 찜버튼을 이미지의 오른쪽 상단에 배치 -->
    <v-btn icon @click="toggleFavorite" class="favorite-button">
      <v-icon :color="isFavorited ? 'pink' : 'grey'">mdi-heart</v-icon> {{ hitCount }}
    </v-btn>

    <!-- Title 출력 -->
    <v-card-title class="text-center">{{ title }}</v-card-title>

    <!-- addr1 출력 -->
    <v-card-text class="text-center">{{ addr1 }}</v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'; // Import Vue reactivity package

// Define props
const props = defineProps({
  hitCount: Number,
  imageURL: String,
  title: String,
  addr1: String,
});

// State to manage favorite status
const isFavorited = ref(false);

// Method to toggle favorite status
const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  // Emit an event to the parent component if needed
  // emit('toggle-favorite', isFavorited.value);
};

// Convert reactive properties to plain references
const { hitCount, title, addr1 } = toRefs(props);
</script>

<style scoped>
.place-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: auto;
}

.place-image {
  width: 100%;
  object-fit: cover;
}

.favorite-button {
  position: absolute;
  top: 80%;
  left: 40%;
  background: white;
  border-radius: 50%;
}

.v-btn {
  display: flex;
  align-items: center;
}

.v-btn .v-icon {
  margin-right: 5px;
}
</style>
