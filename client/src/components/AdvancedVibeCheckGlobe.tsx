import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ContinentPulse = {
  id: string;
  name: string;
  color: string;
  x: string;
  y: string;
  voices: string;
  message: string;
  strength: number;
};

const continents: ContinentPulse[] = [
  {
    id: 'north-america',
    name: 'North America',
    color: '#7dd3fc',
    x: '29%',
    y: '31%',
    voices: '12.4M voices linked',
    message: 'Grassroots storytelling and cross-border collaboration are glowing strongly here.',
    strength: 84,
  },
  {
    id: 'south-america',
    name: 'South America',
    color: '#fb7185',
    x: '37%',
    y: '63%',
    voices: '8.9M voices linked',
    message: 'Creative action and community resilience are sending a vivid southern pulse.',
    strength: 76,
  },
  {
    id: 'europe',
    name: 'Europe',
    color: '#c084fc',
    x: '55%',
    y: '28%',
    voices: '9.6M voices linked',
    message: 'Dialogue networks and civic exchange are keeping the signal bright.',
    strength: 71,
  },
  {
    id: 'africa',
    name: 'Africa',
    color: '#fb923c',
    x: '54%',
    y: '48%',
    voices: '15.2M voices linked',
    message: 'Youth energy and local peace hubs are driving one of the strongest resonances.',
    strength: 88,
  },
  {
    id: 'asia',
    name: 'Asia',
    color: '#2dd4bf',
    x: '71%',
    y: '36%',
    voices: '24.7M voices linked',
    message: 'Mass participation and digital coordination are generating the brightest global pulse.',
    strength: 94,
  },
  {
    id: 'oceania',
    name: 'Oceania',
    color: '#4ade80',
    x: '81%',
    y: '70%',
    voices: '4.1M voices linked',
    message: 'Smaller populations are still creating a clear and elegant resonance field.',
    strength: 63,
  },
];

const ribbons = [
  {
    id: 'cyan',
    className:
      'h-12 w-[26rem] bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.95),rgba(34,211,238,0.8),transparent)]',
    style: { top: '45%', left: '-8%', rotate: '-18deg' },
    duration: 8,
  },
  {
    id: 'pink',
    className:
      'h-10 w-[24rem] bg-[linear-gradient(90deg,transparent,rgba(244,114,182,0.9),rgba(236,72,153,0.78),transparent)]',
    style: { top: '52%', left: '-2%', rotate: '12deg' },
    duration: 9,
  },
  {
    id: 'orange',
    className:
      'h-10 w-[25rem] bg-[linear-gradient(90deg,transparent,rgba(251,146,60,0.9),rgba(253,186,116,0.72),transparent)]',
    style: { top: '58%', left: '6%', rotate: '-10deg' },
    duration: 10,
  },
];

