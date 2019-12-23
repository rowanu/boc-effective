<template>
  <div id="app">
    <PolicyInput @report="setReport" />
    <Report v-if="report" :report="report" />
    <Instructions v-else />
  </div>
</template>

<script>
import Instructions from './components/Instructions.vue'
import PolicyInput from './components/PolicyInput.vue'
import Report from './components/Report.vue'

export default {
  name: 'app',
  data() {
    return {
      report: null,
    }
  },
  components: {
    Instructions,
    PolicyInput,
    Report,
  },
  methods: {
    setReport(report) {
      this.report = report
    },
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
