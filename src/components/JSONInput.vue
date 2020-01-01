<template>
  <div id="json-input">
    <textarea
      :value="input"
      @input="update"
      class="textarea"
      :class="{ 'is-danger': !isValid }"
    ></textarea>
  </div>
</template>

<script>
import autosize from 'autosize'
import { debounce } from 'lodash'

export default {
  name: 'JSONInput',
  props: ['handle-change', 'value'],
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
  mounted() {
    autosize(this.$el.querySelector('textarea'))
  },
}
</script>

<style scoped>
textarea {
  width: 100%;
  min-height: 200px;
}
</style>
