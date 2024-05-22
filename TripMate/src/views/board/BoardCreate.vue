<template>
    <v-container fluid class="px-10">
        <div class="mb-10"></div>
        <!-- 게시판 제목 -->
        <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">게시물 작성</h1>
                <hr>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <v-card>
                    <!-- 카테고리 선택 -->
                    <v-card-text>
                        <v-row align="center">
                            <v-col cols="auto">
                                <v-btn-toggle v-model="post.category">
                                    <v-btn v-for="(category, index) in categories" :key="index" :value="category" outlined>{{ category }}</v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- 게시물 제목 -->
                    <v-card-title class="d-flex align-center">
                        <v-text-field
                            v-model="post.title"
                            label="제목"
                            outlined
                            dense
                            class="mr-4 display-1 text-h5"
                        ></v-text-field>
                    </v-card-title>
                    <!-- 작성자 정보 및 게시물 내용 -->
                    <v-card-text>
                        <div class="mt-4" style="height: 50vh; max-height: 70vh; overflow-y: auto;">
                            <v-textarea
                                v-model="post.content"
                                label="내용"
                                outlined
                                dense
                                rows="10"
                                style="font-weight: 200;"
                            ></v-textarea>
                        </div>
                        <v-divider></v-divider>
                        <v-file-input
                            v-model="post.filePath"
                            label="파일 첨부"
                            prepend-icon="mdi-paperclip"
                            accept="*"
                            dense
                            class="mt-5"
                        ></v-file-input>
                        <div v-if="post.file" class="mt-2">
                            <strong>첨부된 파일:</strong> {{ post.file.name }}
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12" class="d-flex justify-end">
                <v-btn @click="savePost" color="success" class="mr-2">등록</v-btn>
                <router-link :to="{ name: 'board' }">
                    <v-btn color="info">목록</v-btn>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { createBoard } from "@/api/board"
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const post = ref({
  userId: 1,        // TODO: 바꿔야 함
  title: "",
  content: "",
  filePath: "",
  category: "소통"
})

const categories = ['공지사항', '여행 계획 공유', '여행 후기', '소통']

function savePost() {
  let err = false;
  let msg = ''

  !post.value.category && ((msg = '카테고리를 선택해 주세요'), (err = true))
  !err && !post.value.title && ((msg = '제목을 입력해 주세요'), (err = true))
  !err && !post.value.content && ((msg = '내용을 입력해 주세요'), (err = true))

  if (err) {
    alert(msg)
  } else {
    createBoard(
        post.value,
        () => {
            console.log('savePost.......', post.value);
            alert('게시물이 저장되었습니다.');
            router.push({name: 'board'});
        },
        (error) => {
            console.log(error)
        }
    )
  }
}
</script>

<style scoped>
.mb-10 {
    margin-bottom: 10px;
}

.text-h5 {
    font-size: 1.5rem;
}

.v-text-field .v-input__control .v-input__slot {
    font-size: 1.5rem;
}

.v-textarea .v-input__control .v-input__slot {
    font-weight: 200;
}
</style>
