<template>
  <div>
    <v-app-bar prominent elevation="0">
        <!-- Logo -->
        <div class="logo">
          <v-icon @click.stop="toggleDrawer('logoDrawer')">
            <img src="@/assets/img/logo.gif" class="icon" />
          </v-icon>
          <router-link :to="{name:'home'}" class="title-link">
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
            <v-list-item v-for="(item, i) in userItems" :key="i">
              <v-list-item-title>
                <a href="">{{ item.title }} </a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="logoDrawer" temporary>
      <v-list :items="logoItems"></v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoDrawer: false,
      logoItems: [
        { title: '여행지 탐색', value: 'map' },
        { title: '여행 계획', value: 'plan' },
        { title: '핫플레이스', value: 'hotplace' },
        { title: '게시판', value: 'board' },
      ],

      userDrawer: false,
      userItems: [
        { title: '로그인', value: 'login' },
        { title: '회원가입', value:'join' },
        { title: '프로필', value:'profile' },
        { title: '로그아웃', value:'logout' },
      ],
    };
  },
  methods: {
    toggleDrawer(drawerName) {
      this[drawerName] = !this[drawerName];
    },
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
</style>
