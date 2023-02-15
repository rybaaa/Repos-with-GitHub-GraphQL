import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from "@/routes/routes";
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import SimpleTypeahead from 'vue3-simple-typeahead';


createApp(App)
    .use(store)
    .use(SimpleTypeahead)
    .use(router)
    .mount('#app')
