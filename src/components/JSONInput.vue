<template>
  <div id="json-input">
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
  name: 'JSONInput',
  data() {
    return {
      isValid: true,
      input: '',
      result: {},
    }
  },
  watch: {
    input: function() {
      try {
        if (this.input !== '') {
          const result = JSON.parse(this.input)
          this.$emit('input', result)
        }
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

<style scoped>
.error {
  border: 0.2rem dotted red;
}
</style>
