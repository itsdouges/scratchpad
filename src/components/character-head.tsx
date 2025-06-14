import { Billboard, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Vector3 } from "three";

export function CharacterHead() {
  const camera = useThree((state) => state.camera);
  const surfaces = [1, 2, 3, 4, 5, 6, 7, 8];
  const [surface, setSurface] = useState<number | undefined>(surfaces[0]);
  const ref = useRef<Group>(null);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    const direction = ref.current.getWorldDirection(new Vector3()).normalize();
    const angle = Math.atan2(direction.x, direction.z) + Math.PI / 8; // Offset to match the surface numbering
    const index = Math.floor((angle / (Math.PI * 2)) * surfaces.length);
    const nextSurface = surfaces.at(index);

    setSurface(nextSurface);
  });

  return (
    <>
      <group ref={ref} />
      <Billboard>
        <mesh position={[0, 0.88, 0]}>
          <planeGeometry />
          <Text color="black" position={[0, 0, 0.02]}>
            {surface}
          </Text>
        </mesh>
      </Billboard>
    </>
  );
}
