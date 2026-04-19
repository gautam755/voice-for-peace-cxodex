import { motion } from 'framer-motion';
import { EnhancedNeonHero } from '@/components/EnhancedNeonHero';
import { EnhancedGallery } from '@/components/EnhancedGallery';
import { NeonPeaceWall } from '@/components/NeonPeaceWall';
import { AdvancedPeacePainter } from '@/components/AdvancedPeacePainter';
import { AdvancedHarmonyHit } from '@/components/AdvancedHarmonyHit';
import { AdvancedVibeCheckGlobe } from '@/components/AdvancedVibeCheckGlobe';
import { EnhancedKindnessQuest } from '@/components/EnhancedKindnessQuest';
import TakeAction from '@/components/TakeAction';

/**
 * DESIGN PHILOSOPHY: Premium Digital Art Gallery for Global Peace
 * - Vibrant neon colors with cinematic depth
 * - Immersive interactive experiences
 * - Smooth animations and transitions
 * - Professional competition-ready design
 */

const timelineItems = [
  {
    year: '1945',
    title: 'UN Founded',
    description: 'United Nations established to maintain international peace and security',
    icon: '🕊️',
  },
  {
    year: '1963',
    title: "MLK's Dream",
    description: 'Martin Luther King Jr. delivers his iconic "I Have a Dream" speech',
    icon: '🌟',
  },
  {
    year: '1989',
    title: 'Berlin Wall Falls',
    description: 'Symbol of division crumbles, bringing hope for global unity',
    icon: '🧱',
  },
  {
    year: '1993',
    title: 'Oslo Accords',
    description: 'Historic peace agreement demonstrates power of dialogue',
    icon: '🤝',
  },
  {
    year: '2000',
    title: 'Millennium Summit',
    description: 'World leaders unite for global peace and development',
    icon: '🌍',
  },
  {
    year: '2024',
    title: 'Digital Activism',
    description: 'Global movements powered by technology and collective voice',
    icon: '⚡',
  },
];

export default function Home() {
  const sectionShell =
    'relative py-24 px-4 overflow-hidden border-y border-white/10';
  const liquidBackground =
    "before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/hero-liquid-gradient.png')] before:bg-cover before:bg-center before:opacity-[0.56] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,_rgba(3,7,18,0.38),_rgba(7,10,24,0.44))]";
  const harmonyBackground =
    "before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/global-harmony-abstract.png')] before:bg-cover before:bg-center before:opacity-[0.54] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,_rgba(5,8,22,0.36),_rgba(9,6,20,0.42))]";
  const neonBackground =
    "before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/neon-peace-wall-bg.webp')] before:bg-cover before:bg-center before:opacity-[0.58] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,_rgba(3,7,18,0.42),_rgba(8,10,28,0.48))]";

  return (
    <div
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,_#04070f_0%,_#080b17_50%,_#05070f_100%)] text-white"
    >
      <div className="relative z-10">
      {/* Hero Section */}
      <EnhancedNeonHero />

      {/* Global Harmony Gallery */}
      <motion.section 
        className={`${sectionShell} ${liquidBackground}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Global Harmony Gallery
            </h2>
            <p className="text-xl text-gray-300 font-accent max-w-2xl mx-auto">
              Explore the 10 pillars of global peace. Click any card to learn more about each movement.
            </p>
          </motion.div>
          <EnhancedGallery />
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        id="peace-history"
        className={`${sectionShell} ${harmonyBackground}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Peace Through History
            </h2>
            <p className="text-xl text-gray-300 font-accent">
              Key moments that shaped our journey toward global peace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timelineItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/20 backdrop-blur-sm hover:border-cyan-400/50 transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.8)' }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-cyan-400 font-bold text-lg mb-2">{item.year}</p>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Neon Peace Wall */}
      <motion.section 
        className={`${sectionShell} ${neonBackground}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
              Neon Peace Wall
            </h2>
            <p className="text-xl text-gray-300 font-accent">
              Share your message of peace with the world. Your voice matters!
            </p>
          </motion.div>
          <NeonPeaceWall />
        </div>
      </motion.section>

      {/* Peace-Painter */}
      <motion.section 
        className={`${sectionShell} ${liquidBackground}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              The Peace-Painter
            </h2>
            <p className="text-xl text-gray-300 font-accent">
              Create your digital masterpiece with neon brushes. Express peace through art!
            </p>
          </motion.div>
          <AdvancedPeacePainter />
        </div>
      </motion.section>

      {/* Harmony Hit Game */}
      <motion.section 
        className={`${sectionShell} ${neonBackground}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              The Harmony Hit
            </h2>
            <p className="text-xl text-gray-300 font-accent">
              Tap the rhythm of peace! Choose your difficulty and synchronize with the beat.
            </p>
          </motion.div>
          <AdvancedHarmonyHit />
        </div>
      </motion.section>

      {/* Vibe-Check Globe */}
      <section className={`${sectionShell} ${harmonyBackground}`}>
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              The Vibe-Check Globe
            </h2>
            <p className="text-xl text-gray-300 font-accent">
              Explore global peace pulses. Hover over cities to see messages from peace advocates worldwide.
            </p>
          </motion.div>
          <AdvancedVibeCheckGlobe />
        </div>
      </section>

      {/* Kindness Quest */}
      <section className={`${sectionShell} ${liquidBackground}`}>
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              The Kindness Quest
            </h2>
            <p className="text-xl text-gray-300 font-accent">
              Complete real-world peace challenges and unlock badges. Become a Peace Guardian!
            </p>
          </motion.div>
          <EnhancedKindnessQuest />
        </div>
      </section>

      {/* Footer */}
      <footer className={`${sectionShell} ${neonBackground} py-16 text-white`}>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Voice for Peace
              </h3>
              <p className="text-gray-400 font-accent">
                A global movement celebrating voices, creativity, and the power of peace.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400 font-accent">
                <li>Global Gallery</li>
                <li>Peace Wall</li>
                <li>Art Studio</li>
                <li>Harmony Game</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-lg font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 font-accent">
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Discord</li>
                <li>Email</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-white/10 pt-8 text-center text-gray-500 font-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>© 2026 Voice for Peace. A celebration of global harmony and creative expression.</p>
          </motion.div>
        </div>
      </footer>

      {/* Take Action Section */}
      <div id="take-action">
        <TakeAction />
      </div>
      </div>
    </div>
  );
}
