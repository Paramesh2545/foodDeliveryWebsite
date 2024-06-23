// import useSpline from '@splinetool/r3f-spline'
// import { OrthographicCamera } from '@react-three/drei'

// export default function Background({ ...props }) {
//   const { nodes, materials } = useSpline('https://prod.spline.design/zOk1At-vF8qdaQ-R/scene.splinecode')
//   return (
//     <>
//       <color attach="background" args={['#c2f8fc']} />
//       <group {...props} dispose={null}>
//         <scene name="Scene">
//           <OrthographicCamera
//             name="Camera"
//             makeDefault={true}
//             zoom={4.51}
//             far={100000}
//             near={-100000}
//             up={[0, 1, 0]}
//             position={[-166.74, 60.03, 990.12]}
//             rotation={[-0.03, -0.14, 0]}
//             scale={1}
//           />
//           <mesh
//             name="Sphere 2"
//             geometry={nodes['Sphere 2'].geometry}
//             material={materials['Sphere 2 Material']}
//             castShadow
//             receiveShadow
//             position={[34.24, 34.24, -350.04]}
//             rotation={[0, 0, -0.98]}
//           />
//           <OrthographicCamera name="1" makeDefault={false} far={10000} near={-50000} />
//           <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
//         </scene>
//       </group>
//     </>
//   )
// }
