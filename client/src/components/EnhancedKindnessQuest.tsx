import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Award, Sparkles, Target, Zap } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  howToDoIt: string;
  example: string;
}

const initialMilestones: Milestone[] = [
  {
    id: 1,
    title: 'First Step',
    description: 'Share a kind word with someone',
    icon: '💬',
    completed: false,
    reward: 'Bronze Badge',
    difficulty: 'easy',
    points: 10,
    howToDoIt: 'Say something supportive to a friend, family member, classmate, or coworker today.',
    example: 'Example: "You handled that really well today."',
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
    howToDoIt: 'Give three real compliments to three different people before you mark this done.',
    example: 'Example: compliment someone’s effort, kindness, or creativity.',
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
    howToDoIt: 'Offer practical help with something small but useful.',
    example: 'Example: carry groceries, explain homework, or assist with a chore.',
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
    howToDoIt: 'Bring people together for a positive conversation, activity, or mini event.',
    example: 'Example: host a tea talk, community cleanup, or group reflection.',
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
    howToDoIt: 'Start a respectful conversation with someone from another place or culture.',
    example: 'Example: exchange stories online, ask about traditions, or learn a greeting.',
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
    howToDoIt: 'Help calm a disagreement or improve understanding without aggression.',
    example: 'Example: listen to both sides and help people speak respectfully.',
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
    howToDoIt: 'Make something creative that communicates unity, care, or hope.',
    example: 'Example: draw, write, paint, record, or design a peace-themed piece.',
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
    howToDoIt: 'This unlocks only after the first seven real-world quests are completed.',
    example: 'Finish every other challenge to earn the final title.',
  },
];

