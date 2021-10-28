<template>
 <!-- ERROR MODAL
         ================================================== -->

 <div id="errorModal" class="rega-modal modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle">
  <div class="modal-dialog modal-dialog-centered" role="document">
   <div class="modal-content">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
     <span aria-hidden="true"></span>
    </button>
    <div class="d-flex justify-content-center"><span class="glyphicon glyphicon-failure"></span></div>
    <div class="modal-body text-center">
     <p v-html="error"></p>
    </div>
    <div class="modal-footer d-none">
     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
     <button type="button" class="btn btn-primary">Save changes</button>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
 import $ from "jquery";

 export default {
  name: "ErrorPopup",
  props: ['message'],
  computed: {
   error() {
    return this.$store.getters.error
   }
  },
  watch: {
   error: {
    handler(value) {
     if (value) {
      this.modalInit().then(() => {
       setTimeout(() => {
        this.modalHide()
        this.$store.dispatch('clearError')
       }, 4000)
      })

     }
    }
   }
  },
  methods: {
   async modalInit() {
    await $('#errorModal').modal('show');
   },
   modalHide() {
    $('#errorModal').modal('hide');
   }
  }
 }
</script>

<style scoped>

</style>
