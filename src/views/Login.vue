<template>
  <div class="wrap mt-5">
    <div class="container">
      <div class="row align-items-center justify-content-center flex-column">
        <div class="login-form">
          <ValidationObserver ref="form" v-slot="{ valid }">
            <form class="form-signin" @submit.prevent="onSubmit">
              <h1 class="h3 mb-3">{{ $t('forms.private_office') }}</h1>
              <hr class="header-line"/>

              <div class="mb-3">
                <label for="inputPhone">{{ $t('forms.mobile_phone') }}</label>

                <ValidationProvider rules="required" v-slot="{ errors }">
                  <masked-input
                      id="inputPhone"
                      class="form-control"
                      :class="{'is-invalid': errors[0]}"
                      type="tel"
                      placeholder="+7-(999)-999-9999"
                      mask="\+\7 (111) 111-11-11"
                      v-model="username"
                  />
                  <div v-if="errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>

                </ValidationProvider>

              </div>

              <div class="mb-4">
                <label for="inputPassword">{{ $t('forms.password') }}</label>

                <ValidationProvider rules="required|digits_between:8,25" v-slot="{ errors }">
                  <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      :class="{'is-invalid': errors[0]}"
                      v-model="password"
                  >
                  <div v-if="errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>

                </ValidationProvider>

              </div>

              <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="!valid">
                {{ $t('forms.sign_in') }}
              </button>
              <router-link class="rega mt-4 mb-2" to="/registration">{{ $t('forms.registration') }}</router-link>

            </form>
          </ValidationObserver>
          <div class="formFooter d-flex flex-column">
            <label class="text-normal mb-0" for="inputPassword">{{ $t('forms.forgot_password') }}</label>
            <router-link to="/recoverpassword">{{ $t('forms.restore_access') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import MaskedInput from 'vue-masked-input'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    MaskedInput
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    getLanguage(){
      return this.$store.getters.getLanguage
    }
  },
  data() {
    return {
      // currentLocale: this.getLanguage,
      username: ' ',
      password: null
    }
  },
  watch: {
    getLanguage: {
      handler(val) {
        console.log(val)
        this.$refs.form.reset();
      }
    }
  }
  ,
  methods: {
    async onSubmit() {
      let username = this.username.replace(/[^\d]+/g, "")
      await this.$store.dispatch('loginUser', {username, password: this.password})
      if (this.isUserLoggedIn) {
        this.$router.push('/cabinet')
      }
    }
  }
}
;
</script>

<style>
</style>
