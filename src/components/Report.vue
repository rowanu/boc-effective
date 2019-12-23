<template>
  <div id="report">
    <h1>Report</h1>
    <div
      v-for="resource in report.resources"
      :key="resource.name"
      class="resource"
    >
      {{ resource.name }}
      <div v-for="action in resource.actions" :key="action" class="action">
        {{ action }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Report',
  props: ['report'],
}
</script>

<style scoped></style>
