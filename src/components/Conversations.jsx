import { List, ListItem } from "@material-ui/core";
import { useConversations } from "../contexts/ConversationProvider"


export default function Conversations() {
  const { conversations, selectConversation } = useConversations();

  return (
    <List>
      {conversations.map((conversation, index) => (
        <ListItem
          key={index}
          onClick={() => selectConversation(index)}
        >
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListItem>
      ))}
    </List>
  )
}