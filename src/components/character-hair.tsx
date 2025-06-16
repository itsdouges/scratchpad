import { DataMesh } from "./data-mesh";
import data from "../../public/assets/faces/messy/hair.json";
import { useTexture } from "@react-three/drei";
import { MathUtils } from "three";

export function CharacterHair({
  visible = 0,
  reverse,
  renderOrder,
}: {
  visible?: number;
  reverse?: boolean;
  renderOrder?: number;
}) {
  const texture = useTexture("/assets/faces/messy/hair.png");

  return (
    <DataMesh
      renderOrder={renderOrder}
      visible={visible}
      scale={[0.065, reverse ? -0.065 : 0.065, 0.065]}
      rotation={[0, 0, MathUtils.degToRad(90)]}
      data={data}
      position={[0, -0.27, 0]}
    >
      <meshBasicMaterial alphaTest={0.5} transparent map={texture} />
    </DataMesh>
  );
}
