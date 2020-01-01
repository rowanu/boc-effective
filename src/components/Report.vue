<template>
  <div id="report" class="container">
    <h2 class="title is-2">Report</h2>
    <div
      v-for="resource in report.resources"
      :key="resource.name"
      class="resource"
    >
      <hr />
      <p class="subtitle is-4">
        <span v-if="resource.actions && resource.actions.length">
          Policy allows {{ resource.actions.length }} actions on
        </span>
        {{ resource.name }}
      </p>
      <div class="content">
        <div v-for="action in resource.actions" :key="action" class="action">
          {{ action }}
        </div>
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
