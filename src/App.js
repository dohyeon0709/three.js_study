import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Sky } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const Model = ({ url, position, animationType, scale }) => {
  const { scene } = useGLTF(url);
  const clonedScene = scene.clone();
  const ref = useRef();
  const [mousePos, setMousePos] = useState([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePos([x, y]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    const mouseX = state.pointer.x * 6; 
    const mouseY = state.pointer.y * 3; 

    if (ref.current && animationType === "lookatMouse") {
      const target = new THREE.Vector3(mousePos[0] * 5, mousePos[1] * 3, 2); 
      ref.current.lookAt(target);
    }
    if (ref.current && animationType === "followMouse") {
      ref.current.position.x += (mouseX - ref.current.position.x) ;
      ref.current.position.y += (mouseY - ref.current.position.y) ;
    }
  });

  return <primitive object={clonedScene} ref={ref} position={position} scale={scale} />;
};
function Animation() {
  return (
    <>
      <Model url='./3dmodel/gromitMug.gltf' position={[4, -0.5, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[2, -0.5, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[0, -0.5, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[-2, -0.5, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[-4, -0.5, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[4, 1, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[2, 1, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[0, 1, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[-2, 1, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[-4, 1, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[4, -2, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[2, -2, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[0, -2, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[-2, -2, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/gromitMug.gltf' position={[-4, -2, 0]} animationType="lookatMouse" />
      <Model url='./3dmodel/cheese.gltf' scale={0.2} animationType="followMouse" />
    </>
  );
}

function App() {
  return (
    <div className='App'>
      <section className='Header'>
        <div className='Header-menu'>
          <h1>Gromit</h1>
          <h1>Cheese</h1>
        </div>
      </section>
      <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[1, 0, 1]} />
        <Animation />
        <Sky sunPosition={[100, 10, 100]} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/gromitMug.gltf");

export default App;
