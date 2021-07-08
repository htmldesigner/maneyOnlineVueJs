<template>
 <div v-if="hasCard">
  <dl class="row mt-5 d-flex flex-row align-items-center justify-content-start">
   <dt class="col-md-3">
    <div class="input-group mb-4 d-flex flex-column">
     <label class="mb-4 personal-card-text">{{$t('cabinet.bank_cards')}}</label>
     <select class="custom-select w-100">
      <option selected="">5260-59хх-*****</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
     </select>
    </div>
   </dt>
   <dt class="col-md-2 mt-md-4 text-md-center"><a class="default-btn" href="#">{{$t('cabinet.add_new_card')}}</a></dt>
   <dt class="col-md-3 mt-md-4"><a class="default-btn" href="#">{{$t('cabinet.remove_card')}}</a></dt>
  </dl>

<!--  <dl class="row mt-5 d-flex flex-row align-items-center justify-content-start">-->
<!--   <dt class="col-md-3">-->
<!--    <div class="input-group mb-4 d-flex flex-column">-->
<!--     <label class="mb-4 personal-card-text">БАНКОВСКИЕ СЧЕТА</label>-->
<!--     <select class="custom-select w-100">-->
<!--      <option selected="">5260-59хх-*****</option>-->
<!--      <option value="1">One</option>-->
<!--      <option value="2">Two</option>-->
<!--      <option value="3">Three</option>-->
<!--     </select>-->
<!--    </div>-->
<!--   </dt>-->
<!--   <dt class="col-md-2 mt-md-4 text-md-center"><a class="default-btn" href="#">Добавить счет</a></dt>-->
<!--  </dl>-->

 </div>


 <div v-else class="form-control d-flex flex-column align-items-center border-0 pt-5 pb-5 empty">
  <label class="">У вас нет активных займов</label>
  <img alt="" class="step-thumb" src="@/assets/image/empty.svg">
 </div>

</template>

<script>
 export default {
  name: "CardsAccounts",
  data() {
   return {
    hasCard: true
   }
  }
 }
</script>

<style scoped>

</style>