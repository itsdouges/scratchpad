import { DataMesh } from "./data-mesh";
import data from "../../public/assets/faces/messy/hair.json";
import { useTexture } from "@react-three/drei";
import { MathUtils } from "three";

export function CharacterHair({ visible = 0 }: { visible?: number }) {
  const texture = useTexture("/assets/faces/messy/hair.png");

  return (
    <DataMesh
      visible={visible}
      rotation={[0, 0, MathUtils.degToRad(90)]}
      scale={0.065}
      data={data}
      position={[0, -0.27, 0]}
    >
      <meshBasicMaterial alphaTest={0.5} transparent map={texture} />
    </DataMesh>
  );
}
