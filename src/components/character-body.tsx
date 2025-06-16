import { DataMesh } from "./data-mesh";
import data from "../../public/assets/classes/warrior.json";
import { useTexture } from "@react-three/drei";
import { MathUtils } from "three";

export function CharacterBody() {
  const texture = useTexture("/assets/classes/warrior.png");

  return (
    <DataMesh rotation={[0, MathUtils.degToRad(-180), 0]} data={data}>
      <meshBasicMaterial map={texture} />
    </DataMesh>
  );
}
