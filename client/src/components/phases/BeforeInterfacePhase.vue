<template>
  <div class="phase content-phase">
    <h2 class="h2b">You are about to begin the user study</h2>
    <h2>Once you press the <span>"Continue" button</span> the user study will begin.</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="age">Please select a <span>Username</span> which will be used in the generated content.<br> You can choose your own name or a name you have made up.</label>
        <input id="age" v-model="username" type="text">
      </div>

      <div v-if="notValid" class="errorMessage">
        <ul>
          <li>The <span>Username</span> is required.</li>
          <li>The <span>Username</span> must be at least 5 character long.</li>
        </ul>
      </div>
      <button class="btn-primary button-start" type="submit">Continue</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BeforeInterfacePhase',
  emits: ['log-activity', 'next-phase'],

  data() {
    return {
      username: '',
      notValid: false,
    }
  },

  methods: {
    checkUserName() {
      return typeof this.username === 'string' && this.username.trim().length >= 5;
    },

    submitForm() {
      if (this.checkUserName()) {
        this.$emit('log-activity', 'username', {username: this.username});
        sessionStorage.setItem('username', this.username);
        this.$emit('next-phase');
      }
      else {
        this.notValid = true
      }
    }
  }
}
</script>


<style scoped>
.content-phase span {
  font-weight: bold;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.errorMessage {
  margin-top: 1px;
  color: #aa0000;
  background-color: #ffdede;
  border-radius: 8px;
  padding: 10px;
}

.button-start {
  margin-top: 20px;
}
</style>