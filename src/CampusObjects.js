import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Html, useGLTF } from '@react-three/drei';

export default function CampusObjects() {
  const map = useLoader(TextureLoader, '/green-grass-texture.jpg');

  // ✅ Load GLB models
  const treeModel = useGLTF('/models/tree_2.glb');
  const benchModel = useGLTF('/models/bench_model_free.glb'); // <-- Your bench model

  // Tree positions
  const treePositions = [
    [-15, 0, 10],
  ];

  // Bench positions
  const benchPositions = [
    [8, 0, 10],
    [14, 0, 10],
  ];

  return (
    <>
      {/* Ground Map */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial map={map} />
      </mesh>

      {/* Green Ground */}
      <mesh position={[0, 0.01, 15]} receiveShadow>
        <meshStandardMaterial color="#4caf50" />
      </mesh>

      {/* DP Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-12, 0.02, 10]} receiveShadow>
        <planeGeometry args={[10, 2]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* ✅ Tree Model */}
      {treePositions.map(([x, y, z], i) => (
        <primitive
          key={`tree-${i}`}
          object={treeModel.scene.clone()}
          position={[x, y, z]}
          scale={[0.0255, 0.0255, 0.0255]}
        />
      ))}

      {/* ✅ Bench Model */}
      {benchPositions.map(([x, y, z], i) => (
        <primitive
          key={`bench-${i}`}
          object={benchModel.scene.clone()}
          position={[x, y, z]}
          scale={[1.5, 1.5, 1.5]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
    </>
  );
}