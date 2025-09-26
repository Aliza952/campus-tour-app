import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Player from './Player'; // your existing avatar component

function ClassroomModel(props) {
  const { scene } = useGLTF('/models/classroom.glb');
  return <primitive object={scene} {...props} />;
}

function MovableAvatar() {
  const ref = useRef();
  const speed = 0.03;

  useFrame((state, delta) => {
    if (!ref.current) return;
    const keys = state?.gl?.domElement?.ownerDocument?.activeKeys || {};
    if (keys['w']) ref.current.position.z -= speed;
    if (keys['s']) ref.current.position.z += speed;
    if (keys['a']) ref.current.position.x -= speed;
    if (keys['d']) ref.current.position.x += speed;
  });

  return (
    <group ref={ref} position={[0, -1, 0]}>
      <Player />
    </group>
  );
}

// Custom hook to track pressed keys
function useKeyPresses() {
  useEffect(() => {
    const keys = {};
    const down = (e) => { keys[e.key.toLowerCase()] = true; };
    const up = (e) => { keys[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    document.activeKeys = keys;
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);
}

export default function Classrooms({ onBack }) {
  useKeyPresses();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Always visible heading */}
      <h1
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '28px',
          color: '#0d47a1',
          zIndex: 10,
          background: 'rgba(255,255,255,0.8)',
          padding: '8px 16px',
          borderRadius: '12px',
        }}
      >
        🏫 Classrooms
      </h1>

      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ClassroomModel position={[0, -1, 0]} rotation={[0, Math.PI, 0]} scale={[1.5, 1.5, 1.5]}/>
        <MovableAvatar />
        <OrbitControls />
      </Canvas>

      {/* View Info Button */}
      <button
        onClick={() => setShowInfo(true)}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: '10px 20px',
          background: '#1976d2',
          color: 'white',
          fontSize: '14px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        📖 View Information
      </button>

      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 85,
          right: 20,
          padding: '10px 20px',
          background: '#1976d2',
          color: 'white',
          fontSize: '14px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        ← Back to Place Selection
      </button>

      {/* Info Panel */}
      {showInfo && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          zIndex: 20,
          overflowY: 'auto',
          padding: '60px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '32px', color: '#0d47a1' }}>🏫 Classrooms</h1>
          <p style={{ fontSize: '16px', color: '#1976d2', marginBottom: '30px' }}>
            Fostering learning through technology-enabled and student-centered environments
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '40px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            padding: '30px',
            maxWidth: '1000px',
            width: '90%',
          }}>
            <div style={{ flex: 1, minWidth: '300px', textAlign: 'left' }}>
              <p style={{ fontSize: '16px', color: '#333', lineHeight: 1.6 }}>
                The classrooms at <strong>SAKEC</strong> are more than just rooms—they’re
                dynamic learning spaces designed for interaction and engagement. Each classroom is equipped with:
              </p>
              <ul style={{ paddingLeft: '20px', fontSize: '16px', color: '#333', lineHeight: 1.6 }}>
                <li>👥 Projectors and digital displays</li>
                <li>🎤 Audio systems for clear communication</li>
                <li>🪑 Comfortable, well-spaced seating</li>
                <li>📘 Proper ventilation and lighting</li>
              </ul>
              <p style={{ fontSize: '16px', color: '#333' }}>
                These facilities promote a learner-friendly atmosphere that supports group discussions, interactive lectures, and smart education.
              </p>
            </div>
            <img
              src="/classrooms.png"
              alt="Classrooms"
              style={{
                flex: 1,
                width: '100%',
                maxWidth: '400px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            />
          </div>

          <button
            onClick={() => setShowInfo(false)}
            style={{
              marginTop: '30px',
              padding: '10px 20px',
              background: '#1976d2',
              color: 'white',
              fontSize: '14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ❌ Close Info
          </button>
        </div>
      )}
    </div>
  );
}
