<template>
  <div class="document">
    <textarea v-model="input"></textarea>
  </div>
</template>

<script>
export default {
  name: 'Document',
  props: ['input'],
  data() {
    return {}
  },
  created() {
    this.$emit('isEmpty', true)
  },
}
</script>

<style scoped></style>
