import Messages from "./Messages";
import NewMessage from "./MessageForm";
import Login from "./Login";
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { SocketContext } from "../context/socket";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "0 auto",
    height: "100vh",
  },
}));

function Chat(props) {
  const [token, setToken] = useLocalStorage("token");
  const [username, setUsername] = useLocalStorage("username");
  const [messages, setMessages] = useLocalStorage("messages", []);
  const classes = useStyles();
  const socket = useContext(SocketContext);

  /**
   * adding a new Message to the message state
   * @param {{_id, name, message, img, created}} newMessage
   */
  function newMessage(newMessage) {
    setMessages(prevMessages => {
      return [...prevMessages, newMessage]
    })
  }

  useEffect(() => {
    socket.on("message", data => {
      newMessage(data.message);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();

    // eslint-disable-next-line
  }, [socket]);

  if (token !== null) {
    return (
      <Box className={classes.root}>
        <Messages username={username} messages={messages} />
        <NewMessage setToken={setToken} token={token} />
      </Box>
    );
  } else {
    return (
      <Box>
        <Login setToken={setToken} setUsername={setUsername} />
      </Box>
    );
  }
}

export default Chat;