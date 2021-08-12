import React from 'react';
import Message from "./Message";
import bgSrc from "../img/chat-background.jpg";
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  messages: {
    backgroundImage: `url(${bgSrc})`,
    overflow: "auto",
    height: "90vh",
    marginBottom: "10px",
  },
}));

function Messages({ username, messages }) {
  const classes = useStyles();
  
  return (
    <Box className={classes.messages}>
      {messages.map((message) => (
        <Message message={message} key={message._id} username={username} />
      ))
      }
    </Box>
  );
}

export default Messages;