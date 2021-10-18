<template>
  <div>
    <dl class="row mt-5" v-if="userForm">
      <dt class="col-md-3">{{ $t('personal.fio') }}</dt>
      <dd class="col-md-9">{{ userForm.Name }} {{ userForm.Midlename }} {{ userForm.Surname }}</dd>

      <dt class="col-md-3">{{ $t('personal.birthday') }}</dt>
      <dd class="col-md-9">{{ moment(userForm.LichiyeDannyeDataRoshdeniya).format('YYYY-DD-MM') }}</dd>

      <dt class="col-md-3">{{ $t('personal.phone') }}</dt>
      <dd class="col-md-9">{{ userForm.KontaktnayaInformatsyaTelefonyMobilniy }}</dd>

      <dt class="col-md-3">{{ $t('personal.busyness') }}</dt>
      <dd class="col-md-9">{{ userForm.LichiyeDannyeObshayaInformatcyaKolonkiLevayaTipZanyatosti }}</dd>

      <dt class="col-md-3">{{ $t('personal.position') }}</dt>
      <dd class="col-md-9">{{ userForm.RabotaOsnovnoeMestoDolzhnost }}</dd>

      <dt class="col-md-3">{{ $t('personal.earnings') }}</dt>
      <dd class="col-md-9">{{ userForm.DokhodyRaskhodyDokhodyEzhemesyachiyeOsnovMestoRaboty }} тг</dd>

      <dt class="col-md-3">{{ $t('personal.family') }}</dt>
      <dd class="col-md-9">{{ userForm.LichiyeDannyeObshayaInformatcyaKolonkiLevayaSemeinoePolozhenie }}</dd>

      <dt class="col-md-3">{{ $t('personal.residence_address') }}</dt>
      <dd class="col-md-9">
        {{ userForm.KontaktnayaInformatsyaAdresPropiskiGorod }},
        {{ userForm.KontaktnayaInformatsyaAdresPropiskiUlitsa }},
        {{ userForm.KontaktnayaInformatsyaAdresPropiskiDom }}
      </dd>

      <dt class="col-md-3">{{ $t('personal.iin') }}</dt>
      <dd class="col-md-9">{{ userForm.LichiyeDannyeIIN }}</dd>

      <dt class="col-md-3">{{ $t('personal.number_id') }}</dt>
      <dd class="col-md-9">{{ userForm.LichiyeDannyeDocumentNomer }}</dd>

      <dt class="col-md-3">{{ $t('personal.place_of_issue') }}</dt>
      <dd class="col-md-9">{{ userForm.LichiyeDannyeDocumentVidan }}</dd>

      <dt class="col-md-3">{{ $t('personal.date_of_issue') }}</dt>
      <dd class="col-md-9">{{ moment(userForm.LichiyeDannyeDocumentSrokS).format('YYYY-DD-MM') }}</dd>

      <dt class="col-md-3">{{ $t('personal.validity') }}</dt>
      <dd class="col-md-9">{{ moment(userForm.LichiyeDannyeDocumentSrokPo).format('YYYY-DD-MM') }}</dd>

      <dt class="col-md-3">
        <a class="default-btn"
           href="#"
           @click.stop="personalEditModal = true">
          {{ $t('buttons.edit') }}
        </a>
      </dt>
      <dd class="col-md-9"></dd>
    </dl>

    <EditPersonalData :personalEditModal="personalEditModal" @closePersonalEditModal="personalEditModal = false"/>

  </div>
</template>

<script>
import EditPersonalData from "./ModalWindow/EditPersonalData";

export default {
  name: "PersonalData",
  components: {EditPersonalData},
  computed: {
    userForm() {
      return this.$store.getters.getFormUser
    }
  },
  data() {
    return {
      personalEditModal: false
    }
  }
}
</script>

<style scoped>

</style>