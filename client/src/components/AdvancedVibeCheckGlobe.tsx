import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type ContinentPulse = {
  id: string;
  name: string;
  color: string;
  glow: string;
  lat: number;
  lon: number;
  voices: string;
  message: string;
  strength: number;
};

type ProjectedContinent = ContinentPulse & {
  x: number;
  y: number;
  visible: boolean;
  scale: number;
  depth: number;
};

const continents: ContinentPulse[] = [
  {
    id: 'north-america',
    name: 'North America',
    color: '#7dd3fc',
    glow: 'rgba(125,211,252,0.95)',
    lat: 45,
    lon: -100,
    voices: '12.4M live voices',
    message: 'Public storytelling, peace campaigns, and mutual aid networks are pulsing strongly across North America.',
    strength: 84,
  },
  {
    id: 'south-america',
    name: 'South America',
    color: '#fb7185',
    glow: 'rgba(251,113,133,0.95)',
    lat: -17,
    lon: -60,
    voices: '8.9M live voices',
    message: 'Creative solidarity and community resilience are generating a vivid southern resonance field.',
    strength: 76,
  },
  {
    id: 'europe',
    name: 'Europe',
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.95)',
    lat: 53,
    lon: 18,
    voices: '9.6M live voices',
    message: 'Dialogue networks and civic exchange are keeping European connectivity bright and stable.',
    strength: 71,
  },
  {
    id: 'africa',
    name: 'Africa',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.95)',
    lat: 6,
    lon: 20,
    voices: '15.2M live voices',
    message: 'Youth energy, local peace hubs, and cultural leadership are producing one of the strongest signals.',
    strength: 88,
  },
  {
    id: 'asia',
    name: 'Asia',
    color: '#2dd4bf',
    glow: 'rgba(45,212,191,0.95)',
    lat: 32,
    lon: 95,
    voices: '24.7M live voices',
    message: 'Mass participation and digital coordination are generating the brightest harmony pulse on the planet.',
    strength: 94,
  },
  {
    id: 'oceania',
    name: 'Oceania',
    color: '#4ade80',
    glow: 'rgba(74,222,128,0.95)',
    lat: -24,
    lon: 135,
    voices: '4.1M live voices',
    message: 'Smaller populations are still shaping a clean, elegant, and highly visible resonance pattern.',
    strength: 63,
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    color: '#fef08a',
    glow: 'rgba(254,240,138,0.95)',
    lat: -78,
    lon: 20,
    voices: '1.2M live voices',
    message: 'Research collaboration, climate stewardship, and scientific cooperation are keeping Antarctica connected to the global peace signal.',
    strength: 58,
  },
];

const ribbons = [
  {
    id: 'cyan-wave',
    className:
      'h-14 w-[32rem] bg-[linear-gradient(90deg,transparent,rgba(103,232,249,0.98),rgba(34,211,238,0.82),transparent)]',
    style: { top: '46%', left: '-12%', rotate: '-22deg' },
    duration: 8,
  },
  {
    id: 'pink-wave',
    className:
      'h-12 w-[30rem] bg-[linear-gradient(90deg,transparent,rgba(244,114,182,0.95),rgba(236,72,153,0.78),transparent)]',
    style: { top: '50%', left: '-4%', rotate: '18deg' },
    duration: 10,
  },
  {
    id: 'amber-wave',
    className:
      'h-12 w-[31rem] bg-[linear-gradient(90deg,transparent,rgba(253,186,116,0.92),rgba(251,146,60,0.78),transparent)]',
    style: { top: '58%', left: '0%', rotate: '-14deg' },
    duration: 11,
  },
  {
    id: 'mint-wave',
    className:
      'h-10 w-[28rem] bg-[linear-gradient(90deg,transparent,rgba(45,212,191,0.9),rgba(94,234,212,0.74),transparent)]',
    style: { top: '41%', left: '6%', rotate: '28deg' },
    duration: 9,
  },
];

const starField = [
  { left: '14%', top: '18%', size: 2, color: '#7dd3fc' },
  { left: '23%', top: '65%', size: 3, color: '#fb7185' },
  { left: '42%', top: '14%', size: 2, color: '#c084fc' },
  { left: '58%', top: '20%', size: 3, color: '#fde68a' },
  { left: '76%', top: '24%', size: 2, color: '#2dd4bf' },
  { left: '81%', top: '66%', size: 3, color: '#4ade80' },
  { left: '67%', top: '78%', size: 2, color: '#fb923c' },
  { left: '34%', top: '82%', size: 2, color: '#7dd3fc' },
  { left: '51%', top: '70%', size: 2, color: '#f9a8d4' },
  { left: '62%', top: '56%', size: 2, color: '#a5f3fc' },
];

