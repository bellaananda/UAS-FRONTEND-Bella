import { createApp } from 'vue';
import App from './App.vue';

//import router
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';

//import axios
import axios from 'axios';
//set credential axios with true
axios.defaults.withCredentials = true;

// Vue.config.productionTip = false

// new Vue({
//     router,
//     render: h => h(App),
// }).$mount('#app')

// import LaravelVuePagination from 'laravel-vue-pagination'

const app = createApp(App);

// //use vue router
app.use(router);

// app.component('pagination', LaravelVuePagination)

app.mount('#app');
