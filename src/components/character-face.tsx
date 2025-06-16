import { DataMesh } from "./data-mesh";
import data from "../../public/assets/faces/messy/face.json";
import { useTexture } from "@react-three/drei";
import { MathUtils, SRGBColorSpace } from "three";

export function CharacterFace({
  index,
  reverse,
}: {
  index?: number;
  reverse?: boolean;
}) {
  const textures = useTexture(
    [
      "/assets/faces/messy/face_1.png",
      "/assets/faces/messy/face_2.png",
      "/assets/faces/messy/face_3.png",
      "/assets/faces/messy/face_4.png",
    ],
    (textures) =>
      textures.forEach((texture) => {
        texture.colorSpace = SRGBColorSpace;
      })
  );

  return (
    <DataMesh
      index={index}
      scale={[1, reverse ? -1 : 1, 1]}
      rotation={[0, 0, MathUtils.degToRad(90)]}
      data={data}
    >
      <meshBasicMaterial
        alphaTest={0.5}
        map={typeof index == "number" ? textures[index] : undefined}
        transparent
      />
    </DataMesh>
  );
}
