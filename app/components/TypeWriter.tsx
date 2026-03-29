"use client";

import { useEffect, useState, useRef } from "react";

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TypeWriter({ texts, speed = 80, className = "", cursorClassName = "" }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState(texts[0] || "");
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Don't run if texts array is empty
    if (!texts || texts.length === 0) return;

    const currentText = texts[textIndex];
    
    const type = () => {
      if (displayText.length < currentText.length) {
        setDisplayText(currentText.slice(0, displayText.length + 1));
        timeoutRef.current = setTimeout(type, speed);
      } else {
        // Finished typing, wait then delete or move to next
        timeoutRef.current = setTimeout(() => {
          if (textIndex < texts.length - 1) {
            setTextIndex(textIndex + 1);
            setDisplayText("");
          } else {
            // Start deleting
            setIsTyping(false);
          }
        }, 2500);
      }
    };

    const deleteText = () => {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
        timeoutRef.current = setTimeout(deleteText, speed / 2);
      } else {
        // Move to next text
        setTextIndex((textIndex + 1) % texts.length);
        setIsTyping(true);
      }
    };

    if (isTyping) {
      timeoutRef.current = setTimeout(type, speed);
    } else {
      timeoutRef.current = setTimeout(deleteText, speed / 2);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [textIndex, texts, speed, isTyping, displayText.length]);

  return (
    <span className={className}>
      {displayText}
      <span className={`animate-pulse ${cursorClassName}`}>|</span>
    </span>
  );
}
