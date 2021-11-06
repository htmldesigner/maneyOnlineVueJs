<template>
  <div v-if="activeLoan">
    <table class="table table-striped content-table ru-version border-top-none mt-5">
      <thead>
      <tr>
        <th scope="col">{{ $t('cabinet.loan_No') }}</th>
        <th scope="col">{{ $t('cabinet.loan_amount') }}</th>
        <th scope="col">{{ $t('cabinet.debt') }}</th>
        <th scope="col">{{ $t('cabinet.date_receiving') }}</th>
        <th scope="col">{{ $t('cabinet.maturity_date') }}</th>
        <th scope="col">{{ $t('cabinet.status') }}</th>
        <th scope="col">&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="loan in activeLoan" :key="loan.id">
        <td><span>{{ loan.contract_number }}</span></td>
        <td><span class="status-zaima">{{ loan.sum }} тг</span></td>
        <td><span>{{ loan.pay_in }} тг</span></td>
        <td>
          <span v-if="typeof loan.pay_out_at === Object && loan.pay_out_at.hasOwnProperty('date')">
            {{ moment(loan.pay_out_at.date).format('DD.MM.YYYY') }}</span>
          <span v-else></span></td>
        <td>
          <span v-if="typeof loan.pay_off_at === Object && loan.pay_off_at.hasOwnProperty('date')">
            {{ moment(loan.pay_off_at.date).format('DD.MM.YYYY') }}</span>
          <span v-else></span>
        </td>
        <td>
          <Button :status="loan.status" :loanID="loan.id" @actions="actions"/>
        </td>
        <td>
          <button
              v-if="loan.status === 9 || loan.status === 13"
              type="button"
              class="btn btn-primary"
              @click="$refs.RepaymentModal.modalInit(loan.id)"
          >{{ $t('buttons.pay') }}
          </button>

          <button
              v-if="loan.status === 3"
              type="button"
              class="btn btn-primary"
              @click="actions({loanID: loan.id, action: 'selectPaymentMethod'})"
          >{{ $t('buttons.payment_method') }}
          </button>

          <button
              v-if="loan.status === 4"
              type="button"
              class="btn btn-primary"
              @click="actions({loanID: loan.id, action: 'waitingSigningContract'})"
          >{{ $t('buttons.download_contract') }}
          </button>

          <button
              v-if="loan.status === 5"
              type="button"
              class="btn btn-primary"
              @click="actions({loanID: loan.id, action: 'confirmSignBySMS'})"
          >{{ $t('buttons.send_sms') }}
          </button>

          <button
              v-if="loan.status === 6"
              type="button"
              class="btn btn-primary"
              @click="actions({loanID: loan.id, action: 'signBySMS'})"
          >{{ $t('buttons.sign_contract') }}
          </button>

          <button
              v-if="loan.status === 7"
              type="button"
              class="btn btn-primary"
              @click="actions({loanID: loan.id, action: 'getMoney'})"
          >{{ $t('buttons.get_money') }}
          </button>

          <button
              v-if="loan.status === 12"
              type="button"
              class="btn btn-danger"
              @click="actions({loanID: loan.id, action: 'overDue'})"
          >{{ $t('buttons.message') }}
          </button>

        </td>
      </tr>
      </tbody>
    </table>

    <div class="contract-link d-flex mt-3" v-if="activeLoan[0].contract_link">
      <a :href="activeLoan[0].contract_link" target="_blank">
        <img style="position: relative; top: 4px; width: 36px" src="@/assets/pdf_icon.svg" alt="alt">
        <span>{{ $t('buttons.download_contract') }}</span>
      </a>
    </div>

    <!--    <nav aria-label="Page navigation example">-->
    <!--      <ul class="pagination justify-content-end mt-3">-->
    <!--        <li class="page-item disabled">-->
    <!--          <a class="page-link arrow-left" href="#" tabindex="-1"></a>-->
    <!--        </li>-->
    <!--        <li class="page-item active"><a class="page-link" href="#">1</a></li>-->
    <!--        <li class="page-item"><a class="page-link" href="#">2</a></li>-->
    <!--        <li class="page-item"><a class="page-link" href="#">3</a></li>-->
    <!--        <li class="page-item"><a class="page-link arrow-right mr-0" href="#"></a>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--    </nav>-->

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
    activeLoan() {
      return this.$store.getters.getActiveLoan
    }
  },
  data() {
    return {
      test: {
        first: {
          time: 'string'
        }
      },
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
        case 'overDue':
          return this.$store.commit('setError', this.$t('message.overDue') + '<br>' + "<a href='tel:+7 747 980 15 85'>+7 747 980 15 85</a>")
      }
    }
  },

  mounted() {
    this.$store.dispatch('getLoanList')
    this.$store.dispatch('getUserCards')
  }
}
</script>

<style scoped>
.contract-link {
  cursor: pointer;
}

.contract-link span {
  font-size: 18px;
  color: #507cff;
  transition: .25s ease;
}

.contract-link:hover span {
  color: #333;
}
</style>
