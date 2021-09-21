<template>
  <div v-if="hasCard">
    <dl class="row mt-5 d-flex flex-row align-items-center justify-content-start">
      <dt class="col-md-3">

        <div class="input-group mb-4 d-flex flex-column" v-if="userCards">
          <label class="mb-4 personal-card-text">{{ $t('cabinet.bank_cards') }}</label>
          <select class="custom-select w-100" @change="selectActiveCard($event)">
            <option :value="card.id" :selected="card.active" v-for="card in userCards" :key="card.id">
              {{ card.card_number }}
            </option>
          </select>
        </div>
      </dt>

      <dt class="col-md-2 mt-md-4 text-md-center">
        <a class="default-btn" @click.prevent="addCard" href="#">{{ $t('buttons.add_new_card') }}</a>
      </dt>
      <dt class="col-md-3 mt-md-4">
        <a class="default-btn" @click.prevent="removeCard" href="#">{{ $t('buttons.remove_card') }}</a>
      </dt>
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

    <CardOperation ref="operationWithCards" :slotName="slotName">
      <template v-slot:addCard>
        <div class="wraper" style="padding: 20px">
          <div class="input-group d-flex flex-row align-items-center justify-content-between">
            <masked-input
                style="text-align: center; font-size: 22px; padding: 8px 15px"
                class="form-control" v-model="card_number" mask="1111 1111 1111 1111"
            />
          </div>
          <button
              class="btn btn-lg btn-primary mt-4 btn-block"
              type="submit"
              @click.prevent="sendCard"
          >Подтвердить
          </button>
        </div>
      </template>


      <template v-slot:removeCard>
        <div class="wraper" style="padding: 20px">
          <div class="input-group mb-4 d-flex flex-column">
            <label class="mb-4 personal-card-text">Доступные карты</label>
            <select class="custom-select w-100" @change="selectRemoveCard($event)">
              <option :value="card.id" :selected="card.active" v-for="card in userCards" :key="card.id">
                {{ card.card_number }}
              </option>
            </select>
          </div>
          <button
              class="btn btn-lg btn-primary mt-4 btn-block"
              type="submit"
              @click.prevent="sendCardToRemove"
          >Удалить
          </button>
        </div>
      </template>




    </CardOperation>

  </div>


  <div v-else class="form-control d-flex flex-column align-items-center border-0 pt-5 pb-5 empty">
    <label class="">У вас нет активных займов</label>
    <img alt="" class="step-thumb" src="@/assets/image/empty.svg">
  </div>

</template>

<script>
import CardOperation from "./ModalWindow/CardOperation";
import MaskedInput from 'vue-masked-input'

export default {
  name: "CardsAccounts",
  components: {
    CardOperation, MaskedInput
  },
  computed: {
    userCards() {
      return this.$store.getters.userCards.data
    }
  },
  data() {
    return {
      card_number: '',
      candidateForRemove: '',
      hasCard: true,
      slotName: ''
    }
  },
  methods: {
    addCard() {
      this.slotName = 'addCard'
      this.$refs.operationWithCards.modalInit()
    },
    removeCard() {
      this.slotName = 'removeCard'
      this.$refs.operationWithCards.modalInit()
    },
    sendCard() {
      if (this.card_number) {
        const card = this.card_number.split(' ').join('')
        this.$store.dispatch('addCard', {card_number: card})
        this.$refs.operationWithCards.modalHide()
        this.card_number = ''
      }
    },
    selectRemoveCard(value){
      this.candidateForRemove =  +value.target.value
    },

    sendCardToRemove() {
      if (this.candidateForRemove) {
        this.$store.dispatch('removeCard', this.candidateForRemove)
        this.$refs.operationWithCards.modalHide()
        this.card_number = ''
      }
    },

    selectActiveCard(value) {
      this.$store.dispatch('setActiveUserCard', +value.target.value)
    }
  }
}
</script>

<style scoped>

</style>