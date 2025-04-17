<template>
  <div class="instr">
    Imagine that you have to manage your emails, calendar events, and todos.<br>
    We ask you to manage as many emails as you can (and the related calendar events and todos) in <b>five minutes</b> using the functionality offered by the system.<br>
    Specifically:<br>
    <ul>
      <li>When you receive a message notifying you about a meeting invitation, you must answer the email and put the event in the calendar. However, if the message also asks you to prepare some material (e.g., a presentation), you must also add a task (To65-do) in the To-do manager application.</li>
      <li>Similarly, if an incoming message notifies you that a meeting has been modified or canceled, you must update the calendar and To-dos accordingly.</li>
    </ul>
    Please, notice that the system will help you in these actions by automatically performing them.
    <br><br>
    In the figures below you can see a preview of the user interface and the related functionalities.
    <br><br>
    Below you may find an example of an email.<br>
    <ul>
      <li>A draft email will be generated automatically. If necessary, you may edit it as you see fit.<br>
      <b>When you click "Send", the calendar and TODO sections will automatically be updated</b> to reflect the content of the email you just sent.
      </li>
    </ul>

    <div class="img-container">
      <img class="instr-img" src="../../assets/system-instruction/mail_sistema2_p.PNG" alt="sys0-instr1"
           @click="selectedImg=$event.target.src">
    </div>

    <br><hr><br>

    Below you may find an example of the calendar section.<br>
    <ul>
      <li>You can add an event by clicking on "+Create".</li>
      <li>You can edit or delete an event by clicking on the event itself in the calendar.</li>
      <li>Each event may be marked as "<b>Provisional</b>", meaning that it is awaiting confirmation by the other participant(s). In that case, the event will be displayed on a white background with blue borders.</li>
    </ul>

    <div class="img-container">
      <div class="double-img">
        <img class="instr-img-double" src="../../assets/system-instruction/calendar_all_sistema012_p.PNG" alt="sys0-instr1"
             @click="selectedImg=$event.target.src">
        <img class="instr-img-double" src="../../assets/system-instruction/calendar_sistema012_p.PNG" alt="sys0-instr1"
             @click="selectedImg=$event.target.src">
      </div>
    </div>

    <br><hr><br>

    Below you may find an example of the TODO section.
    <ul>
      <li>You can add an event by clicking on "+Add task"</li>
      <li>You can edit or delete an event by clicking on the "Edit" button of the specific task.</li>
    </ul>

    <div class="img-container">
      <img class="instr-img" src="../../assets/system-instruction/todos_sistema012_p.PNG" alt="sys0-instr1"
           @click="selectedImg=$event.target.src">
    </div>

    <br><hr><br>

    <button class="btn-primary btn-margin-t" @click="$emit('next-phase')">Start</button>

    <image-modal :img="selectedImg" @close="selectedImg=null"/>
  </div>
</template>

<script>

import ImageModal from "@/components/instruction/ImageModal.vue";

export default {
  name: 'InstructionSys2',
  components: {ImageModal},
  emits: ['next-phase'],
  data() {
    return {
      selectedImg : null,
    }
  }

}
</script>

<style scoped>
.img-container {
  background-color: #eef3ff;
  margin-top: 15px;
  padding-top: 10px;
  border-radius: 8px;
  border: 1px solid #c8c8c8;
  text-align: center;
}
.instr-img {
  cursor: pointer;
  width: 50%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #c8c8c8;
  transition: ease 0.1s;
  box-shadow: 1px 5px 5px #838383;
}
.instr-img-double {
  cursor: pointer;
  width: 49%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #c8c8c8;
  transition: ease 0.1s;
  margin-bottom: 10px;
  box-shadow: 1px 5px 5px #838383;
}

.instr-img:hover {
  transform: scale(1.01);
}

.instr-img-double:hover {
  transform: scale(1.01);
}

.double-img {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.instr b {
  font-weight: bold;
}
</style>