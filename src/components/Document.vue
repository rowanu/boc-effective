<template>
  <div id="document">
    <h1>Document</h1>
    <textarea v-model="input"></textarea>
  </div>
</template>

<script>
export default {
  name: 'Document',
  props: ['input'],
  data() {
    return {}
  },
  created() {
    this.$emit('isEmpty', true)
  },
  // TODO: Debounce on input https://vuejs.org/v2/examples/index.html
}
</script>

<style scoped></style>
