<template>
  <div class="wrap mb-auto mt-sm-auto">
    <div class="container">
      <div class="row align-items-center justify-content-center flex-column">
        <div class="login-form">
          <ValidationObserver ref="form" v-slot="{ valid }">
            <form class="form-signin">
              <h1 class="h3 mb-3">{{ $t('forms.recovery_access') }}</h1>
              <hr class="header-line"/>
              <div class="mb-3">
                <label>{{ $t('forms.mobile_phone') }}</label>

                <ValidationProvider rules="required|minPhone:11" v-slot="{ errors }">
                  <masked-input
                      id="inputPhone89"
                      class="form-control"
                      :class="{'is-invalid': errors[0]}"
                      type="tel"
                      placeholder="+7-(999)-999-9999"
                      mask="\+\7 (111) 111-11-11"
                      v-model.trim="phone"
                      autocomplete="true"
                  />
                  <div v-if="errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>

              </div>

              <button class="btn btn-lg btn-primary btn-block" type="button" @click.prevent="onSubmit"
                      :disabled="isDisabled || !valid">
                {{ $t('buttons.restore_access') }}
              </button>

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
    ValidationObserver,
    MaskedInput
  },
  data() {
    return {
      phone: null,
      isDisabled: false
    }
  },
  methods: {
    async onSubmit() {
      this.isDisabled = true
      const response = await this.$store.dispatch('forgotPhone', {phone: this.phone})
      if (response?.status === 200) {
        this.$refs.phoneModal.modalInit()
      }
      this.isDisabled = false
    },
    async sendUser(smsCode) {
      await this.$store.dispatch('forgotCheck', {phone: this.phone, code: smsCode})
      this.$refs.phoneModal.modalHide()
      // this.$router.push('/cabinet')
      this.$router.push('/changepassword')
    },
    async resendCode() {
      this.$store.dispatch('forgotPhone', {phone: this.phone})
    }
  }
}
</script>

<style scoped>

</style>
