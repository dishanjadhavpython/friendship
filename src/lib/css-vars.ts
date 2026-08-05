import type { CSSProperties } from "react";

/** Allows passing CSS custom properties (--foo) through React's style prop. */
export type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>;
