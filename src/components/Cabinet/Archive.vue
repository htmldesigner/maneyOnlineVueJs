<template>
  <div v-if="archiveLoan">
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
        <th scope="col">{{ $t('cabinet.contract') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="loan in archiveLoan" :key="loan.id">
        <td><span>{{ loan.contract_number }}</span></td>
        <td><span class="status-zaima">{{ loan.sum }} тг</span></td>
        <td><span>{{ loan.pay_in }} тг</span></td>
        <td><span>{{ moment(loan.pay_out_at.date).format('DD.MM.YYYY') }}</span></td>
        <td><span>{{ moment(loan.pay_off_at.date).format('DD.MM.YYYY') }}</span></td>
        <td>
          <Button :status="loan.status" :loanID="loan.id"/>
        </td>
        <td>
          <button
              v-if="loan.status === 9"
              type="button"
              class="btn btn-primary"
              @click="$refs.RepaymentModal.modalInit(loan.id)"
          >
            {{ $t('buttons.pay') }}
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

        </td>
        <td v-if="loan.contract_link">
          <a :href="loan.contract_link" target="_blank">
            <img style="position: relative; top: 4px; width: 36px" src="@/assets/pdf_icon.svg" alt="alt">
            <span>{{ $t('buttons.download_contract') }}</span>
          </a>
        </td>
        <td v-else>

        </td>
      </tr>
      </tbody>
    </table>

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
  </div>

  <div v-else class="form-control d-flex flex-column align-items-center border-0 pt-5 pb-5 empty">
    <label class="">{{ $t('buttons.no_repaid_loans') }}</label>
    <img alt="" class="step-thumb" src="@/assets/image/empty.svg">
  </div>
</template>

<script>
import Button from "../Button";

export default {
  name: "Archive",
  components: {
    Button
  },
  computed: {
    archiveLoan() {
      return this.$store.getters.getArchiveLoan
    }
  },
  data() {
    return {
      archive: false
    }
  }
}
</script>

<style scoped>

</style>