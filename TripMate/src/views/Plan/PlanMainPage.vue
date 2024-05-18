<template>
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
                        <v-text-field v-model="title" color="blue-grey-lighten-2" label="제목" class="input-field"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="place" color="blue-grey-lighten-2" label="여행지" class="input-field"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <!--v-text-field v-model="time" color="blue-grey-lighten-2" label="날짜" class="input-field"></v-text-field-->
                        
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
            </v-container>
        </v-form>

        <v-divider></v-divider>
    </v-card>
</template>

<script>
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
        }
    },

    methods: {
        remove(item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },
    },
}
</script>

<style scoped>
.custom-card {
    width: 1500px;
    height: 900px;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #87C4FF; /* 테두리 색상 설정 */
    background-color: white; /* 배경색 흰색으로 설정 */
}
.img-center .v-img__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.text-center {
  position: absolute;
  bottom: 200px; /* 원하는 위치로 조정 가능 */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
}
</style>