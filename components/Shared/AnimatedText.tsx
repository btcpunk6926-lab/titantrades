import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

export const Character: React.FC<{
    char: string;
    index: number;
    total: number;
    progress: any;
    range: [number, number];
    className?: string
}> = ({ char, index, total, progress, range, className }) => {
    const start = range[0] + (index / total) * (range[1] - range[0]);
    const end = Math.min(start + (range[1] - range[0]) * 0.2, range[1]);

    const opacity = useTransform(progress, [start, end], [0, 1]);
    const y = useTransform(progress, [start, end], [10, 0]);

    return (
        <motion.span
            style={{ opacity, y, display: 'inline-block' }}
            className={className || ""}
        >
            {char}
        </motion.span>
    );
};

export const Word: React.FC<{
    word: string;
    startIndex: number;
    totalChars: number;
    progress: any;
    range: [number, number];
    className?: string
}> = ({ word, startIndex, totalChars, progress, range, className }) => {
    return (
        <span className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split("").map((char, i) => (
                <Character
                    key={i}
                    char={char}
                    index={startIndex + i}
                    total={totalChars}
                    progress={progress}
                    range={range}
                    className={className}
                />
            ))}
        </span>
    );
};

export const AnimatedText: React.FC<{
    text: string;
    progress: any;
    range: [number, number];
    className?: string
}> = ({ text, progress, range, className }) => {
    const words = text.split(" ");
    const totalChars = text.length;

    return (
        <span className={`${className || ""} inline-block`}>
            {words.map((word, i) => {
                const wordOffset = words.slice(0, i).reduce((acc, w) => acc + w.length, 0) + i;
                return (
                    <Word
                        key={i}
                        word={word}
                        startIndex={wordOffset}
                        totalChars={totalChars}
                        progress={progress}
                        range={range}
                    />
                );
            })}
        </span>
    );
};
