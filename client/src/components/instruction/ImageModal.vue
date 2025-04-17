<template>
  <div class="modal-overlay" v-if="imgSrc" @click="close">
    <div class="modal-content" @click.stop>
      <div class="header">
        <button class="btn-primary-instr" @click="close">Close</button>
      </div>
      <img class="instr-img" :src="imgSrc" alt="sys">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageModal',
  emits: ['close'],
  props: {
    img: {
      type: String,
      required: true
    }
  },

  methods : {
    close () {
      this.$emit('close')
    }
  },

  computed : {
    imgSrc() {
      return this.img ? new URL(`${this.img}`, import.meta.url)
          : null
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 95%;
  height: 95vh;
  max-width: 95%;
  max-height: 95vh;
  border-radius: 8px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.instr-img {
  width: 100%;
  height: 95%;
  object-fit: contain;
}

.header {
  display: flex;
  justify-content: end;
}
</style>
