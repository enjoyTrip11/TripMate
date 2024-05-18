<template>
  <v-app>
    <v-app-bar prominent color="light-blue-lighten-5" elevation="0">
        <!-- Logo -->
        <v-container class="logo">
          <v-icon @click.stop="toggleDrawer('logoDrawer')">
            <img src="@/assets/img/logo.gif" class="icon" />
          </v-icon>
          <a @click.stop="toggleDrawer('logoDrawer')" class="title-link">
            <v-toolbar-title>TripMate</v-toolbar-title>
          </a>
        </v-container>

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
  </v-app>
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
}

.profile-btn {
  padding: 0;
  min-width: 0;
  border-radius: 50%;
  margin-right: 20px;
}

.title-link {
  margin-left: 10px;
}
</style>
