import { CharacterHead } from "./character-head";
import { CharacterBody } from "./character-body";

export function Character() {
  return (
    <group>
      <CharacterHead position={[0, 4.3, 0]} />
      <CharacterBody />
    </group>
  );
}
