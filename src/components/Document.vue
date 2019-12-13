<template>
  <div id="document">
    <h1>Document</h1>
    <textarea
      :value="input"
      @input="update"
      :class="{ error: !isValid }"
    ></textarea>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'Document',
  data() {
    return {
      isValid: false,
      input: '',
      result: {},
    }
  },
  watch: {
    input: function() {
      try {
        const result = JSON.parse(this.input)
        this.$emit('input', result)
        this.isValid = true
        return
      } catch (e) {
        if (e instanceof SyntaxError) {
          this.$emit('error', e.message)
        }
      }
      this.isValid = false
    },
  },
  methods: {
    update: debounce(function(e) {
      this.input = e.target.value
    }, 300),
  },
}
</script>

<!-- https://vuejs.org/v2/guide/class-and-style.html -->
<style scoped>
.error {
  border-color: red;
}
</style>
