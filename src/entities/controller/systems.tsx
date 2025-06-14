import { distance, multiply, normalize, subtract } from "../../shared/math";
import { Mesh, Position, Target, Velocity } from "../../shared/traits";
import { createSystem } from "@triplex/api/koota";
import { Controllable, Speed } from "./traits";

/**
 * Sets the velocity of controllable entities towards the direction of the
 * target position. When the entity is close to the target, it slows down and
 * eventually stops.
 */
export const velocityTowardsTarget = createSystem((world, delta) => {
  const entities = world.query(Controllable, Position, Velocity);
  const target = world.queryFirst(Position, Target);

  const targetPosition = target?.get(Position);
  if (!targetPosition) {
    return;
  }

  for (const entity of entities) {
    const position = entity.get(Position);
    const speed = entity.get(Speed)?.value || 1;

    if (position) {
      const distanceToTarget = distance(position, targetPosition);
      const stoppingDistance = delta * 3;

      // Calculate a speed factor that gradually approaches zero as we near the target
      const speedFactor = Math.max(
        0,
        Math.min(1, (distanceToTarget - stoppingDistance) / stoppingDistance)
      );

      // Apply the speed factor to smoothly transition to zero velocity
      const targetVelocity = multiply(
        normalize(subtract(targetPosition, position)),
        // Square for more natural deceleration
        speed * speedFactor * speedFactor
      );

      entity.set(Velocity, targetVelocity);
    }
  }
});

export const lookAtTarget = createSystem((world) => {
  const entities = world.query(Controllable, Velocity, Mesh);
  const target = world.queryFirst(Position, Target);
  const targetPosition = target?.get(Position);

  if (!targetPosition) {
    return;
  }

  for (const entity of entities) {
    const position = entity.get(Position);
    const mesh = entity.get(Mesh);

    if (position && mesh) {
      // Set the rotation of the mesh to look at the target
      mesh.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);

      // Rotation should be capped to octagonal movement
      const r = mesh.rotation;
      r.x = Math.round(r.x / (Math.PI / 4)) * (Math.PI / 4);
      r.y = Math.round(r.y / (Math.PI / 4)) * (Math.PI / 4);
      r.z = Math.round(r.z / (Math.PI / 4)) * (Math.PI / 4);
    }
  }
}, "lookAtTarget");
