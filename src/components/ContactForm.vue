<template>
  <form @submit.prevent="saveContact">
    <p>
    <label>
      Name:
      <input type="text" v-model="editedContact.name" />
      <span v-if="editedContact.name" ></span>
    </label>
  </p>
  <p>
    <label>
      Phone:
      <input type="tel" v-model="editedContact.phone" />
      <span v-if="editedContact.phone || !/^\d+$/.test(editedContact.phone)" ></span>
    </label>
  </p>
  <p>
    <label>
      Email:
      <input type="email" v-model="editedContact.email" />
      <span v-if="editedContact.email"  > </span>
    </label>
  </p>
    <button type="submit">Save</button>
  </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editedContact = ref({ ...props.contact });

    const saveContact = () => {
      if (!editedContact.value.name || !editedContact.value.phone || !editedContact.value.email) {
        alert('Все поля обязательны');
        return;
      }
      if (!/^\d+$/.test(editedContact.value.phone)) {
        alert('Телефон должен содержать только цифры');
        return;
      }
      emit('save', editedContact.value);
    };

    return {
      editedContact,
      saveContact,
    };
  },
});
</script>