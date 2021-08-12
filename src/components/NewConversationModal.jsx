import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useState } from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationProvider";

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([])
  const { createConversation } = useConversations();
  const { contacts } = useContacts();

  function handleSubmit(e) {
    e.preventDefault()

    createConversation(selectedContactIds)
    closeModal()
  }

  function handleChange(contactId) {
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId
        })
      } else {
        return [...prevSelectedContactIds, contactId]
      }
    })
  }

  return (
    <>
      <h1 onClick={closeModal}>Create Conversation</h1>
      <form onSubmit={handleSubmit}>
        {contacts.map(contact => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleChange(contact.id)}
                value={selectedContactIds.includes(contact.id)}
                name="checkedB"
                color="primary"
              />
            }
            label={contact.name}
            key={contact.id}
          />
        ))}
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </>
  );
}