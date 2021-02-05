<template>
 <!-- POPUP MODAL
    ================================================== -->
 <div id="rePayment" class="rega-modal modal fade" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle">
  <div class="modal-dialog modal-dialog-centered" role="document">
   <div class="modal-content p-0">
    <ValidationObserver ref="form" v-slot="{ valid }">
     <form class="form-signin">

      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
       <span aria-hidden="true"></span>
      </button>
      <h1 class="h3 mb-3 text-center pl-3 pr-3 pl-sm-0 pr-sm-0">Оплата займа</h1>
      <hr class="header-line"/>
      <div class="modal-body text-center p-0">

       <div class="input-group mb-4 d-flex justify-content-between">

        <div class="d-flex flex-column text-left">
         <label class="sub-label">Долг составляет</label>
         <span class="sub-label-text" v-if="debt">{{debt}} тг</span>
         <span v-else>Ожидайте...</span>
        </div>

        <div class="d-flex flex-column text-left">
         <label class="sub-label">Минимальная сумма</label>
         <span class="sub-label-text">450 тг</span>
        </div>
       </div>

       <ValidationProvider rules="required|sum|minSum:450" v-slot="{ errors }">
        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
         <label class="w-50 text-left">Сумма оплаты займа</label>

         <input
          id="inputPhone"
          class="form-control"
          :class="{'is-invalid': errors[0]}"
          type="text"
          placeholder="Введите сумму"
          required
          v-model.trim.number="sum"
         >
         <div v-if="errors[0]" class="invalid-feedback" style="text-align: right">
          {{ errors[0] }}
         </div>
        </div>
       </ValidationProvider>

       <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
        <label class="w-50 text-left">Способ оплаты займа</label>
        <select class="custom-select">
         <option selected>5260-59хх-*****</option>
         <option value="1">One</option>
         <option value="2">Two</option>
         <option value="3">Three</option>
        </select>
       </div>

      </div>
      <div class="d-flex flex-column text-center">

       <button
        class="btn btn-lg btn-primary btn-block mt-3 mb-3"
        @click.prevent="rePayment"
        :disabled="!valid"
       >
        Подтвердить
       </button>
      </div>

     </form>
    </ValidationObserver>
   </div>
  </div>
 </div>
</template>

<script>
 import $ from "jquery";
 import {ValidationProvider, ValidationObserver} from "vee-validate";

 export default {
  name: "Repayment",
  components: {
   ValidationProvider,
   ValidationObserver
  },
  computed: {
   debt(){
    return this.$store.getters.getDebt.debt
   }
  },
  data() {
   return {
    sum: null,
    loanID: null
   }
  },
  methods: {
   rePayment() {
    let data = {
     id: this.loanID,
     sum: this.sum
    }
    if (this.loanID && this.sum){
     this.$store.dispatch('rePayment', data)
     data = null
    }
   },
   async modalInit(loanID) {
    $('#rePayment').modal('show');
    this.loanID = await loanID
    await this.$store.dispatch('debt', loanID)
   },
   modalHide() {
    $('#rePayment').modal('hide');
   }
  },
 }
</script>

<style scoped>

</style>