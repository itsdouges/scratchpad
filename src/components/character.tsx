import { CharacterHead } from "./character-head";
import { CharacterBody } from "./character-body";

export function Character() {
  return (
    <group scale={0.065}>
      <CharacterHead position={[0, 61, 0]} />
      <CharacterBody />
    </group>
  );
}
