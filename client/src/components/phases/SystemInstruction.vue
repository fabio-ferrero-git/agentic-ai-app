<template>
  <div class="instruction-phase">
    <h2 class="h2b">System Instructions</h2>

    <instruction-sys0 v-if="systemType === 'sys0'" @next-phase="$emit('next-phase')"/>
    <instruction-sys1 v-if="systemType === 'sys1'" @next-phase="$emit('next-phase')"/>
    <instruction-sys2 v-if="systemType === 'sys2'" @next-phase="$emit('next-phase')"/>

  </div>
</template>

<script>
import InstructionSys0 from "@/components/instruction/InstructionSys0.vue";
import InstructionSys1 from "@/components/instruction/InstructionSys1.vue";
import InstructionSys2 from "@/components/instruction/InstructionSys2.vue";

export default {
  name: 'SystemInstruction',
  components: {InstructionSys2, InstructionSys1, InstructionSys0},
  emits: ['next-phase'],
  data() {
    return {
      systemType : sessionStorage.getItem('sys'),
    }
  }
}
</script>

<style scoped>
.instruction-phase {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-bottom: 10px;
}
</style>