import React, { useState, useEffect } from "react";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "components/Filter/Filter";
import ContactList from "components/ContactList/ContactList";
import { Pagetitle } from "./App.styled";
import { nanoid } from "nanoid";

const App = () => {
  const defaultContacts = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];

  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));
    return savedContacts || defaultContacts;
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = data => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isDuplicate) {
      window.alert(`Contact ${data.name} already exists!`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      {
        ...data,
        id: nanoid(),
      },
    ]);
  };

  const handleDelete = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const handleFilterInput = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  return (
    <>
      <Pagetitle>Phonebook</Pagetitle>
      <ContactForm onSubmit={handleSubmit} />
      <Filter value={filter} onChange={handleFilterInput} />
      <ContactList contacts={filterContacts()} onDelete={handleDelete} />
    </>
  );
};

export default App;
