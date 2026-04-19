import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { GalleryItem } from './EnhancedGallery';

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
          <motion.div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <motion.div
              className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-gradient-to-br ${item.color} p-8 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={onClose}
                className="absolute right-6 top-6 z-10 rounded-full bg-white/20 p-2 transition-all hover:bg-white/30"
                whileHover={{ scale: 1.1 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.button>

              <div className="mb-8">
                <motion.div
                  className="mb-4 text-6xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
                <h2 className="mb-2 text-4xl font-black text-white">{item.title}</h2>
                <p className="text-lg text-white/80 font-accent">{item.description}</p>
              </div>

              <div className="mb-8 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-lg leading-relaxed text-white">{item.fullDescription}</p>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-2xl font-bold text-white">Global Impact</h3>
                <p className="mb-4 leading-relaxed text-white/90">{item.impact}</p>
                <div className="grid grid-cols-2 gap-4">
                  {item.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className="rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <p className="text-lg font-bold text-white">{stat}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="rounded-2xl border-l-4 border-white bg-white/20 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="mb-2 text-lg italic text-white">"{item.quote}"</p>
                <p className="font-bold text-white/80">— {item.author}</p>
              </motion.div>

              <motion.a
                href={item.movementUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 block w-full rounded-full bg-white py-4 text-center text-lg font-bold text-gray-900 transition-all hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join This Movement
              </motion.a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
