<template>
  <!-- POPOUP MODAL
     ================================================== -->
  <div v-if="openLoanModal" class="loanModal" @click="$emit('closeLoanModal')">

    <div class="modal-dialog modal-dialog-centered" @click="(e) =>{e.stopPropagation()}">
      <div class="modal-content p-0">
        <form class="form-signin">

          <button @click="$emit('closeLoanModal')" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>

          <h1 class="h3 mb-3 text-center pl-3 pr-3 pl-sm-0 pr-sm-0">{{ $t('cabinet.getting_loan') }}</h1>
          <hr class="header-line"/>
          <div class="modal-body text-center p-0">

            <div class="d-flex flex-wrap justify-content-center mb-3" style="width: 100%">

              <p v-if="!doc_photo && !photo"><strong>Сделайте фото удостоверения</strong></p>
              <p v-if="doc_photo && !photo"><strong>Сделайте ваше фото</strong></p>

              <Camera v-show="!nextPhoto"
                      @onImage="setDocPhoto"
                      @onClear="clearDocPhoto"
                      :corner="{height: '180px', width: '250px', color: '#fff'}"
                      ref="cameraRef"
              />

              <Camera v-if="doc_photo && nextPhoto"
                      @onImage="setPhoto"
                      @onClear="clearPhoto"
                      :corner="{height: '220px', width: '180px', color: '#fff'}"
                      ref="cameraRef"
              />
            </div>

            <div class="mb-4 d-flex justify-content-center">
              <div v-if="doc_photo && !nextPhoto">
                <button class="btn btn-lg btn-primary btn-block" @click.prevent="nextPhoto = true">
                  {{ $t('buttons.next') }}
                </button>
              </div>

              <div v-if="nextPhoto">
                <button class="btn btn-lg btn-primary" @click.prevent="nextPhoto = false">{{ $t('buttons.back') }}
                </button>
              </div>
            </div>

            <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
              <label for="inputGroup01" class="w-50 text-left">{{ $t('cabinet.loan_amount') }}</label>
              <input
                  @keydown="keydown"
                  class="form-control" id="inputGroup01" min="15000" max="300000" step="500" v-model="sum"
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
              <label class="text-left">{{ $t('cabinet.loan_term') }}</label>
              <div class="custom-range">
                <div class="range mr-2">
                  <input type="range" min="10" max="30" step="1" v-model="period" class="form-range" id="customRange2"/>
                </div>
                <label class="form-label" for="customRange2">{{ period }} {{ $t('cabinet.day') }}</label>
              </div>
            </div>

            <div class="input-group mb-4 d-flex justify-content-between">

              <div class="d-flex flex-column text-left">
                <label class="sub-label">{{ $t('cabinet.amount_repaid') }}</label>
                <span class="sub-label-text">{{ returnMoney | numberFilter }} тг</span>
              </div>

              <div class="d-flex flex-column text-left">
                <span class="sub-label-text aferta"><a href="#">{{ $t('cabinet.offer') }}</a></span>
              </div>

            </div>

          </div>
          <div class="d-flex flex-column text-center">
            <button class="btn btn-lg btn-primary btn-block mt-3 mb-3" :disabled="!doc_photo || !photo || isDisabled"
                    @click.prevent="onSubmit">{{ $t('buttons.confirm') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Biometry from "../../Biometry";
import Camera from "../../Camera";

export default {
  name: "GetLoanModal",
  components: {
    Biometry, Camera
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
  props: {
    openLoanModal: {
      type: Boolean
    }
  },
  data() {
    return {
      photo: null,
      doc_photo: null,
      sum: 150000,
      period: 20,
      method: 1,
      nextPhoto: null,
      isDisabled: false
    }
  },
  filters: {
    numberFilter: function (value) {
      return new Intl.NumberFormat('ru-RU').format(parseInt(value))
    }
  },
  methods: {
    keydown(event) {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'].indexOf(event.key) == -1 ) {
        event.preventDefault()
      }

      if (parseInt(event.target.value + event.key) > 145000) {
        event.target.value = 145000
        event.preventDefault()
      }
    },
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
      if (this.$refs.cameraRef) {
        this.$refs.cameraRef.onStart()
      }
    },
    modalHide() {
      $('#regaModal').modal('hide');
      if (this.$refs.cameraRef) {
        this.$refs.cameraRef.onStopped()
      }
    },

    async onSubmit() {
      try {
        if (this.sum) {

          this.isDisabled = !this.isDisabled

          let data = {
            sum: this.sum,
            period: this.period,
            method: this.method,
            doc_photo: this.doc_photo,
            photo: this.photo
          }
          await this.$store.dispatch('sendLoanRequest', data)
          this.$emit('closeLoanModal')
          await this.$store.dispatch('setSuccess', 'Ваша заявка на расмотрении')
          await this.$store.dispatch('getLoanList')

          this.isDisabled = false

        }
      } catch (error) {
        throw error
      }
    },


  },
}
</script>

<style scoped>
.loanModal{
  position: fixed;
  overflow: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 5555;
  background: rgba(0, 0, 0, .5);
}
</style>
