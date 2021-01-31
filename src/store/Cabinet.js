import api from "../api/api";
import router from "../router";

export default {
 state: {
  loanList: null,
  paymentMethodList: [{id: 1, value: 'Карта'}, {id: 2, value: 'Банковский перевод'}],
  contract: null
 },
 mutations: {
  SET_LOAN(state, payload) {
   state.loanList = payload
  },
  SET_CONTRACT(state, payload) {
   state.contract = payload
  }
 },
 actions: {
  /**
   * Получить все займы пользователя
   * @param commit
   * @return {Promise<void>}
   */
  async getLoanList({commit, dispatch}) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.getLoanList()
    commit('SET_LOAN', response.data.data)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', 'Ошибка загрузки.')
    dispatch('logOut')
    router.push('/login')
    throw error
   }
  },
  /**
   * Отправить заявку на займ
   * @param commit
   * @param payload
   */
  async sendLoanRequest({commit}, payload) {
   try {
    await api.sendLoanRequest(payload)
   } catch (e) {
    console.log(e)
   }
  },
  /**
   * Получить договор на подписания
   * @param commit
   * @return {Promise<void>}
   */
  async getContract({commit, dispatch}, payload) {
   try {
    const response = await api.getContract(payload)
    commit('SET_CONTRACT', response.data.data.contract_file)
   } catch (error) {
    dispatch('logOut')
    router.push('/login')
    console.log(error.response.data.error)
   }
  },
  /**
   * Запрос на отправку SMS на серевере
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async requestSmsForContract({commit}, payload) {
   try {
    await api.requestSmsForContract(payload)
   } catch (error) {
    throw error
   }
  },
  /**
   * Подтвердить договор по SMS
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async confirmContractBySMS({commit}, payload){
   try {
    api.confirmContractBySMS(payload)
   }catch (error) {
    throw error
   }
  },
  setPayment({commit}, payload){
   try {
    api.setPayment(payload)
   }catch (e) {
    throw e
   }
  }
 },
 getters: {
  getLoanList: state => state.loanList,
  paymentMethodList: state => state.paymentMethodList,
  getContract: state => state.contract
 }
}
