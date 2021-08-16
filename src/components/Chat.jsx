import { Box } from "@material-ui/core";
import { useConversations } from "../contexts/ConversationProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

function Chat({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <Box>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </Box>
  );
}

export default Chat;