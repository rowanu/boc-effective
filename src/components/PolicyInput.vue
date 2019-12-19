<template>
  <div id="policy-input">
    <h1>Policy</h1>
    <div v-if="errors.length > 0" class="error">
      <div v-for="(error, index) in errors" :key="index">
        {{ error }}
      </div>
    </div>
    <JSONInput @error="setJSONError" @input="setInput" />
  </div>
</template>

<script>
import effective from '@/effective.js'
import JSONInput from './JSONInput.vue'

export default {
  data() {
    return {
      errors: [],
      input: null,
    }
  },
  components: {
    JSONInput,
  },
  methods: {
    setJSONError(error) {
      this.errors = [error]
    },
    setInput(input) {
      const policy = effective(input)
      if (!policy.isValid) {
        this.errors = policy.errors
      } else {
        this.errors = []
      }
    },
  },
}
</script>

<style></style>
