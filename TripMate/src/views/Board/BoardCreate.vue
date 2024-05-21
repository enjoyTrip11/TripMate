<template>
    <v-container fluid class="px-10">
        <div class="mb-10"></div>
        <!-- 게시판 제목 -->
        <v-row justify="center" class="mb-4">
            <v-col cols="auto">
                <h1 class="display-1">게시물 작성/수정</h1>
                <hr>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <v-card>
                    <!-- 게시물 제목 -->
                    <v-card-title class="d-flex align-center pb-4">
                        <v-text-field
                            v-model="post.title"
                            label="게시물 제목"
                            outlined
                            dense
                            class="mr-4 display-1 text-h5"
                        ></v-text-field>
                    </v-card-title>
                    <!-- 작성자 정보 및 게시물 내용 -->
                    <v-card-text>
                        <v-row align="center" class="mt-1 mb-4">
                            <v-avatar size="40" class="mr-2 ml-2">
                                <img class="img-fluid" src="@/assets/img/noProfile.png" style="width: 100%">
                            </v-avatar>
                            <span>{{ post.author }}</span> <!-- 유저 이름 -->
                        </v-row>
                        <v-divider></v-divider>
                        <div class="mt-4" style="height: 50vh; max-height: 70vh; overflow-y: auto;">
                            <v-textarea
                                v-model="post.content"
                                label="게시물 내용"
                                outlined
                                dense
                                rows="10"
                                style="font-weight: 200;"
                            ></v-textarea>
                        </div>
                        <v-divider></v-divider>
                        <v-file-input
                            v-model="post.file"
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

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                content: '',
                author: '작성자',
                user_profile_picture_url: 'user_profile_picture_url',
                file: null
            },
        };
    },
    methods: {
        savePost() {
            // 게시물 저장 기능 구현
            console.log('Post saved:', this.post);
            alert('게시물이 저장되었습니다.');
        }
    },
    created() {
        // 초기 데이터 설정
        this.post = {
            title: '게시물 제목',
            content: '게시물 내용',
            author: '작성자',
            user_profile_picture_url: 'user_profile_picture_url',
            file: null
        };
    }
};
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
