import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  fullDescription: string;
  impact: string;
  stats: string[];
  quote: string;
  author: string;
}

export function GalleryModal({
  item,
  isOpen,
  onClose,
}: {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <motion.div
              className={`relative w-full max-w-2xl rounded-3xl bg-gradient-to-br ${item.color} p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all z-10"
                whileHover={{ scale: 1.1 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Header */}
              <div className="mb-8">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
                <h2 className="text-4xl font-black text-white mb-2">{item.title}</h2>
                <p className="text-lg text-white/80 font-accent">{item.description}</p>
              </div>

              {/* Full description */}
              <div className="mb-8 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-white leading-relaxed text-lg">{item.fullDescription}</p>
              </div>

              {/* Impact section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Global Impact</h3>
                <p className="text-white/90 leading-relaxed mb-4">{item.impact}</p>
                <div className="grid grid-cols-2 gap-4">
                  {item.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <p className="text-white font-bold text-lg">{stat}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quote section */}
              <motion.div
                className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border-l-4 border-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white italic text-lg mb-2">"{item.quote}"</p>
                <p className="text-white/80 font-bold">— {item.author}</p>
              </motion.div>

              {/* Action button */}
              <motion.button
                className="w-full mt-8 py-4 rounded-full bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join This Movement
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
