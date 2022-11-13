import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import './assets/style/css/line-awesome.min.css'
import './assets/style/index.css'
import 'animate.css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

createApp(App).use(store).mount('#app')

