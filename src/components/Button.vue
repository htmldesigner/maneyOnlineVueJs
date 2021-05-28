<template>

  <button
  class="btn"
  disabled="disabled"
  :class="options[status].class"
  >
  {{options[status].value}}
  </button>

</template>

<script>
 export default {
  name: "Button",
  props:{
   status: {
    type: Number,
    required: true
   },
    loanID: {
      type: Number,
      required: true
    }
  },
  data() {
   return {
    options: [
     {loanID: this.loanID, value: 'Новый займ', class: 'btn-outline-success', action: false},
     {loanID: this.loanID, value: 'На рассмотрении', class: 'btn-outline-warning', action: false},
     {loanID: this.loanID, value: 'Отклонен', class: 'btn-outline-danger', action: false},
     {loanID: this.loanID, value: 'Одобрен', class: 'btn-outline-success', action: 'selectPaymentMethod'},
     {loanID: this.loanID, value: 'Способ выплаты выбран ', class: 'btn-outline-info', action: 'waitingSigningContract'},
     {loanID: this.loanID, value: 'Ожидание подписание договора', class: 'btn-outline-warning', action: "confirmSignBySMS"},
     {loanID: this.loanID, value: 'SMS для подписания договора отправленна', class: 'btn-outline-info', action: 'confirmSignBySMS'},
     {loanID: this.loanID, value: 'Договор подписан', class: 'btn-outline-success', action: 'getMoney'},
     {loanID: this.loanID, value: 'Выплата отправлена в эквайринг', class: 'btn-outline-warning', action: false},
     {loanID: this.loanID, value: 'Займ выдан', class: 'btn-outline-success', action: false},
     {loanID: this.loanID, value: 'Ошибка выплаты', class: 'btn-outline-danger', action: false},
     {loanID: this.loanID, value: 'Займ погашен', class: 'btn-outline-done', action: false},
    ]
   }
  },


 // {value: 'Выбрать способ оплаты', class: 'btn-outline-info', action: 'selectPaymentMethod'},
 // {value: 'Ожидание подписание договора', class: 'btn-outline-warning', action: "waitingSigningContract"},
 // {value: 'SMS для подписания договора отправленна', class: 'btn-outline-info', action: 'SMS'},

  filters: {
   sliceString(value) {
    let string = value
    if (string.length > 14) {
     return string.slice(0, 14) + '...'
    } else {
     return string.slice(0, 14)
    }
   }
  }
 }
</script>

<style>
.btn-outline-success {
  background-color: #DAFFD9;
  background-image: none;
  border-color: #8BFF89;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #4ADB61;
  min-width: 110px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.btn-outline-danger {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #DB4A4A;
  background-color: #FFD9D9;
  background-image: none;
  border-color: #FFB0B0;
  min-width: 110px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.btn-outline-warning {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #CBB128;
  background-color: #FFFDC7;
  background-image: none;
  border-color: #FFE486;
  min-width: 110px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.btn-outline-info {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #253BD8;
  background-color: #E3E7FF;
  background-image: none;
  border-color: #8796FF;
  min-width: 110px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.btn-outline-done {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  color: #4ADB61;
  background-color: #DAFFD9;
  background-image: none;
  border-color: #8BFF89;
  min-width: 110px;
  padding-top: 6px;
  padding-bottom: 6px;
}

</style>