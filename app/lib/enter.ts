import type { CSSProperties } from "react";

/** Delay for the `.enter-up` / `.enter-scale` CSS entrance animations (see globals.css). */
export const enterDelay = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties;
