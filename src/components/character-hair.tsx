import { DataMesh } from "./data-mesh";
import data from "../../public/assets/faces/messy/hair.json";
import { useTexture } from "@react-three/drei";

export function CharacterHair() {
  const texture = useTexture("/assets/faces/messy/hair.png");

  return (
    <DataMesh scale={0.065} data={data}>
      <meshBasicMaterial map={texture} />
    </DataMesh>
  );
}
