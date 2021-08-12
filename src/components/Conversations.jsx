import { List, ListItem } from "@material-ui/core";
import { useConversations } from "../contexts/ConversationProvider"


export default function Conversations() {
  const { conversations, selectConversation } = useConversations();

  return (
    <List>
      {conversations.map((conversation, index) => (
        <ListItem
          key={index}
          action
          onClick={() => selectConversation(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListItem>
      ))}
    </List>
  )
}