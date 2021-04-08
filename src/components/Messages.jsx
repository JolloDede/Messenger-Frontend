import React, { useState, useEffect } from 'react';
import Message from "./Message";
import loadingSrc from '../img/loading.gif';

function Messages({ token, username, newMsg }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  async function fetchMessages() {
    console.log("Hallo");
    const API_URL = "http://localhost:5000/messages";

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        'authorization': 'Bearer ' + token
      }
    });
    if (response.status === 401 || response.status === 304) {
      // handle error
      // console.log(response.status);
    } else {
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    }
  }

  // eslint-disable-next-line
  useEffect(() => fetchMessages(), [token, newMsg]);

  return (
    <div className="messages">
      {loading ? <img srcSet={loadingSrc} alt="loading"></img> :
        messages.map((message) => (
          <Message message={message} key={message._id} username={username} />
        ))}
    </div>
  );
}

export default Messages;