export function EnhancedKindnessQuest() {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [selectedId, setSelectedId] = useState<number>(1);

  const selectedMilestone = milestones.find((milestone) => milestone.id === selectedId) ?? milestones[0];
  const completedCount = milestones.filter((milestone) => milestone.completed).length;
  const totalPoints = milestones.reduce((sum, milestone) => sum + (milestone.completed ? milestone.points : 0), 0);
  const progressPercentage = (completedCount / milestones.length) * 100;
  const regularQuestCount = milestones.filter((milestone) => milestone.id !== 8 && milestone.completed).length;

  const legendUnlocked = useMemo(() => regularQuestCount === 7, [regularQuestCount]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'from-green-400 to-emerald-500';
      case 'medium':
        return 'from-yellow-400 to-orange-500';
      case 'hard':
        return 'from-rose-500 to-fuchsia-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  const markComplete = (id: number) => {
    setMilestones((prev) =>
      prev.map((milestone) => {
        if (milestone.id !== id) {
          return milestone;
        }

        if (milestone.id === 8 && !legendUnlocked) {
          return milestone;
        }

        return { ...milestone, completed: true };
      })
    );
  };

  const resetQuest = (id: number) => {
    setMilestones((prev) =>
      prev.map((milestone) => (milestone.id === id ? { ...milestone, completed: false } : milestone))
    );
  };

  const canCompleteSelected = selectedMilestone.id !== 8 || legendUnlocked;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(7,11,24,0.96),rgba(3,8,18,0.94))] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(34,197,94,0.14),transparent_22%),radial-gradient(circle_at_85%_24%,rgba(16,185,129,0.14),transparent_22%),radial-gradient(circle_at_55%_88%,rgba(251,146,60,0.14),transparent_24%)]" />

        <div className="relative z-10 mb-10 grid gap-4 md:grid-cols-3">
          <motion.div
            className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-300" />
              <p className="text-sm font-accent text-emerald-100/80">Completed</p>
            </div>
            <p className="text-4xl font-black text-white">{completedCount}/8</p>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-6 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-300" />
              <p className="text-sm font-accent text-cyan-100/80">Points</p>
            </div>
            <p className="text-4xl font-black text-white">{totalPoints}</p>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-fuchsia-400/30 bg-fuchsia-400/10 p-6 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-fuchsia-300" />
              <p className="text-sm font-accent text-fuchsia-100/80">Progress</p>
            </div>
            <p className="text-4xl font-black text-white">{Math.round(progressPercentage)}%</p>
          </motion.div>
        </div>

        <div className="relative z-10 mb-10 h-4 overflow-hidden rounded-full border border-white/10 bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.45 }}
          />
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {milestones.map((milestone, idx) => {
              const isSelected = milestone.id === selectedId;
              const legendCardLocked = milestone.id === 8 && !legendUnlocked;

              return (
                <motion.button
                  key={milestone.id}
                  type="button"
                  className={`relative overflow-hidden rounded-3xl border p-5 text-left transition-all ${
                    isSelected
                      ? 'border-cyan-300/60 bg-white/12 shadow-[0_0_30px_rgba(34,211,238,0.16)]'
                      : 'border-white/10 bg-white/6 hover:border-cyan-400/30'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setSelectedId(milestone.id)}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                          milestone.completed
                            ? 'bg-gradient-to-br from-emerald-400 to-cyan-400'
                            : 'bg-white/10'
                        }`}
                      >
                        {milestone.completed ? '✓' : milestone.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{milestone.title}</h4>
                        <p className="text-sm text-white/60">{milestone.description}</p>
                      </div>
                    </div>

                    <div
                      className={`rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white ${getDifficultyColor(
                        milestone.difficulty
                      )}`}
                    >
                      {milestone.difficulty}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="rounded-full bg-white/8 px-3 py-1 text-cyan-200">{milestone.points} pts</span>
                    <span className={milestone.completed ? 'text-emerald-300' : 'text-white/55'}>
                      {milestone.completed ? milestone.reward : legendCardLocked ? 'Locked until all other quests are done' : 'Click to view what to do'}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 backdrop-blur-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-accent uppercase tracking-[0.28em] text-cyan-200/80">Selected Quest</p>
                <h3 className="mt-2 text-3xl font-black text-white">{selectedMilestone.title}</h3>
              </div>
              <div className="rounded-2xl bg-white/8 px-4 py-3 text-3xl">{selectedMilestone.completed ? '✅' : selectedMilestone.icon}</div>
            </div>

            <div className="mb-5 rounded-2xl border border-white/10 bg-white/6 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-accent uppercase tracking-[0.2em] text-emerald-200">
                <Target className="h-4 w-4" />
                What To Do
              </p>
              <p className="text-base leading-7 text-white/84">{selectedMilestone.howToDoIt}</p>
            </div>

            <div className="mb-6 rounded-2xl border border-white/10 bg-white/6 p-4">
              <p className="mb-2 text-sm font-accent uppercase tracking-[0.2em] text-orange-200">Example</p>
              <p className="text-base leading-7 text-white/72">{selectedMilestone.example}</p>
            </div>

            <div className="mb-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm leading-7 text-white/74">
                Clicking a quest only opens the instructions now. It does not auto-complete the challenge. Mark it done only after you actually do it in real life.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                type="button"
                className={`rounded-full px-6 py-3 font-bold text-slate-950 transition-all ${
                  selectedMilestone.completed || !canCompleteSelected
                    ? 'cursor-not-allowed bg-white/20 text-white/50'
                    : 'bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300'
                }`}
                whileHover={selectedMilestone.completed || !canCompleteSelected ? undefined : { scale: 1.03 }}
                whileTap={selectedMilestone.completed || !canCompleteSelected ? undefined : { scale: 0.98 }}
                onClick={() => markComplete(selectedMilestone.id)}
                disabled={selectedMilestone.completed || !canCompleteSelected}
              >
                {selectedMilestone.completed ? 'Already Completed' : 'Mark As Completed'}
              </motion.button>

              <motion.button
                type="button"
                className={`rounded-full border px-6 py-3 font-bold transition-all ${
                  selectedMilestone.completed
                    ? 'border-white/20 bg-white/8 text-white hover:border-rose-300/40 hover:text-rose-100'
                    : 'border-white/12 bg-white/4 text-white/45'
                }`}
                whileHover={selectedMilestone.completed ? { scale: 1.03 } : undefined}
                whileTap={selectedMilestone.completed ? { scale: 0.98 } : undefined}
                onClick={() => resetQuest(selectedMilestone.id)}
                disabled={!selectedMilestone.completed}
              >
                Reset This Quest
              </motion.button>
            </div>

            {!canCompleteSelected && (
              <p className="mt-4 text-sm text-yellow-200/80">
                Finish the first seven quests before unlocking the final `Legend` challenge.
              </p>
            )}
          </motion.div>
        </div>

        {completedCount === milestones.length && (
          <motion.div
            className="relative z-10 mt-10 rounded-[1.75rem] border border-emerald-300/30 bg-[linear-gradient(90deg,rgba(52,211,153,0.16),rgba(34,211,238,0.16),rgba(217,70,239,0.16))] p-6 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-2xl font-black text-transparent">
              You completed the full Kindness Quest.
            </p>
            <p className="mt-2 text-white/74">Every badge is unlocked because every real-world challenge has been finished.</p>
          </motion.div>
        )}
      </motion.div>

      <p className="mt-4 text-center font-accent text-gray-300">
        Open a quest, read what to do, complete it in real life, then mark it done.
      </p>
    </div>
  );
}
