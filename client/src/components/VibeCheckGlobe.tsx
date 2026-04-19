import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlobeParticle {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
  city: string;
  message: string;
}

export function VibeCheckGlobe() {
  const [particles, setParticles] = useState<GlobeParticle[]>([]);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cities = [
    { name: 'Tokyo', x: 70, y: 35, message: 'Peace through harmony 🕊️' },
    { name: 'New York', x: 20, y: 40, message: 'United voices 🗽' },
    { name: 'London', x: 30, y: 45, message: 'Global unity 🌍' },
    { name: 'Dubai', x: 45, y: 35, message: 'Bridge of cultures 🌉' },
    { name: 'Sydney', x: 75, y: 25, message: 'Voices from the south 🦘' },
    { name: 'São Paulo', x: 25, y: 20, message: 'Latin harmony 🎶' },
  ];

  useEffect(() => {
    // Generate particles for the globe
    const newParticles: GlobeParticle[] = cities.map((city, idx) => ({
      id: `${city.name}-${idx}`,
      x: city.x,
      y: city.y,
      z: Math.random(),
      color: ['#00D9FF', '#9D4EDD', '#FF6B35', '#39FF14', '#FF006E'][idx % 5],
      city: city.name,
      message: city.message,
    }));

    // Add more random particles
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: `random-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random(),
        color: ['#00D9FF', '#9D4EDD', '#FF6B35', '#39FF14', '#FF006E'][
          Math.floor(Math.random() * 5)
        ],
        city: '',
        message: '',
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Globe container */}
        <div className="relative h-96 flex items-center justify-center">
          {/* Rotating globe background */}
          <motion.div
            className="absolute w-80 h-80 rounded-full border-2 border-cyan-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full border-2 border-purple-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Globe gradient background */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-orange-500/10 blur-3xl" />

          {/* Particles */}
          {particles.map((particle) => {
            const angle = (particle.x / 100) * Math.PI * 2;
            const radius = 120;
            const px = Math.cos(angle) * radius;
            const py = Math.sin(angle) * radius * 0.6;

            return (
              <motion.div
                key={particle.id}
                className="absolute w-3 h-3 rounded-full cursor-pointer"
                style={{ backgroundColor: particle.color }}
                animate={{
                  x: px,
                  y: py,
                  scale: particle.z > 0.5 ? 1 : 0.6,
                  opacity: particle.z > 0.5 ? 1 : 0.5,
                }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => particle.city && setHoveredCity(particle.city)}
                onMouseLeave={() => setHoveredCity(null)}
                whileHover={{ scale: 1.5 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: particle.color }}
                  animate={{
                    boxShadow: [
                      `0 0 10px ${particle.color}`,
                      `0 0 20px ${particle.color}`,
                      `0 0 10px ${particle.color}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            );
          })}

          {/* Hover tooltip */}
          {hoveredCity && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black/80 border border-cyan-400 rounded-lg px-4 py-2 text-white text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-bold text-cyan-400">{hoveredCity}</p>
              <p className="text-sm text-gray-300">
                {cities.find((c) => c.name === hoveredCity)?.message}
              </p>
            </motion.div>
          )}
        </div>

        {/* Info text */}
        <div className="text-center mt-8 relative z-10">
          <p className="text-white font-bold mb-2">Peace Pulses from Around the World</p>
          <p className="text-gray-400 font-accent text-sm">
            Hover over cities to see live messages from global users 🌍
          </p>
        </div>
      </motion.div>
    </div>
  );
}