export function AdvancedVibeCheckGlobe() {
  const [selectedId, setSelectedId] = useState<string>('asia');
  const [activeIds, setActiveIds] = useState<string[]>(['asia', 'africa', 'north-america']);
  const [waveKey, setWaveKey] = useState(0);

  useEffect(() => {
    const pulseTimer = window.setInterval(() => {
      const shuffled = [...continents].sort(() => Math.random() - 0.5);
      const next = shuffled.slice(0, 3).map((continent) => continent.id);
      setActiveIds(next);
      setSelectedId(next[0]);
    }, 3200);

    const waveTimer = window.setInterval(() => {
      const next = continents[Math.floor(Math.random() * continents.length)];
      setSelectedId(next.id);
      setWaveKey((prev) => prev + 1);
    }, 5800);

    return () => {
      window.clearInterval(pulseTimer);
      window.clearInterval(waveTimer);
    };
  }, []);

  const selected = continents.find((continent) => continent.id === selectedId) ?? continents[0];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#08101d] p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)] md:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/vibe-globe-reference.png')] bg-cover bg-center opacity-[0.14]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.16),transparent_25%),radial-gradient(circle_at_82%_18%,rgba(244,114,182,0.12),transparent_18%),radial-gradient(circle_at_58%_84%,rgba(251,146,60,0.12),transparent_26%),linear-gradient(135deg,rgba(7,11,24,0.88),rgba(8,16,29,0.72)_35%,rgba(11,15,27,0.92)_100%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-accent uppercase tracking-[0.32em] text-cyan-200">
                Real-Time Global Connectivity
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-accent uppercase tracking-[0.25em] text-white/70">
                Harmony Pulse
              </div>
            </div>

            <div className="relative mx-auto aspect-square max-w-[32rem]">
              <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.22),transparent_50%)] blur-3xl" />
              <div className="absolute inset-[-6%] rounded-full bg-[conic-gradient(from_180deg,rgba(34,211,238,0.18),rgba(232,121,249,0.18),rgba(251,146,60,0.16),rgba(34,211,238,0.18))] blur-2xl opacity-80" />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
              />

              <div className="absolute inset-[9%] overflow-hidden rounded-full border border-white/18 shadow-[inset_0_2px_40px_rgba(255,255,255,0.16),inset_0_-45px_90px_rgba(4,8,20,0.88),0_0_50px_rgba(45,212,191,0.16)]">
                <div className="absolute inset-0 scale-[1.08] rounded-full bg-[url('/earth/earth-albedo.jpg')] bg-cover bg-center opacity-[0.78]" />
                <div className="absolute inset-0 scale-[1.08] rounded-full bg-[url('/earth/earth-night-lights.png')] bg-cover bg-center mix-blend-screen opacity-[0.68]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_36%_25%,rgba(255,255,255,0.3),transparent_18%),radial-gradient(circle_at_72%_72%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%,rgba(0,0,0,0.2)_100%)]" />

                {ribbons.map((ribbon, index) => (
                  <motion.div
                    key={ribbon.id}
                    className={`absolute rounded-full blur-[10px] ${ribbon.className}`}
                    style={ribbon.style}
                    animate={{
                      x: ['-3%', '8%', '-2%'],
                      y: [0, index % 2 === 0 ? -12 : 12, 0],
                      opacity: [0.55, 0.92, 0.55],
                    }}
                    transition={{ duration: ribbon.duration, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}

                <AnimatePresence>
                  <motion.div
                    key={waveKey}
                    className="absolute inset-0"
                    initial={{ opacity: 0.95 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.6, ease: 'easeOut' }}
                  >
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80"
                      initial={{ scale: 0.45, opacity: 0.92 }}
                      animate={{ scale: 5.5, opacity: 0 }}
                      transition={{ duration: 2.2, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-300/70"
                      initial={{ scale: 0.52, opacity: 0.75 }}
                      animate={{ scale: 4.7, opacity: 0 }}
                      transition={{ duration: 1.9, delay: 0.12, ease: 'easeOut' }}
                    />
                  </motion.div>
                </AnimatePresence>

                {continents.map((continent) => {
                  const isActive = activeIds.includes(continent.id);
                  const isSelected = selectedId === continent.id;

                  return (
                    <motion.button
                      key={continent.id}
                      className="absolute rounded-full"
                      style={{ left: continent.x, top: continent.y, transform: 'translate(-50%, -50%)' }}
                      onMouseEnter={() => setSelectedId(continent.id)}
                      whileHover={{ scale: 1.08 }}
                    >
                      <motion.div
                        className="relative"
                        animate={isActive ? { scale: [1, 1.28, 1] } : { scale: 1 }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <motion.div
                          className="absolute left-1/2 top-1/2 rounded-full blur-md"
                          style={{
                            width: isSelected ? 48 : 34,
                            height: isSelected ? 48 : 34,
                            backgroundColor: continent.color,
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={isActive ? { opacity: [0.24, 0.88, 0.24] } : { opacity: [0.12, 0.3, 0.12] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div
                          className="relative rounded-full border border-white/80"
                          style={{
                            width: isSelected ? 18 : 12,
                            height: isSelected ? 18 : 12,
                            backgroundColor: continent.color,
                            boxShadow: `0 0 24px ${continent.color}`,
                          }}
                        />
                      </motion.div>
                    </motion.button>
                  );
                })}

                <div className="pointer-events-none absolute left-[18%] top-[14%] h-24 w-24 rounded-full border border-white/12 bg-white/8 blur-2xl" />
                <div className="pointer-events-none absolute bottom-[8%] right-[14%] h-24 w-24 rounded-full bg-cyan-300/12 blur-3xl" />
              </div>
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            <div>
              <p className="text-sm font-accent uppercase tracking-[0.28em] text-cyan-300">The Vibe-Check Globe</p>
              <h3 className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
                A colorful living orb that feels premium without dragging the whole page.
              </h3>
              <p className="mt-4 text-base leading-7 text-white/76">
                This version is lighter on the browser, more neon and gradient-driven, and visually closer to your reference. The globe now reads as a glass pulse instrument instead of a heavy simulation.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/55">Lighter Rendering</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  The constant geometry-style re-projection is gone. The section now uses minimal state updates and smoother visual layers.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/55">Colorful Harmony Trails</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  Neon cyan, pink, and amber ribbons create the symphony effect and make the globe feel more alive and attractive.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/55">Continent Pulse</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  Continents still behave like live nodes, but the presentation is cleaner and easier to understand.
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-cyan-300/18 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12),_rgba(255,255,255,0.04))] p-5 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-accent uppercase tracking-[0.28em] text-cyan-300">Current Continent</p>
                  <p className="mt-2 text-2xl font-black text-white">{selected.name}</p>
                  <p className="mt-1 text-sm text-white/65">{selected.voices}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = continents[Math.floor(Math.random() * continents.length)];
                    setSelectedId(next.id);
                    setWaveKey((prev) => prev + 1);
                    setActiveIds((prev) => Array.from(new Set([next.id, ...prev])).slice(0, 3));
                  }}
                  className="rounded-full border border-cyan-200/30 bg-cyan-300/12 px-4 py-2 text-xs font-accent uppercase tracking-[0.22em] text-cyan-100 transition hover:bg-cyan-300/20"
                >
                  Send A Voice
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/78">{selected.message}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-accent uppercase tracking-[0.22em] text-white/50">
                  <span>Signal Strength</span>
                  <span>{selected.strength}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,_#67e8f9,_#f472b6,_#fb923c)]"
                    animate={{ width: `${selected.strength}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
