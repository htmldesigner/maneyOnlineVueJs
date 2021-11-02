<template>
  <div id="app">
    <Loader v-if="loader"/>
    <NavBar/>
    <router-view/>
    <Footer/>
    <SuccessPopup/>
    <ErrorPopup/>
  </div>
</template>
<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import SuccessPopup from "./components/SuccessPopup";
import ErrorPopup from "./components/ErrorPopup";

export default {
  components: {
    NavBar,
    Footer,
    Loader,
    SuccessPopup,
    ErrorPopup
  },
  computed: {
    success() {
      return this.$store.getters.success
    },
    loader() {
      return this.$store.getters.loading
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },
    userFormStatus() {
      return this.$store.getters.userFormStatus
    },
    checkPaymentMethod() {
      return this.$store.getters.methodGetMoneyStatus
    }
  },
  data() {
    return {}
  },

  async mounted() {
    if (this.isUserLoggedIn) {
      await this.$store.dispatch('getUserForm')
      await this.$store.dispatch('checkPaymentMethod')
      if (this.userFormStatus && !!this.checkPaymentMethod) {
       this.$route.path === '/changepassword' ? this.$router.push('/changepassword').catch(err => {}) : this.$router.push('/cabinet')
      } else {
        this.$router.push('/registration').catch(err => {})
      }
      const token = localStorage.getItem('token')

      if (token) {
        parent.postMessage({token: token}, '*');
      }


      // this.$store.dispatch('getSupportMessage')
      //
      // setInterval(() => {
      //  this.$store.dispatch('getSupportMessage')
      // }, 5000 * 4)

    }
  }
};
</script>

