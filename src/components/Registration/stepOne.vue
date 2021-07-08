<template>
  <div class="login-form">
    <ValidationObserver ref="form" v-slot="{ valid }">
      <form class="form-signin">

        <h1 class="h3 mb-3">{{$t('forms.registration').toUpperCase()}}</h1>
        <hr class="header-line"/>

        <div class="mb-3">
          <label for="inputPhone">{{$t('forms.mobile_phone')}}</label>
          <ValidationProvider vid="phone" rules="required" v-slot="{ errors }">
            <masked-input
                id="inputPhone"
                class="form-control"
                :class="{'is-invalid': errors[0]}"
                type="tel"
                placeholder="+7-(999)-999-9999"
                mask="\+\7 (111) 111-11-11"
                v-model="user.phone"
            />
            <div v-if="errors[0]" class="invalid-feedback">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <label for="inputIIN">{{$t('forms.IIN')}}</label>
          <ValidationProvider vid="iin" rules="numberOnly|required|validateIIN:12|validateMaxIIN:12"
                              v-slot="{ errors }">
            <input
                type="text"
                id="inputIIN"
                :class="{'is-invalid': errors[0]}"
                class="form-control"
                placeholder="ИИН"
                required
                v-model.trim="user.iin"
            >
            <div v-if="errors[0]" class="invalid-feedback">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <label for="inputEmail">{{$t('forms.mail')}}</label>
          <ValidationProvider vid="email" rules="required|email" v-slot="{ errors }">
            <input
                id="inputEmail"
                class="form-control"
                :class="{'is-invalid': errors[0]}"
                placeholder="E-mail.. typing"
                v-model.trim="user.email"
            >
            <div v-if="errors[0]" class="invalid-feedback">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <label for="inputPassword">{{$t('forms.password')}}</label>
          <ValidationProvider name="confirm" rules="required|digits_between:8,25" v-slot="{ errors }">
            <input
                type="password"
                id="inputPassword"
                v-model.trim="user.password"
                :class="{'is-invalid': errors[0]}"
                class="form-control"
                placeholder="Ваш пароль"
            >
            <div v-if="errors[0]" class="invalid-feedback">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>

        <div class="mb-3">
          <label for="confirmPassword">{{ $t('forms.confirm_password') }}</label>
          <ValidationProvider rules="required|password:@confirm" v-slot="{ errors }">
            <input
                type="password"
                id="confirmPassword"
                v-model.trim="user.confirmPassword"
                :class="{'is-invalid': errors[0]}"
                class="form-control"
                placeholder="Подтвердить пароль"
            >
            <div v-if="errors[0]" class="invalid-feedback">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
        </div>

        <div class="checkbox mb-3">
          <ValidationProvider :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
            <label class="text-normal d-flex align-items-center pb-2">
              <input
                  class="mr-2"
                  type="checkbox"
                  v-model="user.agree"
              >
              {{ $t('forms.agree')}}
            </label>
          </ValidationProvider>
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click.prevent="prepareUserData" :disabled="!valid">Далее
        </button>

      </form>
    </ValidationObserver>

    <div class="formFooter d-flex flex-column">
      <label class="text-normal mb-0">{{ $t('forms.already_registration') }}</label>
      <router-link to="/">{{ $t('forms.enter_to_cabinet') }}</router-link>
    </div>

    <ConfirmPhone
        @smsCode="sendUser"
        @resendCode="resendCode"
        :phone="user.phone"
        ref="phoneModal"
    />

  </div>
</template>

<script>
import {ValidationProvider, ValidationObserver} from "vee-validate";
import ConfirmPhone from "../ConfirmPhone";
import MaskedInput from 'vue-masked-input'

export default {
  name: "stepOne",
  components: {
    ConfirmPhone,
    ValidationProvider,
    ValidationObserver,
    MaskedInput
  },
  data() {
    return {
      user: {
        phone: null,
        email: null,
        iin: null,
        password: null,
        confirmPassword: null,
        agree: null
      }
    }
  },
  methods: {
    async prepareUserData() {
      this.user.phone = this.user.phone.replace(/[^\d]+/g, "")

      if (this.user.agree) {
        this.$store.dispatch('sendUserData', this.user)
            .then(res => this.$refs.phoneModal.modalInit())
            .catch(error => {
              this.$refs.form.setErrors(error.response.data.error)
            })
      }
    },
    async sendUser(smsCode) {
      try {
        if (smsCode) {
          this.user['code'] = smsCode
          const response = await this.$store.dispatch('confirmUserDate', this.user)
          await this.$refs.phoneModal.modalHide()
          await this.$store.dispatch('setSuccess', this.$t('message.phone_confirm', {value: 'Телефон подтвержден'}))
          if (response.status === 200) {
            await this.$store.dispatch('loginUser', {username: this.user.phone, password: this.user.password})
            await this.$store.dispatch('getUserForm')
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    async resendCode() {
      try {
        if (this.user.agree) await this.$store.dispatch('sendUserData', this.user)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>