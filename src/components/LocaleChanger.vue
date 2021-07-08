<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale" @change="setLang">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return {
      langs: ['ru', 'kz']
    }
  },
  methods: {
    setLang(val){
      localStorage.setItem('selectedLang', val.target.value)
      this.$store.dispatch('localChanger', val.target.value)
      location.reload();
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
.locale-changer select {
  border: none!important;
  border-radius: 3px;
  width: 50px;
  height: 30px;
  padding-left: 8px;
}
</style>