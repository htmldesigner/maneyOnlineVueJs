<template>
  <div class="login-form w-879" v-if="getFormUser">

    <ValidationObserver ref="form" v-slot="{ handleSubmit  }">

      <form class="form-signin" @submit.prevent="handleSubmit(onSubmit)">

        <h1 class="h3 mb-3">{{ $t('forms.private_office') }}</h1>

        <hr class="header-line"/>

        <div class="d-flex flex-wrap justify-content-lg-between justify-content-center mb-5" style="width: 100%">

          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div>
                  <div><p class="text-center"><strong>Фото удостоверения</strong></p></div>
                  <Camera
                      @onImage="setDocPhoto"
                      @onClear="clearDocPhoto"
                      :corner="{height: '180px', width: '250px', color: '#fff'}"
                      ref="cameraRef"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div v-if="doc_photo">
                  <div><p class="text-center"><strong>Ваше фото</strong></p></div>
                  <Camera
                      @onImage="setPhoto"
                      @onClear="clearPhoto"
                      :corner="{height: '220px', width: '180px', color: '#fff'}"
                      ref="cameraRef"
                  />
                </div>
              </div>
            </div>
          </div>


          <!--          <Biometry-->
          <!--              @onImage="setDocPhoto"-->
          <!--              @onClear="clearDocPhoto"-->
          <!--              :title="'Фото удостоверения'"-->
          <!--              :widthCss="320"-->
          <!--              :heightCss="240"-->
          <!--              :corner="{height: '200px', width: '280px', color: '#fff'}"-->
          <!--          />-->

          <!--          <Biometry v-if="doc_photo"-->
          <!--                    @onImage="setPhoto"-->
          <!--                    @onClear="clearPhoto"-->
          <!--                    :title="'Ваше фото'"-->
          <!--                    :widthCss="200"-->
          <!--                    :heightCss="240"-->
          <!--                    :corner="{height: '220px', width: '180px', color: '#fff'}"-->
          <!--          />-->
        </div>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.name') }}</label>
            <input
                class="form-control"
                :class="{'is-invalid': errors[0]}"
                type="text"
                placeholder="Введите имя"
                v-model="getFormUser.Name"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.middle_name') }}</label>
            <input
                class="form-control"
                v-model="getFormUser.Midlename"
                type="text"
                :class="{'is-invalid': errors[0]}"
                placeholder="Введите отчество"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.surname') }}</label>
            <input
                class="form-control"
                v-model="getFormUser.Surname"
                :class="{'is-invalid': errors[0]}"
                type="text"
                placeholder="Введите фамилию"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label for="example-datetime-local-input" class="w-30">Дата рождения</label>
          <input class="form-control" type="date" v-model="birthday" id="example-datetime-local-input">
        </div>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label class="w-30">{{ $t('forms.family') }}</label>
          <div class="input-group-text form-control d-flex flex-row align-items-center mr-0 mr-md-2"
               :class="{active : getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie === 'не женат / не замужем'}">
            <input type="radio" name="family" value="не женат / не замужем"
                   v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie">
            <label class="w-30 mb-0 ml-2">Не женат / Не замужем</label>
          </div>
          <div class="form-check input-group-text form-control d-flex flex-row align-items-center ml-0 ml-md-2"
               :class="{active : getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie === 'женат / замужем'}">
            <input type="radio" name="family" value="женат / замужем"
                   v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie">
            <label class="w-30 mb-0 ml-2">Женат / Замужем</label>
          </div>
        </div>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label class="w-30">Пол</label>
          <div class="input-group-text form-control d-flex flex-row align-items-center mr-0 mr-md-2"
               :class="{active : getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol === 'Муж'}"
          >
            <input
                type="radio"
                name="gender"
                value="Муж"
                v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol">
            <label class="w-30 mb-0 ml-2">Мужской</label>
          </div>

          <div class="input-group-text form-control d-flex flex-row align-items-center ml-0 ml-md-2"
               :class="{active : getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol === 'Жен'}"
          >
            <input
                type="radio"
                value="Жен"
                name="gender"
                v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol">
            <label class="w-30 mb-0 ml-2">Женский</label>
          </div>
        </div>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label class="w-30">{{ $t('forms.IIN') }}</label>
          <input
              class="form-control"
              :disabled="getFormUser.LichiyeDannyeIIN.length"
              v-model.trim="getFormUser.LichiyeDannyeIIN"
              type="text"
              placeholder="Введите ИИН"
              required
          >
        </div>

        <ValidationProvider rules="required|numberOnly|documentID:9|documentIDMax:9" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.number_id') }}</label>
            <input
                class="form-control"
                type="text"
                v-model.trim="getFormUser.LichiyeDannyeDocumentNomer"
                placeholder="Введите номер"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label for="inputGroupSelect08" class="w-30">{{ $t('forms.place_of_issue') }}</label>
            <select
                class="custom-select"
                id="inputGroupSelect08"
                v-model="getFormUser.LichiyeDannyeDocumentVidan"
                :class="{'is-invalid': errors[0]}"
            >
              <option value="">{{ $t('forms.select_from_list') }}</option>
              <option value="МВД РК">МВД РК</option>
              <option value="МЮ РК">МЮ РК</option>
            </select>
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label for="example-datetime-local-input" class="w-30">{{ $t('forms.date_of_issue') }}</label>
          <input class="form-control" type="date" v-model="documentSrokS" id="documentSrokS">
        </div>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label for="example-datetime-local-input" class="w-30">{{ $t('forms.validity') }}</label>
          <input class="form-control" type="date" v-model="documentSrokPo" id="documentSrokPo">
        </div>

        <h1 class="h3 mb-3 mt-5">{{ $t('forms.registration_address') }}</h1>

        <hr class="header-line"/>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.locality') }}</label>
            <input
                class="form-control"
                :class="{'is-invalid': errors[0]}"
                v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiGorod"
                type="text"
                placeholder="Введите место проживания"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.street') }}</label>
            <input
                class="form-control"
                :class="{'is-invalid': errors[0]}"
                v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiUlitsa"
                type="text"
                placeholder="Введите улицу"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.house_number') }}</label>
            <input
                class="form-control w-50"
                :class="{'is-invalid': errors[0]}"
                v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiDom"
                type="text"
                placeholder="Введите номер дома">
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label class="w-30">{{ $t('forms.room_number') }}</label>
          <input
              class="form-control w-50"
              v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiKvartira"
              type="text"
              placeholder="Введите номер квартиры">
        </div>

        <h1 class="h3 mb-3 mt-5">{{ $t('forms.residence_address') }}</h1>

        <hr class="header-line"/>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.locality') }}</label>
            <input
                class="form-control"
                :class="{'is-invalid': errors[0]}"
                v-model="getFormUser.KontaktnayaInformatsyaAdresProzhivaniyaGorod"
                type="text"
                placeholder="Введите место проживания"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.street') }}</label>
            <input
                class="form-control"
                :class="{'is-invalid': errors[0]}"
                v-model="getFormUser.KontaktnayaInformatsyaAdresProzhivaniyaUlitsa"
                type="text"
                placeholder="Введите улицу"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.house_number') }}</label>
            <input
                class="form-control w-50"
                :class="{'is-invalid': errors[0]}"
                v-model="getFormUser.KontaktnayaInformatsyaAdresProzhivaniyaDom"
                type="text"
                placeholder="Введите номер дома">
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
          <label class="w-30">{{ $t('forms.room_number') }}</label>
          <input
              class="form-control w-50"
              v-model="getFormUser.KontaktnayaInformatsyaAdresProzhivaniyaKvartira"
              type="text"
              placeholder="Введите номер квартиры">
        </div>

        <h1 class="h3 mb-3 mt-5">{{ $t('forms.work_place') }}</h1>

        <hr class="header-line"/>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.busyness') }}</label>
            <select
                class="custom-select"
                :class="{'is-invalid': errors[0]}"
                v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti">
              <option value="">{{ $t('forms.select_from_list') }}</option>
              <option value="работа по найму / служба">Работа по найму / Служба</option>
              <option value="собственное дело">Собственное дело</option>
              <option value="домохозяйка">Домохозяйка</option>
              <option value="студент">Студент</option>
              <option value="пенсионер">Пенсионер</option>
              <option value="безработный">Безработный</option>
            </select>
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.position') }}</label>
            <input
                class="form-control"
                v-model="getFormUser.RabotaOsnovnoeMestoDolzhnost"
                type="text"
                placeholder="Введите должность"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|numberOnly" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.earnings') }}</label>
            <input
                class="form-control"
                v-model="getFormUser.DokhodyRaskhodyDokhodyEzhemesyachiyeOsnovMestoRaboty"
                type="text"
                placeholder="Сумма"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|numberOnly" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.loan_costs') }}</label>
            <input
                class="form-control"
                v-model="getFormUser.DokhodyRaskhodyRaskhodyViplatyPoCreditam"
                type="text"
                placeholder="Сумма"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required|numberOnly" v-slot="{ errors }">
          <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
            <label class="w-30">{{ $t('forms.additional_income') }}</label>
            <input
                class="form-control"
                v-model="getFormUser.DokhodyRaskhodyDokhodyEzhemesyachiyePoSovmestitelstvu"
                type="text"
                placeholder="Сумма"
                :class="{'is-invalid': errors[0]}"
            >
            <div v-if="errors[0]" class="invalid-feedback" style="text-align: right;">
              {{ errors[0] }}
            </div>
          </div>
        </ValidationProvider>

        <button class="btn btn-lg btn-primary btn-block mt-5 w-50" type="submit">{{ $t('buttons.next') }}</button>
      </form>

    </ValidationObserver>
  </div>
