<template>
 <!-- POPUP  MODAL
     ================================================== -->
 <div id="getMoney" class="rega-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">
  <div class="modal-dialog modal-dialog-centered" role="document">
   <div class="modal-content p-0">

    <form class="form-signin">
     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true"></span>
     </button>
     <div v-if="!requestPayment">Ожидайте...</div>
     <div v-else class="d-flex flex-column text-center">
      <button
       class="btn btn-lg btn-primary btn-block"
       :disabled="!requestPayment.redirect_url"
       @click.prevent="onSubmit">
       Получить средства
      </button>
     </div>
    </form>

   </div>
  </div>
 </div>
</template>

<script>
 import $ from "jquery";

 export default {
  name: "GetMoney",
  computed: {
   requestPayment() {
    return this.$store.getters.getRequestPayment
   }
  },
  data() {
   return {
    loanID: null
   }
  },
  methods: {
   onSubmit() {
    document.location.assign(this.requestPayment.redirect_url.toString());
   },
   async modalInit(loanID) {
    this.loanID = loanID
    $('#getMoney').modal('show');
    await this.$store.dispatch('requestPayment', this.loanID)
   },
   modalHide() {
    $('#getMoney').modal('hide');
   }
  },
 }
</script>

<style scoped>

</style>