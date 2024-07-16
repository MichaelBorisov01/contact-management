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

 