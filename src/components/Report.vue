<template>
  <div id="report">
    <h1>Report</h1>
    <div
      v-for="resource in report.resources"
      :key="resource.name"
      class="resource"
    >
      <span v-if="resource.actions && resource.actions.length">
        Policy allows {{ resource.actions.length }} actions on
      </span>
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
