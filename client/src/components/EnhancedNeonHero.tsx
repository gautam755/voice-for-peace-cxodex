import { motion } from 'framer-motion';
import { useState } from 'react';

interface Confetto {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  color: string;
}

export function EnhancedNeonHero() {
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const triggerConfetti = () => {
    const colors = ['#00D9FF', '#9D4EDD', '#FF6B35', '#39FF14', '#FF006E'];
    const newConfetti: Confetto[] = Array.from({ length: 100 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20 - 8,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 2500);
  };

  return (
    <div
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/landing-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-violet-950/55 to-black/80" />
      </div>

      {/* Confetti particles */}
      {confetti.map((conf) => (
        <motion.div
          key={conf.id}
          className="fixed w-4 h-4 rounded-full pointer-events-none"
          style={{ backgroundColor: conf.color }}
          initial={{ x: conf.x, y: conf.y, opacity: 1, rotate: conf.rotation }}
          animate={{
            x: conf.x + conf.vx * 40,
            y: conf.y + conf.vy * 40,
            opacity: 0,
            rotate: conf.rotation + 720,
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      ))}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient mesh */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          initial={{ left: '10%', top: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          initial={{ right: '10%', bottom: '10%' }}
        />

        {/* Floating shapes */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute w-20 h-20 border-2 border-white/10 rounded-lg"
            animate={{
              rotate: 360,
              x: [0, Math.cos(i) * 100, 0],
              y: [0, Math.sin(i) * 100, 0],
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
            initial={{
              left: `${20 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        {/* Main headline */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Your Voice
            </motion.span>
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-lime-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              is the Vibration of Change
            </motion.span>
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 font-accent mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Every voice matters. Every action counts. Together, we create the future we want to see.
            <br />
            <span className="text-cyan-400 font-bold">Join millions speaking for peace.</span>
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.button
            onClick={() => {
              triggerConfetti();
              scrollToSection('take-action');
            }}
            className="px-12 py-6 text-xl font-black rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 text-gray-900 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 transition-all relative overflow-hidden"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 opacity-0 rounded-full"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">Start Your Journey</span>
          </motion.button>

          <motion.button
            onClick={() => scrollToSection('peace-history')}
            className="px-12 py-6 text-xl font-black rounded-full border-2 border-white text-white hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { number: '195+', label: 'Countries' },
            { number: '10M+', label: 'Voices' },
            { number: '1B+', label: 'Reached' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <motion.p
                className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                {stat.number}
              </motion.p>
              <p className="text-white/60 font-accent mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1), transparent)',
          borderRadius: '50%',
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          zIndex: 5,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
