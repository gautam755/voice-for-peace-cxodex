import { motion } from 'framer-motion';

/**
 * DESIGN PHILOSOPHY: Neo-Surrealism Digital Art Gallery
 * MorphingShapes creates organic, flowing animated shapes that evolve and transform
 */

export function MorphingCircle({
  size = 100,
  color = '#00D9FF',
  duration = 4,
  delay = 0,
  className = '',
}: {
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `drop-shadow(0 0 20px ${color})`,
      }}
      animate={{
        scale: [1, 1.2, 0.9, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function MorphingBlob({
  size = 120,
  color = '#9D4EDD',
  duration = 6,
  delay = 0,
  className = '',
}: {
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.svg
      className={`absolute ${className}`}
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{
        filter: `drop-shadow(0 0 15px ${color})`,
      }}
    >
      <motion.path
        d="M 100,100 Q 150,50 150,100 Q 150,150 100,150 Q 50,150 50,100 Q 50,50 100,100"
        fill={color}
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
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}

export function MorphingTriangle({
  size = 100,
  color = '#FF6B35',
  duration = 5,
  delay = 0,
  className = '',
}: {
  size?: number;
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.svg
      className={`absolute ${className}`}
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{
        filter: `drop-shadow(0 0 15px ${color})`,
      }}
    >
      <motion.polygon
        points="100,20 180,160 20,160"
        fill={color}
        opacity="0.4"
        animate={{
          points: [
            '100,20 180,160 20,160',
            '100,10 190,170 10,170',
            '100,30 170,150 30,150',
            '100,20 180,160 20,160',
          ],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}

export function MorphingWave({
  width = 300,
  height = 100,
  color = '#39FF14',
  duration = 4,
  delay = 0,
  className = '',
}: {
  width?: number;
  height?: number;
  color?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.svg
      className={`absolute ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={{
        filter: `drop-shadow(0 0 10px ${color})`,
      }}
    >
      <motion.path
        d={`M 0,${height / 2} Q ${width / 4},${height / 4} ${width / 2},${height / 2} T ${width},${height / 2}`}
        stroke={color}
        strokeWidth="3"
        fill="none"
        animate={{
          d: [
            `M 0,${height / 2} Q ${width / 4},${height / 4} ${width / 2},${height / 2} T ${width},${height / 2}`,
            `M 0,${height / 2} Q ${width / 4},${height * 0.75} ${width / 2},${height / 2} T ${width},${height / 2}`,
            `M 0,${height / 2} Q ${width / 4},${height / 4} ${width / 2},${height / 2} T ${width},${height / 2}`,
          ],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}

export function FloatingParticles({
  count = 20,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  const particles = Array.from({ length: count });
  const colors = ['#00D9FF', '#9D4EDD', '#FF6B35', '#39FF14', '#FF006E'];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
