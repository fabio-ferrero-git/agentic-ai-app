<template>
  <div class="instr">
    Imagine that you have to manage your emails, calendar events, and todos.<br>
    We ask you to manage as many emails as you can (and the related calendar events and todos) in <b>five minutes</b> using the functionality offered by the system.<br>
    Specifically:<br>
    <ul>
      <li>When you receive a message notifying you about a meeting invitation, you must answer the email and put the event in the calendar. However, if the message also asks you to prepare some material (e.g., a presentation), you must also add a task (To-do) in the To-do manager application.</li>
      <li>Similarly, if an incoming message notifies you that a meeting has been modified or canceled, you must update the calendar and To-dos accordingly.</li>
    </ul>
    Please, notice that the system will help you in these actions by providing you with buttons to perform actions more quickly.
    <br><br>
    In the figures below you can see a preview of the user interface and the related functionalities.
    <br><br>
    Below you may find an example of an email.<br>
    <ul>
      <li>Click the buttons below the email to perform suggested actions. Each button <b>will automatically execute specific tasks</b> such as creating/editing events, managing TODOs, or drafting replies.</li>
      <li>Alternatively, you can manually answer the email by clicking on "Reply"</li>
    </ul>

    <div class="img-container">
      <img class="instr-img" src="../../assets/system-instruction/mail_sistema1_p.PNG" alt="sys0-instr1"
           @click="selectedImg=$event.target.src">
    </div>

    <br><hr><br>

    By clicking on the button "Create a draft response" the system <b>will automatically generate a draft</b> to reply to email. You can leave it as it is or update it, but you have to click on "Send" to send it.<br>

    <div class="img-container">
      <img class="instr-img" src="../../assets/system-instruction/draft_sistema1_p.PNG" alt="sys0-instr1"
           @click="selectedImg=$event.target.src">
    </div>

    <br><hr><br>

    Below you may find an example of the calendar section.
    <ul>
      <li>You can add an event by clicking on "+Create"</li>
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
  name: 'InstructionSys1',
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