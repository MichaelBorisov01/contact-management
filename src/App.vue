<template>
  <div>
   <!-- <SearchBar @search="searchContacts" /> -->
    <ContactList :contacts="filteredContacts" @edit="editContact" @delete="deleteContactApi" />
    <ContactForm v-if="editedContact" :contact="editedContact" @save="saveContact" />
  </div>
</template>

<script lang="ts">
import { ref, computed, Ref } from 'vue';
//import SearchBar from '@/components/SearchBar.vue';
import ContactList from '@/components/ContactList.vue';
import ContactForm from '@/components/ContactForm.vue';
import { getContacts, addContact, updateContact, deleteContact } from '@/services/ContactService';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export default {
  components: {  ContactList, ContactForm },
  setup() {
    const contacts: Ref<Contact[]> = ref([]);  
    const editedContact: Ref<Contact | null> = ref(null);
    const searchQuery = ref('');

    getContacts().then((response: Contact[]) => {
      contacts.value = response;
    });

    const filteredContacts = computed(() => {
      return contacts.value.filter(contact => {
        return (
          contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          contact.phone.includes(searchQuery.value) ||
          contact.email.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
    });

    const editContact = (contact: Contact) => {
      editedContact.value = contact;
    };

    const deleteContactApi = (contact: Contact) => {
      deleteContact(contact.id).then(() => {
        contacts.value = contacts.value.filter(c => c.id !== contact.id);
      });
    };

    const saveContact = (contact: Contact) => {
      if (contact.id) {
        updateContact(contact).then(() => {
          const index = contacts.value.findIndex(c => c.id === contact.id);
          if (index !== -1) {
            contacts.value[index] = contact;
          }
        });
      } else {
        addContact(contact).then(newContact => {
          contacts.value.push(newContact);
        });
      }
      editedContact.value = null;
    };

    return {
      contacts,
      editedContact,
      filteredContacts,
      //searchContacts,
      editContact,
      deleteContactApi,
      saveContact,
    };
  },
};
</script>

<style>
  body {
    font-family: Arial, sans-serif;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }

  li:last-child {
    border-bottom: none;
  }

  button {
    margin-left: 10px;
  }
</style>