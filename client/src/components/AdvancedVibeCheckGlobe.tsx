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
    glow: 'rgba(125, 211, 252, 0.95)',
    lat: 46,
    lon: -100,
    voices: '12.4M live voices',
    message: 'Public storytelling, local peace campaigns, and mutual-aid networks are strongly active across North America.',
    strength: 84,
  },
  {
    id: 'south-america',
    name: 'South America',
    color: '#fb7185',
    glow: 'rgba(251, 113, 133, 0.95)',
    lat: -18,
    lon: -60,
    voices: '8.9M live voices',
    message: 'Creative solidarity, youth culture, and neighborhood resilience are driving a vivid southern peace pulse.',
    strength: 76,
  },
  {
    id: 'europe',
    name: 'Europe',
    color: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.95)',
    lat: 53,
    lon: 18,
    voices: '9.6M live voices',
    message: 'Dialogue networks, civic exchange, and cross-border collaboration are keeping Europe bright and steady.',
    strength: 71,
  },
  {
    id: 'africa',
    name: 'Africa',
    color: '#fb923c',
    glow: 'rgba(251, 146, 60, 0.95)',
    lat: 6,
    lon: 20,
    voices: '15.2M live voices',
    message: 'Youth leadership, local peace hubs, and cultural energy are producing one of the strongest signals on the globe.',
    strength: 88,
  },
  {
    id: 'asia',
    name: 'Asia',
    color: '#2dd4bf',
    glow: 'rgba(45, 212, 191, 0.95)',
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
    glow: 'rgba(74, 222, 128, 0.95)',
    lat: -24,
    lon: 135,
    voices: '4.1M live voices',
    message: 'Smaller populations are still creating a clean, elegant, and highly visible Voice for Peace resonance.',
    strength: 63,
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    color: '#fde68a',
    glow: 'rgba(253, 230, 138, 0.95)',
    lat: -79,
    lon: 25,
    voices: '1.2M live voices',
    message: 'Scientific cooperation, climate stewardship, and research collaboration are keeping Antarctica tied to the global signal.',
    strength: 58,
  },
];

const atmosphereSpecks = [
  { left: '14%', top: '17%', size: 2, color: '#67e8f9' },
  { left: '22%', top: '70%', size: 3, color: '#fb7185' },
  { left: '40%', top: '12%', size: 2, color: '#c084fc' },
  { left: '63%', top: '18%', size: 3, color: '#fde68a' },
  { left: '79%', top: '26%', size: 2, color: '#2dd4bf' },
  { left: '82%', top: '67%', size: 3, color: '#4ade80' },
];

function projectContinent(continent: ContinentPulse, rotation: number): ProjectedContinent {
  const radius = 214;
  const lat = (continent.lat * Math.PI) / 180;
  const lon = ((continent.lon + rotation) * Math.PI) / 180;

  const x3d = radius * Math.cos(lat) * Math.sin(lon);
  const y3d = -radius * Math.sin(lat);
  const z3d = radius * Math.cos(lat) * Math.cos(lon);
  const scale = Math.max(0.56, 0.84 + (z3d / radius) * 0.18);

  return {
    ...continent,
    x: x3d,
    y: y3d,
    visible: z3d > -55,
    scale,
    depth: z3d,
  };
}

