import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueI18n from 'vue-i18n'
import VeeValidate from 'vee-validate'

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

import moment from 'moment'
import 'moment/locale/ru'
Vue.prototype.moment = moment

Vue.use(VueI18n)
import kz from './locales/kz.json'
import ru from './locales/ru.json'

const messages = {
	kz,
	ru
}

const i18n = new VueI18n({
	locale: 'ru',
	messages
});


/**
	* Style
	*/
import './assets/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min'
import './assets/css/main.css';
import './assets/css/form.css';
import './assets/css/msg.css';



Vue.config.productionTip = false;

new Vue({
	i18n,
	$,
	router,
	store,
	render: h => h(App),
}).$mount('#app');
