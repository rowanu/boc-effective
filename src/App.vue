<template>
  <div id="app">
    <PolicyInput @error="setError" />
    <Error v-if="error" :message="error" />
    <Report v-if="report.actions" />
    <Instructions v-else />
  </div>
</template>

<script>
import Error from './components/Error.vue'
import Instructions from './components/Instructions.vue'
import PolicyInput from './components/PolicyInput.vue'
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
    Error,
    Instructions,
    PolicyInput,
    Report,
  },
  methods: {
    setError(error) {
      this.error = error
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
