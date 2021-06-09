<template>


  <div class="container">
    <Biometry
        :title="'Тест'"
        :widthCss="320"
        :heightCss="240"
        :corner="{height: '200px', width: '280px', color: '#fff'}"
    />
    <Biometry
        :title="'Тест2'"
        :widthCss="200"
        :heightCss="240"
        :corner="{height: '220px', width: '180px', color: '#fff'}"
    />
  </div>

</template>
<script>
import Biometry from "../components/Biometry";

export default {
  name: 'About',
  components: {Biometry},
  data() {
    return {}
  }
}
</script>