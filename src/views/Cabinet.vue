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
        >Мои займы</a>
       </li>
       <li class="nav-item">
        <a class="nav-link"
           :class="{active: currentComponent === 'CardsAccounts'}"
           @click="currentComponent = 'CardsAccounts'"
        >Карты и счета</a>
       </li>
       <li class="nav-item">
        <a class="nav-link"
           :class="{active: currentComponent === 'PersonalData'}"
           @click="currentComponent = 'PersonalData'"
        >Личные данные</a>
       </li>
       <li class="nav-item">
        <a class="nav-link"
           :class="{active: currentComponent === 'Feedback'}"
           @click="currentComponent = 'Feedback'"
        >Обратная связь</a>
       </li>
      </ul>

      <ul class="nav nav-tabs ofzaim-btn" role="tablist">
       <li class="nav-item ml-0 ml-md-auto mt-3 mt-md-auto mb-3 mb-md-auto">
        <button
         class="btn btn-lg btn-primary btn-block"
         @click="$refs.forLoanModal.modalInit()"
        >Оформить займ
        </button>
       </li>
      </ul>

      <div class="tab-content" id="myTabContent">
       <keep-alive>
        <div class="tab-pane" :class="{active: currentComponent}">
         <component :is="currentComponent"></component>
        </div>
       </keep-alive>
      </div>

     </div>
    </div>
   </div>
  </div>
  <GetLoanModal ref="forLoanModal"/>
 </div>

</template>

<script>
 import Loans from "../components/Cabinet/Loans";
 import CardsAccounts from "../components/Cabinet/CardsAccounts";
 import PersonalData from "../components/Cabinet/PersonalData";
 import Feedback from "../components/Cabinet/Feedback";
 import GetLoanModal from "../components/Cabinet/ModalWindow/GetLoanModal";

 export default {
  components: {
   Loans,
   CardsAccounts,
   PersonalData,
   Feedback,
   GetLoanModal
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
   }
  },
  data() {
   return {
    currentComponent: 'Loans'
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
  },
  mounted() {
   this.$store.dispatch('getSupportMessage')
   setInterval(() => {
    this.$store.dispatch('getSupportMessage')
   }, 5000 * 4)
  }
 };
</script>

<style>
</style>