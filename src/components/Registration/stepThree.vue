<template>
 <div class="login-form w-879" v-if="!checkPaymentMethod">

  <form class="form-signin">
   <button type="button" class="close d-none" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true"></span>
   </button>
   <h1 class="h3 mb-3">{{$t('forms.choose_way')}}</h1>
   <hr class="header-line"/>
   <div class="input-group mb-4 d-flex align-items-center justify-content-between sposob">

    <div @click="onCard"
         class="col input-group-text active form-control d-flex flex-col align-items-center mr-md-4"
    >
     <img alt="" class="step-thumb" src="@/assets/image/step3-img1.svg">
     <label class="w-30 mb-0 ml-2">{{$t('forms.to_bank_card')}}</label>
    </div>

    <div @click="onOffice"
         class="col input-group-text form-control d-flex flex-col align-items-center ml-md-4"
    >
     <img alt="" class="step-thumb" src="@/assets/image/step3-img3.svg">
     <label class="w-30 mb-0 ml-2">{{$t('forms.cash_branch')}}</label>
    </div>

   </div>
  </form>
 </div>
</template>

<script>
 export default {
  name: "stepThree",
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
    option: {
     card: 1,
     office: 0
    }
   }
  },
  methods: {
   onCard() {
    this.$store.dispatch('selectPaymentMethod', this.option.card)
   },
   onOffice() {
    this.$store.dispatch('selectPaymentMethod', this.option.office)
   }
  }
 }
</script>

<style scoped>

</style>