import r from './routes'
import axios from 'axios';

export default {
  dataPost(route, data) {
    let headers = {}
    headers['Content-Type'] = 'multipart/form-data';
    return {
      method: 'POST',
      url: r(route),
      data: data,
      headers: headers,
      transformRequest: [(data) => {
        let fData = new FormData();
        for (let key in data) {
          fData.set(key, data[key])
        }
        return fData;
      }],
    };
  },


  dataGet(route) {
    return {
      method: 'get',
      url: r(route),
      headers: {}
    };
  },

  loginUser(payload) {
    return axios(this.dataPost('/login', payload));
  },

  /**
   * Подучить все карты пользователя
   * @returns {AxiosPromise}
   */
  getUserCards() {
    return axios(this.dataGet('/user/cards'));
  },

  /**
   * Активировать карту
   * @param id
   * @returns {Promise<AxiosResponse<any>>}
   */
  setActiveUserCard(id) {
    return axios.put('https://expresszaim.kz/api/user/cards/' + id);
  },

  /**
   * Добавить карту
   * @param payload
   * @returns {AxiosPromise}
   */
  addCard(payload) {
    return axios(this.dataPost('/user/cards', payload))
  },

  removeCard(id){
    // return axios.delete('https://expresszaim.kz/api/user/cards/' + id);
    return axios.delete('https://expresszaim.kz/api/user/cards/' + id);
  },

  checkRegistration(axios) {
    return axios(this.dataGet('/user/checkregistration'));
  },

  /**
   * Получить анкуту пользователя
   * @return {AxiosPromise}
   */
  getUserForm() {
    return axios(this.dataGet('/user/anketa'));
  },

  /**
   * Отправить анкету пользователя
   * @param payload
   * @return {AxiosPromise}
   */
  sendUserForm(payload) {
    return axios(this.dataPost('/user/anketa', payload));
  },

  sendUserData(payload) {
    return axios(this.dataPost('/user/sendsms', payload));
  },
  /**
   * Отправить SMS подтверждение
   * @param payload
   * @return {AxiosPromise}
   */
  confirmUserDate(payload) {
    return axios(this.dataPost('/user/checksms', payload))
  },

  /**
   * Список займов пользователя
   * @return {AxiosPromise}
   */
  getLoanList() {
    return axios(this.dataGet('/loan'))
  },

  /**
   * Отправить запрос на займ
   * @param payload
   * @return {AxiosPromise}
   */
  sendLoanRequest(payload) {
    return axios(this.dataPost('/loan', payload))
  },

  /**
   * Запрос ссылки на получения договора
   * @return {AxiosPromise}
   */
  getContract(payload) {
    return axios(this.dataGet('/loan/getcontract?id=' + payload))
  },

  /**
   * Запросить SMS для подтверждения договора
   * @param payload
   * @return {AxiosPromise}
   */
  requestSmsForContract(payload) {
    return axios(this.dataPost('/loan/sign/sendsms', {id: payload}))
  },

  confirmContractBySMS(payload) {
    return axios(this.dataPost('/loan/sign/checksms', {id: payload.id, code: payload.code}))
  },
  /**
   *  Выбор метода выплаты займа
   * @param payload
   * @return {AxiosPromise}
   */
  setPayment(payload) {
    return axios(this.dataPost('/loan/setpayment', payload))
  },
  /**
   *  Запрос выплаты
   * @param payload
   * @return {AxiosPromise}
   */
  requestPayment(payload) {
    return axios(this.dataGet('/loan/requestpayment?id=' + payload))
  },

  /**
   * Выплота долга
   * @param payload
   * @return {AxiosPromise}
   */
  rePayment(payload) {
    return axios(this.dataPost('/loan/repayment', payload))
  },

  /**
   * Остаток по текущему займу
   * @param payload
   * @return {AxiosPromise}
   */
  debt(payload) {
    return axios(this.dataGet('/loan/debt?id=' + payload))
  },
  /**
   * Выбор метода выплат (шаг 3)
   * @param payload
   * @return {AxiosPromise}
   */
  selectPaymentMethod(payload) {
    return axios(this.dataPost('/user/payment_method', {method: payload}))
  },
  /**
   * Проверка выбран ли метод выплат (в шаге 3)
   * @return {AxiosPromise}
   */
  checkPaymentMethod() {
    return axios(this.dataGet('/user/payment_method'))
  },

  /**
   * Получить чат саппорта
   * @return {AxiosPromise}
   */
  getSupport() {
    return axios(this.dataGet('/support'))
  },
  /**
   * Отправить сообщение в саппорт
   * @param payload
   * @return {AxiosPromise}
   */
  sendMessageToSupport(payload) {
    return axios(this.dataPost('/support', payload))
  },
  /**
   * Востоновление пароля
   * @param payload
   * @return {AxiosPromise}
   */
  forgotPhone(payload) {
    return axios(this.dataPost('/forgot/phone', payload))
  },

  forgotCheck(payload) {
    return axios(this.dataPost('/forgot/check', payload))
  },
  /**
   * Смена пароля
   * @param payload
   * @returns {AxiosPromise}
   */
  changePassword(payload){
    return axios(this.dataPost('/user/changepass', payload))
  }


}
