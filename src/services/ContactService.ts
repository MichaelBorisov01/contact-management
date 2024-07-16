interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const contacts: Contact[] = [
  { id: 1, name: 'Борисов Михаил', phone: '1234567890', email: 'bori.mix@yandex.ru' },
  { id: 2, name: 'Даниил Матяш', phone: '222222222', email: 'bori.mix@yandex.ru' },
  { id: 3, name: 'Евгений Фалин', phone: '3333333333', email: 'bori.mix@yandex.ru' },
  { id: 3, name: 'Диана Измайлова', phone: '55555555555', email: 'bori.mix@yandex.ru' },
];

export function getContacts(): Promise<Contact[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(contacts);
    }, 1000);
  });
}

export function addContact(contact: Contact): Promise<Contact> {
  contacts.push(contact);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(contact);
    }, 1000);
  });
}

export function updateContact(contact: Contact): Promise<Contact> {
  const index = contacts.findIndex(c => c.id === contact.id);
  if (index !== -1) {
    contacts[index] = contact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(contact);
    }, 1000);
  });
}

export function deleteContact(id: number): Promise<void> {
  const index = contacts.findIndex(c => c.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}