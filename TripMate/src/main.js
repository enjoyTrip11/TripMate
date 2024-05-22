// import './assets/main.css'
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores';
import vuetify from './plugins/vuetify'
import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('e1ee6762eaaad76eea314182d19abc5d');

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(store)
app.component("VueDatePicker", VueDatePicker);
app.mount('#app')
