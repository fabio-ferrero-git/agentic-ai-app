<script setup>
import {ref, onMounted, computed, defineEmits} from 'vue';

const questions = ref([]);
const emit = defineEmits(['answered-questions']);

const props = defineProps({
  description: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: ["Strongly Disagree", "Disagree", "Neither Agree nor Disagree", "Agree", "Strongly Agree"]
  },
  tlx: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  questions.value = [...document.querySelector('.questionnaire-content').children].map((question, index) => ({
    id: index + 1,
    text: question.innerHTML.trim(),
    answer: null
  }));

  if (!props.tlx) {
    // Only add attention check for non-TLX questionnaires
    const attentionCheckIndex = Math.floor(Math.random() * (questions.value.length + 1));
    const randomOption = props.options[Math.floor(Math.random() * props.options.length)];
    const attentionCheckQuestion = {
      id: questions.value.length + 1,
      text: `Please select "${randomOption}".`,
      answer: null,
      isAttentionCheck: true,
      correctAnswer: randomOption
    };
    questions.value.splice(attentionCheckIndex, 0, attentionCheckQuestion);
  }
});

const attentionCheckPassed = computed(() => {
  const attentionCheckQuestion = questions.value.find(q => q.isAttentionCheck);
  return attentionCheckQuestion && attentionCheckQuestion.answer === attentionCheckQuestion.correctAnswer;
});

function updateAnswer(questionId, value) {
  const question = questions.value.find(q => q.id === questionId);
  if (question) {
    question.answer = value;
  }
}

const allQuestionsAnswered = computed(() => {
  return questions.value.every(question => question.answer !== null);
});

function answeredQuestions() {
  emit('answered-questions', [questions.value, attentionCheckPassed.value]);
}
</script>

<template>
  <div class="questionnaire">
    <h3 style="margin-bottom: 20px" v-html="description"></h3>
    <div class="questionnaire-content" style="display: none;">
      <slot></slot>
    </div>

    <!-- TLX Layout -->
    <div v-if="tlx" class="tlx-container">
      <div v-for="question in questions" :key="question.id" class="tlx-question">
        <div class="tlx-text">
          <div class="question-text">{{ question.text }}</div>
        </div>
        <div class="tlx-scale">
          <div class="scale-labels">
            <span>Very Low</span>
            <span>Very High</span>
          </div>
          <div class="scale-container" @click="(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const boxWidth = rect.width / 21;
              const boxIndex = Math.floor(x / boxWidth);
              const percentage = (boxIndex / 20) * 100;
              updateAnswer(question.id, { percentage, boxIndex });
            }">
            <div class="scale-boxes">
              <div v-for="n in 21" :key="n"
                   class="box"
                   :class="{ selected: question.answer?.boxIndex === (n-1) }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Regular Layout -->
    <table v-else>
      <thead>
      <tr>
        <th>Question</th>
        <th v-for="option in props.options" :key="option">{{ option }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="question in questions" :key="question.id">
        <td class="question-td" v-html="question.text"></td>

        <td v-for="option in props.options" :key="option" @click="updateAnswer(question.id, option)">
          <input
              type="radio"
              :name="`question-${question.id}`"
              :value="option"
              :checked="question.answer === option"
          />
        </td>
      </tr>
      </tbody>
    </table>
    <button
        class="btn-primary"
        :disabled="!allQuestionsAnswered"
        @click="answeredQuestions"
        :title="!allQuestionsAnswered ? 'Please answer all questions before continuing': ''"
    >
      Continue
    </button>
  </div>
</template>

<style scoped>
/* Existing styles */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.question-td {
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

td {
  cursor: pointer;
}

/* TLX specific styles */
.tlx-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.tlx-question {
  margin-bottom: 2rem;
}

.tlx-text {
  margin-bottom: 0.5rem;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.9em;
  color: #666;
}

.scale-container {
  position: relative;
  height: 30px;
  cursor: pointer;
}

.scale-boxes {
  display: flex;
  height: 100%;
  gap: 1px;
}

.box {
  flex: 1;
  border: 1px solid #ccc;
  background: #f9f9f9;
  transition: background-color 0.2s ease;
}

.box.selected {
  background-color: #007bff;
  border-color: #0056b3;
}

button {
  margin-top: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.b {
  font-weight: bold !important;
}
</style>