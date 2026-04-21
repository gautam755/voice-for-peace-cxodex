import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Share2 } from 'lucide-react';

interface ActionItem {
  id: number;
  title: string;
  description: string;
  type: 'petition' | 'donation';
  organization: string;
  icon: string;
  color: string;
  link: string;
  impact: string;
}

const actionItems: ActionItem[] = [
  {
    id: 1,
    title: 'Stop Armed Conflict',
    description: 'Sign the petition calling for immediate ceasefire and peaceful resolution of global conflicts',
    type: 'petition',
    organization: 'Amnesty International',
    icon: '🕊️',
    color: 'from-blue-400 to-cyan-500',
    link: 'https://www.amnesty.org/en/get-involved/take-action/',
    impact: '500K+ signatures',
  },
  {
    id: 2,
    title: 'Support Refugee Programs',
    description: 'Donate to help refugees and displaced persons find safety and rebuild their lives',
    type: 'donation',
    organization: 'International Rescue Committee',
    icon: '🤝',
    color: 'from-purple-400 to-pink-500',
    link: 'https://www.rescue.org/donate',
    impact: 'Supports refugee relief worldwide',
  },
  {
    id: 3,
    title: 'Climate Peace Initiative',
    description: 'Join the movement to address climate change as a driver of global conflict',
    type: 'petition',
    organization: 'UN Climate Action',
    icon: '🌍',
    color: 'from-green-400 to-emerald-500',
    link: 'https://www.un.org/en/climatechange/',
    impact: '1M+ supporters',
  },
  {
    id: 4,
    title: 'Education for Peace',
    description: 'Support organizations teaching peace education to children worldwide',
    type: 'donation',
    organization: 'Peace First',
    icon: '📚',
    color: 'from-orange-400 to-red-500',
    link: 'https://www.peacefirst.org/donate',
    impact: 'Reaches 50K+ students',
  },
  {
    id: 5,
    title: 'Women Peace Builders',
    description: 'Support women leaders in peace negotiations and conflict resolution',
    type: 'petition',
    organization: "Women's Peace & Humanitarian Fund",
    icon: '👩‍💼',
    color: 'from-rose-400 to-pink-500',
    link: 'https://wphfund.org/womenbuildpeace/',
    impact: '300K+ advocates',
  },
  {
    id: 6,
    title: 'Global Health Initiative',
    description: 'Donate to health programs that bridge communities and prevent disease-driven conflicts',
    type: 'donation',
    organization: 'Doctors Without Borders',
    icon: '⚕️',
    color: 'from-red-400 to-rose-500',
    link: 'https://www.doctorswithoutborders.org/donate',
    impact: 'Serves 70+ countries',
  },
  {
    id: 7,
    title: 'Youth Peace Network',
    description: 'Join young leaders creating peace initiatives in their communities',
    type: 'petition',
    organization: 'United Nations',
    icon: '🌟',
    color: 'from-yellow-400 to-orange-500',
    link: 'https://www.un.org/en/peace-and-security/hear-us',
    impact: '100K+ youth involved',
  },
  {
    id: 8,
    title: 'Conflict Resolution Fund',
    description: 'Support organizations working on mediation and dialogue in conflict zones',
    type: 'donation',
    organization: 'International Crisis Group',
    icon: '🤲',
    color: 'from-indigo-400 to-purple-500',
    link: 'https://www.crisisgroup.org/donate',
    impact: 'Monitors 70+ conflicts',
  },
];

export default function TakeAction() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'petition' | 'donation'>('all');

  const filteredItems =
    selectedFilter === 'all' ? actionItems : actionItems.filter((item) => item.type === selectedFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-purple-500 opacity-20 blur-3xl" />
        <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-pink-500 opacity-20 blur-3xl" />
        <div className="absolute -bottom-8 left-1/2 h-72 w-72 rounded-full bg-blue-500 opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Take Action for Peace
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Your voice matters. Join millions worldwide working for a peaceful future. Sign petitions, donate to trusted organizations, and be part of the change.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex justify-center gap-4"
        >
          {(['all', 'petition', 'donation'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <div
                className={`rounded-xl bg-gradient-to-br ${item.color} p-0.5 transition-all duration-300 ${
                  hoveredId === item.id ? 'scale-105 shadow-2xl shadow-purple-500/50' : ''
                }`}
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[10px] bg-slate-900 p-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-3xl">{item.icon}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.type === 'petition' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'
                        }`}
                      >
                        {item.type === 'petition' ? 'Petition' : 'Donate'}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">
                      {item.title}
                    </h3>

                    <p className="mb-4 flex-grow text-sm text-gray-400">{item.description}</p>

                    <div className="mb-4 space-y-2">
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold text-gray-400">By:</span> {item.organization}
                      </p>
                      <p className="text-xs font-semibold text-cyan-400">{item.impact}</p>
                    </div>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                    >
                      {item.type === 'petition' ? 'Sign Now' : 'Donate Now'}
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>

                    <p className="mt-2 text-center text-[11px] font-accent uppercase tracking-[0.18em] text-gray-500">
                      Opens official site in a new tab
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-gray-400">
            Every action counts. Share this with your network and multiply the impact.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
            <Share2 className="h-5 w-5" />
            Share This Movement
          </button>
        </motion.div>
      </div>
    </section>
  );
}
