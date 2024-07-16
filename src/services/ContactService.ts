interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

let contacts: Contact[] = [];

export function getContacts(): Promise<Contact[]> {
  return Promise.resolve(contacts);
}

export function addContact(contact: Contact): Promise<Contact> {
  contact.id = contacts.length + 1;
  localStorage.setItem('contacts', JSON.stringify([...contacts, contact]));
  return Promise.resolve(contact);
}

export function updateContact(contact: Contact): Promise<Contact> {
  const index = contacts.findIndex(c => c.id === contact.id);
  if (index !== -1) {
    contacts[index] = contact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  return Promise.resolve(contact);
}

export function deleteContact(id: number): Promise<void> {
  const index = contacts.findIndex(c => c.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  return Promise.resolve();
}

if (localStorage.getItem('contacts')) {
  contacts = JSON.parse(localStorage.getItem('contacts') || '');
} else {
  contacts = [
    { id: 1, name: 'Борисов Михаил', phone: '1234567890', email: 'bori.mix@yandex.ru' },
    { id: 2, name: 'Даниил Матяш', phone: '222222222', email: 'bori.mix@yandex.ru' },
    { id: 3, name: 'Евгений Фалин', phone: '3333333333', email: 'bori.mix@yandex.ru' },
    { id: 4, name: 'Диана Измайлова', phone: '55555555555', email: 'bori.mix@yandex.ru' },
  ];
  localStorage.setItem('contacts', JSON.stringify(contacts));
}