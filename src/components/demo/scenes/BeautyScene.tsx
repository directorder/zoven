import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

export default function BeautyScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.8} color="#fff6f0" />
      <pointLight position={[-5, 2, -2]} intensity={1.2} color="#e8b4c0" />
      <pointLight position={[4, -2, 3]} intensity={0.7} color="#c9a882" />
      <Environment preset="studio" />

      {/* Main organic blob */}
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
        <Sphere args={[1.1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#c9a882"
            distort={0.22}
            speed={1.4}
            roughness={0.1}
            metalness={0.4}
          />
        </Sphere>
      </Float>

      {/* Rose satellite */}
      <Float speed={2.0} rotationIntensity={0.5} floatIntensity={0.7}>
        <Sphere args={[0.44, 32, 32]} position={[2.1, 0.7, -0.4]}>
          <MeshDistortMaterial
            color="#e8b4c0"
            distort={0.28}
            speed={2.0}
            roughness={0.2}
            metalness={0.25}
          />
        </Sphere>
      </Float>

      {/* Cream small */}
      <Float speed={1.7} rotationIntensity={0.4} floatIntensity={0.5}>
        <Sphere args={[0.3, 32, 32]} position={[-2.0, 0.4, -0.3]}>
          <MeshDistortMaterial
            color="#f4e8e0"
            distort={0.32}
            speed={2.2}
            roughness={0.08}
            metalness={0.5}
          />
        </Sphere>
      </Float>

      {/* Tiny accent */}
      <Float speed={3.0} rotationIntensity={0.8} floatIntensity={1.0}>
        <Sphere args={[0.14, 16, 16]} position={[1.3, -1.2, 0.5]}>
          <MeshDistortMaterial
            color="#e8b4c0"
            distort={0.4}
            speed={3.0}
            roughness={0.05}
            metalness={0.6}
          />
        </Sphere>
      </Float>
    </group>
  )
}
