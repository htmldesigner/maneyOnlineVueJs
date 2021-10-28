<template>
  <div class="locale-changer">
    <ul>
      <li :class="{'active': $i18n.locale === lang.locale}" v-for="(lang, i) of langs" :key="`Lang${i}`" @click.prevent="setLang(lang.locale)">{{lang.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return {
      langs: [{name: 'қаз', locale: 'kz'}, {name: 'рус', locale: 'ru'}]
    }
  },
  methods: {
    setLang(val){
      localStorage.setItem('selectedLang', val)
      this.$store.dispatch('localChanger', val)
      if (val !== this.$i18n.locale){
        this.$i18n.locale = val
        location.reload();
      }
    }
  },
  mounted() {
    let lang = localStorage.getItem('selectedLang')
    if (lang){
      this.$i18n.locale = lang.toString()
    }
  }
}
</script>

<style scoped>
.lang ul li{
  cursor: pointer;
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.02em;
  color: #8EDEFF;
}
.lang ul li.active{
  cursor: default;

}
</style>
