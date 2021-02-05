<template>
 <div class="wrap mb-auto" v-if="getFormUser && checkPaymentMethod !== null">
  <div class="container w-1530">
   <div class="align-items-center justify-content-center flex-column">
    <div class="login-form">
     <div class="form-signin ofzaim-table">
      <ul class="nav nav-tabs main-tabs float-left mb-4" id="myTab" role="tablist">
       <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#cab-tab1" role="tab" aria-controls="cab-tab1" aria-selected="true">Мои займы</a>
       </li>
       <li class="nav-item">
        <a class="nav-link" id="cardsAccounts-tab" data-toggle="tab" href="#cab-tab2" role="tab" aria-controls="cab-tab2" aria-selected="false">Карты и счета</a>
       </li>
       <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#cab-tab3" role="tab" aria-controls="cab-tab3" aria-selected="false">Личные данные</a>
       </li>
       <li class="nav-item">
        <a class="nav-link" id="feedback-tab" data-toggle="tab" href="#cab-tab4" role="tab" aria-controls="cab-tab4" aria-selected="false">Обратная связь</a>
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
       <div class="tab-pane fade show active" id="cab-tab1" role="tabpanel" aria-labelledby="home-tab">
        <Loans />
       </div>

       <div class="tab-pane fade" id="cab-tab2" role="tabpanel" aria-labelledby="cardsAccounts-tab">
        <CardsAccounts />
       </div>

       <div class="tab-pane fade" id="cab-tab3" role="tabpanel" aria-labelledby="profile-tab">
        <PersonalData />
       </div>

       <div class="tab-pane fade" id="cab-tab4" role="tabpanel" aria-labelledby="contact-tab">
        <Feedback />
       </div>
      </div>

     </div>
    </div>
   </div>
  </div>
  <GetLoanModal ref="forLoanModal" />
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
  // beforeRouteEnter(to, from, next) {
  //  next(vm => {
  //   const formStatus =  vm.$store.getters.userFormStatus
  //   const methodGetMoneyStatus = vm.$store.getters.methodGetMoneyStatus
  //   if (formStatus && methodGetMoneyStatus) { // Раскоментировать все
  //    next('/cabinet');
  //   } else {
  //    next('/registration')
  //   }
  //   next()
  //  })
  // }

  // beforeRouteEnter(to, from, next) {
  //  next(vm => {
  //   vm.$store.dispatch('getUserForm').then(() => {
  //    console.log('cabinet anketa')
  //    const status = vm.$store.getters.userFormStatus
  //    if (status) {
  //     next();
  //    } else {
  //     next('/registration')
  //    }
  //   })
  //   next()
  //  })
  // }
 };
</script>

<style>
</style>