function projectContinent(continent: ContinentPulse, rotation: number): ProjectedContinent {
  const radius = 206;
  const lat = (continent.lat * Math.PI) / 180;
  const lon = ((continent.lon + rotation) * Math.PI) / 180;

  const x3d = radius * Math.cos(lat) * Math.sin(lon);
  const y3d = -radius * Math.sin(lat);
  const z3d = radius * Math.cos(lat) * Math.cos(lon);
  const scale = Math.max(0.5, 0.84 + (z3d / radius) * 0.18);

  return {
    ...continent,
    x: x3d,
    y: y3d,
    visible: z3d > -40,
    scale,
    depth: z3d,
  };
}

export function AdvancedVibeCheckGlobe() {
  const [selectedId, setSelectedId] = useState<string>('asia');
  const [activeIds, setActiveIds] = useState<string[]>(['asia', 'africa', 'north-america']);
  const [waveKey, setWaveKey] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setRotation((prev) => (prev + 0.35) % 360);
    }, 40);

    const pulseTimer = window.setInterval(() => {
      const shuffled = [...continents].sort(() => Math.random() - 0.5);
      const next = shuffled.slice(0, 3).map((continent) => continent.id);
      setActiveIds(next);
    }, 3200);

    const waveTimer = window.setInterval(() => {
      const next = continents[Math.floor(Math.random() * continents.length)];
      setSelectedId(next.id);
      setWaveKey((prev) => prev + 1);
    }, 5600);

    return () => {
      window.clearInterval(rotationTimer);
      window.clearInterval(pulseTimer);
      window.clearInterval(waveTimer);
    };
  }, []);

  const projectedContinents = useMemo(
    () => continents.map((continent) => projectContinent(continent, rotation)).sort((a, b) => a.depth - b.depth),
    [rotation]
  );

  const selected = projectedContinents.find((continent) => continent.id === selectedId) ?? projectedContinents[0];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#060c18] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.55)] md:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[url('/vibe-globe-reference.png')] bg-cover bg-center opacity-[0.1]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(244,114,182,0.18),transparent_20%),radial-gradient(circle_at_56%_84%,rgba(251,146,60,0.16),transparent_24%),linear-gradient(135deg,rgba(6,12,24,0.92),rgba(8,12,26,0.74)_35%,rgba(7,11,23,0.96)_100%)]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div className="relative min-h-[40rem]">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-5 py-3 text-xs font-accent uppercase tracking-[0.34em] text-cyan-200">
                Real-Time Global Connectivity
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-xs font-accent uppercase tracking-[0.28em] text-white/70">
                Harmony Pulse
              </div>
            </div>

            <div className="absolute left-[1rem] top-[8rem] hidden w-56 rounded-[1.25rem] border border-white/10 bg-white/6 p-4 backdrop-blur-xl lg:block">
              <p className="text-xs font-accent uppercase tracking-[0.24em] text-white/45">Signal Layer</p>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Click any continent pulse to inspect what Voice for Peace activity is happening there in real time.
              </p>
            </div>

            <div className="absolute right-[0.5rem] top-[13rem] hidden w-64 rounded-[1.25rem] border border-white/10 bg-white/6 p-4 backdrop-blur-xl lg:block">
              <p className="text-xs font-accent uppercase tracking-[0.24em] text-white/45">Live Feed</p>
              <p className="mt-2 text-lg font-black text-white">{selected.name} | Harmony Pulse</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{selected.voices}</p>
            </div>

            <div className="relative mx-auto mt-4 aspect-square max-w-[39rem]">
              <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.26),transparent_48%)] blur-3xl" />
              <div className="absolute inset-[-7%] rounded-full bg-[conic-gradient(from_180deg,rgba(34,211,238,0.24),rgba(232,121,249,0.2),rgba(251,146,60,0.2),rgba(34,211,238,0.24))] blur-2xl opacity-90" />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[28.5rem] w-[28.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.22),rgba(255,255,255,0.03)_20%,rgba(10,18,35,0.18)_46%,rgba(5,10,24,0.72)_100%)] shadow-[inset_0_2px_50px_rgba(255,255,255,0.16),inset_0_-45px_110px_rgba(4,8,20,0.86),0_0_70px_rgba(52,211,153,0.12)]"
                animate={{ y: [0, -4, 0], scale: [1, 1.01, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-[2%] overflow-hidden rounded-full border border-white/18">
                  <motion.div
                    className="absolute inset-0 bg-[url('/earth/earth-night-lights.png')] bg-cover bg-center opacity-[0.55] mix-blend-screen"
                    animate={{ backgroundPositionX: ['0%', '200%'] }}
                    transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_30%,rgba(255,255,255,0.26),transparent_18%),radial-gradient(circle_at_56%_56%,rgba(125,211,252,0.22),transparent_26%),radial-gradient(circle_at_58%_72%,rgba(251,146,60,0.18),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(0,0,0,0.16)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(255,255,255,0.34),transparent_16%),radial-gradient(circle_at_70%_74%,rgba(255,255,255,0.08),transparent_24%)]" />

                  {starField.map((star, index) => (
                    <motion.div
                      key={`${star.left}-${star.top}-${index}`}
                      className="absolute rounded-full"
                      style={{
                        left: star.left,
                        top: star.top,
                        width: star.size * 2,
                        height: star.size * 2,
                        backgroundColor: star.color,
                        boxShadow: `0 0 ${star.size * 10}px ${star.color}`,
                      }}
                      animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.4, 1] }}
                      transition={{ duration: 1.8 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}

                  {ribbons.map((ribbon, index) => (
                    <motion.div
                      key={ribbon.id}
                      className={`absolute rounded-full blur-[12px] ${ribbon.className}`}
                      style={ribbon.style}
                      animate={{
                        x: ['-6%', '10%', '-4%'],
                        y: [0, index % 2 === 0 ? -16 : 16, 0],
                        opacity: [0.55, 0.98, 0.55],
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
                      transition={{ duration: 2.8, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/80"
                        initial={{ scale: 0.42, opacity: 0.95 }}
                        animate={{ scale: 6.2, opacity: 0 }}
                        transition={{ duration: 2.4, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-300/75"
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 5.1, opacity: 0 }}
                        transition={{ duration: 2.1, delay: 0.1, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/70"
                        initial={{ scale: 0.58, opacity: 0.72 }}
                        animate={{ scale: 4.4, opacity: 0 }}
                        transition={{ duration: 1.8, delay: 0.18, ease: 'easeOut' }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {projectedContinents.map((continent) => {
                    const isActive = activeIds.includes(continent.id);
                    const isSelected = selectedId === continent.id;

                    return (
                      <motion.button
                        key={continent.id}
                        className="absolute rounded-full"
                        style={{
                          left: `calc(50% + ${continent.x}px)`,
                          top: `calc(50% + ${continent.y}px)`,
                          transform: 'translate(-50%, -50%)',
                          opacity: continent.visible ? 1 : 0,
                          pointerEvents: continent.visible ? 'auto' : 'none',
                        }}
                        onClick={() => setSelectedId(continent.id)}
                        whileHover={{ scale: 1.08 }}
                      >
                        <motion.div
                          className="relative"
                          animate={isActive ? { scale: [continent.scale, continent.scale * 1.28, continent.scale] } : { scale: continent.scale }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <motion.div
                            className="absolute left-1/2 top-1/2 rounded-full blur-md"
                            style={{
                              width: isSelected ? 54 : 38,
                              height: isSelected ? 54 : 38,
                              backgroundColor: continent.color,
                              transform: 'translate(-50%, -50%)',
                            }}
                            animate={isActive ? { opacity: [0.22, 0.9, 0.22] } : { opacity: [0.1, 0.26, 0.1] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <div
                            className="relative rounded-full border border-white/80"
                            style={{
                              width: isSelected ? 18 : 12,
                              height: isSelected ? 18 : 12,
                              backgroundColor: continent.color,
                              boxShadow: `0 0 28px ${continent.glow}`,
                            }}
                          />
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              <div className="pointer-events-none absolute left-[14%] top-[18%] h-28 w-28 rounded-full border border-white/12 bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute bottom-[14%] right-[12%] h-32 w-32 rounded-full bg-cyan-300/14 blur-3xl" />
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            <div>
              <p className="text-sm font-accent uppercase tracking-[0.3em] text-cyan-300">The Vibe-Check Globe</p>
              <h3 className="mt-3 text-4xl font-black leading-[1.02] text-white md:text-5xl">
                A vivid living orb with neon energy, gradient trails, and a premium glass pulse.
              </h3>
              <p className="mt-5 text-lg leading-8 text-white/74">
                The globe now rotates visually, every continent has a center pulse, and clicking any pulse reveals what Voice for Peace activity is happening there right now.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/50">Seven Continents</p>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  North America, South America, Europe, Africa, Asia, Oceania, and Antarctica now each have one live pulse marker.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/50">Click To Inspect</p>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  Each glowing dot is clickable and updates the live panel with what Voice for Peace energy is happening in that region.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/50">Rotating Orb</p>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  The surface and the continent dots now move as the globe turns, so it feels like a living rotating object instead of a flat graphic.
                </p>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-cyan-300/18 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12),_rgba(255,255,255,0.04))] p-5 backdrop-blur-md">
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
