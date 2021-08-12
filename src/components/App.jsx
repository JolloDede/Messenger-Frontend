import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { socket, SocketContext } from "../contexts/socket";
import Chat from "./Chat";

function App() {

  return (
    <SocketContext.Provider value={socket}>
      <ContactsProvider>
        <ConversationProvider>
          <Chat></Chat>
        </ConversationProvider>
      </ContactsProvider>
    </SocketContext.Provider>
  );
}

export default App;
