import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthGuard from './Auth-guard'
import Home from '../views/Home.vue';
import Registration from '../views/Registration.vue';
import Login from '../views/Login.vue';
import Cabinet from "../views/Cabinet";
import RecoverPassword from "../views/RecoverPassword";

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/registration',
		name: 'Registration',
		component: Registration,
	},
	{
		path: '/recoverpassword',
		name: 'RecoverPassword',
		component: RecoverPassword,
	},
	{
		path: '/cabinet',
		name: 'Cabinet',
		component: Cabinet,
		beforeEnter: AuthGuard,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
