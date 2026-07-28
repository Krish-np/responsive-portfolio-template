"use client";

import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Environment } from "@react-three/drei";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { skillCategories } from "@/data/portfolio";

interface SkillNodeProps {
  position: [number, number, number];
  label: string;
  proficiency: number;
  years: number;
}

function SkillNode({ position, label, proficiency, years }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
    }
  });

  const color = proficiency > 90 ? "#00E5FF" : proficiency > 80 ? "#7C3AED" : "#A855F7";
  const size = 0.08 + (proficiency / 100) * 0.06;

  return (
    <group position={position}>
      <Float speed={3} rotationIntensity={0} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 3 : 1}
            transparent
            opacity={hovered ? 1 : 0.8}
          />
        </mesh>

        {/* Glow sphere */}
        <mesh>
          <sphereGeometry args={[size * 1.5, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={hovered ? 0.2 : 0.05}
          />
        </mesh>

        {hovered && (
          <Html center distanceFactor={5} style={{ pointerEvents: "none" }}>
            <div className="glass-card-strong px-4 py-3 text-center whitespace-nowrap min-w-[140px]">
              <p className="text-white font-semibold text-sm">{label}</p>
              <p className="text-[#00E5FF] text-xs mt-1">{proficiency}% · {years}yr{years > 1 ? "s" : ""}</p>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#00E5FF]"
                  style={{ width: `${proficiency}%` }}
                />
              </div>
            </div>
          </Html>
        )}

        {/* Label below node */}
        <Text
          position={[0, -size - 0.15, 0]}
          fontSize={0.08}
          color="white"
          anchorX="center"
          anchorY="top"
          fillOpacity={hovered ? 1 : 0.5}
        >
          {label}
        </Text>
      </Float>
    </group>
  );
}

function SkillCloud() {
  const groupRef = useRef<THREE.Group>(null);
  const allSkills = useMemo(() => {
    const skills: { name: string; label: string; proficiency: number; years: number; category: string }[] = [];
    skillCategories.forEach((cat) => {
      cat.skills.forEach((skill) => {
        skills.push({ ...skill, label: skill.name, category: cat.name });
      });
    });
    return skills;
  }, []);

  const positions = useMemo(() => {
    return allSkills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / allSkills.length);
      const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
      const radius = 2.5 + Math.random() * 0.5;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, [allSkills]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {allSkills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={positions[i]}
          label={skill.label}
          proficiency={skill.proficiency}
          years={skill.years}
        />
      ))}

      {/* Central connecting lines effect */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function SkillSphere() {
  return (
    <div className="w-full h-[600px] md:h-[700px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.6} color="#7C3AED" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#00E5FF" />
          <SkillCloud />
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Instruction overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs">
        Hover over nodes to see details
      </div>
    </div>
  );
}
