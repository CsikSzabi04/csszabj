"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  texts: readonly string[];
  speed?: number;
  pause?: number;
  className?: string;
  cursorClassName?: string;
  /**
   * Reserve the space of the largest text up front, so the layout below never moves while typing
   * (e.g. a two-line "Csík / Szabolcs" next to a one-line "Tester"). Every text is laid out
   * invisibly in the same grid cell; the cell takes the size of the biggest one at the current width.
   */
  reserveSpace?: boolean;
}

interface TypingState {
  index: number;
  length: number;
  deleting: boolean;
}

/** Types each text, pauses, deletes it and moves on to the next one – forever. */
export default function TypeWriter({
  texts,
  speed = 80,
  pause = 2500,
  className = "",
  cursorClassName = "",
  reserveSpace = false,
}: TypeWriterProps) {
  // Start with the first text fully written, so the server-rendered HTML is meaningful.
  const [state, setState] = useState<TypingState>(() => ({ index: 0, length: texts[0]?.length ?? 0, deleting: false }));

  const count = texts.length;
  const current = count > 0 ? texts[state.index % count] : "";
  const length = Math.min(state.length, current.length);

  useEffect(() => {
    if (count === 0) return;

    let next: TypingState;
    let delay: number;
    if (!state.deleting && length < current.length) {
      next = { ...state, length: length + 1 };
      delay = speed;
    } else if (!state.deleting) {
      next = { ...state, length, deleting: true };
      delay = pause;
    } else if (length > 0) {
      next = { ...state, length: length - 1 };
      delay = speed / 2;
    } else {
      next = { index: (state.index + 1) % count, length: 0, deleting: false };
      delay = speed * 4;
    }

    const timer = setTimeout(() => setState(next), delay);
    return () => clearTimeout(timer);
  }, [state, current, length, count, speed, pause]);

  const cursor = <span className={`animate-pulse ${cursorClassName}`}>|</span>;

  if (!reserveSpace) {
    return (
      <span className={className} aria-hidden="true">
        {current.slice(0, length)}
        {cursor}
      </span>
    );
  }

  return (
    <span className={`grid ${className}`} aria-hidden="true">
      {texts.map((text) => (
        <span key={text} className="invisible [grid-area:1/1]">
          {text}|
        </span>
      ))}
      <span className="[grid-area:1/1]">
        {current.slice(0, length)}
        {cursor}
      </span>
    </span>
  );
}
