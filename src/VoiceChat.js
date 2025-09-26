import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const socket = io('http://localhost:5000');

const VoiceChat = () => {
  const [peers, setPeers] = useState([]);
  const userAudio = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      userAudio.current.srcObject = stream;
      socket.emit('join-room', 'campus-room');

      socket.on('user-joined', (userId) => {
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current.push({ peerID: userId, peer });
        setPeers((users) => [...users, peer]);
      });

      socket.on('signal', ({ from, data }) => {
        const item = peersRef.current.find(p => p.peerID === from);
        if (item) {
          item.peer.signal(data);
        }
      });

      socket.on('user-left', (userId) => {
        const peerObj = peersRef.current.find(p => p.peerID === userId);
        if (peerObj) {
          peerObj.peer.destroy();
        }
        peersRef.current = peersRef.current.filter(p => p.peerID !== userId);
        setPeers(peersRef.current.map(p => p.peer));
      });
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('signal', { to: userToSignal, data: signal });
    });

    return peer;
  }

  return (
    <div>
      <audio ref={userAudio} autoPlay muted />
      {peers.map((peer, index) => (
        <Audio key={index} peer={peer} />
      ))}
    </div>
  );
};

const Audio = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <audio ref={ref} autoPlay />;
};

export default VoiceChat;
