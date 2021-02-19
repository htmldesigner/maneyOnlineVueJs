<template>
 <dl class="row mt-5" v-if="userForm">
  <dt class="col-md-3">ФИО</dt>
  <dd class="col-md-9">{{userForm.Name}} {{userForm.Midlename}} {{userForm.Surname}}</dd>

  <dt class="col-md-3">Дата рождения</dt>
  <dd class="col-md-9">{{moment(userForm.LichiyeDannyeDataRoshdeniya, 'YYYYDDMM').format('YYYY-MM-DD')}}</dd>

  <dt class="col-md-3">Телефон</dt>
  <dd class="col-md-9">----------------</dd>

  <dt class="col-md-3">Тип занятости</dt>
  <dd class="col-md-9">{{userForm.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti}}</dd>

  <dt class="col-md-3">Должность</dt>
  <dd class="col-md-9">{{userForm.RabotaOsnovnoeMestoDolzhnost}}</dd>

  <dt class="col-md-3">Ежемесячный доход</dt>
  <dd class="col-md-9">{{userForm.DokhodyRaskhodyDokhodyEzhemesyachiyeOsnovMestoRaboty}} тг</dd>

  <dt class="col-md-3">Семейная жизнь</dt>
  <dd class="col-md-9">{{userForm.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie}}</dd>

  <dt class="col-md-3">Адрес проживания</dt>
  <dd class="col-md-9">
   {{userForm.KontaktnayaInformatsyaAdresPropiskiGorod}},
   {{userForm.KontaktnayaInformatsyaAdresPropiskiUlitsa}},
   {{userForm.KontaktnayaInformatsyaAdresPropiskiDom}}
  </dd>

  <dt class="col-md-3">ИИН</dt>
  <dd class="col-md-9">{{userForm.LichiyeDannyeIIN}}</dd>

  <dt class="col-md-3">№ Удостоверения личности</dt>
  <dd class="col-md-9">{{userForm.LichiyeDannyeDocumentNomer}}</dd>

  <dt class="col-md-3">Место выдачи</dt>
  <dd class="col-md-9">{{userForm.LichiyeDannyeDocumentVidan}}</dd>

  <dt class="col-md-3">Дата выдачи</dt>
  <dd class="col-md-9">{{moment(userForm.LichiyeDannyeDocumentSrokS, 'YYYYDDMM').format('YYYY-MM-DD')}}</dd>

  <dt class="col-md-3">Срок действия</dt>
  <dd class="col-md-9">{{moment(userForm.LichiyeDannyeDocumentSrokPo, 'YYYYDDMM').format('YYYY-MM-DD')}}</dd>

  <dt class="col-md-3"><a class="default-btn" href="#">Редактировать</a></dt>
  <dd class="col-md-9"></dd>
 </dl>
</template>

<script>
 export default {
  name: "PersonalData",
  computed: {
   userForm (){
    return this.$store.getters.getFormUser
   }
  }
 }
</script>

<style scoped>

</style>