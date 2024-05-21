<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>해당 도시 상세정보</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    this.cities.forEach((city) => {
      this.fetchWeather(city);
    });
  },
};
</script>

<style scoped>
.content {
  margin: 40px;
}

.weather-info {
  display: flex;
  align-items: center;
}

.weather-icon {
  width: 50px;
  height: 50px;
}

.weather-details {
  margin-top: 20px;
}
</style>
