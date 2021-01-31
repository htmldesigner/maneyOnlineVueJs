<template>
 <div class="login-form w-879">
  <form class="form-signin">

   <h1 class="h3 mb-3">ЛИЧНЫЕ ДАННЫЕ</h1>

   <hr class="header-line"/>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Полное имя</label>
    <input class="form-control" v-model="getFormUser.Name" type="text" placeholder="Введите имя"
           required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Фамилия</label>
    <input class="form-control" v-model="getFormUser.Surname" type="text" placeholder="Введите фамилию" required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Отчество</label>
    <input class="form-control" v-model="getFormUser.Midlename" type="text" placeholder="Введите отчество" required>
   </div>
{{moment(getFormUser.LichiyeDannyeDataRoshdeniya).format('YYYYMMDD')}}
   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Дата рождения</label>
    <input type="date" name="bday" v-model="moment(getFormUser.LichiyeDannyeDataRoshdeniya).format('YYYY-MM-DD')"  class="form-control">
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Семейная жизнь</label>
    <div class="input-group-text form-control d-flex flex-row align-items-center mr-0 mr-md-2"
         :class="{active : getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie === 'не женат / не замужем'}">
     <input type="radio" name="Radios" id="Radios1" value="не женат / не замужем" v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie">
     <label class="w-30 mb-0 ml-2">Не женат / Не замужем</label>
    </div>
    <div class="form-check input-group-text form-control d-flex flex-row align-items-center ml-0 ml-md-2"
         :class="{active : getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie === 'женат / замужем'}">
     <input type="radio" name="Radios" id="Radios2" value="женат / замужем" v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie">
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
      name="Radios2"
      id="Radios21"
      value="Муж"
      v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol">
     <label class="w-30 mb-0 ml-2">Мужской</label>
    </div>

    <div class="input-group-text form-control d-flex flex-row align-items-center ml-0 ml-md-2"
         :class="{active : getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol === 'Жен'}"
    >
     <input
      type="radio"
      name="Radios2"
      id="Radios22"
      value="Жен"
      v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaPol">
     <label class="w-30 mb-0 ml-2">Женский</label>
    </div>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">ИИН</label>
    <input class="form-control" v-model="getFormUser.LichiyeDannyeIIN" type="text" placeholder="Введите ИИН" required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">№ Удостоверения личности</label>
    <input class="form-control" type="text" v-model="getFormUser.LichiyeDannyeDocumentNomer" placeholder="Введите номер" required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label for="inputGroupSelect08" class="w-30">Место выдачи</label>
    <select class="custom-select" id="inputGroupSelect08" v-model="getFormUser.LichiyeDannyeDocumentVidan">
     <option value="">Выберите из списка</option>
     <option value="МВД РК">МВД РК</option>
     <option value="МВД РК">МВД РК</option>
     <option value="МЮ РК">МЮ РК</option>
    </select>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Дата выдачи</label>
    <input type="date" name="bday" v-model="moment(getFormUser.LichiyeDannyeDocumentSrokS).format('YYYY-MM-DD').toLocaleString()" class="form-control">
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Срок действия</label>
    <input type="date" name="bday" v-model="moment(getFormUser.LichiyeDannyeDocumentSrokPo).format('YYYY-MM-DD').toLocaleString()" class="form-control">
   </div>

   <h1 class="h3 mb-3 mt-5">АДРЕС РЕГИСТРАЦИИ</h1>

   <hr class="header-line"/>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Населенный пункт</label>
    <input class="form-control" v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiGorod" type="text" placeholder="Введите место проживания" required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Улица</label>
    <input class="form-control" v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiUlitsa" type="text" placeholder="Введите улицу" required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">№ Дома</label>
    <input class="form-control w-50" v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiDom" type="text" placeholder="Введите номер дома" required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">№ Квартиры</label>
    <input class="form-control w-50" v-model="getFormUser.KontaktnayaInformatsyaAdresPropiskiKvartira" type="text" placeholder="Введите номер квартиры" required>
   </div>

   <h1 class="h3 mb-3 mt-5">МЕСТО РАБОТЫ</h1>

   <hr class="header-line"/>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Тип занятости</label>
    <select class="custom-select" id="inputGroupSelect01" v-model="getFormUser.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti">
     <option value="">Выберите из списка</option>
     <option value="работа по найму / служба">Работа по найму / Служба</option>
     <option value="собственное дело">Собственное дело</option>
     <option value="домохозяйка">Домохозяйка</option>
     <option value="студент">Студент</option>
     <option value="пенсионер">Пенсионер</option>
     <option value="безработный">Безработный</option>
    </select>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Должность</label>
    <input class="form-control" v-model="getFormUser.RabotaOsnovnoeMestoDolzhnost" type="text" placeholder="Введите должность" required>
   </div>

   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Ежемесячный доход</label>
    <input class="form-control" v-model="getFormUser.DokhodyRaskhodyDokhodyEzhemesyachiye" type="text" placeholder="0" required>
   </div>
   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Ежемесячные расходы по кредиту</label>
    <input class="form-control" v-model="getFormUser.DokhodyRaskhodyRaskhodyViplatyPoCreditam" type="text" placeholder="0" required>
   </div>
   <div class="input-group mb-4 d-flex flex-row align-items-center justify-content-between">
    <label class="w-30">Дополнительный доход</label>
    <input class="form-control" v-model="getFormUser.DokhodyRaskhodyDokhodyEzhemesyachiyePoSovmestitelstvu" type="text" placeholder="0" required>
   </div>

   <button class="btn btn-lg btn-primary btn-block mt-5 w-50" @click="onSubmit" type="submit">Далее</button>

  </form>
{{getFormUser}}

 </div>
</template>

<script>
 import moment from 'moment'
 export default {
  data(){
   return {}
  },
  name: "stepTwo",
  computed: {
   getFormUser() {
    let test = this.$store.getters.getFormUser
    // test.LichiyeDannyeDataRoshdeniya = moment(test.LichiyeDannyeDataRoshdeniya).format('YYYYMMDD')
    // test.LichiyeDannyeDocumentSrokS = moment(test.LichiyeDannyeDocumentSrokS).format('YYYYMMDD')
    // test.LichiyeDannyeDocumentSrokPo = moment(test.LichiyeDannyeDocumentSrokPo).format('YYYYMMDD')
    return test
   },
   isUserLoggedIn() {
    return this.$store.getters.isUserLoggedIn
   }
  },
  methods: {
   onSubmit(){
    this.$store.dispatch('sendUserForm', this.getFormUser)
    // console.log(this.getFormUser)
   }
  }
 }
</script>

<style scoped>

</style>