<template>
  <div id="app">
    <Document />
    <Error v-if="error" />
    <Instructions v-if="!report" />
    <Report v-if="report && !error" />
  </div>
</template>

<script>
import Document from './components/Document.vue'
import Instructions from './components/Instructions.vue'
import Report from './components/Report.vue'

export default {
  name: 'app',
  data() {
    return {
      error: '',
      report: null,
    }
  },
  components: {
    Document,
    Instructions,
    Report,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
