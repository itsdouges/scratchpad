import { createWorld } from "koota";
import { WorldProvider } from "koota/react";
import { useMemo, type ReactNode } from "react";
import { cameraFollowFocused } from "../src/entities/camera/systems";
import {
  velocityTowardsTarget,
  lookAtTarget,
} from "../src/entities/controller/systems";
import { cursorPositionFromLand } from "../src/entities/land/systems";
import { injectSystems } from "@triplex/api/koota";
import { meshFromPosition, positionFromVelocity } from "../src/shared/systems";

export function RootProviders({ children }: { children: ReactNode }) {
  const world = useMemo(() => createWorld(), []);

  return <WorldProvider world={world}>{children}</WorldProvider>;
}

export const KootaSystems = injectSystems(
  ({ children }) => <>{children}</>,
  [
    cursorPositionFromLand,
    velocityTowardsTarget,
    positionFromVelocity,
    meshFromPosition,
    cameraFollowFocused,
    lookAtTarget,
  ]
);
