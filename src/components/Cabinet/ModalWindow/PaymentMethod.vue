<template>
 <!-- POPUP MODAL SELECT PAYMENT METHOD
================================================== -->
 <div id="PaymentMethodModal" class="rega-modal modal fade" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle">
  <div class="modal-dialog modal-dialog-centered" role="document">
   <div class="modal-content p-0">

    <form class="form-signin">

     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true"></span>
     </button>
     <div class="modal-body text-center p-0">

      <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
       <label class="w-50 text-left">Способ выплаты займа</label>
       <select class="custom-select" v-model="selectedMethod">
        <option v-for="(method, idx) in paymentMethods" :key="idx" :value="method.id">{{method.value}}</option>
       </select>
      </div>

     </div>

     <div class="d-flex flex-column text-center">
      <button class="btn btn-lg btn-primary btn-block" @click.prevent="onSubmit">Получить средства</button>
     </div>

    </form>

   </div>
  </div>
 </div>
</template>

<script>
 import $ from "jquery";

 export default {
  name: "PaymentMethod",
  computed: {
   paymentMethods() {
    return this.$store.getters.paymentMethodList
   }
  },
  data() {
   return {
    selectedMethod: null,
    loanID: null
   }
  },
  methods: {
   modalInit(loanId) {
    this.loanId = loanId
    $('#PaymentMethodModal').modal('show');
   },
   modalHide() {
    $('#PaymentMethodModal').modal('hide');
   },
   async onSubmit() {
    if (this.selectedMethod) {
     await this.$store.dispatch('setPayment', {id: this.loanId, method: +this.selectedMethod})
     this.modalHide()
     await this.$store.dispatch('getLoanList')
    }
   }
  }
 }
</script>

<style scoped>

</style>