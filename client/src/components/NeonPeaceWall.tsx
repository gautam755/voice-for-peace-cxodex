import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  color: string;
  timestamp: number;
}

export function NeonPeaceWall() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Peace starts within 🕊️', color: 'text-cyan-400', timestamp: Date.now() - 5000 },
    { id: '2', text: 'Together we are stronger 💪', color: 'text-purple-400', timestamp: Date.now() - 3000 },
    { id: '3', text: 'Let love guide us 💖', color: 'text-orange-400', timestamp: Date.now() - 1000 },
  ]);
  const [messageInput, setMessageInput] = useState('');

  const handleAddMessage = () => {
    if (messageInput.trim()) {
      const colors = ['text-cyan-400', 'text-purple-400', 'text-orange-400', 'text-lime-400', 'text-pink-400'];
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageInput,
        color: colors[Math.floor(Math.random() * colors.length)],
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 overflow-hidden min-h-96 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Messages display */}
        <div className="min-h-64 mb-8 flex flex-wrap gap-4 items-start justify-center">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`${msg.color} font-bold text-lg backdrop-blur-sm bg-white/5 rounded-2xl px-6 py-3 border border-white/20 shadow-lg`}
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length === 0 && (
            <motion.div
              className="text-white/40 font-accent text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Your messages of peace will appear here ✨
            </motion.div>
          )}
        </div>

        {/* Input area */}
        <div className="flex gap-3">
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
          className="mt-6 text-center text-white/60 font-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {messages.length} messages of peace shared globally
        </motion.div>
      </motion.div>
    </div>
  );
}
