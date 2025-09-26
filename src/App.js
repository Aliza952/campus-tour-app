import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF, useProgress } from '@react-three/drei';

import Navbar from './Navbar';
import LoginForm from './LoginForm';
import ChatBox from './ChatBox';
import OnlineUsers from './OnlineUsers';
// import VoiceChat from './VoiceChat';
import Player from './Player';
import CampusBuilding from './CampusBuilding';
import CampusObjects from './CampusObjects';

import LibrarySystem from './LibrarySystem';
import GirlsCommonRoom from './GirlsCommonRoom';
import Auditorium from './Auditorium';
import Cafeteria from './Cafeteria';
import Classrooms from './Classrooms';
import Laboratories from './Laboratories';
import ComputerCenter from './ComputerCenter';
import SeminarHall from './SeminarHall';
import IndoorSportsFacilities from './IndoorSportsFacilities';
import Gymnasium from './Gymnasium';

import AboutPage from './AboutPage';
import SettingsPage from './SettingsPage';

function BuildingModel({ url, scale = [1.5, 1.5, 1.5] }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} scale={scale} />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [avatarColor, setAvatarColor] = useState(localStorage.getItem('avatarColor') || '#3498db');
  const [doorOpen, setDoorOpen] = useState(false);
  const [playerEntered, setPlayerEntered] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [avatarTarget, setAvatarTarget] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [buildingResetKey, setBuildingResetKey] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [messages, setMessages] = useState([]);
  const [tokens, setTokens] = useState(() => parseInt(localStorage.getItem("tokens")) || 0);
  const [orderHistory, setOrderHistory] = useState(() => JSON.parse(localStorage.getItem("orderHistory")) || []);

  const ROOM_DATA = [
    { label: "Classrooms", pos: [-20, 1, -10], model: "/models/pokecenter.glb" },
    { label: "Laboratories", pos: [-10, 1, -10], model: "/models/pokecenter.glb" },
    { label: "Computer Center", pos: [0, 1, -10], model: "/models/pokecenter.glb" },
    { label: "Library", pos: [10, 1, -10], model: "/models/pokecenter.glb" },
    { label: "Auditorium", pos: [20, 1, -10], model: "/models/pokecenter.glb" },
    { label: "Seminar Hall", pos: [-20, 1, 0], model: "/models/pokecenter.glb" },
    { label: "Indoor Sports Facilities", pos: [-10, 1, 0], model: "/models/pokecenter.glb" },
    { label: "Gymnasium", pos: [0, 1, 0], model: "/models/pokecenter.glb" },
    { label: "Girls Common Room", pos: [10, 1, 0], model: "/models/pokecenter.glb" },
    { label: "Cafeteria", pos: [20, 1, 0], model: "/models/pokecenter.glb" },
  ];

  useEffect(() => {
    localStorage.setItem("tokens", tokens);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }, [tokens, orderHistory]);

  const handleLogin = (u) => {
    setIsLoggedIn(true);
    setUsername(u);
    localStorage.setItem('username', u);
  };

  const handleLogout = () => window.location.reload();

  const handleNavigate = (page) => {
    if (page === 'home') {
      setSelectedRoom(null);
      setShowInterior(false);
      setDoorOpen(false);
      setPlayerEntered(false);
      setBuildingResetKey(prev => prev + 1);
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    if (doorOpen && playerEntered && !showInterior) {
      setShowInterior(true);
    }
  }, [doorOpen, playerEntered, showInterior]);

  function InteriorScene() {
    const avatarRef = useRef();
    const doorRefs = useRef({});
    const doorAngles = useRef({});
    const openDoors = useRef({});

    useEffect(() => {
      if (avatarTarget) {
        openDoors.current[avatarTarget.label] = true;
      }
    }, [avatarTarget]);

    useFrame(({ camera }) => {
      if (!avatarRef.current) return;
      const avatar = avatarRef.current.position;

      if (avatarTarget) {
        const [tx, , tz] = avatarTarget.pos;
        const dx = tx - avatar.x;
        const dz = tz - avatar.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 0.2) {
          setAvatarTarget(null);
          setSelectedRoom(avatarTarget.label);
        } else {
          avatar.x += (dx / dist) * 0.1;
          avatar.z += (dz / dist) * 0.1;
          camera.position.lerp({ x: avatar.x, y: camera.position.y, z: avatar.z + 10 }, 0.1);
          camera.lookAt(avatar.x, avatar.y + 1, avatar.z);
        }
      }

      Object.entries(doorRefs.current).forEach(([label, ref]) => {
        if (!ref) return;
        const shouldOpen = openDoors.current[label];
        const currentAngle = doorAngles.current[label] || 0;
        const targetAngle = shouldOpen ? -Math.PI / 2 : 0;
        const delta = targetAngle - currentAngle;
        const step = 0.04;

        if (Math.abs(delta) > 0.01) {
          const newAngle = currentAngle + step * Math.sign(delta);
          doorAngles.current[label] = newAngle;
          ref.rotation.y = newAngle;
        }
      });
    });

    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
        <fog attach="fog" args={['#f0f0f0', 10, 60]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#d7ccc8" />
        </mesh>

        {ROOM_DATA.map((r) => (
          <group key={r.label} position={r.pos}>
            <group position={[0, -0.5, 0]} onClick={() => setAvatarTarget(r)}>
              <BuildingModel url={r.model} scale={[7,7,7]} />
            </group>

            <group position={[0, 0.1, 2.5]}>
              <mesh
                ref={(ref) => (doorRefs.current[r.label] = ref)}
                position={[-0.1, 0.3, 0]}
                rotation={[0, 0, 0]}
                castShadow
              >
                <boxGeometry args={[1.2, 2, 0.2]} />
                <meshStandardMaterial color="#4e342e" />
              </mesh>
            </group>

            <Html position={[0, 2.5, 0]} transform occlude distanceFactor={10}>
              <div style={{
                background: '#0f172a',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                pointerEvents: 'none'
              }}>{r.label}</div>
            </Html>
          </group>
        ))}

        <Html position={[0, 11, 2]} center>
          <div style={{
            padding: '12px 24px',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}>
            Welcome inside the Campus Building!
          </div>
        </Html>

        <group ref={avatarRef} position={[0, 1, 20]}>
          <Player username={username} color={avatarColor} />
        </group>
      </>
    );
  }

  const roomComponents = {
    "Library": LibrarySystem,
    "Girls Common Room": GirlsCommonRoom,
    "Auditorium": Auditorium,
    "Cafeteria": (props) => <Cafeteria {...props} tokens={tokens} setTokens={setTokens} orderHistory={orderHistory} setOrderHistory={setOrderHistory} />,
    "Classrooms": Classrooms,
    "Laboratories": Laboratories,
    "Computer Center": ComputerCenter,
    "Seminar Hall": SeminarHall,
    "Indoor Sports Facilities": IndoorSportsFacilities,
    "Gymnasium": Gymnasium,
  };

  if (!isLoggedIn) return <LoginForm onLogin={handleLogin} />;

  if (selectedRoom && roomComponents[selectedRoom]) {
    const RoomComponent = roomComponents[selectedRoom];
    return <RoomComponent onBack={() => setSelectedRoom(null)} />;
  }

  if (currentPage === 'chat') {
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
        <Navbar username={username} onLogout={handleLogout} onNavigate={handleNavigate} />
        <ChatBox username={username} fullscreen={true} messages={messages} setMessages={setMessages} />
        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
          <button onClick={() => handleNavigate('home')} style={{ padding: '12px 20px', background: '#4caf50', color: 'white', borderRadius: '8px' }}>
            ← Back to Campus
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'about') return <><Navbar username={username} onLogout={handleLogout} onNavigate={handleNavigate} /><AboutPage /></>;
  if (currentPage === 'settings') return <><Navbar username={username} onLogout={handleLogout} onNavigate={handleNavigate} /><SettingsPage username={username} setUsername={setUsername} avatarColor={avatarColor} setAvatarColor={setAvatarColor} /></>;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Navbar username={username} onLogout={handleLogout} onNavigate={handleNavigate} />
      <ChatBox username={username} fullscreen={false} messages={messages} setMessages={setMessages} />
     
      <OnlineUsers />
      <Canvas shadows camera={{ position: [0, 15, 30], fov: 50 }}>
        <color attach="background" args={['#001f4d']} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
        {!showInterior ? (
          <>
            <CampusObjects />
            <CampusBuilding key={buildingResetKey} onDoorOpen={() => setDoorOpen(true)} />
            <Player username={username} onEnterBuilding={() => setPlayerEntered(true)} color={avatarColor} />
          </>
        ) : (
          <InteriorScene />
        )}
        {!avatarTarget && <OrbitControls />}
      </Canvas>

      {!showInterior && (
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          <button onClick={() => { setDoorOpen(true); setPlayerEntered(true); }} style={{ padding: '12px 24px', backgroundColor: '#1976D2', color: 'white', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            🚪 Enter the Campus
          </button>
        </div>
      )}

      {showInterior && (
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
          <button onClick={() => { setShowInterior(false); setPlayerEntered(false); setDoorOpen(false); setBuildingResetKey(prev => prev + 1); }} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>
            ← Back to Campus Entrance
          </button>
        </div>
      )}
        <a
        href="https://www.sakec.ac.in"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#1976D2",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 9999,
        }}
      >
        🌐 Visit SAKEC Website
      </a>
    </div>
  );
}

useGLTF.preload('/models/pokecenter.glb');
export default App;
