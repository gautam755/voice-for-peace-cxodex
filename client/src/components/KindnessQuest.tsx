import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  reward: string;
}

export function KindnessQuest() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'First Step',
      description: 'Share a kind word with someone',
      icon: '💬',
      completed: false,
      reward: 'Bronze Badge',
    },
    {
      id: 2,
      title: 'Peace Spreader',
      description: 'Compliment 3 people today',
      icon: '🌟',
      completed: false,
      reward: 'Silver Badge',
    },
    {
      id: 3,
      title: 'Helper',
      description: 'Help someone with a task',
      icon: '🤝',
      completed: false,
      reward: 'Gold Badge',
    },
    {
      id: 4,
      title: 'Community Builder',
      description: 'Organize a peace gathering',
      icon: '🏘️',
      completed: false,
      reward: 'Platinum Badge',
    },
    {
      id: 5,
      title: 'Global Ambassador',
      description: 'Connect with someone from another country',
      icon: '🌍',
      completed: false,
      reward: 'Diamond Badge',
    },
    {
      id: 6,
      title: 'Peace Guardian',
      description: 'Resolve a conflict peacefully',
      icon: '🕊️',
      completed: false,
      reward: 'Rainbow Badge',
    },
    {
      id: 7,
      title: 'Creative Advocate',
      description: 'Create art expressing peace',
      icon: '🎨',
      completed: false,
      reward: 'Cosmic Badge',
    },
    {
      id: 8,
      title: 'Legend',
      description: 'Complete all challenges',
      icon: '👑',
      completed: false,
      reward: 'Ultimate Badge',
    },
  ]);

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercentage = (completedCount / milestones.length) * 100;

  const toggleMilestone = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Progress header */}
        <div className="mb-8 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-black text-white">Kindness Quest</h3>
            <div className="text-right">
              <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {completedCount}/{milestones.length}
              </p>
              <p className="text-sm text-gray-400">Challenges Completed</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Winding path with milestones */}
        <div className="relative">
          {/* SVG path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: '600px' }}>
            <motion.path
              d="M 50 50 Q 150 100, 150 200 T 150 400 T 150 600"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2 }}
            />
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="50%" stopColor="#9D4EDD" />
                <stop offset="100%" stopColor="#FF6B35" />
              </linearGradient>
            </defs>
          </svg>

          {/* Milestones */}
          <div className="relative z-10 space-y-12 pl-32">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Milestone circle */}
                <motion.button
                  onClick={() => toggleMilestone(milestone.id)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold transition-all cursor-pointer ${
                    milestone.completed
                      ? 'bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/50'
                      : 'bg-gray-800 border-2 border-gray-700 hover:border-cyan-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {milestone.completed ? (
                    <Check className="w-8 h-8 text-gray-900" />
                  ) : (
                    milestone.icon
                  )}
                </motion.button>

                {/* Milestone info */}
                <motion.div
                  className={`flex-1 p-4 rounded-2xl transition-all ${
                    milestone.completed
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50'
                      : 'bg-gray-800/50 border border-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-bold text-white text-lg">{milestone.title}</h4>
                  <p className="text-sm text-gray-400">{milestone.description}</p>
                  <motion.div
                    className="mt-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 text-xs font-bold text-cyan-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: milestone.completed ? 1 : 0 }}
                  >
                    🏆 {milestone.reward}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rainbow progress bar at bottom */}
        <motion.div
          className="mt-12 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 via-orange-500 via-lime-400 to-pink-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
        />
      </motion.div>

      <p className="text-center text-gray-400 mt-4 font-accent">
        Complete challenges to unlock badges and become a Peace Guardian! 🏆
      </p>
    </div>
  );
}
