// Player.js
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import io from 'socket.io-client';

const SPEED = 0.1;
const socket = io('http://localhost:5000', { transports: ['websocket'] });

// URLs
const avatarUrl = "https://bageumwceqjrfvkgommk.supabase.co/storage/v1/object/public/avatars//6867a66685c4c74f745c0d68.glb";
const idleUrl = "https://bageumwceqjrfvkgommk.supabase.co/storage/v1/object/public/avatars//Idle.compressed.glb";
const walkUrl = "https://bageumwceqjrfvkgommk.supabase.co/storage/v1/object/public/avatars//Walking.compressed.glb";

function AnimatedAvatar({ positionRef, isWalking }) {
  const group = useRef();
  const { scene } = useGLTF(avatarUrl);
  const idle = useGLTF(idleUrl);
  const walk = useGLTF(walkUrl);

  const [mixer] = useState(() => new THREE.AnimationMixer());

  useEffect(() => {
    const idleAction = mixer.clipAction(idle.animations[0], group.current);
    const walkAction = mixer.clipAction(walk.animations[0], group.current);

    idleAction.play();

    return () => {
      idleAction.stop();
      walkAction.stop();
    };
  }, [idle, walk, mixer]);

  useEffect(() => {
    const idleAction = mixer.clipAction(idle.animations[0], group.current);
    const walkAction = mixer.clipAction(walk.animations[0], group.current);

    if (isWalking) {
      idleAction.fadeOut(0.2);
      walkAction.reset().fadeIn(0.2).play();
    } else {
      walkAction.fadeOut(0.2);
      idleAction.reset().fadeIn(0.2).play();
    }
  }, [isWalking]);

  useFrame((state, delta) => {
    mixer.update(delta);
    if (positionRef.current && group.current) {
      group.current.position.copy(positionRef.current.position);
    }
  });

  return <primitive ref={group} object={scene} scale={1.2} />;
}

function Player({ username, onEnterBuilding }) {
  const ref = useRef();
  const keys = useRef({});
  const [players, setPlayers] = useState({});
  const [chatMessages, setChatMessages] = useState({});
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    socket.emit('join-room', { username });

    socket.on('players-update', (updatedPlayers) => setPlayers(updatedPlayers));
    socket.on('chat-message', ({ username: sender, message }) => {
      setChatMessages((prev) => ({
        ...prev,
        [sender]: { message, timestamp: Date.now() },
      }));
      setTimeout(() => {
        setChatMessages((prev) => {
          const updated = { ...prev };
          delete updated[sender];
          return updated;
        });
      }, 5000);
    });

    return () => {
      socket.off('players-update');
      socket.off('chat-message');
      socket.disconnect();
    };
  }, [username]);

  useEffect(() => {
    const handleKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true);
    const handleKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    let x = ref.current.position.x;
    let z = ref.current.position.z;

    const beforeMove = { x, z };

    if (keys.current['w']) z -= SPEED;
    if (keys.current['s']) z += SPEED;
    if (keys.current['a']) x -= SPEED;
    if (keys.current['d']) x += SPEED;

    ref.current.position.set(x, 0, z);

    const moved = beforeMove.x !== x || beforeMove.z !== z;
    setIsWalking(moved);

    window.latestPlayerPosition = { x, z };

    if (onEnterBuilding) {
      const distanceToDoor = Math.sqrt((x - 0) ** 2 + (z + 5) ** 2);
      if (distanceToDoor < 1.5) {
        onEnterBuilding();
      }
    }

    socket.emit('move-player', {
      username,
      position: { x, y: 0, z },
    });
  });

  return (
    <>
      <Suspense fallback={null}>
        <group ref={ref}>
          <AnimatedAvatar positionRef={ref} isWalking={isWalking} />
          <Html position={[0, 2.2, 0]}>
            <div style={{ fontSize: '12px', background: '#0f172a', padding: '2px 4px', borderRadius: 4 }}>
              {username}
            </div>
          </Html>
        </group>
      </Suspense>

      {Object.entries(players).map(([name, pos]) => {
        if (name === username) return null;
        return (
          <group key={name} position={[pos.x, 0, pos.z]}>
            <mesh position={[0, 1.5, 0]}>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial color="green" />
            </mesh>
            <Html position={[0, 2.2, 0]}>
              <div style={{ fontSize: '12px', background: 'white', padding: '2px 4px', borderRadius: 4 }}>
                {name}
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

export default Player;
