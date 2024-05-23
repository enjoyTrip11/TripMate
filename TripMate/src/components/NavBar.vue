<template>
  <div>
    <v-app-bar prominent elevation="0">
      <!-- Logo -->
      <div class="logo">
        <v-icon @click.stop="toggleDrawer('logoDrawer')">
          <img src="@/assets/img/logo.gif" class="icon" />
        </v-icon>
        <router-link :to="{ name: 'home' }" class="title-link">
          <v-toolbar-title class="logo-title">TripMate</v-toolbar-title>
        </router-link>
      </div>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- User Icon -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon @click.stop="toggleDrawer('userDrawer')" v-bind="props" class="profile-btn">
            <img src="@/assets/img/noProfile.png" class="icon" />
          </v-icon>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in userItems" :key="i" @click="item.title === '로그아웃' ? handleLogout() : null">
            <v-list-item-title>
              <router-link v-if="item.title !== '로그아웃'" :to="{ name: item.value }" class="custom-router-link">{{
                item.title
              }}</router-link>
              <span v-else class="custom-router-link">{{ item.title }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="logoDrawer" temporary>
      <v-list>
        <v-list-item v-for="(item, i) in logoItems" :key="i">
          <v-list-item-title>
            <!-- 수정된 부분 -->
            <router-link :to="{ name: item.value }" class="custom-router-link">{{ item.title }}</router-link>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['isAuthenticated']),
    userItems() {
      return this.isAuthenticated
        ? [
          { title: '프로필', value: 'profile' },
          { title: '로그아웃', value: 'logout' },
        ]
        : [
          { title: '로그인', value: 'login' },
          { title: '회원가입', value: 'signup' },
        ];
    },
  },
  data() {
    return {
      logoDrawer: false,
      logoItems: [
        { title: '날씨 정보', value: 'weather' },
        { title: '여행지 탐색', value: 'map' },
        { title: '여행 계획', value: 'plan' },
        { title: '핫플레이스', value: 'hotplace' },
        { title: '게시판', value: 'board' },
      ],
      userDrawer: false,
    };
  },
  methods: {
    ...mapActions(['logout']),
    toggleDrawer(drawerName) {
      this[drawerName] = !this[drawerName];
    },
    handleLogout() {
      //this.toggleDrawer('userDrawer');
      this.logout();
    }
  },
};
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon {
  width: 40px;
  height: 40px;
  margin-left: 40px;
}

.logo-title {
  font-size: 24px;
  font-weight: bold;
  margin-left: 30px;
  color: black;
  font-size: 2rem;
  font-weight: bold;
}

.profile-btn {
  border-radius: 50%;
  margin-right: 4%;
}

.title-link {
  text-decoration: none;
}


.custom-router-link {
  color: black;
  /* 글자 색상 검정색 */
  text-decoration: none;
  /* 밑줄 제거 */
  font-size: 1.1rem;
  /* 글자 크기 변경 */
}
</style>
