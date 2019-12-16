<template>
  <div id="policy-input">
    <h1>Policy</h1>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <JSONInput @error="setError" />
  </div>
</template>

<script>
import JSONInput from './JSONInput.vue'

export default {
  data() {
    return {
      error: '',
    }
  },
  components: {
    JSONInput,
  },
  // TODO: Reset error when valid JSON received
  methods: {
    setError(error) {
      this.error = error
    },
  },
}
</script>

<style></style>
