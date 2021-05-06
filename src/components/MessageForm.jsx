import React, { useContext, useState } from 'react';
import sendingSrc from "../img/loading.gif";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { SocketContext } from '../context/socket';
import { API_URL } from "../config.json";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "5%",
  },
  field: {
    width: "90%",
  },
  buton: {
    width: "10%",
    height: "6vh",
  }
}));

function NewMessage({ setToken, token }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const classes = useStyles();
  const socket = useContext(SocketContext);

  /**
   * fetching the data to the server and then send it with socketio
   * @param {Event} e 
   */
  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    let formData = new FormData();
    formData.append("message", text);
    fetch(API_URL, {
      method: "POST",
      headers: {
        'authorization': 'Bearer ' + token
      },
      body: formData
    }).then(response => {
      if (response.status === 401) {
        setToken(null);
        throw new Error(response)
      }
      return response.json()
    })
      .then((createdMsg) => {
        socket.emit("message", createdMsg);
        setText("");
        setSending(false);
      }).catch((err) => {
        console.log(err);
      });
  }
  function handleInputChange(e) {
    const target = e.target;
    if (target.type === "text") {
      setText(target.value);
    }
  }

  if (sending) {
    return (
      <img src={sendingSrc} alt="sending"/>
    );
  }else {
  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        label="type your message"
        variant="filled"
        name="username"
        onChange={handleInputChange}
        value={text}
        required
        className={classes.field}
      />

      <Button type="submit" variant="contained" className={classes.buton}>Send</Button>
    </form>
  );
  }
}

export default NewMessage;