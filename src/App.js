import * as THREE from 'three'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import Effects from './Effects'
import Sparks from './Sparks'
import Particles from './Particles'
import Number from './Number'

export default function App() {
  const [down, set] = useState(false)
  const mouse = useRef([0, 0])
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  return (
    <>
      <Canvas
        pixelRatio={Math.min(2, isMobile ? window.devicePixelRatio : 1)}
        camera={{ fov: 100, position: [0, 0, 30] }}
        onMouseMove={onMouseMove}
        onMouseUp={() => set(false)}
        onMouseDown={() => set(true)}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.Uncharted2ToneMapping
          gl.setClearColor(new THREE.Color('#020207'))
        }}>
        <pointLight distance={100} intensity={4} color="white" />
        <Number mouse={mouse} />
        <Particles count={isMobile ? 5000 : 10000} mouse={mouse} />
        <Sparks count={20} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']} />
        <Effects down={down} />
      </Canvas>
    </>
  )
}
