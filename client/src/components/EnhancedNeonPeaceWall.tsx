import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  color: string;
  timestamp: number;
  x: number;
  y: number;
}

export function EnhancedNeonPeaceWall() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Peace starts within 🕊️', color: 'text-cyan-400', timestamp: Date.now() - 5000, x: 10, y: 20 },
    { id: '2', text: 'Together we are stronger 💪', color: 'text-purple-400', timestamp: Date.now() - 3000, x: 60, y: 40 },
    { id: '3', text: 'Let love guide us 💖', color: 'text-orange-400', timestamp: Date.now() - 1000, x: 30, y: 60 },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [floatingParticles, setFloatingParticles] = useState<Array<{ id: string; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    // Generate floating particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#00D9FF', '#9D4EDD', '#FF6B35', '#39FF14', '#FF006E'][Math.floor(Math.random() * 5)],
    }));
    setFloatingParticles(particles);
  }, []);

  const handleAddMessage = () => {
    if (messageInput.trim()) {
      const colors = ['text-cyan-400', 'text-purple-400', 'text-orange-400', 'text-lime-400', 'text-pink-400'];
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput,
        color: colors[Math.floor(Math.random() * colors.length)],
        timestamp: Date.now(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-b from-gray-900 via-purple-900 to-black rounded-3xl p-8 overflow-hidden min-h-96"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Animated background layers */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-orange-500/10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
          />

          {/* Floating particles background */}
          {floatingParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: particle.color }}
              animate={{
                x: [particle.x, particle.x + 50, particle.x],
                y: [particle.y, particle.y - 100, particle.y],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 6 + Math.random() * 4, repeat: Infinity }}
              initial={{ left: `${particle.x}%`, top: `${particle.y}%` }}
            />
          ))}

          {/* Glowing orbs */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute w-32 h-32 rounded-full blur-3xl"
              style={{
                background: ['radial-gradient(circle, #00D9FF, transparent)', 'radial-gradient(circle, #9D4EDD, transparent)', 'radial-gradient(circle, #FF6B35, transparent)'][i],
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 8 + i * 2, repeat: Infinity }}
              initial={{ left: `${20 + i * 30}%`, top: `${10 + i * 20}%` }}
            />
          ))}
        </div>

        {/* Messages display area */}
        <div className="relative z-10 min-h-64 mb-8 flex items-center justify-center">
          <div className="relative w-full h-64">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`absolute ${msg.color} font-bold text-lg backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-3 border border-white/20 shadow-lg`}
                  style={{
                    left: `${msg.x}%`,
                    top: `${msg.y}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -30, 0],
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Center message */}
            {messages.length === 0 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-white/40 font-accent text-lg">Your messages of peace will appear here ✨</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="relative z-10 flex gap-3">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddMessage()}
            placeholder="Share your message of peace..."
            className="flex-1 bg-white/10 border border-white/30 rounded-full px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:bg-white/20 transition-all"
          />
          <motion.button
            onClick={handleAddMessage}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-gray-900 font-bold hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Message count */}
        <motion.div
          className="relative z-10 mt-6 text-center text-white/60 font-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {messages.length} messages of peace shared globally
        </motion.div>
      </motion.div>
    </div>
  );
}
