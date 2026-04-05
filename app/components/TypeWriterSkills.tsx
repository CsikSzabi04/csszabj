"use client";

import { useEffect, useState } from "react";

interface TypeWriterSkillsProps {
  words: string[];
  speed?: number;
  className?: string;
}

export default function TypeWriterSkills({ words, speed = 80, className = "" }: TypeWriterSkillsProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentCharIndex = 0;
    let timeout: NodeJS.Timeout;
    const currentWord = words[currentWordIndex];

    const type = () => {
      if (isTyping) {
        // Typing phase
        if (currentCharIndex <= currentWord.length) {
          setDisplayText(currentWord.slice(0, currentCharIndex));
          currentCharIndex++;
          timeout = setTimeout(type, speed);
        } else {
          // Finished typing, wait then delete
          setTimeout(() => setIsTyping(false), 1500);
        }
      } else {
        // Deleting phase
        if (currentCharIndex >= 0) {
          setDisplayText(currentWord.slice(0, currentCharIndex));
          currentCharIndex--;
          timeout = setTimeout(type, speed / 2);
        } else {
          // Move to next word
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setIsTyping(true);
        }
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentWordIndex, isTyping, words, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-blue-400">|</span>
    </span>
  );
}
