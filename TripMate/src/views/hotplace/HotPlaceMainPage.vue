<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>My Place</h2>
          <v-row>
            <v-btn icon @click="scrollLeft('myPlace')">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-row ref="myPlace" class="scroll-container">
              <v-col v-for="n in 5" :key="n" cols="auto" class="item">
                <v-card>
                  <v-card-text>
                    <v-icon>mdi-heart</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-btn icon @click="scrollRight('myPlace')">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2>Hot Place</h2>
          <v-row>
            <v-btn icon @click="scrollLeft('hotPlace')">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-row ref="hotPlace" class="scroll-container">
              <v-col v-for="n in 5" :key="n" cols="auto" class="item">
                <v-card>
                  <v-card-text>
                    <v-icon>mdi-heart</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-btn icon @click="scrollRight('hotPlace')">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const scrollLeft = (refName) => {
    const container = scrollRefs[refName].value
    container.scrollBy({ left: -200, behavior: 'smooth' })
  }
  
  const scrollRight = (refName) => {
    const container = scrollRefs[refName].value
    container.scrollBy({ left: 200, behavior: 'smooth' })
  }
  
  const scrollRefs = {
    myPlace: ref(null),
    hotPlace: ref(null),
  }
  </script>
  
  <style>
  .scroll-container {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  .item {
    flex: 0 0 auto;
  }
  </style>
  