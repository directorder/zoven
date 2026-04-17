import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

export default function BarberScene() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const ring3 = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.16
      ring1.current.rotation.y = t * 0.10
    }
    if (ring2.current) {
      ring2.current.rotation.z = t * 0.20
      ring2.current.rotation.x = Math.PI / 3 + t * 0.08
    }
    if (ring3.current) {
      ring3.current.rotation.y = -t * 0.14
      ring3.current.rotation.z = t * 0.07
    }
    if (core.current) {
      core.current.rotation.y = t * 0.4
    }
  })

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[8, 8, 4]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-6, -4, 2]} intensity={0.6} color="#a0a0c0" />
      <spotLight position={[0, 10, 2]} intensity={2} penumbra={0.9} color="#ffffff" />
      <Environment preset="city" />

      {/* Outer chrome ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.9, 0.1, 32, 128]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.96} roughness={0.04} />
      </mesh>

      {/* Mid tilted ring */}
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
        <torusGeometry args={[1.3, 0.07, 32, 100]} />
        <meshStandardMaterial color="#e8e8f0" metalness={0.98} roughness={0.02} />
      </mesh>

      {/* Inner ring */}
      <mesh ref={ring3} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[0.78, 0.05, 16, 80]} />
        <meshStandardMaterial color="#c8c4bc" metalness={0.92} roughness={0.06} />
      </mesh>

      {/* Center sphere */}
      <mesh ref={core}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.0} />
      </mesh>
    </>
  )
}
