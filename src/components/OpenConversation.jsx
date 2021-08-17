import { Box, Button, makeStyles, TextField } from "@material-ui/core";
import { useCallback } from "react";
import { useState } from "react";
import { useConversations } from "../contexts/ConversationProvider";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    height: "90vh",
    top: 0,
  },
  message: {
    margin: "5px auto",
    padding: "10px",
    borderRadius: "4px",
    minHeight: "20px",
    overflow: "auto",
    maxWidth: "90%",
    minWidth: "20%",
  },
  myMessage: {
    backgroundColor: "green",
    marginRight: 0,
    width: "fit-content",
  },
  otherMessage: {
    backgroundColor: "grey",
  },
  messageContent: {
    lineBreak: "auto",
    wordBreak: "break-all",
  },
  form: {
    height: "10vh",
  }
}));

export default function OpenConversation({ style }) {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();
  const classes = useStyles();
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    );
    setText("");
  }

  return (
    <Box className={style}>
      <Box className={classes.messageContainer}>
        {selectedConversation.messages.map((message, index) => {
          const lastMessage = selectedConversation.messages.length - 1 === index
          return (
            <Box
              ref={lastMessage ? setRef : null}
              key={index}
              className={[classes.message, message.fromMe ? classes.myMessage : classes.otherMessage].join(" ")}
            >
              <Box
              // className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}
              >
                {message.fromMe ? 'You' : message.senderName}
              </Box>
              <Box
                className={classes.messageContent}
              >
                {message.text}
              </Box>
            </Box>
          )
        })}
      </Box>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          variant="outlined"
          multiline
          required
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Send</Button>
      </form>
    </Box>
  );
}