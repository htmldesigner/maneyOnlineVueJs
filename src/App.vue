<template>
 <div id="app">
  <Loader v-if="loader"/>
  <NavBar/>
  <router-view/>
  <Footer/>
  <SuccessPopup />
 </div>
</template>
<script>
 import NavBar from "./components/NavBar";
 import Footer from "./components/Footer";
 import Loader from "./components/Loader";
 import SuccessPopup from "./components/SuccessPopup";

 export default {
  components: {
   NavBar,
   Footer,
   Loader,
   SuccessPopup
  },
  computed: {
   success() {
    return this.$store.getters.success
   },
   loader() {
   return  this.$store.getters.loading
   },
   isUserLoggedIn() {
    return this.$store.getters.isUserLoggedIn
   },
   userFormStatus() {
    return this.$store.getters.userFormStatus
   }
  },
  data() {
   return {}
  },
  // beforeUpdate() {
  //  if (this.isUserLoggedIn) {
  //    this.$store.dispatch('getUserForm').then(()=>{
  //      if (!this.userFormStatus){
  //        this.$router.push('/registration')
  //      }
  //    })
  //  }
  // },
  mounted() {
   if (this.isUserLoggedIn) {
    console.log('App comp anketa')
    this.$store.dispatch('getUserForm')
   }
  }
 };
</script>

