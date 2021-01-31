import api from "../api/api";
import axios from 'axios'
import router from "../router";

export default {
 state: {
  token: null,
  userForm: null,
  userFormStatus: null,
  methodGetMoneyStatus: null
 },
 mutations: {
  SET_TOKEN(state, token) {
   state.token = token
   localStorage.setItem('token', token)
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },
  LOG_OUT(state) {
   state.token = false
   localStorage.removeItem('token')
   delete axios.defaults.headers.common['Token']
  },
  SET_USER_FORM(state, user) {
   console.log(user)
   state.userForm = user
  },
  SET_USER_FORM_STATUS(state, payload) {
   state.userFormStatus = payload
  }
 },
 actions: {
  async loginUser({commit, dispatch}, payload) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.loginUser(payload)
    const token = await response.data.token
    await commit('SET_TOKEN', token)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', 'Неверный логин или пароль.')
    throw error
   }
  },

  logOut({commit}) {
   commit('LOG_OUT')
  },

  /**
   * Предварительная отправка данных пользователя (для получения sms) если не существует то регистрируется
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async sendUserData({commit}, payload) {
   try {
    await api.sendUserData(payload)
   } catch (error) {
    // console.log(error.response.data.error)
    throw error
   }
  },
  /**
   * Отпрвка SMS подтверждения вместе с данными пользователи
   * @param commit
   * @param payload
   * @return {Promise<*>}
   */
  async confirmUserDate({commit}, payload) {
   try {
    return await api.confirmUserDate(payload)
   } catch (error) {
    console.log(error.response.data.error)
    throw error
   }
  },

  /**
   * Получить анкуту пользователя с дынными если есть
   * @param commit
   * @return {Promise<void>}
   */
  async getUserForm({commit, dispatch}) {
   try {
    commit('clearError')
    commit('setLoading', true)
    const response = await api.getUserForm()
    const userForm = new Object()
    userForm.Name = response.data.data.Name
    userForm.Midlename = response.data.data.Midlename
    userForm.Surname = response.data.data.Surname
    // userForm.NaimenovanieNaimenovanie = response.data.data.NaimenovanieNaimenovanie
    userForm.LichiyeDannyeDataRoshdeniya = response.data.data.LichiyeDannyeDataRoshdeniya
    userForm.LichiyeDannyeIIN = response.data.data.LichiyeDannyeIIN
    userForm.LichiyeDannyeDocumentNomer = response.data.data.LichiyeDannyeDocumentNomer
    userForm.LichiyeDannyeDocumentVidan = response.data.data.LichiyeDannyeDocumentVidan
    userForm.LichiyeDannyeDocumentSrokS = response.data.data.LichiyeDannyeDocumentSrokS
    userForm.LichiyeDannyeDocumentSrokPo = response.data.data.LichiyeDannyeDocumentSrokPo
    userForm.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol = response.data.data.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol
    userForm.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie = response.data.data.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie

    userForm.KontaktnayaInformatsyaAdresPropiskiGorod = response.data.data.KontaktnayaInformatsyaAdresPropiskiGorod
    userForm.KontaktnayaInformatsyaAdresPropiskiUlitsa = response.data.data.KontaktnayaInformatsyaAdresPropiskiUlitsa
    userForm.KontaktnayaInformatsyaAdresPropiskiDom = response.data.data.KontaktnayaInformatsyaAdresPropiskiDom
    userForm.KontaktnayaInformatsyaAdresPropiskiKvartira = response.data.data.KontaktnayaInformatsyaAdresPropiskiKvartira

    userForm.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti = response.data.data.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti
    userForm.RabotaOsnovnoeMestoDolzhnost = response.data.data.RabotaOsnovnoeMestoDolzhnost
    userForm.DokhodyRaskhodyDokhodyEzhemesyachiye = response.data.data.DokhodyRaskhodyDokhodyEzhemesyachiye
    userForm.DokhodyRaskhodyRaskhodyViplatyPoCreditam = response.data.data.DokhodyRaskhodyRaskhodyViplatyPoCreditam
    userForm.DokhodyRaskhodyDokhodyEzhemesyachiyePoSovmestitelstvu = response.data.data.DokhodyRaskhodyDokhodyEzhemesyachiyePoSovmestitelstvu
    userForm.KontaktnayaInformatsyaTelefonyMobilniy = response.data.data.KontaktnayaInformatsyaTelefonyMobilniy

    userForm.test = '1'

    let candidate = true
    for (let key in userForm) {
     if (userForm[key].length <= 0) {
      candidate = false
     }
    }
    commit('SET_USER_FORM', userForm)
    if (candidate) {
     commit('SET_USER_FORM_STATUS', true)
    } else {
     commit('SET_USER_FORM_STATUS', false)
    }
    commit('setLoading', false)
   } catch (error) {
    console.log(error.response.data.error)
    commit('setLoading', false)
    dispatch('logOut')
    router.push('/login')
    commit('setError', 'Неверный логин или пароль.')
    throw error
   }
  },

  async sendUserForm({commit}, payload){
   try {
    await api.sendUserForm(payload)
   }catch (error) {
    throw error
   }
  }
 },
 getters: {
  isUserLoggedIn(state) {
   return state.token ? state.token : localStorage.getItem('token') || false
  },
  userFormStatus(state){
   return state.userFormStatus
  },
  methodGetMoneyStatus(state){
   return state.methodGetMoneyStatus
  },
  getFormUser(state){
   return state.userForm
  }
 }
}