<template>
  <div class="wrap mb-auto" v-if="getFormUser && checkPaymentMethod !== null">
    <div class="container w-1530">
      <div class="align-items-center justify-content-center flex-column">
        <div class="login-form">
          <div class="form-signin ofzaim-table">

            <ul class="nav nav-tabs main-tabs float-left mb-4" id="myTab">

              <li class="nav-item">
                <a class="nav-link"
                   :class="{active: currentComponent === 'Loans'}"
                   @click="currentComponent = 'Loans'"
                >{{ $t('cabinet.active_loan') }}</a>
              </li>


              <li class="nav-item">
                <a class="nav-link"
                   :class="{active: currentComponent === 'Archive'}"
                   @click="currentComponent = 'Archive'"
                >{{ $t('cabinet.archive_loan') }}</a>
              </li>


              <li class="nav-item ">
                <a class="nav-link"
                   :class="{active: currentComponent === 'CardsAccounts'}"
                   @click="currentComponent = 'CardsAccounts'"
                >{{ $t('cabinet.cards') }}</a>
              </li>

              <li class="nav-item">
                <a class="nav-link"
                   :class="{active: currentComponent === 'PersonalData'}"
                   @click="currentComponent = 'PersonalData'"
                >{{ $t('cabinet.personal_data') }}</a>
              </li>

              <li class="nav-item">
                <a class="nav-link"
                   :class="{active: currentComponent === 'Feedback'}"
                   @click="currentComponent = 'Feedback'"
                >{{ $t('cabinet.callback') }}</a>
              </li>

            </ul>

            <ul class="nav nav-tabs ofzaim-btn" role="tablist">
              <li class="nav-item ml-0 ml-md-auto mt-3 mt-md-auto mb-3 mb-md-auto">
                <button :disabled="activeLoan"
                        class="btn btn-lg btn-primary btn-block"
                        @click.prevent="loanModal"
                >{{ $t('buttons.apply_loan') }}
                </button>
              </li>
            </ul>

            <div class="tab-content" id="myTabContent">
              <div class="tab-pane" :class="{active: currentComponent}">
                <keep-alive>
                  <component :is="currentComponent"></component>
                </keep-alive>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <GetLoanModal ref="forLoanModal" :openLoanModal="openLoanModal" @closeLoanModal="openLoanModal = false"/>
  </div>
</template>

<script>
import Loans from "../components/Cabinet/Loans";
import CardsAccounts from "../components/Cabinet/CardsAccounts";
import PersonalData from "../components/Cabinet/PersonalData";
import Feedback from "../components/Cabinet/Feedback";
import GetLoanModal from "../components/Cabinet/ModalWindow/GetLoanModal";
import Archive from "../components/Cabinet/Archive";
import Camera from "../components/Camera";

export default {
  components: {
    Camera,
    Loans,
    CardsAccounts,
    PersonalData,
    Feedback,
    GetLoanModal,
    Archive
  },
  computed: {
    getFormUser() {
      return this.$store.getters.getFormUser
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    checkPaymentMethod() {
      return this.$store.getters.checkPaymentMethod
    },
    userCards() {
      const card = this.$store.getters.userCards.data
      return Object.assign({}, ...card)
    },
    activeLoan() {
      return !!this.$store.getters.getActiveLoan?.length

    }
  },
  data() {
    return {
      openLoanModal: false,
      currentComponent: 'Loans'
    }
  },
  methods: {
    loanModal() {
      if (this.userCards.card_number) {
        this.openLoanModal = true
        this.$refs.forLoanModal.modalInit()
      } else {
        this.$store.dispatch('setError', 'Укажите номер карты')
        setTimeout(() => {
          this.currentComponent = 'CardsAccounts'
        }, 3000)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const formStatus = vm.$store.getters.userFormStatus
      const methodGetMoneyStatus = vm.$store.getters.methodGetMoneyStatus
      if (formStatus && methodGetMoneyStatus !== null) {
        next('/cabinet');
      } else {
        next('/registration')
      }
      next()
    })
  }
};
</script>

<style>
</style>
