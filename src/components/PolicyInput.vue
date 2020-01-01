<template>
  <div id="policy-input" class="container">
    <h2 class="title is-2">Policy</h2>
    <p class="content">
      Paste or input your
      <a
        href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html"
        target="_blank"
        >IAM Policy JSON</a
      >
      below.
    </p>
    <div v-if="errors.length > 0" class="notification is-danger">
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
