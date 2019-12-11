<template>
  <div id="app">
    <Document />
    <Error v-if="error" />
    <Instructions />
  </div>
</template>

<script>
import Document from './components/Document.vue'
import Instructions from './components/Instructions.vue'

export default {
  name: 'app',
  data() {
    return {
      error: '',
    }
  },
  components: {
    Document,
    Instructions,
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
