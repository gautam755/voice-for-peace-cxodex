import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type Region = {
  id: string;
  name: string;
  shortLabel: string;
  color: string;
  glow: string;
  position: {
    left: string;
    top: string;
    width: string;
    height: string;
    rotate?: string;
    borderRadius?: string;
    clipPath?: string;
  };
  pulse: {
    left: string;
    top: string;
  };
  voices: string;
  signal: number;
  headline: string;
  story: string;
  mood: string;
};

const regions: Region[] = [
  {
    id: 'north-america',
    name: 'North America',
    shortLabel: 'North America',
    color: '#ffcc18',
    glow: 'rgba(255, 204, 24, 0.55)',
    position: {
      left: '8%',
      top: '12%',
      width: '23%',
      height: '27%',
      rotate: '-8deg',
      borderRadius: '42% 52% 38% 46% / 44% 40% 56% 48%',
    },
    pulse: { left: '20%', top: '23%' },
    voices: '12.4M voices in motion',
    signal: 84,
    headline: 'Stories are turning neighborhoods into signal towers.',
    story: 'School clubs, youth-led campaigns, and mutual-aid circles are lighting up the continent with practical peace work.',
    mood: 'Bright, vocal, community-driven',
  },
  {
    id: 'south-america',
    name: 'South America',
    shortLabel: 'South America',
    color: '#ff6172',
    glow: 'rgba(255, 97, 114, 0.55)',
    position: {
      left: '24%',
      top: '46%',
      width: '13%',
      height: '29%',
      rotate: '8deg',
      borderRadius: '45% 35% 46% 40% / 30% 40% 55% 60%',
    },
    pulse: { left: '29%', top: '56%' },
    voices: '8.9M voices in motion',
    signal: 76,
    headline: 'Creativity is carrying the peace message city to city.',
    story: 'Music, street culture, and local solidarity projects are making hope feel loud, warm, and visible.',
    mood: 'Art-forward, resilient, expressive',
  },
  {
    id: 'europe',
    name: 'Europe',
    shortLabel: 'Europe',
    color: '#08bf4f',
    glow: 'rgba(8, 191, 79, 0.52)',
    position: {
      left: '45%',
      top: '15%',
      width: '14%',
      height: '16%',
      rotate: '-4deg',
      borderRadius: '45% 44% 42% 38% / 46% 42% 50% 44%',
    },
    pulse: { left: '51%', top: '21%' },
    voices: '9.6M voices in motion',
    signal: 71,
    headline: 'Dialogue networks are keeping the map connected.',
    story: 'Cross-border cultural exchange, peace education, and public dialogue are holding a steady continental rhythm.',
    mood: 'Connected, steady, collaborative',
  },
  {
    id: 'africa',
    name: 'Africa',
    shortLabel: 'Africa',
    color: '#665ff1',
    glow: 'rgba(102, 95, 241, 0.58)',
    position: {
      left: '46%',
      top: '32%',
      width: '18%',
      height: '35%',
      rotate: '-2deg',
      borderRadius: '42% 38% 46% 44% / 30% 34% 58% 56%',
    },
    pulse: { left: '54%', top: '48%' },
    voices: '15.2M voices in motion',
    signal: 88,
    headline: 'Youth energy is pushing the strongest peace current on the board.',
    story: 'Community leadership, cultural pride, and youth initiatives are turning everyday action into a continental force.',
    mood: 'Powerful, rising, youth-led',
  },
  {
    id: 'asia',
    name: 'Asia',
    shortLabel: 'Asia',
    color: '#ffd27c',
    glow: 'rgba(255, 210, 124, 0.52)',
    position: {
      left: '60%',
      top: '12%',
      width: '24%',
      height: '33%',
      rotate: '2deg',
      borderRadius: '44% 46% 42% 50% / 42% 38% 52% 48%',
    },
    pulse: { left: '71%', top: '27%' },
    voices: '24.7M voices in motion',
    signal: 94,
    headline: 'The brightest peace bandwidth on the platform lives here.',
    story: 'Mass participation, digital coordination, and local peace networks are creating the strongest visible signal.',
    mood: 'Massive, fast, electric',
  },
  {
    id: 'oceania',
    name: 'Australia & Oceania',
    shortLabel: 'Australia & Oceania',
    color: '#d566ff',
    glow: 'rgba(213, 102, 255, 0.56)',
    position: {
      left: '79%',
      top: '48%',
      width: '12%',
      height: '18%',
      rotate: '-6deg',
      borderRadius: '38% 44% 40% 46% / 46% 40% 54% 48%',
    },
    pulse: { left: '84%', top: '56%' },
    voices: '4.1M voices in motion',
    signal: 63,
    headline: 'Small population, sharp signal, unmistakable presence.',
    story: 'Island communities, artists, and educators are producing a clean, bright peace signature across the region.',
    mood: 'Clear, vibrant, quietly strong',
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    shortLabel: 'Antarctica',
    color: '#d8d8d8',
    glow: 'rgba(216, 216, 216, 0.5)',
    position: {
      left: '35%',
      top: '79%',
      width: '42%',
      height: '10%',
      rotate: '0deg',
      borderRadius: '48% 52% 36% 34% / 54% 48% 52% 46%',
    },
    pulse: { left: '56%', top: '83%' },
    voices: '1.2M voices in motion',
    signal: 58,
    headline: 'Cooperation still glows at the edge of the planet.',
    story: 'Research communities and climate collaboration are keeping Antarctica connected to the shared human frequency.',
    mood: 'Quiet, precise, cooperative',
  },
];

