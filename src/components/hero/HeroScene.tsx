import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function OrbitalRing({
  radius,
  tube,
  rotX,
  rotY,
  rotZ,
  color,
  speed,
}: {
  radius: number
  tube: number
  rotX: number
  rotY: number
  rotZ: number
  color: string
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed
      ref.current.rotation.y += delta * speed * 0.3
    }
  })
  return (
    <Torus ref={ref} args={[radius, tube, 64, 128]} rotation={[rotX, rotY, rotZ]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </Torus>
  )
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })
  return (
    <Sphere ref={ref} args={[0.55, 64, 64]}>
      <MeshDistortMaterial
        color="#0d1a2e"
        emissive="#00d4ff"
        emissiveIntensity={0.08}
        metalness={0.95}
        roughness={0.05}
        distort={0.15}
        speed={1.5}
        transparent
        opacity={0.85}
      />
    </Sphere>
  )
}

function Particles() {
  const count = 80
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8
  }
  const ref = useRef<THREE.Points>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.04
    }
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00d4ff" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#00d4ff" />
      <pointLight position={[-3, -3, 2]} intensity={2} color="#7c3aed" />
      <pointLight position={[0, 0, 4]} intensity={1} color="#ffffff" />

      <CoreSphere />

      {/* Main outer ring - cyan */}
      <OrbitalRing
        radius={1.4}
        tube={0.04}
        rotX={Math.PI / 2.5}
        rotY={0}
        rotZ={0}
        color="#00d4ff"
        speed={0.35}
      />

      {/* Second ring - purple/violet */}
      <OrbitalRing
        radius={1.4}
        tube={0.035}
        rotX={Math.PI / 2}
        rotY={Math.PI / 3}
        rotZ={Math.PI / 4}
        color="#7c3aed"
        speed={-0.25}
      />

      {/* Inner ring - light blue */}
      <OrbitalRing
        radius={1.0}
        tube={0.025}
        rotX={0}
        rotY={Math.PI / 5}
        rotZ={Math.PI / 3}
        color="#60a5fa"
        speed={0.5}
      />

      {/* Outer glow ring */}
      <OrbitalRing
        radius={1.8}
        tube={0.015}
        rotX={Math.PI / 3}
        rotY={Math.PI / 6}
        rotZ={0}
        color="#00d4ff"
        speed={0.15}
      />

      <Particles />
    </>
  )
}
