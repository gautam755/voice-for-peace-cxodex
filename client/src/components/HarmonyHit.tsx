import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface FallingIcon {
  id: string;
  icon: string;
  lane: number;
  startTime: number;
}

export function HarmonyHit() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [fallingIcons, setFallingIcons] = useState<FallingIcon[]>([]);
  const [bgColor, setBgColor] = useState('from-purple-900 to-black');
  const gameTimeRef = useRef(0);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const icons = ['🎵', '🎶', '🎼', '🎹', '🎸'];
  const colors = [
    'from-cyan-500 to-blue-600',
    'from-purple-500 to-pink-600',
    'from-orange-500 to-red-600',
    'from-lime-400 to-green-600',
    'from-pink-500 to-rose-600',
  ];

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setCombo(0);
    setFallingIcons([]);
    gameTimeRef.current = 0;

    gameIntervalRef.current = setInterval(() => {
      gameTimeRef.current += 1;

      // Spawn new icons every 0.5 seconds
      if (gameTimeRef.current % 10 === 0) {
        const lane = Math.floor(Math.random() * 5);
        const icon = icons[Math.floor(Math.random() * icons.length)];
        setFallingIcons((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            icon,
            lane,
            startTime: gameTimeRef.current,
          },
        ]);
      }

      // Remove icons that fell off screen
      setFallingIcons((prev) =>
        prev.filter((icon) => gameTimeRef.current - icon.startTime < 100)
      );

      // End game after 30 seconds
      if (gameTimeRef.current > 300) {
        setGameActive(false);
        clearInterval(gameIntervalRef.current as NodeJS.Timeout);
      }
    }, 50);
  };

  const hitIcon = (id: string) => {
    setFallingIcons((prev) => prev.filter((icon) => icon.id !== id));
    setScore((prev) => prev + 10 * (combo + 1));
    setCombo((prev) => prev + 1);

    // Change background color based on score
    const colorIndex = Math.floor((score + 10) / 50) % colors.length;
    setBgColor(colors[colorIndex]);
  };

  const missIcon = (id: string) => {
    setFallingIcons((prev) => prev.filter((icon) => icon.id !== id));
    setCombo(0);
  };

  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current as NodeJS.Timeout);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className={`bg-gradient-to-b ${bgColor} rounded-3xl p-8 relative overflow-hidden transition-all duration-300`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Score display */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="text-white">
            <p className="text-sm font-accent text-gray-300">Score</p>
            <p className="text-4xl font-black text-cyan-400">{score}</p>
          </div>
          <div className="text-white">
            <p className="text-sm font-accent text-gray-300">Combo</p>
            <p className="text-4xl font-black text-orange-400">{combo}</p>
          </div>
        </div>

        {/* Game area */}
        <div className="relative h-96 bg-black/30 rounded-2xl overflow-hidden border-2 border-white/20 mb-8">
          {/* Lanes */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3, 4].map((lane) => (
              <div key={lane} className="flex-1 border-r border-white/10 relative">
                {/* Hit zone at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cyan-500/20 to-transparent border-t-2 border-cyan-400" />
              </div>
            ))}
          </div>

          {/* Falling icons */}
          <AnimatePresence>
            {fallingIcons.map((item) => {
              const laneWidth = 100 / 5;
              const xPos = laneWidth * item.lane + laneWidth / 2;
              const progress = (gameTimeRef.current - item.startTime) / 100;

              return (
                <motion.button
                  key={item.id}
                  className="absolute w-12 h-12 text-3xl flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/50 cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    left: `${xPos}%`,
                    top: `${progress * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                  onClick={() => {
                    if (progress > 0.7 && progress < 0.95) {
                      hitIcon(item.id);
                    } else {
                      missIcon(item.id);
                    }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  {item.icon}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 relative z-10">
          {!gameActive ? (
            <motion.button
              onClick={startGame}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-900 font-bold text-lg shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Start Game
            </motion.button>
          ) : (
            <div className="text-white font-bold text-lg">
              Tap the icons when they reach the zone! 🎵
            </div>
          )}
        </div>
      </motion.div>

      <p className="text-center text-gray-400 mt-4 font-accent">
        Synchronize with the Peace Beat! 🎶
      </p>
    </div>
  );
}
