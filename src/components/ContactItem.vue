<template>
  <div>
    <p>{{ contact.name }}</p>
    <p>{{ contact.phone }}</p>
    <p>{{ contact.email }}</p>
    <button @click="editContact">Edit</button>
    <button @click="deleteContact">Delete</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editContact = () => {
      emit('edit', props.contact);
    };

    const deleteContact = () => {
      emit('delete', props.contact);
    };

    return {
      editContact,
      deleteContact,
    };
  },
});
</script>