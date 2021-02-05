import api from "../api/api";

export default {
 state: {
  supportMessage: null
 },
 mutations: {
  SET_SUPPORT_MESSAGE(store, payload) {
   store.supportMessage = payload
  }
 },
 actions: {
  async getSupportMessage({commit}) {
   try {
    const response = await api.getSupport()
    commit('SET_SUPPORT_MESSAGE', response.data)
   } catch (e) {
   }
  },
  async sendMessageToSupport({commit, dispatch}, payload) {
   try {
    const response = await api.sendMessageToSupport(payload)
    commit('SET_SUPPORT_MESSAGE', response.data)
   } catch (e) {

   }
  }
 },
 getters: {
  getSupportMessage: state => state.supportMessage
 }
}

