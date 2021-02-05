import Vue from 'vue'
import Vuex from 'vuex'
import Auth from "./Auth";
import common from "./common";
import Cabinet from "./Cabinet";
import SupportChat from "./SupportChat";

Vue.use(Vuex)

export default new Vuex.Store({
 state: {},
 mutations: {},
 actions: {},
 modules: {
  Auth, Cabinet, SupportChat, common,
 }
})
