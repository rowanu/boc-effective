<template>
  <div id="policy-input">
    <h1>Policy</h1>
    <JSONInput @error="emitError" />
  </div>
</template>

<script>
import JSONInput from './JSONInput.vue'

export default {
  components: {
    JSONInput,
  },
  methods: {
    emitError(e) {
      this.$emit('error', e)
    },
  },
}
</script>

<style></style>
