<template>
  <div class="empty-state">
    <span class="material-icons-outlined empty-icon">{{icon}}</span>
    <h2>{{textPrimary}}</h2>
    <p>{{ textSecondary }}</p>
  </div>
</template>

<script>
export default {
  props: {
      textPrimary: {
        type: String,
        required: true
      },
      textSecondary: {
        type: String,
        required: true
      },
      icon: {
          type: String,
          required: true
      }
  },
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
  text-align: center;
  color: #5f6368;
}

.empty-icon {
  font-size: 64px;
  color: #dadce0;
  margin-bottom: 16px;
}

.empty-state h2 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: #202124;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
  color: #5f6368;
}
</style>