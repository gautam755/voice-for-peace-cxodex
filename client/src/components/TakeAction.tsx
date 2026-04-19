import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ExternalLink } from 'lucide-react';

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
    impact: '500K+ signatures'
  },
  {
    id: 2,
    title: 'Support Refugee Programs',
    description: 'Donate to help refugees and displaced persons find safety and rebuild their lives',
    type: 'donation',
    organization: 'UNHCR',
    icon: '🤝',
    color: 'from-purple-400 to-pink-500',
    link: 'https://www.unhcr.org/donate',
    impact: 'Helps 100M+ people'
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
    impact: '1M+ supporters'
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
    impact: 'Reaches 50K+ students'
  },
  {
    id: 5,
    title: 'Women Peace Builders',
    description: 'Sign petition supporting women leaders in peace negotiations and conflict resolution',
    type: 'petition',
    organization: 'Women Peace Makers',
    icon: '👩‍💼',
    color: 'from-rose-400 to-pink-500',
    link: 'https://www.womenpeacemakers.org/take-action',
    impact: '300K+ advocates'
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
    impact: 'Serves 70+ countries'
  },
  {
    id: 7,
    title: 'Youth Peace Network',
    description: 'Join young leaders creating peace initiatives in their communities',
    type: 'petition',
    organization: 'UN Youth for Peace',
    icon: '🌟',
    color: 'from-yellow-400 to-orange-500',
    link: 'https://www.un.org/en/youth/peace-and-security',
    impact: '100K+ youth involved'
  },
  {
    id: 8,
    title: 'Conflict Resolution Fund',
    description: 'Support organizations working on mediation and dialogue in conflict zones',
    type: 'donation',
    organization: 'International Crisis Group',
    icon: '🤲',
    color: 'from-indigo-400 to-purple-500',
    link: 'https://www.crisisgroup.org/support-our-work',
    impact: 'Monitors 70+ conflicts'
  }
];

export default function TakeAction() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'petition' | 'donation'>('all');

  const filteredItems = selectedFilter === 'all' 
    ? actionItems 
    : actionItems.filter(item => item.type === selectedFilter);

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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Take Action for Peace
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your voice matters. Join millions worldwide working for a peaceful future. Sign petitions, donate to trusted organizations, and be part of the change.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {(['all', 'petition', 'donation'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Action Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${item.color} p-0.5 rounded-xl transition-all duration-300 ${
                hoveredId === item.id ? 'shadow-2xl shadow-purple-500/50 scale-105' : ''
              }`}>
                <div className="bg-slate-900 rounded-[10px] p-6 h-full flex flex-col relative overflow-hidden">
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon and Type */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'petition'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-pink-500/20 text-pink-300'
                      }`}>
                        {item.type === 'petition' ? '✍️ Petition' : '❤️ Donate'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4 flex-grow">
                      {item.description}
                    </p>

                    {/* Organization and Impact */}
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold text-gray-400">By:</span> {item.organization}
                      </p>
                      <p className="text-xs font-semibold text-cyan-400">
                        {item.impact}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group/btn"
                    >
                      {item.type === 'petition' ? 'Sign Now' : 'Donate Now'}
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">
            Every action counts. Share this with your network and multiply the impact.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
            <Share2 className="w-5 h-5" />
            Share This Movement
          </button>
        </motion.div>
      </div>
    </section>
  );
}
