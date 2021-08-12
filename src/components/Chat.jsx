import Messages from "./Messages";
import NewMessage from "./MessageForm";
import Login from "./Login";
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useContext } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { SocketContext } from "../contexts/socket";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  login: {
    width: "80%",
    margin: "0 auto",
  },
  chatContent: {
    width: "70%",
    display: "inline-block",
  }
}));

function Chat() {
  const [token, setToken] = useLocalStorage("token");
  const [username, setUsername] = useLocalStorage("username");
  const [id, setId] = useLocalStorage("id");
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

  return (
    <Box>
      <Sidebar />
    </Box>
  );

  if (token !== null) {
    return (
      <Box className={classes.root}>
        <Sidebar id={id} />
        <Box className={classes.chatContent}>
          <Messages username={username} messages={messages} />
          <NewMessage setToken={setToken} token={token} />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box className={classes.login}>
        <Login setId={setId} setToken={setToken} setUsername={setUsername} />
      </Box>
    );
  }
}

export default Chat;