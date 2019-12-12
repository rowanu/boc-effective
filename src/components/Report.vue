<template>
  <div id="report">
    <h1>Report</h1>
    <div v-for="action in actions" :key="action" class="action">
      {{ action }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Report',
  props: ['actions'],
}
</script>

<style scoped></style>
