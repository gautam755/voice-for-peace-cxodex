import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type ContinentPulse = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  color: string;
  activity: number;
  voices: string;
  message: string;
};

type ProjectedContinent = ContinentPulse & {
  x: number;
  y: number;
  depth: number;
  visible: boolean;
  scale: number;
};

const continents: ContinentPulse[] = [
  {
    id: 'north-america',
    name: 'North America',
    lat: 42,
    lon: -102,
    color: '#67e8f9',
    activity: 0.84,
    voices: '12.4M voices linked',
    message: 'Grassroots organizing and public storytelling are surging across the continent.',
  },
  {
    id: 'south-america',
    name: 'South America',
    lat: -15,
    lon: -60,
    color: '#fb7185',
    activity: 0.76,
    voices: '8.9M voices linked',
    message: 'Community-led art and climate solidarity are feeding a stronger peace signal.',
  },
  {
    id: 'europe',
    name: 'Europe',
    lat: 51,
    lon: 15,
    color: '#c084fc',
    activity: 0.71,
    voices: '9.6M voices linked',
    message: 'Cross-border dialogue networks are amplifying cooperation faster than conflict.',
  },
  {
    id: 'africa',
    name: 'Africa',
    lat: 7,
    lon: 21,
    color: '#f97316',
    activity: 0.88,
    voices: '15.2M voices linked',
    message: 'Youth participation, local peace hubs, and mutual aid are driving the strongest pulse.',
  },
  {
    id: 'asia',
    name: 'Asia',
    lat: 28,
    lon: 97,
    color: '#2dd4bf',
    activity: 0.94,
    voices: '24.7M voices linked',
    message: 'Mass participation and digital coordination are generating the planet’s brightest resonance.',
  },
  {
    id: 'oceania',
    name: 'Oceania',
    lat: -24,
    lon: 135,
    color: '#4ade80',
    activity: 0.63,
    voices: '4.1M voices linked',
    message: 'Smaller populations are still producing clear, persistent continental signal strength.',
  },
];

function projectContinent(continent: ContinentPulse, rotationDeg: number): ProjectedContinent {
  const radius = 180;
  const lat = (continent.lat * Math.PI) / 180;
  const lon = ((continent.lon + rotationDeg) * Math.PI) / 180;

  const x3d = radius * Math.cos(lat) * Math.sin(lon);
  const y3d = -radius * Math.sin(lat);
  const z3d = radius * Math.cos(lat) * Math.cos(lon);
  const scale = Math.max(0.52, 0.82 + (z3d / radius) * 0.2);

  return {
    ...continent,
    x: x3d,
    y: y3d,
    depth: z3d,
    visible: z3d > -48,
    scale,
  };
}

