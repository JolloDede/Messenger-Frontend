import { Box } from "@material-ui/core";
import { useCallback } from "react";
import { useState } from "react";
import { useConversations } from "../contexts/ConversationProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const { sendMessage, selectedConversation } = useConversations();
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
    <Box>
      <div>
        {selectedConversation.messages.map((message, index) => {
          const lastMessage = selectedConversation.messages.length - 1 === index
          return (
            <div
              ref={lastMessage ? setRef : null}
              key={index}
            // className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
            >
              <div
              // className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}
              >
                {message.text}
              </div>
              <div 
                // className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}
              >
                {message.fromMe ? 'You' : message.senderName}
              </div>
            </div>
          )
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          required
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </Box>
  );
}