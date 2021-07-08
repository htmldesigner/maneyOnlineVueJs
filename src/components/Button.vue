<template>

  <button
      class="btn"
      disabled="disabled"
      :class="options[status].class"
  >
    {{ options[status].value }}
  </button>

</template>

<script>
export default {
  name: "Button",
  props: {
    status: {
      type: Number,
      required: true
    },
    loanID: {
      type: Number,
      required: true
    }
  },
  computed: {
    options() {
      return [
        {
          loanID: this.loanID,
          value: this.$t('buttons.new_loan', {value: 'Новый займ'}),
          class: 'btn-outline-success',
          action: false
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.under_consideration', {value: "На рассмотрении"}),
          class: 'btn-outline-warning',
          action: false
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.rejected', {value: 'Отклонен'}),
          class: 'btn-outline-danger',
          action: false
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.approved', {value: "Одобрен"}),
          class: 'btn-outline-success',
          action: 'selectPaymentMethod'
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.payment_method_selected', {value: "Способ выплаты выбран"}),
          class: 'btn-outline-info',
          action: 'waitingSigningContract'
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.waiting_signing', {value: 'Ожидание подписание договора'}),
          class: 'btn-outline-warning',
          action: "confirmSignBySMS"
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.SMS_sent', {value: 'SMS для подписания договора отправленна'}),
          class: 'btn-outline-info',
          action: 'confirmSignBySMS'
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.contract_signed', {value: 'Договор подписан'}),
          class: 'btn-outline-success',
          action: 'getMoney'
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.sent_to_acquiring', {value: 'Выплата отправлена в эквайринг'}),
          class: 'btn-outline-warning',
          action: false
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.loan_issued', {value: 'Займ выдан'}),
          class: 'btn-outline-success',
          action: false
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.loan_issued', {value: 'Ошибка выплаты'}),
          class: 'btn-outline-danger',
          action: false
        },
        {
          loanID: this.loanID,
          value: this.$t('buttons.loan_repaid', {value: 'Займ погашен'}),
          class: 'btn-outline-done',
          action: false
        },
      ]
    }
  },
  data() {
    return {}
  },

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