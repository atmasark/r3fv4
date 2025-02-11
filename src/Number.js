import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import lerp from 'lerp'
import Text from './Text'

export default function Number({ mouse }) {
  const ref = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = lerp(ref.current.position.x, mouse.current[0] / aspect / 10, 0.1)
      ref.current.rotation.x = lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 50, 0.1)
      ref.current.rotation.y = 0.2
    }
  })
  return (
    <Suspense fallback={null}>
      <group ref={ref}>
        <Text size={2}>Rauno</Text>
      </group>
    </Suspense>
  )
}
