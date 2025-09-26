import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function RealisticAvatar(props) {
  const group = useRef();
  const { scene } = useGLTF('https://models.readyplayer.me/6867a66685c4c74f745c0d68.glb');

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}