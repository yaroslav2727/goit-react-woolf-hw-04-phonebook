import React, { useState } from "react";
import Container from "components/Container/Container.jsx";
import { Form, Label, Input, Button, InputGroup } from "./ContactForm.styled.js";

const ContactForm = ({ onSubmit }) => {
  const [contact, setContact] = useState({ name: "", number: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    setContact(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(contact);
    setContact({ name: "", number: "" });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            type="text"
            required
            value={contact.name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            id="name"
            placeholder="Enter contact's name"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="number">Number</Label>
          <Input
            name="number"
            type="tel"
            required
            value={contact.number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            id="number"
            placeholder="Enter contact's number"
          />
        </InputGroup>

        <Button type="submit">Add contact</Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
