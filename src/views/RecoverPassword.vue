<template>
 <div class="wrap mb-auto mt-sm-auto">
  <div class="container">
   <div class="row align-items-center justify-content-center flex-column">
    <div class="login-form">
     <ValidationObserver ref="form" v-slot="{ valid }">
      <form class="form-signin" @submit.prevent="onSubmit">
       <h1 class="h3 mb-3">{{$t('forms.recovery_access')}}</h1>
       <hr class="header-line"/>
       <div class="mb-3">
        <label for="inputPhone">{{$t('forms.mobile_phone') }}</label>

        <ValidationProvider rules="required|minPhone:11" v-slot="{ errors }">
         <input
          id="inputPhone"
          class="form-control"
          :class="{'is-invalid': errors[0]}"
          type="text"
          placeholder="+7-(999)-999-9999"
          v-model.trim="phone"
         >
         <div v-if="errors[0]" class="invalid-feedback">
          {{ errors[0] }}
         </div>
        </ValidationProvider>

       </div>

       <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="!valid">{{$t('buttons.restore_access')}}</button>

      </form>
     </ValidationObserver>
    </div>
   </div>
  </div>
  <ConfirmPhone
   @smsCode="sendUser"
   @resendCode="resendCode"
   :phone="phone"
   ref="phoneModal"
  />
 </div>
</template>

<script>
 import {ValidationObserver, ValidationProvider} from "vee-validate";
 import ConfirmPhone from "../components/ConfirmPhone";
 import MaskedInput from 'vue-masked-input'

 export default {
  name: "RecoverPassword",
  components: {
   ConfirmPhone,
   ValidationProvider,
   ValidationObserver
  },
  data() {
   return {
    phone: null
   }
  },
  methods: {
   async onSubmit() {
    const response = await this.$store.dispatch('forgotPhone', {phone: this.phone})
    if (response?.status === 200) {
     this.$refs.phoneModal.modalInit()
    }
   },
   async sendUser(smsCode) {
    await this.$store.dispatch('forgotCheck', {phone: this.phone, code: smsCode})
    this.$refs.phoneModal.modalHide()
    this.$router.push('/cabinet')
   },
   async resendCode() {
    this.$store.dispatch('forgotPhone', {phone: this.phone})
   }
  }
 }
</script>

<style scoped>

</style>