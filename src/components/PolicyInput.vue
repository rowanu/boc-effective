<template>
  <div id="policy-input">
    <h1>Policy</h1>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <JSONInput @error="setError" @input="setInput" />
  </div>
</template>

<script>
import JSONInput from './JSONInput.vue'

export default {
  data() {
    return {
      error: '',
      input: null,
    }
  },
  components: {
    JSONInput,
  },
  methods: {
    setError(error) {
      this.error = error
    },
    setInput(input) {
      this.input = input
      this.error = ''
    },
  },
}
</script>

<style></style>
