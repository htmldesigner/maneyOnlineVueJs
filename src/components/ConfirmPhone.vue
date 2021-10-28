<template>
 <!-- POPOUP MODAL
        ================================================== -->
 <div id="regaModal" class="rega-modal modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
 >
  <div class="modal-dialog modal-dialog-centered" role="document">
   <div class="modal-content p-0">

    <form class="form-signin">

     <button type="button" class="close" data-dismiss="modal" @click="close" aria-label="Close">
      <span aria-hidden="true"></span>
     </button>
     <h1 class="h3 mb-3 text-center pl-3 pr-3 pl-sm-0 pr-sm-0">{{ $t('message.phone_alert',{value: phone}) }}</h1>
     <hr class="header-line"/>
     <div class="modal-body text-center p-0">
      <div class="input-group mb-5 sms-number">
       <input class="form-control phoneCell" v-model.trim.number="num.cell_1" type="number" maxlength=1 placeholder="5"
              tabindex="1">
       <input class="form-control phoneCell" v-model.trim.number="num.cell_2" type="number" maxlength=1 placeholder="5"
              tabindex="2">
       <input class="form-control phoneCell" v-model.trim.number="num.cell_3" type="number" maxlength=1 placeholder="5"
              tabindex="3">
       <input class="form-control phoneCell" v-model.trim.number="num.cell_4" type="number" maxlength=1 placeholder="5"
              tabindex="4">
       <input class="form-control phoneCell" v-model.trim.number="num.cell_5" type="number" maxlength=1 placeholder="5"
              tabindex="5">
       <input class="form-control phoneCell" v-model.trim.number="num.cell_6" type="number" maxlength=1 placeholder="5"
              tabindex="6">
      </div>
     </div>
     <div class="d-flex flex-column text-center">
      <button class="btn btn-lg btn-primary btn-block mb-3" @click.prevent="confirmSMS">{{$t('buttons.confirm')}}</button>
      <a href="#" @click.prevent="resendCode">{{$t('buttons.send_again', {value: 'Выслать код повторно'})}}</a>
     </div>
    </form>

   </div>
  </div>
 </div>
</template>

<script>
 import $ from "jquery";

 export default {
  name: "ConfirmPhone",
  props: ['phone'],
  watch: {
   num: {
    handler() {
     this.form()
    },
    deep: true,
   }
  },
  data() {
   return {
    num: {
     cell_1: null,
     cell_2: null,
     cell_3: null,
     cell_4: null,
     cell_5: null,
     cell_6: null,
    },
    smsCode: null,
    loanID: null
   }
  },
  methods: {
   confirmSMS() {
    this.smsCode = Object.values(this.num).join('')
    this.$emit('smsCode', this.smsCode)
   },
   resendCode() {
    this.$emit('resendCode')
   },
   modalInit() {
    $('#regaModal').modal('show');
   },
   modalHide() {
    $('#regaModal').modal('hide');
   },
   close() {
    this.num = {
     cell_1: null,
     cell_2: null,
     cell_3: null,
     cell_4: null,
     cell_5: null,
     cell_6: null,
    }
   },
   form() {
    let phoneCell = document.querySelectorAll('.phoneCell')
    phoneCell.forEach((el, index, arr) => {
     if (arr[index].value.length) {
      arr[index].classList.add('active')
      arr[index]?.blur()
      arr[index + 1]?.focus()
      arr[index + 1]?.classList.add('active')
     } else {
      arr[index].classList.remove('active')
     }
    })
   }
  },
 }
</script>

<style scoped>

</style>
