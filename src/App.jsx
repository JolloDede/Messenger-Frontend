import { useState, useEffect } from 'react';
import './App.css';
import Messages from "./messages";
import NewMessage from "./messageForm";
import Login from "./login";

function App(props) {
  const [authorized, setAuthorized] = useState(false);

  const fetchAuthorized = async () => {
    const API_URL = "http://localhost:5000/authorized";
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        'authorization': 'Bearer ' + localStorage.token
      }
    });
    if (response.status === 401) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }
  }

  const submitLogin = (e) => {
    e.preventDefault();
    const API_URL = "http://localhost:5000/auth/login";
    const formData = new FormData(e.target);
    const auth = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(auth),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then((result) => {
      localStorage.token = result.token;
      localStorage.username = result.username;
      setAuthorized(true);
    });
  }

  useEffect(() => fetchAuthorized(), []);

  if (authorized) {
    return (
      <div className="App">
        <Messages />
        <NewMessage />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Login submitHandle={submitLogin} />
      </div>
    );
  }
}

export default App;
