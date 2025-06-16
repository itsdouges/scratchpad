import { useLayoutEffect, useRef } from "react";
import { ThreeElements } from "@react-three/fiber";
import { Float32BufferAttribute, MathUtils, type Mesh } from "three";

export interface MeshData {
  attributes: number[];
  meshes: { texture: number; indices: number[] }[];
}

export interface DrawRange {
  index: number;
  start: number;
  count: number;
}

export function DataMesh({
  children,
  data,
  visible = true,
  ...props
}: Omit<ThreeElements["group"], "visible"> & {
  data: MeshData;
  visible?: boolean | number;
}) {
  const ref = useRef<Mesh>(null);
  const drawRanges = useRef<DrawRange[]>([]);

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

    const ranges: DrawRange[] = [];

    meshes.forEach((mesh, index) => {
      const start = indices.length;
      const count = mesh.indices.length;

      indices.push(...mesh.indices);

      ranges.push({
        start,
        count,
        index,
      });
    });

    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    drawRanges.current = ranges;
  }, []);

  useLayoutEffect(() => {
    const geometry = ref.current?.geometry;
    if (!geometry) {
      return;
    }

    if (visible === false) {
      geometry.setDrawRange(0, 0);
    } else if (visible === true) {
      geometry.setDrawRange(0, Infinity);
    } else {
      const range = drawRanges.current[visible];
      if (range) {
        geometry.setDrawRange(range.start, range.count);
      } else {
        console.warn(`No draw range found for index ${visible}`);
        geometry.setDrawRange(0, Infinity);
      }
    }
  }, [visible]);

  return (
    <group {...props}>
      <mesh ref={ref}>
        <bufferGeometry />
        {children}
      </mesh>
    </group>
  );
}
