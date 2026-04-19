import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * DESIGN PHILOSOPHY: Neo-Surrealism Digital Art Gallery
 * Timeline component showcases historical peace movements with expandable cards
 */

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  color: string;
  glowColor: string;
  quote?: string;
  impact?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-orange-400 opacity-30" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8"
              animate={{
                scale: expandedId === item.id ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-6 h-6 rounded-full border-4 border-white relative z-10 cursor-pointer"
                style={{
                  background: item.color,
                  boxShadow: `0 0 20px ${item.glowColor}`,
                }}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              />
            </motion.div>

            {/* Timeline card */}
            <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="w-1/2 px-8" />
              <div className="w-1/2 px-8">
                <motion.div
                  className="relative cursor-pointer"
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="rounded-2xl p-6 border-2 relative overflow-hidden group"
                    style={{
                      borderColor: item.color,
                      background: 'rgba(255, 255, 255, 0.95)',
                    }}
                    animate={{
                      boxShadow:
                        expandedId === item.id
                          ? `0 0 30px ${item.glowColor}, inset 0 0 20px ${item.glowColor}20`
                          : `0 0 10px ${item.glowColor}40`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${item.glowColor}20 0%, transparent 70%)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <motion.div
                            className="text-4xl mb-2"
                            animate={{
                              scale: expandedId === item.id ? 1.2 : 1,
                              rotate: expandedId === item.id ? 10 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.icon}
                          </motion.div>
                          <p
                            className="text-sm font-bold font-accent"
                            style={{ color: item.color }}
                          >
                            {item.year}
                          </p>
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedId === item.id ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown
                            size={24}
                            style={{ color: item.color }}
                            className="opacity-60"
                          />
                        </motion.div>
                      </div>

                      <h3
                        className="text-xl font-bold font-display mb-2"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </h3>

                      <p className="text-gray-700 text-sm mb-4">{item.description}</p>

                      {/* Expandable content */}
                      <AnimatePresence>
                        {expandedId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t-2 border-gray-200">
                              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                {item.fullDescription}
                              </p>

                              {item.quote && (
                                <motion.div
                                  className="mb-4 p-4 rounded-lg border-l-4"
                                  style={{
                                    borderColor: item.color,
                                    background: `${item.glowColor}15`,
                                  }}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1, duration: 0.3 }}
                                >
                                  <p
                                    className="italic text-sm font-accent"
                                    style={{ color: item.color }}
                                  >
                                    "{item.quote}"
                                  </p>
                                </motion.div>
                              )}

                              {item.impact && (
                                <motion.div
                                  className="p-3 rounded-lg"
                                  style={{
                                    background: `${item.glowColor}10`,
                                  }}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.15, duration: 0.3 }}
                                >
                                  <p className="text-xs font-bold text-gray-600 mb-1">
                                    IMPACT & LEGACY
                                  </p>
                                  <p className="text-sm text-gray-700">{item.impact}</p>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
