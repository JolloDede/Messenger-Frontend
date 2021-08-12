import { ListItem } from "@material-ui/core";

export default function Contact({ contact }) {
  return (
    <ListItem button key={contact.id}>
      {contact.name}
    </ListItem>
  )
}