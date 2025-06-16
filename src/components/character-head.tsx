import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Billboard } from "@react-three/drei";
import { useReducer, useRef } from "react";
import {
  Group,
  Vector3,
  MathUtils,
  SRGBColorSpace,
  MeshBasicMaterial,
} from "three";
import { CharacterHair } from "./character-hair";
import CustomShaderMaterial from "three-custom-shader-material";

const v1 = new Vector3();
const v2 = new Vector3();

interface FaceRenderable {
  index: number;
  reverse: boolean;
}

function faceReducer(
  prevState: FaceRenderable | undefined,
  nextState: FaceRenderable | undefined
): FaceRenderable | undefined {
  if (nextState === undefined || prevState === undefined) {
    return nextState;
  }

  if (
    prevState.index === nextState.index &&
    prevState.reverse === nextState.reverse
  ) {
    return prevState;
  }

  return nextState;
}

export function CharacterHead({
  position,
}: {
  position?: [x: number, y: number, z: number];
}) {
  const camera = useThree((state) => state.camera);
  const ref = useRef<Group>(null);
  const [face, setFace] = useReducer(faceReducer, { index: 0, reverse: false });
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

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    const cameraDirection = camera
      .getWorldDirection(v1)
      .setY(0)
      .normalize()
      .negate();

    const characterDirection = ref.current
      .getWorldDirection(v2)
      .setY(0)
      .normalize();

    const angle = MathUtils.radToDeg(
      Math.atan2(
        cameraDirection.x * characterDirection.z -
          cameraDirection.z * characterDirection.x,
        cameraDirection.x * characterDirection.x +
          cameraDirection.z * characterDirection.z
      )
    );
    const absoluteAngle = Math.abs(angle);

    let nextIndex: number | undefined;

    if (absoluteAngle < 20 && absoluteAngle >= 0) {
      nextIndex = 0;
    } else if (absoluteAngle < 80 && absoluteAngle >= 20) {
      nextIndex = 1;
    } else if (absoluteAngle < 120 && absoluteAngle >= 80) {
      nextIndex = 2;
    } else if (absoluteAngle < 160 && absoluteAngle >= 120) {
      nextIndex = 3;
    } else {
      nextIndex = 4;
    }

    if (typeof nextIndex === "number") {
      setFace({ index: nextIndex, reverse: angle < 0 });
    } else {
      setFace(undefined);
    }
  });

  return (
    <>
      <group ref={ref} />
      <group position={position}>
        <Billboard>
          <mesh
            scale={[face?.reverse ? -1 : 1, 1, 1]}
            visible={face ? !!textures[face.index] : false}
          >
            <planeGeometry />
            <CustomShaderMaterial
              alphaTest={0.5}
              map={face ? textures[face.index] : undefined}
              transparent
              vertexShader={`
                void main() {
                  vec4 mv = modelViewMatrix * vec4(position, 1.0);
                  mv.z += 0.2;
                  csm_PositionRaw = projectionMatrix * mv;
                }
              `}
              baseMaterial={MeshBasicMaterial}
            />
          </mesh>
          <CharacterHair reverse={!face?.reverse} visible={face?.index} />
        </Billboard>
      </group>
    </>
  );
}
