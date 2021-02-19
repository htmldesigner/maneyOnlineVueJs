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
   state.userForm = user
  },
  SET_USER_FORM_STATUS(state, payload) {
   state.userFormStatus = payload
  },
  SET_PAYMENT_METHOD(state, payload) {
   state.methodGetMoneyStatus = payload
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
    await dispatch('getUserForm') // Запрос формы
    await dispatch('checkPaymentMethod') // Запрос метода выплат
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    await commit('setError', 'Неверный логин или пароль.')
    commit('LOG_OUT')
    // throw error
   }
  },

  logOut({commit}) {
   commit('LOG_OUT')
   commit('SET_LOAN', null)
   commit('SET_USER_FORM', null)
  },
  /**
   * Востоновление пароля
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async forgotPhone({commit}, payload) {
   commit('clearError')
   try {
    return await api.forgotPhone(payload)
   } catch (e) {
    commit('setError', "Ошибка СМС центра попробуйте через 3 минуты")
   }
  },

  async forgotCheck({commit, dispatch}, payload) {
   commit('clearError')
   try {
    const response = await api.forgotCheck(payload)
    const token = await response.data.data.token
    if (token) {
     await commit('SET_TOKEN', token)
     await dispatch('getUserForm') // Запрос формы
     await dispatch('checkPaymentMethod') // Запрос метода выплат
    }
    commit('setSuccess', 'Успешно')
   } catch (e) {
    commit('setError', "Ошибка СМС центра попробуйте через 3 минуты")
   }
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
    await commit('setError', 'Неверный СМС код')
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
    userForm.DokhodyRaskhodyDokhodyEzhemesyachiyeOsnovMestoRaboty = response.data.data.DokhodyRaskhodyDokhodyEzhemesyachiyeOsnovMestoRaboty
    userForm.DokhodyRaskhodyRaskhodyViplatyPoCreditam = response.data.data.DokhodyRaskhodyRaskhodyViplatyPoCreditam
    userForm.DokhodyRaskhodyDokhodyEzhemesyachiyePoSovmestitelstvu = response.data.data.DokhodyRaskhodyDokhodyEzhemesyachiyePoSovmestitelstvu
    userForm.KontaktnayaInformatsyaTelefonyMobilniy = response.data.data.KontaktnayaInformatsyaTelefonyMobilniy

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
    commit('setLoading', false)
    dispatch('logOut')
    commit('setError', 'Выполните вход в кабинет')
    setTimeout(() => {
     router.push('/login')
    }, 500)
   }
  },
  /**
   * Отправить форму пользователя
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async sendUserForm({commit, dispatch}, payload) {
   try {
    await api.sendUserForm(payload)
    await dispatch('getUserForm')
   } catch (error) {
    throw error
    // dispatch('logOut')
    // router.push('/login')
   }
  },
  /**
   * Выбрать метод выплаты (шаг 3)
   * @param commit
   * @param payload
   * @return {Promise<void>}
   */
  async selectPaymentMethod({commit}, payload) {
   try {
    const response = await api.selectPaymentMethod(payload)
    commit('SET_PAYMENT_METHOD', response.data.data.message)
    router.push('/cabinet')
    commit('setSuccess', 'Успешно')
   } catch (error) {
    // throw error
   }
  },
  /**
   * Проверка выбран ли метод выплат (в шаге 3)
   * @return {Promise<void>}
   */
  async checkPaymentMethod({commit}, payload) {
   // commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.checkPaymentMethod()
    commit('SET_PAYMENT_METHOD', response.data.data.method)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
   }
  }
 },
 getters: {
  isUserLoggedIn(state) {
   return state.token ? state.token : localStorage.getItem('token') || false
  },
  userFormStatus(state) {
   return state.userFormStatus
  },
  methodGetMoneyStatus(state) {
   return state.methodGetMoneyStatus
  },
  getFormUser(state) {
   return state.userForm
  }
 }
}