import { ref } from 'vue';

const localStoragePlugin = {
  install(app: any) {
    const contacts = ref(JSON.parse(localStorage.getItem('contacts') || '[]'));

    app.provide('contacts', contacts);

    app.config.globalProperties.$saveContacts = () => {
      localStorage.setItem('contacts', JSON.stringify(contacts.value));
    };
  },
};

export default localStoragePlugin;