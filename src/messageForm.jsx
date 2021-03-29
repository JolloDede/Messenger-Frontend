import React, { useState } from 'react';
import sendingSrc from "./img/loading.gif";
import "./messageForm.css";

function NewMessage() {
  const API_URL = "http://localhost:5000/messages";
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    let formData = new FormData();
    formData.append("message", text);

    fetch(API_URL, {
      method: "POST",
      headers: {
        'authorization': 'Bearer ' + localStorage.token
      },
      body: formData
    }).then(response => response.json())
      .then(() => {
        setText("");
        setSending(false);
      }).catch((err) => {
        console.log(err);
      });
  }
  const handleInputChange = (e) => {
    const target = e.target;
    if (target.type === "text") {
      setText(target.value);
    }
    if (target.type === "file") {
      // save img
    }
  }
  if (sending) {
    return (
      <img src={sendingSrc} alt="sending"/>
    );
  }else {
  return (
    <form onSubmit={handleSubmit} className="msg-form">
      <input
        type="text"
        name="message"
        id="message"
        onChange={handleInputChange}
        value={text}
      />
      <label htmlFor="file-input">
        <p className="button clip-btn">()</p>
        <input
          type="file"
          name="file-input"
          id="file-input"
          style={{ display: "none" }}
        />
      </label>
      <button type="submit" className="send-btn">Send</button>
    </form>
  );
  }
}

export default NewMessage;