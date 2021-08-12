import { List } from "@material-ui/core";
import { useContacts } from "../contexts/ContactsProvider";
import Contact from "./Contact";


export default function ContactList() {
  const { contacts } = useContacts();

  return (
    <List>
      {contacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </List>
  )
}