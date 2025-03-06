import { useGLTF } from '@react-three/drei';

export default function Camera(props) {
  const { nodes, materials } = useGLTF('/objects/camera/scene.gltf'); // Ensure the path is correct

  // You can adjust the scale below as needed (x, y, z) axes
  return (
    <group {...props} scale={[2, 2, 2]}>  {/* Example scale: doubles the size on all axes */}
      <mesh geometry={nodes.Object_2.geometry} material={materials.material_1} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  );
}

useGLTF.preload('/objects/camera/scene.gltf');