import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function ChatBox({ username, fullscreen = false }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (username) {
      localStorage.removeItem('chatMessages');
      setMessages([]);
      socket.emit('join-room', { roomId: 'campus-room', username });
    }

    const handleChatMessage = ({ username: sender, message }) => {
      const newMessage = { username: sender, message };
      setMessages((prev) => {
        const updated = [...prev, newMessage];
        localStorage.setItem('chatMessages', JSON.stringify(updated));
        return updated;
      });
    };

    socket.on('chat-message', handleChatMessage);

    return () => {
      socket.off('chat-message', handleChatMessage);
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chat-message', {
        room: 'campus-room',
        username,
        message,
      });
      setMessage('');
    }
  };

  const getColorDot = (name) => {
    const colors = ['#00ffc3', '#29b6f6', '#ffca28', '#ff4081', '#7e57c2'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const containerStyle = fullscreen
    ? {
        height: '100%',
        background: '#1a1a2e',
        padding: '90px',
        borderRadius: '10px',
        fontFamily: 'Segoe UI, sans-serif',
        boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        color: '#f0f0f0',
      }
    : {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 300,
        background: '#1a1a2e',
        padding: 10,
        borderRadius: 10,
        boxShadow: '0 0 12px rgba(0,0,0,0.4)',
        fontFamily: 'Segoe UI, sans-serif',
        zIndex: 9999,
        pointerEvents: 'auto',
        color: '#f0f0f0',
      };

  const messagesStyle = {
    flex: 1,
    overflowY: 'auto',
    fontSize: 14,
    marginBottom: fullscreen ? 10 : 5,
    maxHeight: fullscreen ? 'unset' : 200,
  };

  const inputStyle = {
    width: '90%',
    padding: '8px 10px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #444',
    background: '#0f172a',
    color: '#f0f0f0',
    outline: 'none',
  };

  const messageRowStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  };

  const dotStyle = (color) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: 6,
    display: 'inline-block',
  });

  return (
    <div style={containerStyle}>
      <div style={messagesStyle}>
        {messages.map((msg, i) => (
          <div key={i} style={messageRowStyle}>
            <span style={dotStyle(getColorDot(msg.username))}></span>
            <strong>{msg.username}:</strong>&nbsp;{msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        style={inputStyle}
      />
    </div>
  );
}

export default ChatBox;
