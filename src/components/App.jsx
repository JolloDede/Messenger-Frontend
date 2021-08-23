import { Grid } from "@material-ui/core";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationProvider } from "../contexts/ConversationProvider";
import { SocketProvider } from "../contexts/socket";
import useLocalStorage from "../hooks/useLocalStorage";
import Chat from "./Chat";
import Login from "./Login";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [id, setId] = useLocalStorage("id");

  if (token !== null) {
    return (
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationProvider id={id}>
            <Grid container direction="row">
              <Chat id={id} ></Chat>
            </Grid>
          </ConversationProvider>
        </ContactsProvider>
      </SocketProvider>
    );
  } else {
    return (
      <Login setToken={setToken} setId={setId} />
    );
  }
}

export default App;