</template>

<script>
import moment from 'moment'
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import Biometry from "../Biometry";
import Camera from "../Camera";

function emptyDate(date) {
  return date === '01.01.0001' ? '' : date
}

const dateFormatOutRead = 'YYYY-MM-DD'
const dateFormatOutToServer = 'YYYY-MM-DDTHH:mm'
const dateFormatIn = 'YYYY-MM-DD'

export default {
  name: "stepTwo",
  components: {
    ValidationObserver,
    ValidationProvider,
    DatePicker,
    Biometry,
    Camera
  },
  computed: {
    getFormUser() {
      return this.$store.getters.getFormUser
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    },

    birthday: {
      get() {
        return emptyDate(moment(this.$store.getters.getFormUser.LichiyeDannyeDataRoshdeniya, dateFormatOutToServer).format(dateFormatOutRead))
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeDataRoshdeniya = moment(value, dateFormatIn).format(dateFormatOutToServer)
      }
    },

    // Срок с начала действия уд.личности
    documentSrokS: {
      get() {
        return emptyDate(moment(this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokS, dateFormatOutToServer).format(dateFormatOutRead))
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokS = moment(value, dateFormatIn).format(dateFormatOutToServer)
      }
    },

    // Срок с окончания действия уд.личности
    documentSrokPo: {
      get() {
        return emptyDate(moment(this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokPo, dateFormatOutToServer).format(dateFormatOutRead))
      },
      set(value) {
        this.$store.getters.getFormUser.LichiyeDannyeDocumentSrokPo = moment(value, dateFormatIn).format(dateFormatOutToServer)
      }
    }
  },
  data() {
    return {
      photo: null,
      doc_photo: null,
      dateFormat: dateFormatOutRead,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('sendUserForm', this.getFormUser)
    },
    birthdayFunction(ev) {
      console.log(ev)
    },

    setDocPhoto(el) {
      this.doc_photo = el
      this.getFormUser.doc_photo = this.doc_photo
    },

    setPhoto(el) {
      this.photo = el
      this.getFormUser.photo = this.photo
    },

    clearDocPhoto() {
      this.doc_photo = null
    },
    clearPhoto() {
      this.photo = null
    }

  }
}
</script>

<style scoped>

</style>