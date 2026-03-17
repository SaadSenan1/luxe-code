"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sphere,
  Torus,
  ContactShadows,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";
import * as THREE from "three";

function ProductModel({ color = "#c9a84c" }: { color?: string }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <PresentationControls
      global
      snap
      rotation={[0, -Math.PI / 4, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          {/* Outer sphere */}
          <Sphere ref={outerRef} args={[1.2, 64, 64]}>
            <MeshDistortMaterial
              color={color}
              metalness={0.95}
              roughness={0.05}
              distort={0.2}
              speed={2}
              transparent
              opacity={0.4}
            />
          </Sphere>

          {/* Inner solid sphere */}
          <Sphere ref={innerRef} args={[0.85, 64, 64]}>
            <meshStandardMaterial
              color={color}
              metalness={1}
              roughness={0.05}
              envMapIntensity={3}
            />
          </Sphere>

          {/* Orbiting ring */}
          <Torus
            ref={ringRef}
            args={[1.6, 0.05, 32, 128]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color="#e8d08a"
              metalness={1}
              roughness={0}
              emissive="#c9a84c"
              emissiveIntensity={0.3}
            />
          </Torus>

          {/* Second ring */}
          <Torus
            args={[1.3, 0.03, 32, 128]}
            rotation={[Math.PI / 4, Math.PI / 6, 0]}
          >
            <meshStandardMaterial
              color={color}
              metalness={1}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </Torus>
        </group>
      </Float>
    </PresentationControls>
  );
}

interface ProductViewerProps {
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function ProductViewer({ color = "#c9a84c", size = "md" }: ProductViewerProps) {
  const heights: Record<string, string> = {
    sm: "300px",
    md: "450px",
    lg: "600px",
  };

  return (
    <div style={{ height: heights[size] }} className="w-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
          <pointLight position={[-5, 5, -5]} intensity={1} color="#c9a84c" />
          <pointLight position={[5, -5, 5]} intensity={0.5} color="#ffffff" />
          <spotLight
            position={[0, 8, 0]}
            intensity={2}
            angle={0.3}
            penumbra={0.5}
            castShadow
          />

          <ProductModel color={color} />

          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.4}
            scale={6}
            blur={2.5}
            far={4}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}
