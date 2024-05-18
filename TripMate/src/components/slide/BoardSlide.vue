<template>
  <v-container fluid class="content">
    <v-row>
      <!-- 설명 영역 -->
      <v-col cols="5" offset="1">
        <h1 class="main-title">{{ descriptionLine1 }}</h1>
        <h1 class="main-title">{{ descriptionLine2 }}</h1>
        <div class="mt-4"></div>

        <div>
          <h2>{{ descriptionLine3 }}</h2>
        </div>
        <div class="mt-10"></div>
        <v-btn color="primary">계획 더보기</v-btn>
      </v-col>

      <!-- 이미지 영역 -->
      <v-col cols="4" offset="1" class="image-column">
        <v-img :src="defalutImg" class="page-image"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BoardImage from '@/assets/img/main/board.png'

export default {
  data() {
    return {
      defalutImg: BoardImage,
      descriptionLine1: '여행은',
      descriptionLine2: '어떠셨나요?',
      descriptionLine3: '여행에서의 일들을 들려주세요!',

    };
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
