// import './assets/main.css'
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.component("VueDatePicker", VueDatePicker);
app.mount('#app')