export function AdvancedVibeCheckGlobe() {
  const [rotation, setRotation] = useState(0);
  const [activeIds, setActiveIds] = useState<string[]>(['asia', 'africa', 'north-america']);
  const [selectedId, setSelectedId] = useState<string>('asia');
  const [waveKey, setWaveKey] = useState(0);

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setRotation((prev) => (prev + 0.24) % 360);
    }, 40);

    const pulseTimer = window.setInterval(() => {
      const next = [...continents].sort(() => Math.random() - 0.5).slice(0, 3).map((continent) => continent.id);
      setActiveIds(next);
      setSelectedId(next[0]);
    }, 2600);

    const waveTimer = window.setInterval(() => {
      const next = continents[Math.floor(Math.random() * continents.length)];
      setSelectedId(next.id);
      setWaveKey((prev) => prev + 1);
    }, 5200);

    return () => {
      window.clearInterval(rotationTimer);
      window.clearInterval(pulseTimer);
      window.clearInterval(waveTimer);
    };
  }, []);

  const projected = useMemo(
    () => continents.map((continent) => projectContinent(continent, rotation)).sort((a, b) => a.depth - b.depth),
    [rotation]
  );

  const selected = projected.find((continent) => continent.id === selectedId) ?? projected[0];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(255,255,255,0.04)_28%,_rgba(7,10,24,0.95)_70%),linear-gradient(135deg,_rgba(8,145,178,0.12),_rgba(76,29,149,0.1)_48%,_rgba(234,88,12,0.1)_100%)] p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,_rgba(103,232,249,0.18),_transparent_24%),radial-gradient(circle_at_86%_20%,_rgba(192,132,252,0.14),_transparent_20%),radial-gradient(circle_at_50%_100%,_rgba(249,115,22,0.12),_transparent_30%)]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-accent uppercase tracking-[0.32em] text-cyan-200">
                Continental Resonance
              </div>
              <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-accent uppercase tracking-[0.25em] text-white/70">
                Earth Texture Globe
              </div>
            </div>

            <div className="relative mx-auto aspect-square max-w-[30rem]">
              <div className="absolute inset-[-7%] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.18),_transparent_58%)] blur-3xl" />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,_rgba(34,211,238,0.16),_rgba(59,130,246,0.1),_rgba(168,85,247,0.12),_rgba(34,211,238,0.16))] blur-2xl opacity-70" />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/12"
                animate={{ rotate: 360 }}
                transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[23rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[14rem] w-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              <div className="absolute inset-[7%] overflow-hidden rounded-full border border-white/15 shadow-[inset_0_2px_40px_rgba(255,255,255,0.12),inset_0_-40px_80px_rgba(3,7,18,0.85),0_0_50px_rgba(34,211,238,0.16)]">
                <motion.div
                  className="absolute inset-0 scale-[1.12] rounded-full"
                  style={{
                    backgroundImage: "url('/earth/earth-albedo.jpg')",
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '200% 100%',
                    filter: 'saturate(1.1) contrast(1.05)',
                  }}
                  animate={{ backgroundPositionX: ['0%', '200%'] }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-0 scale-[1.12] rounded-full mix-blend-screen opacity-55"
                  style={{
                    backgroundImage: "url('/earth/earth-night-lights.png')",
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '200% 100%',
                    filter: 'saturate(1.6)',
                  }}
                  animate={{ backgroundPositionX: ['0%', '200%'] }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-0 scale-[1.12] rounded-full mix-blend-screen opacity-35"
                  style={{
                    backgroundImage: "url('/earth/earth-land-ocean-mask.png')",
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPositionX: ['0%', '200%'] }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[-4%] rounded-full opacity-35"
                  style={{
                    backgroundImage: "url('/earth/earth-clouds.png')",
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '200% 100%',
                    mixBlendMode: 'screen',
                  }}
                  animate={{ backgroundPositionX: ['0%', '200%'] }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_26%,_rgba(255,255,255,0.34),_transparent_18%),radial-gradient(circle_at_70%_72%,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(135deg,_rgba(255,255,255,0.08),_transparent_38%,_rgba(0,0,0,0.18)_100%)]" />
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-100/20 to-transparent" />
                <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-100/16 to-transparent" />

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
                      initial={{ scale: 0.35, opacity: 0.95 }}
                      animate={{ scale: 5.8, opacity: 0 }}
                      transition={{ duration: 2.4, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/70"
                      initial={{ scale: 0.42, opacity: 0.82 }}
                      animate={{ scale: 4.9, opacity: 0 }}
                      transition={{ duration: 2, delay: 0.12, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/65"
                      initial={{ scale: 0.48, opacity: 0.74 }}
                      animate={{ scale: 4.2, opacity: 0 }}
                      transition={{ duration: 1.7, delay: 0.22, ease: 'easeOut' }}
                    />
                  </motion.div>
                </AnimatePresence>

                {projected
                  .filter((continent) => continent.visible && activeIds.includes(continent.id))
                  .map((continent) => {
                    const length = Math.sqrt(continent.x * continent.x + continent.y * continent.y);
                    const angle = (Math.atan2(continent.y, continent.x) * 180) / Math.PI;

                    return (
                      <motion.div
                        key={`beam-${continent.id}`}
                        className="absolute left-1/2 top-1/2 h-px origin-left"
                        style={{
                          width: length,
                          rotate: `${angle}deg`,
                          background: `linear-gradient(90deg, rgba(255,255,255,0.08), ${continent.color})`,
                          opacity: 0.6,
                        }}
                        animate={{ opacity: [0.2, 0.75, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    );
                  })}

                {projected.map((continent) => {
                  const isActive = activeIds.includes(continent.id);
                  const isSelected = continent.id === selectedId;

                  return (
                    <motion.button
                      key={continent.id}
                      className="absolute rounded-full"
                      style={{
                        left: `calc(50% + ${continent.x}px)`,
                        top: `calc(50% + ${continent.y}px)`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: continent.visible ? 'auto' : 'none',
                        opacity: continent.visible ? 1 : 0,
                      }}
                      onMouseEnter={() => setSelectedId(continent.id)}
                      whileHover={{ scale: 1.08 }}
                    >
                      <motion.div
                        className="relative rounded-full"
                        animate={
                          isActive
                            ? { scale: [continent.scale, continent.scale * 1.28, continent.scale] }
                            : { scale: continent.scale }
                        }
                        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <motion.div
                          className="absolute left-1/2 top-1/2 rounded-full blur-md"
                          style={{
                            width: isSelected ? 42 : 30,
                            height: isSelected ? 42 : 30,
                            backgroundColor: continent.color,
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={isActive ? { opacity: [0.28, 0.85, 0.28] } : { opacity: [0.12, 0.34, 0.12] }}
                          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div
                          className="relative rounded-full border border-white/80"
                          style={{
                            width: isSelected ? 18 : 12,
                            height: isSelected ? 18 : 12,
                            backgroundColor: continent.color,
                            boxShadow: `0 0 22px ${continent.color}`,
                          }}
                        />
                      </motion.div>
                    </motion.button>
                  );
                })}

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_34%_22%,_rgba(255,255,255,0.3),_transparent_16%),linear-gradient(135deg,_rgba(255,255,255,0.1),_transparent_38%,_rgba(255,255,255,0.02)_70%,_rgba(0,0,0,0.14)_100%)]" />
              </div>

              <div className="pointer-events-none absolute left-[16%] top-[15%] h-28 w-28 rounded-full border border-white/12 bg-white/8 blur-2xl" />
              <div className="pointer-events-none absolute bottom-[10%] right-[16%] h-24 w-24 rounded-full bg-cyan-300/10 blur-3xl" />
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            <div>
              <p className="text-sm font-accent uppercase tracking-[0.28em] text-cyan-300">The Vibe-Check Globe</p>
              <h3 className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
                A continent-scale Earth that feels alive, responsive, and worth looking at.
              </h3>
              <p className="mt-4 text-base leading-7 text-white/76">
                This version uses real Earth textures from your model package, tracks continental resonance instead of city dots, and turns each new contribution into a visible wave across the planet.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/55">Real Earth Surface</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  Albedo, night-light, and cloud textures make the globe read as Earth instead of a generic abstract orb.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/55">Continent-Based Pulse</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  The interaction now tracks continents as living regions, which is easier to understand and visually cleaner than city-level noise.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <p className="text-xs font-accent uppercase tracking-[0.26em] text-white/55">Symphony Wave</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                  Every voice triggers a multi-ring resonance bloom that spreads across the surface like a shared emotional signal.
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-cyan-300/18 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12),_rgba(255,255,255,0.04))] p-5 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-accent uppercase tracking-[0.28em] text-cyan-300">Current Continent</p>
                  <p className="mt-2 text-2xl font-black text-white">{selected?.name}</p>
                  <p className="mt-1 text-sm text-white/65">{selected?.voices}</p>
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
              <p className="mt-4 text-sm leading-6 text-white/78">{selected?.message}</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-accent uppercase tracking-[0.22em] text-white/50">
                  <span>Signal Strength</span>
                  <span>{Math.round((selected?.activity ?? 0.8) * 100)}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,_#67e8f9,_#a78bfa,_#f97316)]"
                    animate={{ width: `${Math.round((selected?.activity ?? 0.8) * 100)}%` }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
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
