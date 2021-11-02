<template>
  <div class="wrap mt-5">
    <div class="container">
      <div class="row align-items-center justify-content-center flex-column">
        <div class="login-form">

          <ValidationObserver ref="form" v-slot="{ valid }">
            <form class="form-signin">

              <h1 class="h3 mb-3">{{ $t('forms.password_recovery').toUpperCase() }}</h1>
              <hr class="header-line"/>

              <div class="mb-3">
                <label for="inputPassword">{{ $t('forms.password') }}</label>
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
                      v-model.trim="user.confirm_password"
                      :class="{'is-invalid': errors[0]}"
                      class="form-control"
                      placeholder="Подтвердить пароль"
                  >
                  <div v-if="errors[0]" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>

              <button type="button"
                      class="btn btn-lg btn-primary btn-block"
                      @click.prevent="changePassword"
                      :disabled="!valid">Подтвердить
              </button>

            </form>
          </ValidationObserver>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";

export default {
  name: "ChangePassword",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      user: {
        password: null,
        confirm_password: null,
      }
    }
  },
  methods: {
    async changePassword() {
      if (this.user) {
        const response = await this.$store.dispatch('changePassword', this.user)
        if (response === 'success') {
          this.$router.push('/cabinet')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
