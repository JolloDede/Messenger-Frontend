import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { socket, SocketContext } from "../contexts/socket";
import useLocalStorage from "../hooks/useLocalStorage";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [id, setId] = useLocalStorage("id");

  if (token !== null) {
  return (
    <SocketContext.Provider value={socket}>
      <ContactsProvider>
        <ConversationProvider id={id}>
          <Chat id={id} ></Chat>
        </ConversationProvider>
      </ContactsProvider>
    </SocketContext.Provider>
  );
  }else {
    return (
      <Login setToken={setToken} setId={setId} />
    );
  }
}

export default App;
