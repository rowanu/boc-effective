<template>
  <div id="document">
    <h1>Document</h1>
    <textarea :value="input" @input="update"></textarea>
  </div>
</template>

<script>
export default {
  name: 'Document',
  data() {
    return {
      input: '',
    }
  },
  computed: {
    isValid: function() {
      try {
        const result = JSON.parse(this.input)
        this.$emit('input', result)
      } catch (e) {
        if (e instanceof SyntaxError) {
          // e.name
          this.$emit('error', e.message)
          return false
        }
      }
      return true
    },
  },
  methods: {
    // TODO: Debounce on input https://vuejs.org/v2/examples/index.html
    update: function(e) {
      this.input = e.target.value
    },
  },
}
</script>

<style scoped></style>
