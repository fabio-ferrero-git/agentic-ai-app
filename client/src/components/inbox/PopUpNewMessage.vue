<template>
  <div class="popup-container">
    <h3>You have {{unreadSize}} new {{unreadSize > 1 ? 'messages' : 'message'}} <span>from {{sender}}</span></h3>
    <div class="button-container">
      <button class="show-ignore-button" @click="$emit('update')">Show</button>
      <button class="show-ignore-button" @click="$emit('ignore')">Ignore</button>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
export default {
  props: {
    unread : {
      type: Array,
      required: true
    },
    sender : {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const unreadSize = computed(() => {
      return props.unread.length;
    })

    return {
      unreadSize,
    }
  }
}
</script>

<style scoped>
.popup-container {
  margin-top: 10px;
  background-color: #fff1db;
  border-radius: 8px;
  width: fit-content;
  padding: 10px;
}

.popup-container h3 {
  color: #bc0000;
  font-weight: bold;
}

.button-container {
  margin-top: 8px;
}

.show-ignore-button {
  margin-right: 10px;
  align-items: center;
  background: #ffffff;
  color: #393939;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: ease-in-out .1s;
}

.show-ignore-button:hover {
  background-color: #eaeaea;
  font-weight: bold;
}
</style>