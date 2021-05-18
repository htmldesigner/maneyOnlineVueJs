<template>
  <div v-if="loanList">
    <table class="table table-striped content-table ru-version border-top-none mt-5">
      <thead>
      <tr>
        <th scope="col">№ Займа</th>
        <th scope="col">Сумма займа</th>
        <th scope="col">Задолженность</th>
        <th scope="col">Дата получения</th>
        <th scope="col">Дата погашения</th>
        <th scope="col">Статус</th>
        <th scope="col">&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="loan in loanList" :key="loan.id">
        <td><span>{{ loan.id }}</span></td>
        <td><span class="status-zaima">{{ loan.sum }} тг</span></td>
        <td><span>{{ loan.pay_in }} тг</span></td>
        <td><span>{{ moment(loan.pay_out_at.date).format('DD.MM.YYYY') }}</span></td>
        <td><span>{{ moment(loan.pay_off_at.date).format('DD.MM.YYYY') }}</span></td>
        <td>
          <Button :status="loan.status" :loanID="loan.id" @actions="actions"/>
        </td>
        <td>
          <button
              v-if="loan.status === 9"
              type="button"
              class="btn btn-primary pay"
              @click="$refs.RepaymentModal.modalInit(loan.id)"
          >Оплатить
          </button>

          <button
              v-if="loan.status === 3"
              type="button"
              class="btn btn-primary pay"
              @click="actions({loanID: loan.id, action: 'selectPaymentMethod'})"
          >Выбрать способ выплат
          </button>

          <button
              v-if="loan.status === 4"
              type="button"
              class="btn btn-primary pay"
              @click="actions({loanID: loan.id, action: 'waitingSigningContract'})"
          >Скачать договор
          </button>

          <button
              v-if="loan.status === 5"
              type="button"
              class="btn btn-primary pay"
              @click="actions({loanID: loan.id, action: 'confirmSignBySMS'})"
          >Отправить SMS подтверждения
          </button>

          <button
              v-if="loan.status === 6"
              type="button"
              class="btn btn-primary pay"
              @click="actions({loanID: loan.id, action: 'signBySMS'})"
          >Подписать договор
          </button>

          <button
              v-if="loan.status === 7"
              type="button"
              class="btn btn-primary pay"
              @click="actions({loanID: loan.id, action: 'getMoney'})"
          >Получить средства
          </button>

        </td>
      </tr>

      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end mt-3">
        <li class="page-item disabled">
          <a class="page-link arrow-left" href="#" tabindex="-1"></a>
        </li>
        <li class="page-item active"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link arrow-right mr-0" href="#"></a>
        </li>
      </ul>
    </nav>

    <PaymentMethod ref="PaymentMethodModal"/>
    <WaitingSigningContract ref="WaitingSigningContractModal"/>
    <ConfirmSignBySMS ref="ConfirmSignBySMSModal"/>
    <GetMoney ref="GetMoneyModal"/>
    <Repayment ref="RepaymentModal"/>
  </div>

  <div v-else class="form-control d-flex flex-column align-items-center border-0 pt-5 pb-5 empty">
    <label class="">У вас нет активных займов</label>
    <img alt="" class="step-thumb" src="@/assets/image/empty.svg">
  </div>
</template>

<script>
import Button from "../Button";
import PaymentMethod from "./ModalWindow/PaymentMethod";
import WaitingSigningContract from "./ModalWindow/WaitingSigningContract";
import ConfirmSignBySMS from "./ModalWindow/ConfirmSignBySMS";
import GetMoney from "./ModalWindow/GetMoney";
import Repayment from "./ModalWindow/Repayment";

export default {
  name: "Loans",
  components: {
    Repayment,
    GetMoney,
    Button,
    PaymentMethod,
    WaitingSigningContract,
    ConfirmSignBySMS
  },
  computed: {
    loanList() {
      return this.$store.getters.getLoanList
    }
  },
  data() {
    return {
      loanID: null
    }
  },
  methods: {
    async actions(value) {
      switch (value.action) {
        case 'selectPaymentMethod':
          return this.$refs.PaymentMethodModal.modalInit(value.loanID)
        case 'waitingSigningContract':
          return this.$refs.WaitingSigningContractModal.modalInit(value.loanID)
        case 'confirmSignBySMS':
          let response = await this.$store.dispatch('requestSmsForContract', value.loanID)
          if (response?.data?.data?.message) {
            this.$refs.ConfirmSignBySMSModal.modalInit(value.loanID)
          }
          this.$store.dispatch('getLoanList')
          return
        case 'signBySMS':
          return this.$refs.ConfirmSignBySMSModal.modalInit(value.loanID)
        case 'getMoney':
          return this.$refs.GetMoneyModal.modalInit(value.loanID)
      }
    }
  },

  mounted() {
    this.$store.dispatch('getLoanList')
  }
}
</script>

<style scoped>
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