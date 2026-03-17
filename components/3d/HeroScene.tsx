"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Torus,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb({
  position,
  color,
  size = 1,
  speed = 1,
  distort = 0.4,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15;
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRing({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <Float speed={1.2} floatIntensity={1.2}>
      <Torus ref={meshRef} args={[0.8, 0.15, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.1}
          envMapIntensity={2}
        />
      </Torus>
    </Float>
  );
}

function FloatingCube({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={0.8} floatIntensity={0.6}>
      <Box ref={meshRef} args={[0.7, 0.7, 0.7]} position={position}>
        <MeshWobbleMaterial
          color={color}
          metalness={0.9}
          roughness={0.05}
          factor={0.3}
          speed={1}
        />
      </Box>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c9a84c"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x +=
      (state.mouse.x * 1.5 - state.camera.position.x) * 0.05;
    state.camera.position.y +=
      (state.mouse.y * 1 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#c9a84c" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#4a6fa5" />

        <ParticleField />

        <FloatingOrb position={[0, 0, 0]} color="#c9a84c" size={1.8} speed={0.8} distort={0.5} />
        <FloatingOrb position={[-3.5, 1.5, -2]} color="#8b6914" size={0.8} speed={1.2} distort={0.3} />
        <FloatingOrb position={[3.5, -1.5, -1]} color="#e8d08a" size={0.6} speed={1.5} distort={0.6} />
        <FloatingOrb position={[2.5, 2.5, -3]} color="#c9a84c" size={0.4} speed={2} distort={0.4} />

        <FloatingRing position={[-4, -1, -1]} color="#c9a84c" />
        <FloatingRing position={[4, 2, -2]} color="#d4a849" />

        <FloatingCube position={[-2, -2.5, 0]} color="#b8860b" />
        <FloatingCube position={[3, 1, -4]} color="#c9a84c" />

        <Environment preset="night" />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
