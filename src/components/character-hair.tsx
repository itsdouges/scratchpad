import { DataMesh } from "./data-mesh";
import data from "../../public/assets/faces/messy/hair.json";
import { useTexture } from "@react-three/drei";
import { MathUtils, MeshBasicMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

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
      <CustomShaderMaterial
        alphaTest={0.5}
        map={texture}
        transparent
        vertexShader={`
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            mv.z += 0.1;
            csm_PositionRaw = projectionMatrix * mv;
          }
        `}
        baseMaterial={MeshBasicMaterial}
      />
    </DataMesh>
  );
}
