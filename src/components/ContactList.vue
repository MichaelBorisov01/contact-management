<template>
  <ul>
    <TransitionGroup name="list">
    <li v-for="contact in contacts" :key="contact.id">
      <ContactItem :contact="contact" @edit="editContact" @delete="deleteContact" />
    </li>
  </TransitionGroup>
    <li>
      <button type="button" @click="addContact">Add new contact</button>
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

<style scoped> 
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>