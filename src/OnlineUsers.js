import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function OnlineUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUpdateUsers = (onlineUsers) => {
      // ✅ Filter out any empty or bad names
      const filtered = onlineUsers.filter((u) => u && u.trim() !== '');
      setUsers(filtered);
    };

    socket.on('update-users', handleUpdateUsers);

    return () => {
      socket.off('update-users', handleUpdateUsers);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        right: 20,
        width: 200,
        background: '#0f172a',
        padding: 10,
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
        fontFamily: 'sans-serif',
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      <h4 style={{ margin: '0 0 10px 0' }}>Online Users</h4>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: 14 }}>
        {users.map((user, index) => (
          <li key={index}>🟢 {user}</li>
        ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
