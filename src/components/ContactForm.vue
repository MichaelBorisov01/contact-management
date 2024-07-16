<template>
    <form @submit.prevent="saveContact">
      <label>
        Name:
        <input type="text" v-model="editedContact.name" />
      </label>
      <label>
        Phone:
        <input type="tel" v-model="editedContact.phone" />
      </label>
      <label>
        Email:
        <input type="email" v-model="editedContact.email" />
      </label>
      <button type="submit">Save</button>
    </form>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent  } from 'vue';
  
  export default defineComponent( {
    props: {
      contact: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const editedContact = ref({ ...props.contact });  
  
      const saveContact = () => {
        emit('save', editedContact.value);
      };
  
      return {
        editedContact,
        saveContact,
      };
    },
  });
  </script>
