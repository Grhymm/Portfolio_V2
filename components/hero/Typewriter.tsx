"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { blinkCursor } from "@/lib/animations";

const TYPING_SPEED = 90;
const DELETING_SPEED = 50;
const PAUSE_AFTER_WORD = 1500;

export function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (!deleting && text === currentWord) {
      const timeout = setTimeout(() => setDeleting(true), PAUSE_AFTER_WORD);
      return () => clearTimeout(timeout);
    }

    if (deleting && text === "") {
      const timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setText((prev) =>
          deleting
            ? currentWord.slice(0, prev.length - 1)
            : currentWord.slice(0, prev.length + 1),
        );
      },
      deleting ? DELETING_SPEED : TYPING_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="text-accent">
      {text}
      <motion.span
        variants={blinkCursor}
        animate="animate"
        className="text-accent-bright"
      >
        |
      </motion.span>
    </span>
  );
}
