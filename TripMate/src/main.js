// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueFullPage from "vue-fullpage.js";

const app = createApp(App)

app.use(vuetify)
app.use(VueFullPage); 
app.mount('#app')
