import Vue from 'vue'
import Vuex from 'vuex'
import Auth from "./Auth";
import common from "./common";
import Cabinet from "./Cabinet";

Vue.use(Vuex)

export default new Vuex.Store({
 state: {},
 mutations: {},
 actions: {},
 modules: {
  Auth, Cabinet, common,
 }
})
