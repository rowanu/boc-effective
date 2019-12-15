<template>
  <div id="app">
    <PolicyInput />
    <Error v-if="error" />
    <Report v-if="report.actions" />
    <Instructions v-else />
  </div>
</template>

<script>
import PolicyInput from './components/PolicyInput.vue'
import Instructions from './components/Instructions.vue'
import Report from './components/Report.vue'

export default {
  name: 'app',
  data() {
    return {
      error: '',
      report: {},
    }
  },
  components: {
    PolicyInput,
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
