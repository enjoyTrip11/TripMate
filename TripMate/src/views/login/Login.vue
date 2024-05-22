<template>
    <v-card class="mx-auto" elevation="1" width="500" height="480" style="margin-top: 20px;">
        <v-card-title class="py-5 font-weight-black">로그인</v-card-title>

        <v-card-text>
            아이디와 비밀번호를 입력하세요.
        </v-card-text>

        <v-card-text>
            <div class="text-subtitle-2 font-weight-black mb-1">아이디</div>

            <v-text-field label="아이디를 입력하세요" variant="outlined" single-line></v-text-field>

            <div class="text-subtitle-2 font-weight-black mb-1">비밀번호</div>

            <v-text-field label="비밀번호를 입력하세요" variant="outlined" single-line></v-text-field>

            <v-btn class="text-none login-btn" color="#87C4FF" size="x-large" variant="flat" block>
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
export default {
  methods: {
    loginWithGoogle() {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
      '654957689237-7t59r5ularmkvht7ehen4segrdasru12.apps.googleusercontent.com' +
      '&redirect_uri=' +
      'http://localhost:8080/login/oauth2/code/google' +
      '&response_type=code' +
      '&scope=email profile';
      window.location.href = url;
    },
    mounted() {
    // URL 파라미터에서 토큰 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log("JWT Token:", token);
    if (token) {
      // 토큰을 로컬 스토리지에 저장하거나 필요한 처리 수행
      localStorage.setItem('jwt', token);
    }
  }
}
}
</script>