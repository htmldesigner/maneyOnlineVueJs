<template>
 <!-- POPUP MODAL WAITINGSIGNINGCONTRACT
       ================================================== -->
 <div id="waitingSigningContract" class="rega-modal modal fade" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle">
  <div class="modal-dialog modal-dialog-centered" role="document">
   <div class="modal-content p-0">
    <form class="form-signin">
     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true"></span>
     </button>
     <div class="d-flex flex-column text-center">
      <div v-if="!contract">{{$t('message.wait')}}</div>
      <a :download="contract" v-else :href="contract" target="_blank" class="btn btn-lg btn-primary btn-block">{{$t('buttons.download_contract')}}</a>
     </div>
    </form>
   </div>
  </div>
 </div>

</template>

<script>
 import $ from "jquery";

 export default {
  name: "WaitingSigningContract",
  data() {
   return {}
  },
  computed: {
   contract() {
    return this.$store.getters.getContract
   },
  },
  methods: {
   async modalInit(loanID) {
    $('#waitingSigningContract').modal('show');
    await this.$store.dispatch('getContract', loanID)
    await this.$store.dispatch('getLoanList')
    if (!this.contract) {
     await this.modalHide()
    }

   },
   modalHide() {
    $('#waitingSigningContract').modal('hide');
   }
  }
 }
</script>

<style scoped>

</style>