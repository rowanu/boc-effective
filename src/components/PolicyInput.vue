<template>
  <div id="policy-input">
    <h1>Policy</h1>
    <div v-if="errors.length > 0" class="errors">
      <div v-for="(error, index) in errors" :key="index">
        {{ error }}
      </div>
    </div>
    <JSONInput @error="setJSONError" @input="setInput" />
  </div>
</template>

<script>
import JSONInput from './JSONInput.vue'

export default {
  data() {
    return {
      errors: [],
      input: null,
      policy: null,
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
      this.input = input
    },
  },
  // TODO: Use computed over watch?
  watch: {
    input(input) {
      this.errors = []
      this.policy = this.$effective(input)
    },
    policy(policy) {
      if (!policy.isValid) {
        this.errors = policy.errors
        // TODO: Reset report
      } else {
        this.$emit('report', policy.report)
      }
    },
  },
}
</script>

<style></style>
