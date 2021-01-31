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
 requestSmsForContract(payload){
  return axios(this.dataPost('/loan/sign/sendsms', {id: payload}))
 },

 confirmContractBySMS(payload){
  return axios(this.dataPost('/loan/sign/checksms', {id: payload.id, code: payload.code}))
 },

 setPayment(payload){
  return axios(this.dataPost('/loan/setpayment', payload))
 }


}