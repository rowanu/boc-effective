<template>
  <div id="app">
    <section class="section">
      <div class="columns">
        <PolicyInput @report="setReport" class="column is-two-fifths" />
        <Report v-if="report" :report="report" class="column" />
        <Instructions v-else class="column" />
      </div>
    </section>
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
}
</style>
