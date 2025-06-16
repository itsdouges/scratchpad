import { useLayoutEffect, useRef } from "react";
import { ThreeElements } from "@react-three/fiber";
import { Float32BufferAttribute, MathUtils, type Mesh } from "three";

export interface MeshData {
  attributes: number[];
  meshes: { texture: number; indices: number[] }[];
}

export function DataMesh({
  children,
  data,
  ...props
}: ThreeElements["group"] & { data: MeshData }) {
  const ref = useRef<Mesh>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const geometry = ref.current.geometry;
    const vertices = data.attributes;
    const meshes = data.meshes;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i < vertices.length; i += 6) {
      positions.push(vertices[i], vertices[i + 1], vertices[i + 2]); // x, y, z
      uvs.push(vertices[i + 3], 1 - vertices[i + 4]); // Flip v: v = 1 - v
    }

    meshes.forEach((mesh) => {
      indices.push(...mesh.indices);
    });

    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
  }, []);

  return (
    <mesh {...props} ref={ref}>
      <bufferGeometry />
      {children}
    </mesh>
  );
}
