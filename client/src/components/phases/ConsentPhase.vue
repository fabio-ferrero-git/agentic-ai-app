<template>
  <div class="consent-form-phase">
    <h2 class="h2b">Consent form</h2>
    <div class="consent-form">
      This study is in line with the current laws D. Lgs 196/2003 and EU GDPR 679/2016 on data protection and by performing the study you consent to the processing and communication of personal data, within the limits, for the purposes and for the duration specified by the current laws (D. Lgs 196/2003 and EU GDPR 679/2016). The data collection complies with the obligations laid down by current legislation in terms of the collection, processing, and storage of sensitive data.<br>
      <br>
      <b>Potential risks:</b>
      <br>
      There are no known or anticipated risks to you by participating in this research.<br>
      <br>
      <b>Confidentiality:</b>
      <br>
      No personally identifiable information will be collected, and although the data from this research project will be published and presented at conferences, the data will be reported in aggregate format. Thus, it will not be possible to identify individuals.<br>
      <br>
      <b>Recruitment:</b>
      <br>
      You have been recruited through Prolific.com.<br>
      <br>
      <b>Storage of Data:</b>
      <br>
      During the study, the collected data will be electronically saved on Data Processor/s Aruba s.p.a, via San Clemente 52, 24036 Ponte San Pietro (BG), ITALY. Moreover, this data will be subsequently stored on the cloud storage service offered by the University of Torino.<br>
      The data will be stored for a period that is no longer than what is needed for the present research. Then, it will be destroyed.<br>
      <br>
      <b>Right to Withdraw:</b>
      <br>
      The participation in this study is voluntary. You can decide not to participate at any time. You can do that by closing your browser and contacting the principal investigator: please include the assigned ID to withdraw. On the top-right of the screen, you can find your ID and you should write it down, in case you decide to withdraw at a later point. After receiving via email your withdrawal request, we will destroy the data that we collected and are associated with your ID, the email message we received, and the email account of the sender.
      <br>
      Your right to withdraw data from the study will apply before the data analysis phase of this experiment, which will happen after the end of the study on March 20th, 2025. After this date, it is possible that some form of research dissemination will have already occurred, and it might not be possible to withdraw the collected data.
      <br><br>
      <b>Follow up:</b>
      <br>
      To obtain results from the study, please contact the principal investigator.<br>
      <br>
      <b>Questions or Concerns:</b>
      <br>
      Contact the principal investigator Liliana Ardissono (liliana.ardissono[at]unito.it).<br>
      <br>
      By completing and submitting this form, your free and informed consent is implied and indicates that you understand the above conditions of participation in this study and the experimental procedures.
      <br><br><hr><br>

      <label class="checkbox-container" style="margin-top: 20px">
        <input type="checkbox" v-model="consentGiven1" required>
        <span class="checkmark"></span>
        I declare to be at least 18 years old.
      </label>
      <label class="checkbox-container" style="margin-top: 20px">
        <input type="checkbox" v-model="consentGiven2" required>
        <span class="checkmark"></span>
        I agree to participate in the study and to the processing of the data collected during the test.
      </label>
      <button class="btn-primary btn-margin-t" :disabled="!consentGiven1 || !consentGiven2" @click="$emit('next-phase')">Continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsentPhase',
  emits: ['next-phase'],
  data() {
    return {
      consentGiven1: false,
      consentGiven2: false
    }
  }
}
</script>
<style scoped>
.consent-form-phase {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 10px;
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

.consent-form b {
  font-weight: bold;
}

</style>