<template>
  <div class="container">
    <div class="search-bar">
      <SearchBar v-model="searchQuery" />
    </div>
    <div class="contact-list">
      <ContactList :contacts="filteredContacts" @edit="editContact" @delete="deleteContactApi" @add="addContactForm" />
    </div>
    <div class="contact-form" v-if="editedContact">
      <ContactForm :contact="editedContact" @save="saveContact" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, Ref } from 'vue';
import ContactList from '@/components/ContactList.vue';
import ContactForm from '@/components/ContactForm.vue';
import SearchBar from '@/components/SearchBar.vue';
import { getContacts, addContact, updateContact, deleteContact } from '@/services/ContactService';
 

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export default {
  components: { ContactList, ContactForm, SearchBar },
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
      contacts.value[index] = contact;
      contacts.value = [...contacts.value];
    });
  } else {
    addContact(contact).then(newContact => {
      contacts.value.push(newContact);
    });
  }
  editedContact.value = null;
};
    const addContactForm = () => {
      editedContact.value = { id: 0, name: '', phone: '', email: '' };
    };

    return {
      contacts,
      editedContact,
      filteredContacts,
      editContact,
      deleteContactApi,
      saveContact,
      addContactForm,
      searchQuery
    };
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input[type="search"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-list {
  margin-bottom: 20px;
}

.contact-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.contact-list li:last-child {
  border-bottom: none;
}

.contact-list button {
  margin-left: 10px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.contact-list button[type="button"]{
  margin-top: 20px;
}

.contact-list button:hover {
  background-color: #3e8e41;
}

.contact-form input[type="text"], .contact-form input[type="email"], .contact-form input[type="tel"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-form button[type="submit"] {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.contact-form button[type="submit"]:hover {
  background-color: #3e8e41;
}
</style>