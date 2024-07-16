<template>
  <div>
    <input type="search" :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)" placeholder="Search...">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped>
input[type="search"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>