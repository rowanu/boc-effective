<template>
  <div id="error">
    <h1>Error</h1>
    <p class="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: ['message'],
}
</script>

<style scoped></style>
