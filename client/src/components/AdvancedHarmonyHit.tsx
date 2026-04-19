import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface FallingNote {
  id: string;
  icon: string;
  lane: number;
  startTime: number;
  points: number;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const icons = ['🎵', '🎶', '🎼', '🎹', '🎸', '🥁', '🎺', '🎻'];
const colors = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-pink-600',
  'from-orange-500 to-red-600',
  'from-lime-400 to-green-600',
  'from-pink-500 to-rose-600',
];

const difficultySettings: Record<Difficulty, { spawnRate: number; duration: number; speed: number; roundLength: number; basePoints: number }> = {
  easy: { spawnRate: 15, duration: 400, speed: 80, roundLength: 400, basePoints: 10 },
  medium: { spawnRate: 10, duration: 300, speed: 100, roundLength: 300, basePoints: 25 },
  hard: { spawnRate: 7, duration: 250, speed: 120, roundLength: 250, basePoints: 50 },
};

export function AdvancedHarmonyHit() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [fallingNotes, setFallingNotes] = useState<FallingNote[]>([]);
  const [bgColor, setBgColor] = useState('from-purple-900 to-black');
  const [feedback, setFeedback] = useState('Pick a difficulty, then press Start Game.');
  const gameTimeRef = useRef(0);
  const gameIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const settings = difficultySettings[difficulty];
  const totalTime = settings.roundLength * 0.05;
  const timeRemaining = Math.max(0, totalTime - gameTimeRef.current * 0.05);

  const clearGameLoop = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
  };

  const startGame = () => {
    clearGameLoop();
    setGameActive(true);
    setGameEnded(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setFallingNotes([]);
    setBgColor('from-purple-900 to-black');
    setFeedback('Tap notes when they enter the glowing HIT ZONE.');
    gameTimeRef.current = 0;

    gameIntervalRef.current = setInterval(() => {
      gameTimeRef.current += 1;

      if (gameTimeRef.current % settings.spawnRate === 0) {
        const lane = Math.floor(Math.random() * 5);
        const icon = icons[Math.floor(Math.random() * icons.length)];
        setFallingNotes((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            icon,
            lane,
            startTime: gameTimeRef.current,
            points: settings.basePoints,
          },
        ]);
      }

      setFallingNotes((prev) => prev.filter((note) => gameTimeRef.current - note.startTime < settings.duration));

      if (gameTimeRef.current > settings.roundLength) {
        clearGameLoop();
        setGameActive(false);
        setGameEnded(true);
        setFeedback('Round complete. Press Play Again to try for a better combo.');
      }
    }, 50);
  };

  const hitNote = (id: string, note: FallingNote) => {
    setFallingNotes((prev) => prev.filter((n) => n.id !== id));
    setScore((prev) => {
      const nextScore = prev + note.points * (combo + 1);
      const colorIndex = Math.floor(nextScore / 100) % colors.length;
      setBgColor(colors[colorIndex]);
      return nextScore;
    });
    setCombo((prev) => {
      const nextCombo = prev + 1;
      setMaxCombo((best) => Math.max(best, nextCombo));
      return nextCombo;
    });
    setFeedback(`Nice timing. +${note.points} base points.`);
  };

  const missNote = () => {
    setCombo(0);
    setFeedback('Missed timing. Tap only when the note reaches the glowing bar.');
  };

  useEffect(() => clearGameLoop, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className={`bg-gradient-to-b ${bgColor} rounded-3xl p-8 relative overflow-hidden transition-all duration-300`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10 md:grid-cols-5">
          <motion.div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm font-accent text-gray-300">Score</p>
            <motion.p className="text-3xl font-black text-cyan-400" key={score} initial={{ scale: 1.2 }} animate={{ scale: 1 }}>
              {score}
            </motion.p>
          </motion.div>

          <motion.div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm font-accent text-gray-300">Combo</p>
            <motion.p className="text-3xl font-black text-orange-400" key={combo} initial={{ scale: 1.2 }} animate={{ scale: 1 }}>
              {combo}
            </motion.p>
          </motion.div>

          <motion.div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm font-accent text-gray-300">Max Combo</p>
            <p className="text-3xl font-black text-purple-400">{maxCombo}</p>
          </motion.div>

          <motion.div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm font-accent text-gray-300">Difficulty</p>
            <p className="text-2xl font-black text-lime-400">{difficulty.toUpperCase()}</p>
          </motion.div>

          <motion.div className="text-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-sm font-accent text-gray-300">Time</p>
            <p className="text-2xl font-black text-cyan-300">{timeRemaining.toFixed(1)}s</p>
          </motion.div>
        </div>

        <div className="mb-6 rounded-2xl border border-white/15 bg-black/25 p-5 text-white backdrop-blur-sm relative z-10">
          <p className="text-sm font-accent uppercase tracking-[0.25em] text-cyan-300">How To Play</p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div>
              <p className="text-sm font-black text-white">1. Start a round</p>
              <p className="text-sm text-white/75">Choose `Easy`, `Medium`, or `Hard`, then press Start Game.</p>
            </div>
            <div>
              <p className="text-sm font-black text-white">2. Watch the lanes</p>
              <p className="text-sm text-white/75">Notes fall from top to bottom in one of five lanes.</p>
            </div>
            <div>
              <p className="text-sm font-black text-white">3. Tap at the bottom</p>
              <p className="text-sm text-white/75">Only tap when the note enters the glowing `HIT ZONE` bar.</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
            <p>{feedback}</p>
            <p className="font-accent text-cyan-300">Round Length: {totalTime}s</p>
          </div>
        </div>

        <div className="relative h-96 bg-black/30 rounded-2xl overflow-hidden border-2 border-white/20 mb-8">
          <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 text-sm font-accent text-cyan-300">
            {gameActive ? `Time Left: ${timeRemaining.toFixed(1)}s` : 'Tap inside the glowing zone'}
          </div>

          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3, 4].map((lane) => (
              <div key={lane} className="flex-1 border-r border-white/10 relative">
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyan-500/30 to-transparent border-t-2 border-cyan-400 flex items-center justify-center">
                  <motion.div
                    className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300 opacity-70"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    Hit Zone
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {fallingNotes.map((note) => {
              const laneWidth = 100 / 5;
              const xPos = laneWidth * note.lane + laneWidth / 2;
              const progress = (gameTimeRef.current - note.startTime) / settings.duration;
              const isInHitZone = progress > 0.75 && progress < 0.95;

              return (
                <motion.button
                  key={note.id}
                  className={`absolute w-14 h-14 text-4xl flex items-center justify-center rounded-full cursor-pointer hover:scale-110 transition-transform ${
                    isInHitZone
                      ? 'bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/70'
                      : 'bg-gradient-to-br from-cyan-400/60 to-purple-500/60 shadow-lg shadow-cyan-400/30'
                  }`}
                  style={{
                    left: `${xPos}%`,
                    top: `${progress * 100}%`,
                    transform: 'translateX(-50%)',
                  }}
                  onClick={() => {
                    if (isInHitZone) {
                      hitNote(note.id, note);
                    } else {
                      missNote();
                    }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  {note.icon}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="relative z-10 space-y-4">
          {!gameActive && (
            <>
              <div className="flex gap-3 justify-center">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`px-6 py-3 rounded-full font-bold transition-all ${
                      difficulty === diff ? 'bg-cyan-400 text-gray-900' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={startGame}
                className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-900 font-bold text-lg shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                {gameEnded ? 'Play Again' : 'Start Game'}
              </motion.button>
            </>
          )}

          {gameActive && <div className="text-center text-white font-bold text-lg">Hit notes at the bottom to build your combo.</div>}
        </div>
      </motion.div>

      <p className="text-center text-gray-400 mt-4 font-accent">
        Synchronize with the Peace Beat. Accurate timing matters more than fast tapping.
      </p>
    </div>
  );
}
