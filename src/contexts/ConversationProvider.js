import React, { useCallback, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./socket";


const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

// message = { sender, messageText }
// conversation = { recipients, messages[] }
export function ConversationProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversation, setSelectedConversation] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  function createConversation(recipients) {
    setConversations(prevConversation => {
      console.log(prevConversation);
      console.log({ recipients, messages: [] });
      return [...prevConversation, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    setConversations(prevConversation => {
      let madeChanges = false;
      let newMessage = { sender, text };

      const newConversations = prevConversation.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChanges = true;
          return { recipients, messages: [...conversation.messages, newMessage] }
        } else {
          return conversation;
        }
      });

      if (madeChanges) {
        return newConversations;
      } else {
        return [prevConversation, { recipients, messages: [newMessage] }];
      }
    })
  }, [setConversations]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('recieve-message', addMessageToConversation);

    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  function sendMessage( recipients, text ) {
    socket.emit('send-message', { recipients, text });

    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })

    const selected = index === selectedConversation
    return { ...conversation, messages, recipients, selected }
  })


  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversation],
    createConversation,
    selectConversation: setSelectedConversation,
    sendMessage
  }

  return (
    <ConversationsContext.Provider value={value} >
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}