<template>
  <v-card class="mx-auto" elevation="1" width="500" height="480" style="margin-top: 20px;">
    <v-card-title class="py-5 font-weight-black">로그인</v-card-title>

    <v-card-text>
      아이디와 비밀번호를 입력하세요.
    </v-card-text>

    <v-card-text>
      <div class="text-subtitle-2 font-weight-black mb-1">아이디</div>
      <v-text-field v-model="formData.id" label="아이디를 입력하세요" variant="outlined" single-line></v-text-field>

      <div class="text-subtitle-2 font-weight-black mb-1">비밀번호</div>
      <v-text-field v-model="formData.password" label="비밀번호를 입력하세요" variant="outlined" type="password" single-line></v-text-field>

      <v-btn @click="submitForm" class="text-none login-btn" color="#87C4FF" size="x-large" variant="flat" block>
        로그인
      </v-btn>
      <br>
      <v-btn class="login-btn" color="white" size="x-large" variant="flat" block @click="loginWithGoogle">
        <img src="../../assets/img/login/google.png" alt="Google Logo" class="google-logo">
        구글 로그인
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style>
.login-btn {
  border: 1px solid #000; /* 검정색 테두리 추가 */
  display: flex;
  align-items: center;
}

.google-logo {
  margin-right: 8px; /* 구글 로고와 텍스트 사이 간격 조정 */
  width: 24px; /* 이미지 너비 조정 */
  height: auto; /* 높이 자동 조정 */
  max-width: 100%; /* 버튼 크기를 넘지 않도록 설정 */
  max-height: 24px; /* 버튼 크기를 넘지 않도록 설정 */
}
</style>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    return { store, router };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:8080/user/login', this.formData);
        const accessToken = response.data.tokenDto.accessToken;
        console.log(accessToken);
        this.store.dispatch('saveAccessToken', accessToken);
        console.log('로그인 성공:', response.data);
        this.router.push('/'); // 로그인 성공 시 메인페이지로 이동
      } catch (error) {
        console.error('로그인 실패:', error);
      }
    },
    loginWithGoogle() {
      // 구글 로그인 로직을 여기에 추가하세요.
    }
  }
}
</script>
