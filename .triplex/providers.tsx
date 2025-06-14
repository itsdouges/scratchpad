import { ComponentProps, type ReactNode } from "react";
import { KootaSystems, RootProviders } from "../src/providers";

export function GlobalProvider({ children }: { children: ReactNode }) {
  return <RootProviders>{children}</RootProviders>;
}

export function CanvasProvider({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<typeof KootaSystems>) {
  return <KootaSystems {...props}>{children}</KootaSystems>;
}
