<template>
 <div class="wrap mb-auto mt-sm-auto">
  <div class="container">
   <div class="row align-items-center justify-content-center flex-column">
    <div class="steps d-flex align-items-center justify-content-center w-879">

     <div class="step d-flex align-items-baseline justify-content-left">
      <div class="mr-2 mb-1 w-100">
       <img v-if="!isUserLoggedIn" alt="Alt" class="step-thumb" src="@/assets/image/step1.svg">
       <img v-else alt="Alt" class="step-thumb" src="@/assets/image/step-success.svg">
      </div>
      <div class="step-content">
       <h4 class="step-title mb-0 active">Регистрация</h4>
       <p v-if="!isUserLoggedIn" class="step-desc mb-0">В ожидании</p>
       <p v-else class="step-desc mb-0">Успешно</p>
      </div>
     </div>

     <div class="step align-items-baseline justify-content-left bordered w-100 d-none d-md-flex"></div>

     <div class="step d-flex align-items-baseline justify-content-left text-center text-md-left">
      <div class="mr-2 mb-1 w-100">
       <img alt="Alt" v-if="!isUserLoggedIn" class="step-thumb" src="@/assets/image/step2-def.svg"/>
       <img v-else-if="isUserLoggedIn && !userFormStatus" alt="Alt" class="step-thumb"
            src="@/assets/image/step2-act.svg">
       <img v-else-if="isUserLoggedIn && userFormStatus" alt="Alt" class="step-thumb"
            src="@/assets/image/step-success.svg">
      </div>
      <div class="step-content">
       <h4 class="step-title mb-0">Личные данные</h4>
       <p v-if="isUserLoggedIn && userFormStatus" class="step-desc mb-0">Успешно</p>
       <p v-else class="step-desc mb-0">В ожидании</p>
      </div>
     </div>

     <div class="step align-items-baseline justify-content-left bordered w-100 d-none d-md-flex"></div>

     <div class="step d-flex align-items-baseline justify-content-left text-right text-md-left">
      <div class="mr-2 mb-1 w-100">
       <img v-if="isUserLoggedIn || !userFormStatus" alt="Alt" class="step-thumb" src="@/assets/image/step3-def.svg"/>
       <img v-else-if="isUserLoggedIn && !userFormStatus && !methodGetMoneyStatus" alt="Alt" class="step-thumb"
            src="@/assets/image/step3-act.svg"/>
       <img v-else-if="isUserLoggedIn && userFormStatus && methodGetMoneyStatus" alt="Alt" class="step-thumb"
            src="@/assets/image/step-success.svg"/>
      </div>
      <div class="step-content">
       <h4 class="step-title mb-0">Получение</h4>
       <p v-if="isUserLoggedIn && userFormStatus && methodGetMoneyStatus" class="step-desc mb-0">Успешно</p>
       <p v-else class="step-desc mb-0">В ожидании</p>
      </div>
     </div>

    </div>

    <stepOne v-if="!isUserLoggedIn"/>
    <stepTwo v-if="isUserLoggedIn && !userFormStatus"/>
    <stepThree v-if="isUserLoggedIn && userFormStatus && !methodGetMoneyStatus"/>

   </div>
  </div>
 </div>
</template>

<script>
 import stepOne from "../components/Registration/stepOne";
 import stepTwo from "../components/Registration/stepTwo";
 import stepThree from "../components/Registration/stepThree";

 export default {
  name: "Registration",
  computed: {
   isUserLoggedIn() {
    return this.$store.getters.isUserLoggedIn
   },
   userFormStatus() {
    return this.$store.getters.userFormStatus
   },
   methodGetMoneyStatus() {
    return this.$store.getters.methodGetMoneyStatus
   }
  },
  components: {
   stepOne,
   stepTwo,
   stepThree
  }
 };
</script>

<style>
</style>