<template>
  <!-- POPOUP MODAL
     ================================================== -->
  <div id="regaModal" class="rega-modal modal fade" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalCenterTitle">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content p-0">

        <form class="form-signin">

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
          <h1 class="h3 mb-3 text-center pl-3 pr-3 pl-sm-0 pr-sm-0">{{$t('cabinet.getting_loan')}}</h1>
          <hr class="header-line"/>
          <div class="modal-body text-center p-0">


            <div class="d-flex flex-wrap justify-content-center mb-3" style="width: 100%">

              <Biometry v-show="!nextPhoto"
                  @onImage="setDocPhoto"
                  @onClear="clearDocPhoto"
                  :title="'Фото удостоверения'"
                  :widthCss="320"
                  :heightCss="240"
                  :corner="{height: '200px', width: '280px', color: '#fff'}"
                  ref="biometryRef"
              />



              <Biometry v-show="doc_photo && nextPhoto"
                        @onImage="setPhoto"
                        @onClear="clearPhoto"
                        :title="'Ваше фото'"
                        :widthCss="200"
                        :heightCss="240"
                        :corner="{height: '220px', width: '180px', color: '#fff'}"
                        ref="biometryRef"
              />
            </div>

            <div class="mb-4 d-flex justify-content-center">
              <div v-if="doc_photo && !nextPhoto"><button class="btn btn-lg btn-primary btn-block" @click.prevent="nextPhoto = true">{{$t('buttons.next')}}</button></div>

              <div v-if="nextPhoto"><button class="btn btn-lg btn-primary" @click.prevent="nextPhoto = false">{{$t('buttons.back')}}</button></div>
            </div>

            <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
              <label for="inputGroup01" class="w-50 text-left">{{$t('cabinet.loan_amount')}}</label>
              <input class="form-control" id="inputGroup01" min="15000" max="300000" step="500" v-model="sum"
                     placeholder="Введите сумму">
            </div>

            <!--      <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">-->
            <!--       <label for="inputGroupSelect01" class="w-50 text-left">Способ получения</label>-->
            <!--       <select class="custom-select" id="inputGroupSelect01">-->
            <!--        <option selected>5260-59хх-*****</option>-->
            <!--        <option value="1">One</option>-->
            <!--        <option value="2">Two</option>-->
            <!--        <option value="3">Three</option>-->
            <!--       </select>-->
            <!--      </div>-->

            <div
                class="input-group mb-4 d-flex flex-row p-0 justify-content-between align-items-center poluchenie-zaima">
              <label class="text-left">{{$t('cabinet.loan_term')}}</label>
              <div class="custom-range">
                <div class="range mr-2">
                  <input type="range" min="10" max="30" step="1" v-model="period" class="form-range" id="customRange2"/>
                </div>
                <label class="form-label" for="customRange2">{{ period }} {{$t('cabinet.day')}}</label>
              </div>
            </div>

            <div class="input-group mb-4 d-flex justify-content-between">

              <div class="d-flex flex-column text-left">
                <label class="sub-label">{{$t('cabinet.amount_repaid')}}</label>
                <span class="sub-label-text">{{ returnMoney | numberFilter }} тг</span>
              </div>

              <div class="d-flex flex-column text-left">
                <span class="sub-label-text aferta"><a href="#">{{$t('cabinet.offer')}}</a></span>
              </div>

            </div>

          </div>
          <div class="d-flex flex-column text-center">
            <button class="btn btn-lg btn-primary btn-block mt-3 mb-3" :disabled="!doc_photo || !photo" @click.prevent="onSubmit">{{$t('buttons.confirm')}}</button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Biometry from "../../Biometry";

export default {
  name: "GetLoanModal",
  components: {
    Biometry
  },
  computed: {
    returnDay() {
      let date = moment().add(this.period, 'days')
      return date.format('DD.MM.YYYY')
    },
    returnMoney() {
      let percentage = parseInt(this.sum) * 1 / 100
      return (percentage * parseInt(this.period)) + parseInt(this.sum)
    }
  },
  data(){
    return {
      photo: null,
      doc_photo: null,
      sum: 150000,
      period: 20,
      method: 1,
      nextPhoto: null
    }
  },
  filters: {
    numberFilter: function (value) {
      return new Intl.NumberFormat('ru-RU').format(parseInt(value))
    }
  },
  methods: {

    setDocPhoto(el) {
      this.doc_photo = el
    },

    setPhoto(el) {
      this.photo = el
    },

    clearDocPhoto() {
      this.doc_photo = null
    },
    clearPhoto() {
      this.photo = null
    },


    modalInit() {
      $('#regaModal').modal('show');
    },
    modalHide() {
      $('#regaModal').modal('hide');
    },

    async onSubmit() {
      try {
        if (this.sum) {
          let data = {
            sum: this.sum,
            period: this.period,
            method: this.method,
            doc_photo: this.doc_photo,
            photo: this.photo
          }
          await this.$store.dispatch('sendLoanRequest', data)
          await this.modalHide()
          await this.$store.dispatch('setSuccess', 'Ваша заявка на расмотрении')
          await this.$store.dispatch('getLoanList')
        }
      } catch (error) {
        throw error
      }
    },


  },
}
</script>

<style scoped>

</style>