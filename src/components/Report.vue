<template>
  <div id="report">
    <h1>Report</h1>
    <div v-for="resource in resources" :key="resource" class="resource">
      {{ resource }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Report',
  props: ['resources'],
}
</script>

<style scoped></style>
