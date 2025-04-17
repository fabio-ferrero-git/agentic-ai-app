<template>
  <div class="uuid-display">
    UUID: {{ uuid }}
  </div>
</template>

<script>
export default {
  props: ['uuid']
}
</script>

<style scoped>
.uuid-display {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #f8f9fa;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  font-size: 12px;
  font-family: monospace;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
