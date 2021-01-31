import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

/**
	* Plugins
	*/
import $ from 'jquery'
import './plugins/vee-validate'
import axios from "axios";
Vue.prototype.$http = axios
const token = localStorage.getItem('token')
if (token) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
/**
	* Style
	*/
import './assets/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min'
import './assets/css/main.css';
import './assets/css/form.css';
import './assets/css/msg.css';

import moment from 'moment'

Vue.prototype.moment = moment


Vue.config.productionTip = false;

new Vue({
	$,
	router,
	store,
	render: h => h(App),
}).$mount('#app');
