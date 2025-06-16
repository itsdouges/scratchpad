import { DataMesh } from "./data-mesh";
import data from "../../public/assets/faces/messy/hair.json";
import { useTexture } from "@react-three/drei";
import { MathUtils } from "three";

export function CharacterHair({
  index = 0,
  reverse,
}: {
  index?: number;
  reverse?: boolean;
}) {
  const texture = useTexture("/assets/faces/messy/hair.png");

  return (
    <DataMesh
      index={index}
      scale={[1, reverse ? -1 : 1, 1]}
      rotation={[0, 0, MathUtils.degToRad(90)]}
      data={data}
    >
      <meshBasicMaterial alphaTest={0.5} map={texture} transparent />
    </DataMesh>
  );
}
