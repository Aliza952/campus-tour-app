import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Text } from '@react-three/drei';

export default function CampusBuilding({ onDoorOpen }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const doorsOpen = useRef(false);

  // Load GLB models
  const mainBuilding = useGLTF('/models/longworth_building_low_poly_game_ready.glb');
  const sideBuilding = useGLTF('/models/locomotive_storage_building.glb');

  useFrame(() => {
    const playerPos = window.latestPlayerPosition;
    if (!playerPos || !leftDoorRef.current || !rightDoorRef.current) return;

    const distance = Math.sqrt((playerPos.x - 0) ** 2 + (playerPos.z + 5) ** 2);

    if (distance < 2) {
      if (leftDoorRef.current.rotation.y > -Math.PI / 2) {
        leftDoorRef.current.rotation.y -= 0.02;
      }
      if (rightDoorRef.current.rotation.y < Math.PI / 2) {
        rightDoorRef.current.rotation.y += 0.02;
      }

      if (
        !doorsOpen.current &&
        leftDoorRef.current.rotation.y <= -Math.PI / 2 + 0.01 &&
        rightDoorRef.current.rotation.y >= Math.PI / 2 - 0.01
      ) {
        doorsOpen.current = true;
        if (onDoorOpen) onDoorOpen();
      }
    }

    if (distance >= 2) {
      if (leftDoorRef.current.rotation.y < 0) {
        leftDoorRef.current.rotation.y += 0.02;
      }
      if (rightDoorRef.current.rotation.y > 0) {
        rightDoorRef.current.rotation.y -= 0.02;
      }
      if (
        leftDoorRef.current.rotation.y >= -0.01 &&
        rightDoorRef.current.rotation.y <= 0.01
      ) {
        doorsOpen.current = false;
      }
    }
  });

  return (
    <group position={[0, 0, -5]}>
      {/* 🏫 Main SAKEC Building */}
      <primitive
        object={mainBuilding.scene}
        scale={[0.05, 0.05, 0.05]}
        position={[0.7, -1, -5]}
        rotation={[0, Math.PI/2, 0]}
      />

      {/* 🏢 Right-side Building */}
      <primitive
        object={sideBuilding.scene}
        scale={[1, 1, 1]}
        position={[33, 0, -15]}
        rotation={[0, Math.PI, 0]}
      />

      {/* 🏢 Left-side Building */}
      <primitive
        object={sideBuilding.scene.clone()}
        scale={[1, 1, 1]}
        position={[-25, 0, -15]}
        rotation={[0, Math.PI, 0]}
      />

      {/* 🛣️ Footpath */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.02, 9]}>
        <planeGeometry args={[80, 4]} />
        <meshStandardMaterial color="gray" />
      </mesh>

            {/* 🚧 Railings (along both sides of footpath) */}
      {[1.5, 5.5].map((zOffset, index) => (
        <group key={index} position={[0, 0, 6]}>
          {/* Posts */}
          {Array.from({ length: 21 }).map((_, i) => (
            <mesh key={i} position={[-39 + i * 4, 0.5, zOffset]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 1]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          ))}

          {/* Top Horizontal Rail */}
          <mesh position={[0, 1, zOffset]}>
            <boxGeometry args={[80, 0.05, 0.05]} />
            <meshStandardMaterial color="#444" />
          </mesh>

          {/* Bottom Horizontal Rail */}
          <mesh position={[0, 0.5, zOffset]}>
            <boxGeometry args={[80, 0.05, 0.05]} />
            <meshStandardMaterial color="#444" />
          </mesh>
        </group>
      ))}
      {/* 🪧 Welcome Sign */}
      <Text
        position={[8, 1.5, 13]}  // Adjust X/Z for perfect placement
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="black"
      >
        Welcome to SAKEC!
      </Text>

      {/* 🚪 Doors in front of main building */}
      <mesh ref={leftDoorRef} position={[-1, 0.3, 4]}>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial color="brown" />
      </mesh>b
      <mesh ref={rightDoorRef} position={[1, 0.3, 4]}>
        <boxGeometry args={[2, 3, 0.2]} />
        <meshStandardMaterial color="brown" />
      </mesh>
    </group>
  );
}
