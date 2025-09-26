// CampusEnvironment.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function CampusEnvironment(props) {
  const { scene } = useGLTF('/models/white_round_exhibition_gallery.glb');
  return <primitive object={scene} {...props} />;
}
