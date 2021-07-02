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
