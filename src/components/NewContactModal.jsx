import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useContacts } from '../contexts/ContactsProvider';


export default function NewContactModal({ closeModal }) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const { createContact } = useContacts();

  const handleSubmit = (e) => {
    e.preventDefault();

    createContact(id, name);
    closeModal();
  }

  function idHandleChange(e) {
    setId(e.target.value);
  }

  function nameHandleChange(e) {
    setName(e.target.value);
  }

  return (
    <>
      <h1 onClick={closeModal}>Create Contact</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Id"
            required
            onChange={idHandleChange}
          />
        </div>
        <div>
          <TextField
            label="Name"
            required
            onChange={nameHandleChange}
          />
        </div>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </>
  );
}