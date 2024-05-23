<template>
    <v-container fluid>route
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
                                <v-menu v-model="datePicker" :close-on-content-click="false"
                                    transition="scale-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <!-- <v-text-field v-model="time" color="blue-grey-lighten-2" label="날짜" class="input-field"
                                        readonly v-on="on"></v-text-field> -->
                                        <date-picker-range @handleDateChange="handleDateChange" />
                                    </template>
                                </v-menu>
                            </v-col>

                            <v-col cols="12">
                                <v-autocomplete v-model="friends" :items="people" color="blue-grey-lighten-2"
                                    item-value="name" label="친구 추가" chips closable-chips multiple class="input-field">
                                    <template v-slot:chip="{ props, item }">
                                        <v-chip v-bind="props">
                                            <v-avatar left>
                                                <v-img :src="item.raw.avatar || defaultAvatar"></v-img>
                                            </v-avatar>
                                            <span>{{ item.raw.name }}</span>
                                        </v-chip>
                                    </template>

                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props" style="display: flex; align-items: center;">
                                            <v-list-item-avatar>
                                                <v-icon v-if="!item.raw.avatar">mdi-account</v-icon>
                                                <v-img v-else :src="item.raw.avatar"></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content style="flex: 1;">
                                                <v-list-item-title v-text="item.raw.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                        <div class="d-flex justify-center">
                            <router-link :to="{ name: 'planCreate', params: { planId : 0} }">
                                <v-btn depressed width="150px" @click="handleTravel">여행하기</v-btn>
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
                        <template v-for="(item, i) in myPlans" :key="i">
                            <v-col cols="12" md="4">
                                <v-hover v-slot="{ isHovering, props }">
                                    <v-card :class="{ 'on-hover': isHovering }" :elevation="isHovering ? 12 : 2"
                                        v-bind="props">
                                        <div :style="{ backgroundColor: getRandomPastelColor(), height: '250px', backgroundSize: 'cover' }">
                                            <v-card-title
                                                class="text-h6 font-weight-bold text-black d-flex flex-column card-detail-title">                              
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
                                                        <span> {{ item.writer }} </span>
                                                    </p>
                                                </div>
                                            </v-card-title>
                                            <div class="align-self-center card-detail-button">
                                                <router-link :to="{ name: 'planCreate', params: { planId : item.id} }">
                                                <v-btn v-for="(icon, index) in icons" :key="index"
                                                    :class="{ 'show-btns': isHovering }" :color="transparent" :icon="icon"
                                                    variant="text"></v-btn>
                                                </router-link>
                                            </div>
                                        </div>
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
import axios from 'axios';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()

const selectedDateRange = ref(null)
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
            friends: [],
            selectedFriend: null,
            title: '',
            people: [],
            place: '',
            icons: ['mdi-play'],
            myPlans: [],
            transparent: 'rgba(255, 255, 255, 0)',
        }
    },

    components: { DatePickerRange },

    methods: {
        handleDateChange(value) {
            selectedDateRange.value = value;
        },
        // navigateToPlanCreate(tripId) {
        //     console.log("이거:::::::",tripId)
        //     router.push({ name:"planCreate", params: {planId : tripId} });
        // },
        fetchFriends() {
            axios.get('http://localhost:8080/user/list')
                .then(response => {
                    console.log("FetchFriends........", response.data)
                    this.people = response.data.map(friend => ({
                        name: friend.name,
                        avatar: friend.profile,
                        userId: friend.userId
                    }));
                })
                .catch(error => {
                    console.error('Error fetching friends:', error);
                });
        },
        fetchMyPlans() {
            const accessToken = localStorage.getItem('accessToken');
            console.log(accessToken);
            axios.get('http://localhost:8080/trip', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => {
                console.log("FetchMyPlans................", response.data)
                this.myPlans = response.data.map(plan => ({
                    id: plan.tripId,
                    title: plan.title,
                    place: plan.place,
                    date: plan.startDate + " ~ " + plan.endDate,
                    writer: this.people.find(person => person.userId === plan.writer).name
                }));
                console.log(this.myPlans);
            })
            .catch(error => {
                console.error('Error fetching my plans:', error);
            });
        },
        getRandomPastelColor() {
            const pastelColors = ['#FFC3A0', '#FFD8B8', '#FFEEC9', '#D0FFF2', '#C7CEEA', '#FFDFD3', '#B5EAD7'];
            const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
            return randomColor;
        },
        handleTravel() {
            const dates = selectedDateRange.value.split(' ~ ');
            const startDate = dates[0];
            const endDate = dates[1];
            // 여행하기 버튼을 누르면 실행되는 메소드
            const tripSaveDto = {
                writer: 0, // 작성자의 ID
                title: this.title, // 제목 입력값
                place: this.place, // 여행지 입력값
                startDate: startDate, // 선택한 시작 날짜
                endDate: endDate // 선택한 끝 날짜
            };

            const inviteSaveDtoList = this.friends.map(friend => ({
                tripId: 0, // 여행 ID는 생성 후에 할당될 것으로 가정하고 0으로 설정
                receiverId: this.people.find(person => person.name === friend).userId, // 친구 추가한 user의 ID
                state: "PENDING" // 초대 상태 초기값 설정
            }));

            const accessToken = localStorage.getItem('accessToken');

            axios.post('http://localhost:8080/trip', {
                tripSaveDto,
                inviteSaveDtoList
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // 토큰을 Bearer 스키마에 넣어줌
                }
            })
            .then(() => {
                // 요청 성공 시 처리할 작업
                console.log('여행 생성 성공');
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('서버 에러:', error);
            });
        },

        remove(item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },
    },
    created() {
        this.fetchFriends();
        this.fetchMyPlans();
    }
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
    margin-top: 0px;
    width: 100%;
    text-align: center;
}

.card-detail-content {
    margin-top: 3px;
}

.card-detail-button {
    display: flex;
    justify-content: center;
    margin-top: 15px;
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
    color: rgb(103, 103, 103) !important;
}

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>