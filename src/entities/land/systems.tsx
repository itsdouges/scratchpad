import { Mesh, Position } from "../../shared/traits";
import { Cursor } from "../cursor/traits";
import { Land } from "./traits";
import { createSystem } from "@triplex/api/koota";

/**
 * Updates the cursor trait position based on where the React Three Fiber
 * pointer intersects land entities.
 */
export const cursorPositionFromLand = createSystem((world, _, state) => {
  const lands = world.query(Land, Mesh);
  const cursor = world.queryFirst(Cursor, Position);

  if (!cursor || lands.length === 0) {
    return;
  }

  state.raycaster.setFromCamera(state.pointer, state.raycaster.camera);

  const objects = lands.map((land) => land.get(Mesh)).filter((mesh) => !!mesh);

  const intersects = state.raycaster.intersectObjects(objects).at(0);

  if (intersects) {
    cursor.set(Position, {
      x: intersects.point.x,
      y: intersects.point.y,
      z: intersects.point.z,
    });
  }
});
