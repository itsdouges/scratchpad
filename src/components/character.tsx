import { CharacterHead } from "./character-head";

export function Character() {
  return (
    <group>
      <CharacterHead />
      <mesh castShadow position={[0, 0.4, 0]} receiveShadow>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
}
