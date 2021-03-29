import React, { useState, useEffect } from 'react';
import Message from "./message";
import loadingSrc from './img/loading.gif';
import './messages.css';

function Messages() {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const API_URL = "http://localhost:5000/messages";

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        'authorization': 'Bearer ' + localStorage.token
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

  useEffect(() => fetchMessages(), []);

  return (
    <div className="messages">
      {loading ? <img srcSet={loadingSrc} alt="loading"></img> :
        messages.map((message) => (
          <Message message={message} key={message._id} />
        ))}
    </div>
  );
}

export default Messages;



// class Messages extends React.Component {

//   state = {
//     loading: true,
//     messages: []
//   }

//   async componentDidMount() {
//     const API_URL = "http://localhost:5000/messages";
//     const response = await fetch(API_URL, {
//       method: "GET",
//       headers: {
//         'authorization': 'Bearer ' + localStorage.token
//       }
//     });
//     if (response.status === 401 || response.status === 304) {
//       // handle error
//       console.log(response.status);
//     } else {
//       const data = await response.json();
//       this.setState({ messages: data, loading: false });
//     }
//   }

//   render() {
//     return (
//       <div className="messages">
//         {this.state.loading ? <img srcSet={loadingSrc} alt="loading"></img> :
//           this.state.messages.map((message) => (
//             <Message message={message} />
//           ))}
//       </div>
//     );
//   }
// }