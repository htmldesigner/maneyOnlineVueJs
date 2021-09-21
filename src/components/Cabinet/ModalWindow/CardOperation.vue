<template>
  <div id="cardOperation" class="rega-modal modal fade" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalCenterTitle">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content p-0">

        <slot></slot>

      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "CardOperation",
  methods: {
    async modalInit() {
      $('#cardOperation').modal('show');

    },
    modalHide() {
      $('#cardOperation').modal('hide');
    }
  }
}
</script>

<style scoped>

</style>