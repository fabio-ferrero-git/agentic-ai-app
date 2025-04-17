<template>
  <div class="phase intro-phase">
    <h2 class="h2b">Beyond Passive AI: Evaluating LLM-powered Agents in Professional Environments</h2>
    You are invited to participate in this experiment.<br><br>
    <b>Expected duration:</b> about 10 minutes. Please, notice that you cannot suspend the experiment and resume it later on.<br>
    Moreover, <b>you cannot leave or reload the page once the experiment starts</b>, until you submit your work to Prolific. If you leave the page you will receive multiple warnings. <b>Failure to comply with this even after the warnings will result in automatic disqualification.</b> Similarly, prolonged inactivity during the experiment is not allowed and will result in automatic disqualification after multiple warnings.<br>
    Thus, you should start the experiment when you have the time to complete it.<br><br>
    <b>Principal Investigator/Supervisor</b>: Liliana Ardissono, Full Professor, Department of Computer Science, University of Torino, email: liliana.ardissono[at]unito.it.<br><br>
    <b>Purpose and Objective of the Research</b>: This project aims to analyze the impact on users of the support offered by LLM-powered agents in professional environments. This study may contribute to the areas of Artificial Intelligence, Large Language Models, Information Visualization and Recommender Systems. Please notice that the objective of the experiment is to identify possible faults in the proposed service, and not to test your own ability, or intelligence. <br><br>
    <b>Procedures</b>: An online experimental platform is implemented to conduct this study.<br><br>
    <ul>
      <li>Firstly, we will ask you to consent to participate in the study and we will ask you some questions about yourself. </li>
      <li>Then, we will show you a preview of the system with instructions about how to use it.</li>
      <li>Then, we will show a system that aims to support the management of email, calendar, and list of to-dos (similar to Google Service, like Gmail, Google Calendar, etc.). We ask you to interact with the system to complete as many tasks as you can. A list of suggested actions will be shown to you.</li>
      <li>At last, we will ask you some final questions about your opinions concerning the system you interacted with.</li>
    </ul>
    <br><hr><br>

    <label class="checkbox-container" style="margin-top: 20px">
      <input type="checkbox" v-model="checkBoxValidation" required>
      <span class="checkmark"></span>
      I understand that leaving the page for too long or prolonged inactivity will result in the automatic disqualification of my submission.
    </label>

    <button class="btn-primary btn-margin-t" :disabled="!checkBoxValidation" @click="$emit('next-phase')">Continue</button>
  </div>
</template>

<script>
export default {
  name: 'IntroductionPhase',
  emits: ['next-phase'],
  data() {
    return {
      checkBoxValidation: false,
    }
  }
}
</script>

<style scoped>
.intro-phase b {
  font-weight: bold;
}

.checkbox-container {
  display: block;
  position: relative;
  padding-left: 50px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
