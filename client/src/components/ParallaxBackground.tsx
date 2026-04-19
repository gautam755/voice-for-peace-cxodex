import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * DESIGN PHILOSOPHY: Neo-Surrealism Digital Art Gallery
 * ParallaxBackground creates immersive multi-layered depth effects
 * as users scroll through the page
 */

interface ParallaxLayer {
  id: number;
  depth: number; // 0 = background (moves slowest), 1 = foreground (moves fastest)
  element: React.ReactNode;
  className?: string;
}

interface ParallaxBackgroundProps {
  layers: ParallaxLayer[];
  className?: string;
}

export function ParallaxBackground({ layers, className = '' }: ParallaxBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {layers.map((layer) => (
        <motion.div
          key={layer.id}
          className={`absolute inset-0 ${layer.className || ''}`}
          style={{
            y: scrollY * layer.depth,
            willChange: 'transform',
          }}
        >
          {layer.element}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Parallax Layer Components - Pre-built layers for common use cases
 */

export function ParallaxGradientLayer({
  colors,
  depth = 0.3,
}: {
  colors: string[];
  depth?: number;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{
        y: scrollY * depth,
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
        willChange: 'transform',
      }}
    />
  );
}

export function ParallaxShapeLayer({
  shapes,
  depth = 0.5,
}: {
  shapes: Array<{
    id: number;
    shape: 'circle' | 'blob' | 'triangle';
    size: number;
    color: string;
    x: string;
    y: string;
    opacity: number;
  }>;
  depth?: number;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        y: scrollY * depth,
        willChange: 'transform',
      }}
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.shape === 'circle' && (
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
                boxShadow: `0 0 30px ${shape.color}`,
              }}
            />
          )}
          {shape.shape === 'blob' && (
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <motion.path
                d="M 100,100 Q 150,50 150,100 Q 150,150 100,150 Q 50,150 50,100 Q 50,50 100,100"
                fill={shape.color}
                opacity="0.4"
                animate={{
                  d: [
                    'M 100,100 Q 150,50 150,100 Q 150,150 100,150 Q 50,150 50,100 Q 50,50 100,100',
                    'M 100,100 Q 160,60 160,110 Q 140,160 100,160 Q 40,140 40,100 Q 60,40 100,100',
                    'M 100,100 Q 140,40 160,100 Q 150,160 100,170 Q 50,150 40,100 Q 50,50 100,100',
                    'M 100,100 Q 150,50 150,100 Q 150,150 100,150 Q 50,150 50,100 Q 50,50 100,100',
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  filter: `drop-shadow(0 0 20px ${shape.color})`,
                }}
              />
            </svg>
          )}
          {shape.shape === 'triangle' && (
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon
                points="100,20 180,160 20,160"
                fill={shape.color}
                opacity="0.4"
                style={{
                  filter: `drop-shadow(0 0 20px ${shape.color})`,
                }}
              />
            </svg>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ParallaxTextLayer({
  text,
  depth = 0.7,
  className = '',
}: {
  text: string;
  depth?: number;
  className?: string;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none flex items-center justify-center ${className}`}
      style={{
        y: scrollY * depth,
        willChange: 'transform',
      }}
    >
      <p className="text-6xl md:text-8xl font-black text-white/10 text-center">{text}</p>
    </motion.div>
  );
}

/**
 * useParallax Hook - For custom parallax effects on specific elements
 */

export function useParallax(depth: number = 0.5) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    y: scrollY * depth,
    style: {
      transform: `translateY(${scrollY * depth}px)`,
      willChange: 'transform',
    },
  };
}