const oceanLabels = [
  { text: 'North Atlantic', left: '41%', top: '20%' },
  { text: 'Indian Ocean', left: '70%', top: '52%' },
  { text: 'Pacific Ocean', left: '6%', top: '50%' },
  { text: 'Arctic Ocean', left: '56%', top: '5%' },
  { text: 'Southern Ocean', left: '42%', top: '86%' },
];

export function AdvancedVibeCheckGlobe() {
  const [selectedId, setSelectedId] = useState<string>('asia');

  const selected = useMemo(
    () => regions.find((region) => region.id === selectedId) ?? regions[0],
    [selectedId]
  );

  return (
    <div className="mx-auto w-full max-w-7xl">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050b18] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:p-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_85%_16%,rgba(236,72,153,0.12),transparent_18%),radial-gradient(circle_at_72%_82%,rgba(251,146,60,0.12),transparent_20%),linear-gradient(135deg,#04111d_0%,#0a1a32_44%,#07111f_100%)]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative">
            <div className="mb-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-xs font-accent uppercase tracking-[0.34em] text-cyan-200">
                Vibe Check Atlas
              </div>
              <div className="rounded-full border border-pink-300/25 bg-pink-300/10 px-5 py-3 text-xs font-accent uppercase tracking-[0.28em] text-pink-100">
                Click A Region
              </div>
            </div>

            <div className="relative min-h-[42rem] overflow-hidden rounded-[2rem] border border-cyan-200/16 bg-[linear-gradient(180deg,#81d4ff_0%,#67bff4_100%)] p-4 shadow-[inset_0_0_60px_rgba(255,255,255,0.08)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,107,188,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(10,107,188,0.55)_1px,transparent_1px)] bg-[size:64px_64px] opacity-45" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,76,135,0.28)_100%)]" />
              <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-700/35" />
              <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-slate-700/35" />

              {oceanLabels.map((label) => (
                <div
                  key={label.text}
                  className="pointer-events-none absolute text-sm font-black uppercase tracking-[0.12em] text-slate-800/70 md:text-lg"
                  style={{ left: label.left, top: label.top }}
                >
                  {label.text}
                </div>
              ))}

              <div className="pointer-events-none absolute right-[8%] top-[45%] text-4xl font-black uppercase tracking-[0.08em] text-slate-600/55">
                Equator
              </div>
              <div className="pointer-events-none absolute left-1/2 top-[49%] -translate-x-1/2 rotate-90 text-3xl font-black uppercase tracking-[0.08em] text-slate-600/55">
                Prime Meridian
              </div>

              {regions.map((region, index) => {
                const isSelected = selectedId === region.id;

                return (
                  <div key={region.id}>
                    <motion.button
                      type="button"
                      className="absolute transition-transform"
                      style={{
                        left: region.position.left,
                        top: region.position.top,
                        width: region.position.width,
                        height: region.position.height,
                        rotate: region.position.rotate,
                      }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setSelectedId(region.id)}
                    >
                      <div
                        className="relative h-full w-full border border-black/5 shadow-[inset_0_8px_18px_rgba(255,255,255,0.16)]"
                        style={{
                          backgroundColor: region.color,
                          borderRadius: region.position.borderRadius,
                          clipPath: region.position.clipPath,
                          boxShadow: isSelected
                            ? `0 0 0 4px rgba(255,255,255,0.28), 0 0 38px ${region.glow}`
                            : `0 0 22px ${region.glow}`,
                        }}
                      >
                        <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_35%,rgba(0,0,0,0.04)_100%)]" />
                      </div>
                    </motion.button>

                    <button
                      type="button"
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: region.pulse.left, top: region.pulse.top }}
                      onClick={() => setSelectedId(region.id)}
                    >
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        animate={{ opacity: [0.16, 0.56, 0.16], scale: [0.8, 1.18, 0.8] }}
                        transition={{ duration: 2.4 + index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ backgroundColor: region.glow }}
                      />
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.65, 0, 0.65] }}
                        transition={{ duration: 2.2 + index * 0.15, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <div
                        className="relative h-4 w-4 rounded-full border border-white/80"
                        style={{
                          backgroundColor: region.color,
                          boxShadow: `0 0 22px ${region.glow}`,
                        }}
                      />
                    </button>

                    <div
                      className="pointer-events-none absolute z-10 hidden max-w-[11rem] text-center text-[clamp(1rem,1.7vw,1.65rem)] font-black leading-tight text-slate-900/82 md:block"
                      style={{
                        left: `calc(${region.position.left} + 1rem)`,
                        top: `calc(${region.position.top} + 0.5rem)`,
                      }}
                    >
                      {region.shortLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(236,72,153,0.18),rgba(251,146,60,0.16))] p-6 shadow-[0_24px_55px_rgba(0,0,0,0.22)] backdrop-blur-md">
              <p className="text-sm font-accent uppercase tracking-[0.34em] text-cyan-100">The Vibe Check</p>
              <h3 className="mt-3 bg-[linear-gradient(90deg,#a5f3fc_0%,#f9a8d4_42%,#fdba74_100%)] bg-clip-text text-4xl font-black leading-[1.02] text-transparent md:text-5xl">
                The globe is gone.
                <br />
                The world pulse is louder.
              </h3>
              <p className="mt-5 text-lg leading-8 text-white/84">
                This section now reads like a living atlas instead of a laggy orb. Every continent owns its own color,
                its own pulse, and its own story. Click anywhere on the map and the right side rewrites the mood of the world.
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,204,24,0.2),rgba(255,97,114,0.18),rgba(102,95,241,0.16))] p-5 shadow-[0_22px_45px_rgba(0,0,0,0.18)]">
              <p className="text-xs font-accent uppercase tracking-[0.3em] text-white/72">Now Reading</p>
              <p className="mt-2 text-3xl font-black text-white">{selected.name}</p>
              <p className="mt-2 text-base font-bold text-white/80">{selected.voices}</p>
              <div className="mt-4 h-3 rounded-full bg-black/18">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${selected.signal}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{
                    background: `linear-gradient(90deg, ${selected.color}, #ffffff)`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs font-accent uppercase tracking-[0.24em] text-white/72">
                Signal Strength {selected.signal}%
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,191,79,0.18),rgba(34,211,238,0.14),rgba(255,255,255,0.06))] p-5 shadow-[0_22px_45px_rgba(0,0,0,0.18)]">
              <p className="text-xs font-accent uppercase tracking-[0.3em] text-white/72">Headline</p>
              <p className="mt-3 text-2xl font-black leading-tight text-white">{selected.headline}</p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(135deg,rgba(102,95,241,0.2),rgba(213,102,255,0.16),rgba(255,255,255,0.06))] p-5 shadow-[0_22px_45px_rgba(0,0,0,0.18)]">
              <p className="text-xs font-accent uppercase tracking-[0.3em] text-white/72">What Voice For Peace Feels Like Here</p>
              <p className="mt-3 text-base leading-8 text-white/88">{selected.story}</p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(135deg,rgba(251,146,60,0.18),rgba(236,72,153,0.16),rgba(255,255,255,0.06))] p-5 shadow-[0_22px_45px_rgba(0,0,0,0.18)]">
              <p className="text-xs font-accent uppercase tracking-[0.3em] text-white/72">Region Mood</p>
              <p className="mt-3 bg-[linear-gradient(90deg,#ffffff_0%,#fde68a_30%,#f9a8d4_65%,#a5f3fc_100%)] bg-clip-text text-2xl font-black text-transparent">
                {selected.mood}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
