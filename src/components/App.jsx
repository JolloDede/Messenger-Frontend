import Messages from "./Messages";
import NewMessage from "./MessageForm";
import Login from "./Login";
import useLocalStorage from '../hooks/useLocalStorage';
import { useState } from "react";

function App(props) {
  const [token, setToken] = useLocalStorage("token");
  const [username, setUsername] = useLocalStorage("username");
  const [newMsg, setNewMsg] = useState(false);

  if (token !== null) {
    return (
      <div className="App">
        <Messages token={token} username={username} newMsg={newMsg} />
        <NewMessage token={token} setNewMsg={setNewMsg} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Login setToken={setToken} setUsername={setUsername} />
      </div>
    );
  }
}

export default App;
