import React from 'react';
import avatar1 from './img/chat1.png';
import avatar2 from './img/chat2.png';

const ChatMessage = ({ username, name, text }) => {
  const position = username === 'bot' ? 'left' : 'right';
  return (
    <div className={`answer ${position}`}>
      <div className="avatar">
        <img src={username === 'bot' ? avatar1 : avatar2} alt={name} />
        <div className="status online"></div>
      </div>
      <div className="name">{name}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default ChatMessage;
