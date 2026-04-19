import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Award, Zap } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export function EnhancedKindnessQuest() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'First Step',
      description: 'Share a kind word with someone',
      icon: '💬',
      completed: false,
      reward: 'Bronze Badge',
      difficulty: 'easy',
      points: 10,
    },
    {
      id: 2,
      title: 'Peace Spreader',
      description: 'Compliment 3 people today',
      icon: '🌟',
      completed: false,
      reward: 'Silver Badge',
      difficulty: 'easy',
      points: 20,
    },
    {
      id: 3,
      title: 'Helper',
      description: 'Help someone with a task',
      icon: '🤝',
      completed: false,
      reward: 'Gold Badge',
      difficulty: 'medium',
      points: 35,
    },
    {
      id: 4,
      title: 'Community Builder',
      description: 'Organize a peace gathering',
      icon: '🏘️',
      completed: false,
      reward: 'Platinum Badge',
      difficulty: 'hard',
      points: 50,
    },
    {
      id: 5,
      title: 'Global Ambassador',
      description: 'Connect with someone from another country',
      icon: '🌍',
      completed: false,
      reward: 'Diamond Badge',
      difficulty: 'medium',
      points: 40,
    },
    {
      id: 6,
      title: 'Peace Guardian',
      description: 'Resolve a conflict peacefully',
      icon: '🕊️',
      completed: false,
      reward: 'Rainbow Badge',
      difficulty: 'hard',
      points: 60,
    },
    {
      id: 7,
      title: 'Creative Advocate',
      description: 'Create art expressing peace',
      icon: '🎨',
      completed: false,
      reward: 'Cosmic Badge',
      difficulty: 'medium',
      points: 45,
    },
    {
      id: 8,
      title: 'Legend',
      description: 'Complete all challenges',
      icon: '👑',
      completed: false,
      reward: 'Ultimate Badge',
      difficulty: 'hard',
      points: 100,
    },
  ]);

  const completedCount = milestones.filter((m) => m.completed).length;
  const totalPoints = milestones.reduce((sum, m) => sum + (m.completed ? m.points : 0), 0);
  const progressPercentage = (completedCount / milestones.length) * 100;

  const toggleMilestone = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'from-green-400 to-emerald-500';
      case 'medium':
        return 'from-yellow-400 to-orange-500';
      case 'hard':
        return 'from-red-400 to-pink-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
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
        {/* Header with stats */}
        <div className="mb-12 relative z-10">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div
              className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl p-6 border border-cyan-400/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <p className="text-sm font-accent text-gray-300">Completed</p>
              </div>
              <p className="text-4xl font-black text-cyan-400">{completedCount}/8</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl p-6 border border-orange-400/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-orange-400" />
                <p className="text-sm font-accent text-gray-300">Points</p>
              </div>
              <p className="text-4xl font-black text-orange-400">{totalPoints}</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-400" />
                <p className="text-sm font-accent text-gray-300">Progress</p>
              </div>
              <p className="text-4xl font-black text-purple-400">{Math.round(progressPercentage)}%</p>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Milestones grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.id}
              className={`relative rounded-2xl p-6 cursor-pointer overflow-hidden transition-all ${
                milestone.completed
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/50'
                  : 'bg-gray-800/50 border border-gray-700 hover:border-cyan-400/50'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleMilestone(milestone.id)}
            >
              {/* Difficulty badge */}
              <motion.div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getDifficultyColor(
                  milestone.difficulty
                )}`}
              >
                {milestone.difficulty.toUpperCase()}
              </motion.div>

              {/* Content */}
              <div className="flex gap-4">
                {/* Icon and checkbox */}
                <motion.div
                  className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold transition-all ${
                    milestone.completed
                      ? 'bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/50'
                      : 'bg-gray-700 border-2 border-gray-600 group-hover:border-cyan-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {milestone.completed ? '✓' : milestone.icon}
                </motion.div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg mb-1">{milestone.title}</h4>
                  <p className="text-sm text-gray-400 mb-3">{milestone.description}</p>

                  <div className="flex items-center justify-between">
                    <motion.div
                      className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 text-xs font-bold text-cyan-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: milestone.completed ? 1 : 0 }}
                    >
                      🏆 {milestone.reward}
                    </motion.div>

                    <motion.div
                      className="text-sm font-bold text-orange-400"
                      animate={{ scale: milestone.completed ? 1.2 : 1 }}
                    >
                      +{milestone.points} pts
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Completion animation */}
              {milestone.completed && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom motivational message */}
        {completedCount === milestones.length && (
          <motion.div
            className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-orange-500/20 border border-cyan-400/50 text-center relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.p
              className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎉 You are a Peace Legend! 🎉
            </motion.p>
            <p className="text-white/80 mt-2 font-accent">
              You've completed all challenges and earned the ultimate badge. Keep spreading peace!
            </p>
          </motion.div>
        )}
      </motion.div>

      <p className="text-center text-gray-400 mt-4 font-accent">
        Complete challenges to unlock badges and become a Peace Guardian! 🏆
      </p>
    </div>
  );
}