export function AdvancedVibeCheckGlobe() {
  const [selectedId, setSelectedId] = useState('asia');
  const [activeIds, setActiveIds] = useState<string[]>(['asia', 'africa', 'north-america']);
  const [waveKey, setWaveKey] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setRotation((prev) => (prev + 0.55) % 360);
    }, 90);

    const pulseTimer = window.setInterval(() => {
      const shuffled = [...continents].sort(() => Math.random() - 0.5);
      setActiveIds(shuffled.slice(0, 3).map((continent) => continent.id));
    }, 3200);

    return () => {
      window.clearInterval(rotationTimer);
      window.clearInterval(pulseTimer);
    };
  }, []);

  const projectedContinents = useMemo(
    () => continents.map((continent) => projectContinent(continent, rotation)).sort((a, b) => a.depth - b.depth),
    [rotation]
  );

  const selected = projectedContinents.find((continent) => continent.id === selectedId) ?? projectedContinents[0];
  const earthShift = `${(rotation / 360) * 200}%`;
  const cloudShift = `${(rotation / 360) * 220}%`;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#040b18] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.55)] md:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(244,114,182,0.12),transparent_20%),radial-gradient(circle_at_55%_84%,rgba(251,146,60,0.12),transparent_24%),linear-gradient(135deg,rgba(4,11,24,0.98),rgba(4,10,20,0.9)_38%,rgba(6,8,20,0.98))]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="relative min-h-[42rem]">
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-5 py-3 text-xs font-accent uppercase tracking-[0.34em] text-cyan-200">
                Real-Time Global Connectivity
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-5 py-3 text-xs font-accent uppercase tracking-[0.28em] text-white/70">
                Earth Pulse
              </div>
            </div>

            <div className="absolute left-[1rem] top-[8rem] hidden w-56 rounded-[1.25rem] border border-white/10 bg-white/6 p-4 backdrop-blur-xl lg:block">
              <p className="text-xs font-accent uppercase tracking-[0.24em] text-white/45">Interaction</p>
              <p className="mt-3 text-sm leading-6 text-white/72">
                Click any continent marker to inspect what Voice for Peace activity is happening there right now.
              </p>
            </div>

            <div className="absolute right-[0.5rem] top-[12.5rem] hidden w-64 rounded-[1.25rem] border border-white/10 bg-white/6 p-4 backdrop-blur-xl lg:block">
              <p className="text-xs font-accent uppercase tracking-[0.24em] text-white/45">Live Feed</p>
              <p className="mt-2 text-lg font-black text-white">{selected.name} | Harmony Pulse</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{selected.voices}</p>
            </div>

            <div className="relative mx-auto mt-6 aspect-square max-w-[40rem]">
              <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_52%)] blur-3xl" />
              <div className="absolute inset-[-5%] rounded-full bg-[conic-gradient(from_180deg,rgba(34,211,238,0.14),rgba(244,114,182,0.1),rgba(251,146,60,0.1),rgba(34,211,238,0.14))] blur-2xl" />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[31.5rem] w-[31.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[29.25rem] w-[29.25rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 rounded-full border border-white/15 bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.28),rgba(255,255,255,0.02)_16%,rgba(7,15,32,0.18)_38%,rgba(2,6,14,0.95)_100%)] shadow-[inset_0_2px_32px_rgba(255,255,255,0.18),inset_0_-70px_140px_rgba(1,6,18,0.9),0_0_70px_rgba(56,189,248,0.12)]" />

                <div className="absolute inset-[1.8%] overflow-hidden rounded-full border border-white/15">
                  <div
                    className="absolute inset-0 bg-[url('/earth/earth-albedo.jpg')] bg-cover bg-center"
                    style={{ backgroundSize: '200% 100%', backgroundPositionX: earthShift }}
                  />
                  <div
                    className="absolute inset-0 bg-[url('/earth/earth-night-lights.png')] bg-cover bg-center opacity-[0.38] mix-blend-screen"
                    style={{ backgroundSize: '200% 100%', backgroundPositionX: earthShift }}
                  />
                  <div
                    className="absolute inset-0 bg-[url('/earth/earth-clouds.png')] bg-cover bg-center opacity-[0.34] mix-blend-screen"
                    style={{ backgroundSize: '210% 100%', backgroundPositionX: cloudShift }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.24),transparent_16%),radial-gradient(circle_at_52%_58%,rgba(125,211,252,0.16),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%,rgba(0,0,0,0.22))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_34%,transparent_0%,transparent_36%,rgba(4,10,24,0.18)_58%,rgba(3,8,20,0.62)_90%)]" />

                  {atmosphereSpecks.map((star, index) => (
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
                      transition={{ duration: 2 + index * 0.22, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}

                  <AnimatePresence>
                    <motion.div
                      key={`${selectedId}-${waveKey}`}
                      className="absolute inset-0"
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2.2, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/65"
                        initial={{ scale: 0.4, opacity: 0.95 }}
                        animate={{ scale: 5.2, opacity: 0 }}
                        transition={{ duration: 2.1, ease: 'easeOut' }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {projectedContinents.map((continent) => {
                    const isActive = activeIds.includes(continent.id);
                    const isSelected = selectedId === continent.id;

                    return (
                      <motion.button
                        key={continent.id}
                        type="button"
                        className="absolute rounded-full"
                        style={{
                          left: `calc(50% + ${continent.x}px)`,
                          top: `calc(50% + ${continent.y}px)`,
                          transform: 'translate(-50%, -50%)',
                          opacity: continent.visible ? 1 : 0,
                          pointerEvents: continent.visible ? 'auto' : 'none',
                        }}
                        onClick={() => {
                          setSelectedId(continent.id);
                          setWaveKey((prev) => prev + 1);
                          setActiveIds((prev) => Array.from(new Set([continent.id, ...prev])).slice(0, 3));
                        }}
                        whileHover={{ scale: 1.06 }}
                      >
                        <motion.div
                          className="relative"
                          animate={isActive ? { scale: [continent.scale, continent.scale * 1.22, continent.scale] } : { scale: continent.scale }}
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
                            animate={isActive ? { opacity: [0.14, 0.8, 0.14] } : { opacity: [0.08, 0.22, 0.08] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <div
                            className="relative rounded-full border border-white/85"
                            style={{
                              width: isSelected ? 16 : 12,
                              height: isSelected ? 16 : 12,
                              backgroundColor: continent.color,
                              boxShadow: `0 0 26px ${continent.glow}`,
                            }}
                          />
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-full border border-cyan-100/15 shadow-[inset_0_0_22px_rgba(255,255,255,0.12)]" />
                <div className="pointer-events-none absolute inset-[-1.2%] rounded-full border border-white/10 opacity-70" />
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            <div>
              <p className="text-sm font-accent uppercase tracking-[0.3em] text-cyan-300">The Vibe-Check Globe</p>
              <h3 className="mt-3 text-4xl font-black leading-[1.02] text-white md:text-5xl">
                A realistic Earth pulse with living continent signals.
              </h3>
              <p className="mt-5 text-lg leading-8 text-white/74">
                This version brings back a more realistic Earth-style surface, keeps the globe rotating, and lets every
                continent reveal its live Voice for Peace signal when clicked.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/50">Realistic Surface</p>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  The globe now uses real Earth textures with day color, night lights, cloud cover, atmosphere, and a glass shell.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/50">Seven Continents</p>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  North America, South America, Europe, Africa, Asia, Oceania, and Antarctica each have one live clickable pulse.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/50">Lighter Rendering</p>
                <p className="mt-3 text-sm leading-6 text-white/78">
                  The rotation logic updates at a slower cadence and only moves a small set of continent markers, so it stays much lighter than the earlier heavy globe build.
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
                  onClick={() => setWaveKey((prev) => prev + 1)}
                  className="rounded-full border border-cyan-200/30 bg-cyan-300/12 px-4 py-2 text-xs font-accent uppercase tracking-[0.22em] text-cyan-100 transition hover:bg-cyan-300/20"
                >
                  Pulse
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
                    transition={{ duration: 0.45, ease: 'easeOut' }}
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
