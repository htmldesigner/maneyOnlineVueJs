<template>

  <button
  v-if="options[status]"
  class="btn"
  :disabled="!options[status].action"
  :class="options[status].class"
  @click="$emit('actions', {action: options[status].action, loanID: options[status].loanID})"
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

<style scoped>

</style>