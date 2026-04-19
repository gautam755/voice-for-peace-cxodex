import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Confetto {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  color: string;
}

export function NeonHeroButton({ onClick }: { onClick?: () => void }) {
  const [confetti, setConfetti] = useState<Confetto[]>([]);

  const triggerConfetti = () => {
    const colors = ['#00D9FF', '#9D4EDD', '#FF6B35', '#39FF14', '#FF006E'];
    const newConfetti: Confetto[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15 - 5,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(newConfetti);

    // Animate and remove confetti
    setTimeout(() => setConfetti([]), 2000);

    onClick?.();
  };

  return (
    <div className="relative">
      {/* Confetti particles */}
      {confetti.map((conf, idx) => (
        <motion.div
          key={conf.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none"
          style={{ backgroundColor: conf.color }}
          initial={{ x: conf.x, y: conf.y, opacity: 1, rotate: conf.rotation }}
          animate={{
            x: conf.x + conf.vx * 30,
            y: conf.y + conf.vy * 30,
            opacity: 0,
            rotate: conf.rotation + 360,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      ))}

      {/* Main button */}
      <motion.button
        onClick={triggerConfetti}
        className="px-12 py-6 text-2xl font-black rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 text-gray-900 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 transition-all duration-300 relative overflow-hidden"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 opacity-0 rounded-3xl"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="relative z-10">Start Your Journey</span>
      </motion.button>
    </div>
  );
}
