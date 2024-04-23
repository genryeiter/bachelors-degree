import React, {useEffect, useRef, useState} from 'react';
import ChatMessage from './ChatMessage';

const Chat = ({result, prompt}) => {
  const [chatMessages, setChatMessages] = useState([
    {
      username: 'bot',
      name: 'Finceptiv Chatbot',
      text: 'Hi there! How can I help you?',
    },
  ]);

  useEffect(() => {
    if (result) {
      setChatMessages(prevMessages => [...prevMessages, {
        username: 'bot',
        name: 'Finceptiv Chatbot',
        text: result
      }]);
    }
  }, [result]);

  useEffect(() => {
    if (prompt) {
      setChatMessages(prevMessages => [...prevMessages, {
        username: 'user',
        name: 'You',
        text: prompt
      }]);

    }
  }, [prompt]);


  return (
      <div className="chat-body">
        {chatMessages.map((msg, index) => (
            <ChatMessage key={index} {...msg} />
        ))}
      </div>
  );
};

export default Chat;
