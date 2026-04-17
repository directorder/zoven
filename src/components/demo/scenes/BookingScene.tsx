import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

export default function BookingScene() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) ring1.current.rotation.z = t * 0.22
    if (ring2.current) ring2.current.rotation.x = Math.PI / 2.5 + t * 0.16
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.12
      ring3.current.rotation.z = -t * 0.07
    }
    if (core.current) {
      core.current.position.y = Math.sin(t * 0.5) * 0.15
      core.current.rotation.y = t * 0.6
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#00c8e8" distance={8} />
      <directionalLight position={[4, 5, 4]} intensity={1.8} color="#ffe8b0" />
      <pointLight position={[-4, -3, -3]} intensity={0.9} color="#003366" />
      <Environment preset="sunset" />

      {/* Outer water ring */}
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.2, 0.055, 16, 128]} />
        <meshStandardMaterial color="#00c8e8" metalness={0.7} roughness={0.12} transparent opacity={0.85} />
      </mesh>

      {/* Mid ring */}
      <mesh ref={ring2} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.55, 0.042, 16, 100]} />
        <meshStandardMaterial color="#40d8f4" metalness={0.75} roughness={0.08} transparent opacity={0.72} />
      </mesh>

      {/* Gold accent ring */}
      <mesh ref={ring3} rotation={[0, 0, Math.PI / 4.5]}>
        <torusGeometry args={[0.88, 0.042, 16, 80]} />
        <meshStandardMaterial color="#d4a060" metalness={0.85} roughness={0.1} />
      </mesh>

      {/* Glass orb center */}
      <mesh ref={core}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshPhysicalMaterial
          color="#a0f0ff"
          metalness={0.0}
          roughness={0.0}
          transmission={0.95}
          ior={1.5}
          thickness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
    </>
  )
}
