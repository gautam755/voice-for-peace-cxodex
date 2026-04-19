import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  colorShift?: boolean;
  glitch?: boolean;
}

/**
 * DESIGN PHILOSOPHY: Neo-Surrealism Digital Art Gallery
 * AnimatedText creates engaging text animations with staggered reveals and color morphing
 */

export function AnimatedText({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  colorShift = false,
  glitch = false,
}: AnimatedTextProps) {
  const letters = text.split('');
  
  const colors = [
    '#00D9FF', // teal
    '#9D4EDD', // purple
    '#FF6B35', // orange
    '#39FF14', // lime
    '#FF006E', // pink
  ];

  return (
    <motion.div className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * stagger,
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="inline-block"
          style={{
            color: colorShift ? colors[index % colors.length] : 'inherit',
          }}
        >
          {glitch ? (
            <motion.span
              animate={{
                x: [0, -2, 2, -2, 0],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 0.3,
                delay: delay + index * stagger + 0.5,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              {letter}
            </motion.span>
          ) : (
            letter
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function AnimatedTextBlock({
  text,
  className = '',
  delay = 0,
  colorShift = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  colorShift?: boolean;
}) {
  const words = text.split(' ');
  
  const colors = [
    '#00D9FF',
    '#9D4EDD',
    '#FF6B35',
    '#39FF14',
    '#FF006E',
  ];

  return (
    <motion.div className={`inline ${className}`}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={`word-${wordIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + wordIndex * 0.1,
            duration: 0.6,
            ease: 'easeOut',
          }}
          className="inline-block mr-2"
          style={{
            color: colorShift ? colors[wordIndex % colors.length] : 'inherit',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
