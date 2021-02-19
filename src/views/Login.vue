<template>
 <div class="wrap mb-auto mt-sm-auto">
  <div class="container">
   <div class="row align-items-center justify-content-center flex-column">
    <div class="login-form">
     <ValidationObserver ref="form" v-slot="{ valid }">
      <form class="form-signin" @submit.prevent="onSubmit">
       <h1 class="h3 mb-3">ЛИЧНЫЙ КАБИНЕТ</h1>
       <hr class="header-line"/>

       <div class="mb-3">
        <label for="inputPhone">Мобильный телефон</label>
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
        <label for="inputPassword">Ваш пароль</label>
        <ValidationProvider rules="required|digits_between:8,25" v-slot="{ errors }">
         <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="12345678"
          :class="{'is-invalid': errors[0]}"
          v-model="password"
         >
         <div v-if="errors[0]" class="invalid-feedback">
          {{ errors[0] }}
         </div>
        </ValidationProvider>
       </div>

       <button class="btn btn-lg btn-primary btn-block" type="submit" :disabled="!valid">Войти</button>
       <router-link class="rega mt-4 mb-2" to="/registration">Регистрация</router-link>

      </form>
     </ValidationObserver>
     <div class="formFooter d-flex flex-column">
      <label class="text-normal mb-0" for="inputPassword">Забыли пароль от аккаунта?</label>
      <router-link to="/recoverpassword">Восстановите доступ</router-link>
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
   }
  },
  data() {
   return {
    username: null,
    password: null
   }
  },
  methods: {
   async onSubmit() {
    let username = this.username.replace(/[^\d]+/g, "")
    await this.$store.dispatch('loginUser', {username, password: this.password})
    if (this.isUserLoggedIn) {
     this.$router.push('/cabinet')
    }
   }
  }
 };
</script>

<style>
</style>