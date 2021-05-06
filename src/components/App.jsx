import { socket, SocketContext } from "../context/socket";
import Chat from "./Chat";

function App(props) {
  
  return (
    <SocketContext.Provider value={socket}>
      <Chat></Chat>
    </SocketContext.Provider>
  );
}

export default App;
