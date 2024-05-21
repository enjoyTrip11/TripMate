<template>
    <div>
        <div>
            <h2 class="card-title">내 계획</h2>
        </div>
        <div class="card-container" v-show="hoveredCard === 0" @mouseover="hoveredCard = 1">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card color="#E0F4FF" style="width: 700px; height: 150px;">
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div class="d-flex">
                                    <div class="vertical-line"></div>
                                    <v-avatar class="ma-3" rounded="0" size="125">
                                        <img src="../../assets/img/plan/plane.png"
                                            style="margin-left: 10px; width: 80%; height: auto;"></img>
                                    </v-avatar>
                                </div>

                                <div style="display: flex; align-items: center;">
                                    <v-card-title class="text-h4" style="font-weight: bold;">
                                        Title
                                    </v-card-title>
                                </div>

                                <v-avatar class="ma-3" rounded="0" size="125">
                                    <img src="../../assets/img/plan/barcode.png"
                                        style="margin-left: 20px; height: 100%;"></img>
                                </v-avatar>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <div class="card-container" v-show="hoveredCard === 1" @mouseleave="hoveredCard = 0">
            <v-container>
                <v-card color="#E0F4FF" style="width: 700px; height: 150px;">
                    <v-row class="d-flex flex-no-wrap justify-space-between">
                        <!-- 작은 이미지 -->
                        <v-col cols="auto">
                            <v-avatar class="ma-3" rounded="0" size="50">
                                <img src="../../assets/img/plan/airplane.png" style="margin-left: 10px; width: 80%; height: auto;"></img>
                            </v-avatar>
                        </v-col>
                        
                        <!-- 정사각형 이미지 -->
                        <v-col cols="auto">
                            <v-avatar class="ma-3" rounded="0" size="125">
                                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                            </v-avatar>
                        </v-col>
                        
                        <!-- 제목과 글자들 -->
                        <v-col cols="auto">
                            <v-card-title class="text-h4" style="font-weight: bold;">
                                Title
                            </v-card-title>
                            
                            <v-card-actions>
                                <v-btn class="ms-2 disabled" size="small" text="PLACE" variant="outlined"></v-btn>
                            </v-card-actions>

                            <v-card-subtitle class="mb-2" style="font-weight: bold;">2024.05.19 ~ 2024.05.20</v-card-subtitle>
                        </v-col>

                        <!-- 수정 아이콘 -->
                        <v-col cols="auto">
                            <v-card-actions>
                                <v-btn class="ms-2" icon="mdi-pencil" variant="text"></v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-col cols="auto">
                            <div class="vertical-line" style="margin-right: 10px;"></div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      hoveredCard: 0, // hover된 카드를 나타내는 변수
    };
  },
};
</script>

<style scoped>
.card-title {
    position: relative;
    margin: 20px;
}

.card-container {
    margin: 20px;
}

.vertical-line {
    border-right: 12px solid #ccc;
    height: 150px;
    margin-left: 8px;
}

.card-container .hover-style {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
}

/* 두 번째 카드의 스타일 */
.card-container:nth-child(2) {
  position: absolute; /* 상대적으로 위치를 조정하기 위해 절대 위치 지정 */
  top: 15; /* 부모 요소 상단에 위치 */
  left: 15; /* 부모 요소 왼쪽에 위치 */
}
</style>