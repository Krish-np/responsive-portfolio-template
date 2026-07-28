"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AvatarCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.1;
      outerRef.current.rotation.z = t * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.1;
      ringRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group>
      {/* Main avatar sphere */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.2, 4]} />
          <MeshDistortMaterial
            color="#7C3AED"
            emissive="#4C1D95"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Outer wireframe sphere */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshStandardMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.15}
          emissive="#00E5FF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#A855F7"
          emissive="#A855F7"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Particle sparkles */}
      <Sparkles
        count={80}
        scale={6}
        size={2}
        speed={0.4}
        color="#7C3AED"
        opacity={0.5}
      />
      <Sparkles
        count={40}
        scale={5}
        size={1.5}
        speed={0.3}
        color="#00E5FF"
        opacity={0.4}
      />
    </group>
  );
}

function FloatingParticles() {
  const count = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
        speed: Math.random() * 0.5 + 0.1,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    positions.forEach((pos, i) => {
      dummy.position.set(
        pos.x + Math.sin(t * pos.speed + i) * 0.5,
        pos.y + Math.cos(t * pos.speed + i) * 0.5,
        pos.z + Math.sin(t * pos.speed * 0.5) * 0.3
      );
      dummy.scale.setScalar(Math.sin(t + i) * 0.3 + 0.5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

function BackgroundGradient() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[40, 40, 1]}>
      <planeGeometry />
      <shaderMaterial
        transparent
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color("#050816") },
          uColor2: { value: new THREE.Color("#1a0533") },
          uColor3: { value: new THREE.Color("#0a1628") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          void main() {
            vec3 color = mix(uColor1, uColor2, vUv.y);
            color = mix(color, uColor3, vUv.x * 0.5);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7C3AED" />
          <pointLight position={[5, -5, 5]} intensity={0.3} color="#00E5FF" />

          <BackgroundGradient />
          <AvatarCore />
          <FloatingParticles />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
