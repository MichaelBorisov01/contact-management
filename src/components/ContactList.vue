<template>
  <ul>
    <li v-for="contact in contacts" :key="contact.id">
      <ContactItem :contact="contact" @edit="editContact" @delete="deleteContact" />
    </li>
    <li>
      <button @click="addContact">Add new contact</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContactItem from './ContactItem.vue';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export default defineComponent({
  props: {
    contacts: {
      type: Array as () => Contact[],
      required: true,
    },
  },
  components: { ContactItem },
  setup(props, { emit }) {
    const editContact = (contact: Contact) => {
      emit('edit', contact);
    };

    const deleteContact = (contact: Contact) => {
      emit('delete', contact);
    };

    const addContact = () => {
      emit('add');
    };

    return {
      editContact,
      deleteContact,
      addContact,
    };
  },
});
</script>