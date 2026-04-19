import { motion } from 'framer-motion';
import { useState } from 'react';
import { GalleryModal } from './GalleryModal';

export interface GalleryItem {
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
  movementUrl: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Unity in Diversity',
    description: 'Celebrating voices from around the world',
    color: 'from-teal-400 to-cyan-500',
    icon: '🌍',
    fullDescription:
      'Unity in Diversity represents the beautiful tapestry of human voices coming together. When people from different cultures, backgrounds, and beliefs unite for peace, they create an unstoppable force for positive change. This movement celebrates our differences while recognizing our shared humanity.',
    impact:
      'By embracing diversity, we create stronger communities that are resilient, innovative, and more compassionate. Diverse perspectives lead to better solutions and deeper understanding.',
    stats: ['195+ Countries', '8B+ People Connected', '1000+ Languages'],
    quote: 'In diversity there is beauty and strength. Our differences make us stronger together.',
    author: 'Global Peace Alliance',
    movementUrl: 'https://www.communityofchrist.ca/',
  },
  {
    id: 2,
    title: 'Creative Expression',
    description: 'Art as a medium for peace',
    color: 'from-purple-500 to-pink-500',
    icon: '🎨',
    fullDescription:
      'Art transcends boundaries and speaks to the human soul in ways words cannot. Creative expression through music, visual arts, dance, and literature has been a powerful tool for social change throughout history. Artists are the voice of generations, channeling emotion and truth into their work.',
    impact:
      'Creative movements have inspired millions to envision a more peaceful world. Art creates empathy, understanding, and connection across all divides.',
    stats: ['10M+ Artists', '500M+ Artworks', '100+ Art Movements'],
    quote: 'Art is the most beautiful form of protest and the most powerful tool for peace.',
    author: 'Creative Activists Worldwide',
    movementUrl: 'https://icapeace.org/',
  },
  {
    id: 3,
    title: 'Global Harmony',
    description: 'Connected hearts, shared vision',
    color: 'from-orange-400 to-red-500',
    icon: '💚',
    fullDescription:
      'Global Harmony is about creating synchronized movements where millions of hearts beat as one. When communities worldwide align their efforts toward peace, they create a powerful resonance that transforms societies. This is the harmony of collective action and shared purpose.',
    impact:
      'Synchronized global movements have achieved historic peace agreements, ended wars, and transformed governments. When the world speaks as one, leaders listen.',
    stats: ['50+ Global Movements', '1B+ Participants', '100+ Peace Treaties'],
    quote: 'When hearts align, mountains move. When the world speaks as one, peace follows.',
    author: 'United Nations Peace Initiative',
    movementUrl: 'http://www.beltandroadforum.org/',
  },
  {
    id: 4,
    title: 'Voices Rise',
    description: 'Amplifying peace through sound',
    color: 'from-lime-400 to-green-500',
    icon: '🎤',
    fullDescription:
      'Voices Rise celebrates the power of speaking truth and amplifying messages of peace. From grassroots activists to global leaders, voices that speak for peace inspire millions. Every voice matters, and together they create an unstoppable chorus for change.',
    impact:
      'Powerful speeches and messages have sparked revolutions, ended oppression, and inspired generations. Your voice has the power to change the world.',
    stats: ['1B+ Voices Heard', '10M+ Speeches', '1000+ Movements Started'],
    quote: 'Your voice is powerful. Speak for peace, and the world will listen.',
    author: 'Voice for Peace Movement',
    movementUrl: 'https://maryjaneknight.com/',
  },
  {
    id: 5,
    title: 'Digital Revolution',
    description: 'Technology for positive change',
    color: 'from-cyan-400 to-blue-500',
    icon: '⚡',
    fullDescription:
      'Technology has democratized activism and made it possible for anyone, anywhere to participate in global peace movements. From social media campaigns to blockchain-based voting systems, digital tools are reshaping how we organize for peace and justice.',
    impact:
      'Digital platforms have enabled real-time coordination of global movements, reaching billions instantly. Technology amplifies our collective power exponentially.',
    stats: ['5B+ Internet Users', '100M+ Daily Activists', '1000+ Tech Solutions'],
    quote: 'Technology is not the answer, but it is the amplifier of our collective will for peace.',
    author: 'Digital Peace Alliance',
    movementUrl: 'https://www.digitalrevolutionawards.com/',
  },
  {
    id: 6,
    title: 'Infinite Possibilities',
    description: 'Together we create tomorrow',
    color: 'from-pink-400 to-purple-500',
    icon: '✨',
    fullDescription:
      'When we unite for peace, we unlock infinite possibilities. The future is not predetermined. It is created by the choices we make today. Together, we have the power to imagine and build a world of peace, justice, and prosperity for all.',
    impact:
      'Collective imagination and action have transformed impossible dreams into reality. The future belongs to those who dare to dream and act.',
    stats: ['Infinite Futures', '7.8B+ Dreamers', 'Unlimited Possibilities'],
    quote: 'The only limit to our possibilities is our imagination and our willingness to act.',
    author: 'Future Builders Collective',
    movementUrl: 'https://csr.samsung.com/',
  },
  {
    id: 7,
    title: 'Digital Activism',
    description: 'Harnessing technology for social change',
    color: 'from-blue-400 to-indigo-600',
    icon: '💻',
    fullDescription:
      'Digital Activism harnesses the power of technology to organize, mobilize, and create tangible social change. From online petitions to coordinated digital campaigns, digital activists are reshaping the landscape of social movements and proving that change can happen at the speed of the internet.',
    impact:
      'Digital campaigns have successfully pressured governments, changed corporate policies, and mobilized millions for justice. The digital age has made activism accessible to everyone.',
    stats: ['10B+ Digital Actions', '500M+ Petitions Signed', '100+ Policy Changes'],
    quote: 'In the digital age, activism is just one click away. Power to the people.',
    author: 'Digital Justice Network',
    movementUrl: 'https://nasscomfoundation.org/',
  },
  {
    id: 8,
    title: 'Youth Voices',
    description: 'Empowering the next generation',
    color: 'from-rose-400 to-pink-600',
    icon: '🌟',
    fullDescription:
      'Youth Voices represents the energy, passion, and vision of young people leading the charge for peace. Young activists are not waiting for permission. They are creating the future they want to see. Their idealism, innovation, and determination are reshaping the world.',
    impact:
      'Youth-led movements have achieved historic victories, from climate action to racial justice. The next generation is the future of peace.',
    stats: ['2B+ Young People', '100M+ Youth Activists', '1000+ Youth-Led Movements'],
    quote: 'We are the future, and we are here to create the change we want to see.',
    author: 'Global Youth for Peace',
    movementUrl: 'https://scholasoccurrentes.org/',
  },
  {
    id: 9,
    title: 'Cultural Exchange',
    description: 'Bridging traditions and communities',
    color: 'from-amber-400 to-yellow-500',
    icon: '🌉',
    fullDescription:
      "Cultural Exchange breaks down barriers by celebrating and sharing the rich traditions, stories, and wisdom of different cultures. When we understand and appreciate each other's cultures, we build bridges of empathy and connection that transcend conflict.",
    impact:
      'Cultural exchange programs have fostered lifelong friendships, prevented conflicts, and created lasting peace between nations. Understanding breeds compassion.',
    stats: ['500+ Cultures', '1000+ Exchange Programs', '10M+ Cultural Ambassadors'],
    quote: 'Culture is the language of the soul. Through culture, we understand each other.',
    author: 'UNESCO Peace Through Culture',
    movementUrl: 'https://villavieresidences.com/global-harmony',
  },
  {
    id: 10,
    title: 'Art for Change',
    description: 'Transforming the world through creativity',
    color: 'from-emerald-400 to-teal-600',
    icon: '🎭',
    fullDescription:
      'Art for Change uses creative expression as a catalyst for social transformation. Artists are activists, using their talents to challenge injustice, inspire hope, and imagine better futures. Every brushstroke, every note, every word is an act of resistance and love.',
    impact:
      'Artistic movements have toppled dictatorships, ended wars, and transformed consciousness. Art is the revolution that never stops.',
    stats: ['100M+ Artists', '1B+ Artworks', '1000+ Art Revolutions'],
    quote: 'Art is not decoration for your wall. Art is a force against brutality and darkness.',
    author: 'Artists for Global Peace',
    movementUrl: 'https://opusforpeace.com/',
  },
];

export function EnhancedGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.id}
            className={`group relative h-64 cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} p-8 flex flex-col justify-between`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={() => handleCardClick(item)}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-white/0 transition-all duration-300 group-hover:border-white/50"
              animate={{
                boxShadow: [
                  'inset 0 0 20px rgba(255,255,255,0)',
                  'inset 0 0 40px rgba(255,255,255,0.2)',
                  'inset 0 0 20px rgba(255,255,255,0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                className="mb-4 text-5xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {item.icon}
              </motion.div>
              <h3 className="mb-2 text-2xl font-black text-white">{item.title}</h3>
              <p className="text-sm text-white/90 font-accent">{item.description}</p>
            </div>

            <motion.div
              className="relative z-10 text-sm font-bold text-white/60"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to explore →
            </motion.div>
          </motion.div>
        ))}
      </div>

      <GalleryModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
