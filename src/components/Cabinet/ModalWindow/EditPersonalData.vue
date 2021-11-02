<template>
  <div class="personalEditModal" v-if="personalEditModal" @click="$emit('closePersonalEditModal')">
    <div class="container modal-dialog-centered" @click="(e) =>{e.stopPropagation()}">
      <div class="modal-content p-0">

        <ValidationObserver ref="form" v-slot="{ handleSubmit  }">
          <form class="form-signin" @submit.prevent="handleSubmit(sendEditData)">

            <button @click="$emit('closePersonalEditModal')" type="button" class="close" data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true"></span>
            </button>

            <h1 class="h3 text-center pl-3 pr-3 pl-sm-0 pr-sm-0"><strong>Редактор персональных данных</strong></h1>
            <hr class="header-line"/>
            <div class="modal-body p-0">

              <div class="container">
                <div class="row">

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.name') }}</label>
                    <input
                        disabled
                        class="form-control"
                        type="text"
                        placeholder="Введите имя"
                        v-model="getFormUser.Name"
                    >
                  </div>

                  <div class="col-md-4 mt-4">

                    <label>{{ $t('forms.middle_name') }}</label>
                    <input
                        class="form-control"
                        type="text"
                        disabled
                        placeholder="Введите отчество"
                        v-model="getFormUser.Midlename"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.surname') }}</label>
                    <input
                        class="form-control"
                        disabled
                        type="text"
                        placeholder="Введите фамилию"
                        v-model="getFormUser.Surname"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.birthday') }}</label>
                    <input
                        disabled
                        class="form-control"
                        type="date"
                        placeholder="Укажите дату рождения"
                        v-model="birthday"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.phone') }}</label>
                    <input
                        disabled
                        class="form-control"
                        type="text"
                        placeholder="Укажите телефон"
                        v-model="getFormUser.KontaktnayaInformatsyaTelefonyMobilniy"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <label>{{ $t('forms.busyness') }}</label>
                      <select
                          class="custom-select"
                          :class="{'is-invalid': errors[0]}"
                          v-model="currentWork"
                      >
                        <option value="" disabled>{{ $t('forms.select_from_list') }}</option>
                        <option value="работа по найму / сл">Работа по найму / Служба</option>
                        <option value="собственное дело">Собственное дело</option>
                        <option value="домохозяйка">Домохозяйка</option>
                        <option value="студент">Студент</option>
                        <option value="пенсионер">Пенсионер</option>
                        <option value="безработный">Безработный</option>
                      </select>
                      <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.position') }}</label>
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Укажите должность"
                        v-model="getFormUser.RabotaOsnovnoeMestoDolzhnost"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.earnings') }}</label>
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Укажите ежемесячный доход"
                        v-model="getFormUser.DokhodyRaskhodyDokhodyEzhemesyachiyeOsnovMestoRaboty"
                    >
                  </div>

                  <div class="col-md-4 mt-4">

                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <label for="inputGroupSelect02">{{ $t('forms.family') }}</label>
                      <select
                          class="custom-select"
                          id="inputGroupSelect02"
                          v-model="familyStatus"
                          :class="{'is-invalid': errors[0]}"
                      >
                        <option value="" disabled>{{ $t('forms.select_from_list') }}</option>
                        <option value="не женат / не замуже">Не женат / Не замужем</option>
                        <option value="Женат / Замужем">Женат / Замужем</option>
                      </select>
                      <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.IIN') }}</label>
                    <input
                        class="form-control"
                        :disabled="true"
                        type="text"
                        placeholder="Введите ИИН"
                        required
                        v-model="getFormUser.LichiyeDannyeIIN"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.number_id') }}</label>
                    <input
                        class="form-control"
                        type="text"
                        disabled
                        placeholder="Введите номер"
                        v-model="getFormUser.LichiyeDannyeDocumentNomer"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label for="inputGroupSelect08">{{ $t('forms.place_of_issue') }}</label>
                    <select
                        class="custom-select"
                        disabled
                        id="inputGroupSelect08"
                        v-model="placeIssue"
                    >
                      <option value="" disabled>{{ $t('forms.select_from_list') }}</option>
                      <option value="МВД РК">МВД РК</option>
                      <option value="МЮ РК">МЮ РК</option>
                    </select>
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.date_of_issue') }}</label>
                    <input
                        disabled
                        class="form-control"
                        type="date"
                        placeholder="Дата выдачи"
                        v-model="documentSrokS"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.validity') }}</label>
                    <input
                        disabled
                        class="form-control"
                        type="date"
                        placeholder="Срок действия"
                        v-model="documentSrokPo"
                    >
                  </div>


                </div>
              </div>


              <div class="container">
                <div class="row">

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.locality') }}</label>
                    <input
                        class="form-control"
                        v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiGorod"
                        type="text"
                        placeholder="Введите место проживания"
                    >
                  </div>

                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.street') }}</label>
                    <input
                        class="form-control"
                        v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiUlitsa"
                        type="text"
                        placeholder="Введите улицу"
                    >
                  </div>


                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.house_number') }}</label>
                    <input
                        class="form-control"
                        v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiDom"
                        type="text"
                        placeholder="Введите номер дома">
                  </div>


                  <div class="col-md-4 mt-4">
                    <label>{{ $t('forms.room_number') }}</label>
                    <input
                        class="form-control"
                        v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiKvartira"
                        type="text"
                        placeholder="Введите номер квартиры">
                  </div>


                </div>
              </div>

              <div class="container mt-5">
                <div class="row d-flex justify-content-center">
                  <div class="col-md-3">
                    <button type="submit" class="btn btn-lg btn-primary btn-block">Сохранить</button>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import moment from "moment";

const dateFormatOutRead = 'YYYY-MM-DD'
const dateFormatOutToServer = 'YYYY-MM-DDTHH:mm'
const dateFormatIn = 'YYYY-MM-DD'

export default {
  name: "EditPersonalData",
  components: {ValidationObserver, ValidationProvider},
  computed: {
    getFormUser() {
      return this.$store.getters.getFormUser
    },

    currentWork: {
      get() {
        return this.$store.getters.getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti = value
      }
    },

    familyStatus: {
      get() {
        return this.$store.getters.getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie = value
      }
    },

    placeIssue: {
      get() {
        return this.$store.getters.getFormUser.LichiyeDannyeDocumentVidan
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeDocumentVidan = value
      }
    },

    birthday: {
      get() {
        return moment(this.$store.getters.getFormUser.LichiyeDannyeDataRoshdeniya, dateFormatOutToServer).format(dateFormatOutRead)
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeDataRoshdeniya = moment(value, dateFormatIn).format(dateFormatOutToServer)
      }
    },

    // Срок с начала действия уд.личности
    documentSrokS: {
      get() {
        return moment(this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokS, dateFormatOutToServer).format(dateFormatOutRead)
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokS = moment(value, dateFormatIn).format(dateFormatOutToServer)
      }
    },

    // Срок с окончания действия уд.личности
    documentSrokPo: {
      get() {
        return moment(this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokPo, dateFormatOutToServer).format(dateFormatOutRead)
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokPo = moment(value, dateFormatIn).format(dateFormatOutToServer)
      }
    }
  },
  props: {
    personalEditModal: {
      type: Boolean
    }
  },
  methods: {
    sendEditData() {
      this.$store.dispatch('sendUserForm', this.getFormUser)
      this.$emit('closePersonalEditModal')
    }
  }
}
</script>

<style scoped>
.personalEditModal {
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
