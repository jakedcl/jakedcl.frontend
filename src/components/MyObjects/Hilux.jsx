import { useGLTF } from '@react-three/drei';

export function Model(props) {
  // Corrected path for the GLTF file
  const { nodes, materials } = useGLTF('/objects/toyota_hilux_pr/scene.gltf');

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI, 0, 0]}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.Material__166} />
        <mesh geometry={nodes.Object_3.geometry} material={materials['7___Default']} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.aluminio01} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.black} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.body_color} />
        {/* You can add more meshes if necessary */}
      </group>
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/objects/toyota_hilux_pr/scene.gltf');