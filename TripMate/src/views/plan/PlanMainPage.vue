<template>
    <v-container fluid>
    <div class="wrapper">
        <v-card class="mx-auto custom-card" color="white" d-flex justify-center align-center>
            <v-img height="600" color="#E0F4FF" cover class="img-center">
                <v-row class="pa-3 align-center" justify="center">
                    <v-col cols="12" class="text-right">
                        <v-menu location="bottom start" origin="top" transition="slide-y-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="comfortable" icon="mdi-dots-vertical"
                                    variant="tonal"></v-btn>
                            </template>
    
                            <v-list :lines="false">
                                <v-list-item title="Update" @click="isUpdating = true"></v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>
    
                    <v-row justify="center">
                        <v-col class="text-center">
                            <h3 class="text-h2">{{ title }}</h3>
                            <br><br>
                            <span class="text-grey" style="font-size: 22px;">{{ place }}</span>
                        </v-col>
                    </v-row>
                </v-row>
            </v-img>
    
            <v-form>
                <v-container>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field v-model="title" color="blue-grey-lighten-2" label="제목"
                                class="input-field"></v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="6">
                            <v-text-field v-model="place" color="blue-grey-lighten-2" label="여행지"
                                class="input-field"></v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="6">
                            <v-menu v-model="datePicker" :close-on-content-click="false" transition="scale-transition"
                                offset-y>
                                <template v-slot:activator="{ on }">
                                    <!-- <v-text-field v-model="time" color="blue-grey-lighten-2" label="날짜" class="input-field"
                                        readonly v-on="on"></v-text-field> -->
                                    <date-picker-range @handleDateChange="handleDateChange" />
                                </template>
                            </v-menu>
                        </v-col>
    
                        <v-col cols="12">
                            <v-autocomplete v-model="friends" :items="people" color="blue-grey-lighten-2" item-title="name"
                                item-value="name" label="친구 추가" chips closable-chips multiple class="input-field">
                                <template v-slot:chip="{ props, item }">
                                    <v-chip v-bind="props" :prepend-avatar="item.raw.avatar" :text="item.raw.name"></v-chip>
                                </template>
    
                                <template v-slot:item="{ props, item }">
                                    <v-list-item v-bind="props" :prepend-avatar="item.raw.avatar" :subtitle="item.raw.group"
                                        :title="item.raw.name"></v-list-item>
                                </template>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                    <div class="d-flex justify-center">
                        <router-link :to="{ name: 'planCreate'}">
                        <v-btn depressed width="150px">여행하기</v-btn>
                    </router-link>
                    </div>
                </v-container>
            </v-form>
        </v-card>
    
        <v-form class="card-form">
            <v-divider style="margin-top: 50px;"></v-divider>
            <h2 class="card-title">내 계획</h2>
            <v-container class="pa-4 card-container-up">
                <v-row justify="center">
                    <template v-for="(item, i) in items" :key="i">
                        <v-col cols="12" md="4">
                            <v-hover v-slot="{ isHovering, props }">
                                <v-card :class="{ 'on-hover': isHovering }" :elevation="isHovering ? 12 : 2" v-bind="props">
                                    <v-img :src="item.img" height="250px" cover>
                                        <v-card-title
                                            class="text-h6 font-weight-bold text-white d-flex flex-column card-detail-title">
                                            <p class="mt-4">
                                                {{ item.title }}
                                            </p>
                                            <br>
                                            <div>
                                                <p class="ma-0 text-body-1 font-weight-bold card-detail-content">
                                                    {{ item.place }}
                                                </p>
                                                <p class="text-caption font-weight-medium card-detail-content">
                                                    {{ item.date }}
                                                </p>
                                                <p class="text-caption font-weight-medium card-detail-content">
                                                    <span v-for="(friend, index) in item.friend" :key="index">
                                                        {{ friend }}<span v-if="index < item.friend.length - 1">, </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </v-card-title>
                                        <div class="align-self-center card-detail-button">
                                            <v-btn v-for="(icon, index) in icons" :key="index"
                                                :class="{ 'show-btns': isHovering }" :color="transparent" :icon="icon"
                                                variant="text"></v-btn>
                                        </div>
                                    </v-img>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </template>
                </v-row>
            </v-container>
        </v-form>
    </div>
</v-container>
</template>

<script>
import DatePickerRange from "@/components/DatePickerRange.vue";
export default {
    data() {
        const srcs = {
            1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        }

        return {
            friends: ['Sandra Adams', 'Britta Holt'],
            title: 'Midnight Crew',
            people: [
                { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
                { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
                { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
                { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
                { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
                { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
                { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
                { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
            ],
            place: 'The summer breeze',
            icons: ['mdi-play'],
            items: [
                {
                    title: '제목~~',
                    place: '지역',
                    date: '2024-05-19 ~ 2024-05-20',
                    friend: ['친구 1', '친구 2', '친구 3'],
                    img: 'https://cdn.vuetifyjs.com/docs/images/cards/hands.jpg',
                },
                {
                    title: 'Rock',
                    place: 'Greatest Rock Hits',
                    date: 'Lose yourself in rock tunes.',
                    friend: ['Lose yourself in rock tunes.'],
                    img: 'https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg',
                },
                {
                    title: 'Mellow Moods',
                    place: 'Ambient Bass',
                    date: 'Chill beats to mellow you out.',
                    friend: ['Chill beats to mellow you out.'],
                    img: 'https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg',
                },
                {
                    title: '제목',
                    place: '지역',
                    date: '2024-05-19 ~ 2024-05-20',
                    friend: ['친구1', '친구2'],
                    img: 'https://cdn.vuetifyjs.com/docs/images/cards/hands.jpg',
                },
                {
                    title: 'Rock',
                    place: 'Greatest Rock Hits',
                    date: 'Lose yourself in rock tunes.',
                    friend: ['Lose yourself in rock tunes.'],
                    img: 'https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg',
                },
                {
                    title: 'Mellow Moods',
                    place: 'Ambient Bass',
                    date: 'Chill beats to mellow you out.',
                    friend: ['Chill beats to mellow you out.'],
                    img: 'https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg',
                },
            ],
            transparent: 'rgba(255, 255, 255, 0)',
        }
    },

    components: { DatePickerRange },

    methods: {
        handleDateChange(value) {
            // datepicker 이벤트 처리
        },

        remove(item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },
    },
}
</script>

<style scoped>
.custom-card {
    width: 100%;
    /* height: 950px; */
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #87C4FF;
    /* 테두리 색상 설정 */
    background-color: white;
    /* 배경색 흰색으로 설정 */
}

.img-center .v-img__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.text-center {
    position: absolute;
    bottom: 200px;
    /* 원하는 위치로 조정 가능 */
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 100%;
}

.card-form {
    /* position: absolute;*/
    margin-top: 50px;
    width: 100%;
}

.card-title {
    /* position: absolute; */
    margin-top: 30px;
    width: 100%;
    text-align: center;
}

.card-detail-title {
    /* position: absolute; */
    margin-top: 20px;
    width: 100%;
    text-align: center;
}

.card-detail-content {
    margin-top: 3px;
}

.card-detail-button {
    display: flex;
    justify-content: center;
    margin-top: 190px;
}

.card-container-up {
    margin-top: 30px;
}

.v-card {
    transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
    opacity: 0.6;
}

.show-btns {
    color: rgba(255, 255, 255, 1) !important;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>