import React, { useState, useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Star,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Sun,
  Flower2,
  Rainbow,
  BookOpen,
  Quote,
  Gift,
  Music,
} from 'lucide-react';

// ============================================================
// TYPES
// ============================================================
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'heart' | 'star' | 'bubble';
  color: string;
}

interface WishCard {
  icon: React.ReactNode;
  text: string;
  subtext: string;
}

// ============================================================
// DATA
// ============================================================
const WISHES: WishCard[] = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    text: 'Kesehatan & Kebahagiaan',
    subtext: 'Semoga selalu sehat, bugar, dan dikelilingi kebahagiaan setiap hari'
  },
  {
    icon: <Flower2 className="w-5 h-5" />,
    text: 'Impian Tercapai',
    subtext: 'Semoga setiap mimpi dan cita-cita perlahan menjadi kenyataan'
  },
  {
    icon: <Heart className="w-5 h-5" />,
    text: 'Cinta & Kehangatan',
    subtext: 'Semoga selalu dikelilingi orang-orang baik yang tulus menyayangimu'
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    text: 'Kesuksesan Masa Depan',
    subtext: 'Semoga sukses di setiap langkah dan karier yang gemilang menanti'
  },
  {
    icon: <Rainbow className="w-5 h-5" />,
    text: 'Hari-hari Indah',
    subtext: 'Semoga setiap harimu dipenuhi warna-warni kebahagiaan'
  },
  {
    icon: <Sun className="w-5 h-5" />,
    text: 'Cahaya & Harapan',
    subtext: 'Semoga selalu ada cahaya yang menuntunmu di setiap kegelapan'
  },
];

const QUOTES = [
  { text: 'Percayalah pada dirimu sendiri, karena hal-hal hebat sedang menunggumu.', author: '— Untuk Keyla' },
  { text: 'Langkah kecil setiap hari akan membawamu menuju mimpi besar.', author: '— Untuk Keyla' },
  { text: 'Jangan takut gagal, karena setiap kegagalan adalah pelajaran menuju keberhasilan.', author: '— Untuk Keyla' },
  { text: 'Kamu lebih kuat dari yang kamu kira, dan lebih berharga dari yang kamu sadari.', author: '— Untuk Keyla' },
  { text: 'Setiap hari adalah kesempatan baru untuk menjadi versi terbaik dari dirimu.', author: '— Untuk Keyla' },
  { text: 'Mimpi-mimpimu adalah bintang penuntunmu, ikuti mereka dengan percaya diri.', author: '— Untuk Keyla' },
];

const GALLERY_TOP = [
  '/f1.jpeg', '/f2.png', '/f3.png', '/f4.png', '/f5.png',
  '/f6.png', '/f7.png', '/f8.png', '/f9.png', '/f10.png',
];

const GALLERY_BOTTOM = [
  '/f10.png', '/f9.png', '/f8.png', '/f7.png', '/f6.png',
  '/f5.png', '/f4.png', '/f3.png', '/f2.png', '/f1.jpeg',
];

// ============================================================
// PARTICLES
// ============================================================
const FloatingParticles: React.FC<{ type?: 'hearts' | 'stars' | 'mixed'; count?: number }> = ({
  type = 'mixed',
  count = 15
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 6,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -Math.random() * 0.3 - 0.03,
      opacity: Math.random() * 0.35 + 0.1,
      type: type === 'mixed'
        ? (['heart', 'star', 'bubble'] as const)[Math.floor(Math.random() * 3)]
        : type === 'hearts' ? 'heart' : 'star',
      color: ['#FFD6E7', '#E8D5FF', '#FFE5D4', '#FFB6C1', '#FFF8F0', '#FCE7F3'][Math.floor(Math.random() * 6)],
    }));
    setParticles(newParticles);
  }, [type, count]);

  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100,
      })));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: p.opacity }}
          animate={{ y: [0, -12, 0], rotate: [0, 360] }}
          transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.type === 'heart' && <Heart size={p.size} fill={p.color} color={p.color} />}
          {p.type === 'star' && <Star size={p.size} fill={p.color} color={p.color} />}
          {p.type === 'bubble' && (
            <div className="rounded-full" style={{ width: p.size, height: p.size, backgroundColor: p.color, opacity: 0.4 }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================
// CONFETTI
// ============================================================
const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (active) {
      const items = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#FFD6E7', '#E8D5FF', '#FFE5D4', '#FFB6C1', '#FCE7F3', '#FFF8F0'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 2,
      }));
      setConfetti(items);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map(c => (
        <motion.div
          key={c.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${c.x}%`, backgroundColor: c.color }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: 720, opacity: [1, 1, 0] }}
          transition={{ duration: 3 + Math.random() * 2, delay: c.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  );
};

// ============================================================
// MARQUEE GALLERY (Portrait, Top→Right, Bottom→Left)
// ============================================================
const MarqueeGallery: React.FC = () => {
  const topRow = [...GALLERY_TOP, ...GALLERY_TOP, ...GALLERY_TOP];
  const bottomRow = [...GALLERY_BOTTOM, ...GALLERY_BOTTOM, ...GALLERY_BOTTOM];

  return (
    <div className="w-full overflow-hidden space-y-4 py-2">
      {/* Top row - moves RIGHT */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-3"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {topRow.map((src, i) => (
            <motion.div
              key={`top-${i}`}
              className="flex-shrink-0 w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 rounded-xl overflow-hidden shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img src={src} alt={`Kenangan ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom row - moves LEFT */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-3"
          animate={{ x: ['-33.33%', '0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {bottomRow.map((src, i) => (
            <motion.div
              key={`bottom-${i}`}
              className="flex-shrink-0 w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 rounded-xl overflow-hidden shadow-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <img src={src} alt={`Kenangan ${i + 11}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================
// SMALL ELEGANT BUTTON
// ============================================================
const SmallButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className = '' }) => (
  <motion.button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide bg-white/80 text-pink-500 border border-pink-100 hover:bg-white hover:shadow-sm transition-all duration-300 flex items-center gap-1.5 ${className}`}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
);

// ============================================================
// PAGE 1: INTRO COUNTDOWN
// ============================================================
const IntroPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowText(true);
      const timer = setTimeout(onComplete, 4000);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFD6E7 0%, #E8D5FF 25%, #FFF8F0 50%, #FFE5D4 75%, #FFD6E7 100%)',
        backgroundSize: '400% 400%',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    >
      <FloatingParticles type="mixed" count={15} />
      <Confetti active={showText} />

      <AnimatePresence mode="wait">
        {!showText ? (
          <motion.div
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-8xl md:text-[10rem] font-bold text-white relative z-20"
            style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 30px rgba(255,182,193,0.6)' }}
          >
            {count}
          </motion.div>
        ) : (
          <motion.div
            key="happy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            className="text-center px-4 relative z-20"
          >
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3"
              style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 25px rgba(255,182,193,0.5)' }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              HAPPY BIRTHDAY
            </motion.h1>
            <motion.div
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 30px rgba(255,182,193,0.5)' }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              KEYLA 🎂
            </motion.div>
            <motion.div
              className="mt-6 flex justify-center gap-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.8, delay: i * 0.12, repeat: Infinity }}
                >
                  <Heart size={20} fill="#FFB6C1" color="#FFB6C1" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============================================================
// PAGE 2: ENVELOPE (Like reference image, soft pink)
// ============================================================
const EnvelopePage: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 600);
    setTimeout(onOpen, 2500);
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FFD6E7 50%, #E8D5FF 100%)' }}
    >
      <FloatingParticles type="hearts" count={10} />

      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-white relative z-20"
        style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 12px rgba(255,182,193,0.35)' }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Happy Birthday!
      </motion.h1>

      <div className="flex items-center justify-center gap-6 md:gap-14 relative z-20">
        {/* Left decoration */}
        <motion.div
          className="hidden md:block"
          animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Gift size={36} strokeWidth={1} className="text-pink-300/50" />
        </motion.div>

        {/* Envelope */}
        <div className="relative" style={{ perspective: '1000px' }}>
          <motion.div
            className="relative w-56 h-36 sm:w-64 sm:h-40 md:w-72 md:h-48 cursor-pointer"
            onClick={!isOpen ? handleOpen : undefined}
            whileHover={!isOpen ? { scale: 1.02 } : {}}
            animate={isOpen ? { rotateX: 6 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Envelope Body */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background: 'linear-gradient(145deg, #FCE7F3 0%, #FFD6E7 40%, #FBCFE8 100%)',
                boxShadow: '0 12px 30px rgba(255,182,193,0.2), 0 3px 8px rgba(0,0,0,0.04)',
              }}
            >
              {/* Top flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[50%] origin-top z-20"
                style={{
                  background: 'linear-gradient(180deg, #FBCFE8 0%, #F9A8D4 100%)',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                }}
                animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />

              {/* Left flap */}
              <div
                className="absolute top-0 left-0 w-[50%] h-full z-10"
                style={{
                  background: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
                  clipPath: 'polygon(0 0, 100% 32%, 100% 100%, 0 100%)',
                }}
              />

              {/* Right flap */}
              <div
                className="absolute top-0 right-0 w-[50%] h-full z-10"
                style={{
                  background: 'linear-gradient(225deg, #FCE7F3 0%, #FBCFE8 100%)',
                  clipPath: 'polygon(100% 0, 0 32%, 0 100%, 100% 100%)',
                }}
              />

              {/* Bottom flap */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[50%] z-10"
                style={{
                  background: 'linear-gradient(0deg, #F9A8D4 0%, #FBCFE8 100%)',
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                }}
              />

              {/* Wax seal / Heart seal */}
              {!isOpen && (
                <motion.div
                  className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                  whileHover={{ scale: 1.08 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <div
                    className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(145deg, #F9A8D4, #F472B6)',
                      boxShadow: '0 3px 10px rgba(244,114,182,0.3), inset 0 1px 3px rgba(255,255,255,0.3)',
                    }}
                  >
                    <Heart size={20} fill="white" color="white" />
                  </div>
                </motion.div>
              )}

              {/* Small hearts */}
              <motion.div className="absolute top-2 right-2 z-20" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
                <Heart size={12} fill="#F9A8D4" color="#F9A8D4" />
              </motion.div>
              <motion.div className="absolute bottom-2 left-2 z-20" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}>
                <Heart size={10} fill="#FBCFE8" color="#FBCFE8" />
              </motion.div>
            </div>

            {/* Letter */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 md:w-56 bg-white rounded-lg shadow-lg p-4 z-30"
                  initial={{ y: 10, opacity: 0, scale: 0.9 }}
                  animate={{ y: -80, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{
                    background: 'linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)',
                    boxShadow: '0 6px 20px rgba(255,182,193,0.2)',
                  }}
                >
                  <div className="text-center">
                    <Heart size={20} fill="#F9A8D4" color="#F9A8D4" className="mx-auto mb-1.5" />
                    <p className="text-pink-400 font-medium text-xs">Surat Spesial Untukmu...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right decoration */}
        <motion.div
          className="hidden md:block"
          animate={{ y: [0, -8, 0], rotate: [3, -3, 3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <Music size={36} strokeWidth={1} className="text-pink-300/50" />
        </motion.div>
      </div>

      <motion.p
        className="mt-6 text-pink-400/60 text-xs font-medium relative z-20"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Klik segel hati untuk membuka
      </motion.p>
    </motion.div>
  );
};

// ============================================================
// PAGE 3: MESSAGE
// ============================================================
const MessagePage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const message = `Selamat ulang tahun ke-18, Keyla Rani Azahra. Hari ini semesta menambahkan satu bait lagi pada puisi panjang tentang hidupmu; dan jika suatu hari ragamu berkelana jauh, pergilah dengan tenang, sebab doa-doa baik akan selalu menemukan jalan untuk mengitarimu. Aku tak ingin menjadi alasan langkahmu tertahan, melainkan menjadi seseorang yang diam-diam berharap agar setiap jalan yang kau pilih dipenuhi cahaya, agar setiap lelahmu dipeluk oleh kebahagiaan, dan agar kau selalu dipertemukan dengan hati-hati baik yang menjaga tanpa mengikat serta mencintai tanpa melukai. Delapan belas adalah usia ketika langit terasa lebih luas dan mimpi-mimpi mulai memanggil namamu dengan lebih nyaring; maka terbanglah setinggi yang kau mau, sebab yang paling indah darimu bukanlah seberapa jauh kau pergi, melainkan bagaimana kau tetap menjadi Keyla yang hangat, tulus, dan berharga di tengah dunia yang terus berubah. Semoga segala hal baik yang selama ini kau doakan perlahan menemukan jalannya untuk pulang kepadamu.`;

  return (
    <motion.div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFD6E7 50%, #E8D5FF 100%)' }}
    >
      <FloatingParticles type="hearts" count={12} />

      <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Photo */}
          <motion.div
            className="relative mx-auto md:mx-0 order-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="relative mx-auto rounded-2xl overflow-hidden"
              style={{
                width: 'min(16rem, 75vw)',
                height: 'min(21rem, 55vh)',
                boxShadow: '0 14px 45px rgba(255,182,193,0.25)',
                border: '1px solid rgba(255,255,255,0.5)',
              }}
            >
              <div className="absolute inset-[4px] rounded-[0.85rem] overflow-hidden">
                <img src="/keyla.png" alt="Keyla" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-400/10 to-transparent" />
              </div>
              <motion.div className="absolute -top-2 -right-2" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
                <Sparkles size={24} color="#F9A8D4" />
              </motion.div>
              <motion.div className="absolute -bottom-2 -left-2" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Heart size={18} fill="#FBCFE8" color="#FBCFE8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            className="space-y-4 order-2"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left"
              style={{
                background: 'linear-gradient(45deg, #F472B6, #E8D5FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Georgia, serif',
              }}
            >
              Untuk Keyla ❤️
            </h2>

            <div
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-md"
              style={{ boxShadow: '0 4px 16px rgba(255,182,193,0.12)', border: '1px solid rgba(255,255,255,0.5)' }}
            >
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-xs sm:text-sm md:text-[0.9rem]">
                {message}
              </p>
            </div>

            <div className="flex justify-center md:justify-start">
              <SmallButton onClick={onNext}>
                Selanjutnya <ChevronRight size={14} />
              </SmallButton>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// PAGE 4: GALLERY (Marquee, no scroll indicator)
// ============================================================
const GalleryPage: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <motion.div
    className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #E8D5FF 0%, #FFD6E7 50%, #FFF8F0 100%)' }}
  >
    <FloatingParticles type="mixed" count={10} />

    <motion.h2
      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white relative z-20"
      style={{ textShadow: '0 2px 12px rgba(255,182,193,0.3)', fontFamily: 'Georgia, serif' }}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      Galeri Kenangan
    </motion.h2>

    <motion.p
      className="text-white/60 mb-4 text-center text-xs md:text-sm relative z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      Momen-momen indah yang tak terlupakan
    </motion.p>

    <div className="w-full max-w-6xl px-2">
      <MarqueeGallery />
    </div>

    <motion.div
      className="mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <SmallButton onClick={onNext}>
        Selanjutnya <ChevronRight size={14} />
      </SmallButton>
    </motion.div>
  </motion.div>
);

// ============================================================
// PAGE 5: WISHES (Beautiful cards)
// ============================================================
const WishesPage: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <motion.div
    className="fixed inset-0 overflow-y-auto"
    style={{ background: 'linear-gradient(135deg, #FFD6E7 0%, #E8D5FF 50%, #FFE5D4 100%)' }}
  >
    <FloatingParticles type="mixed" count={15} />

    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white"
        style={{ textShadow: '0 2px 12px rgba(255,182,193,0.3)', fontFamily: 'Georgia, serif' }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Harapan untuk Keyla 🌟
      </motion.h2>

      <motion.p
        className="text-white/60 mb-6 md:mb-8 text-center text-xs md:text-sm max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Semoga semua harapan indah ini menjadi kenyataan dalam hidupmu
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl w-full">
        {WISHES.map((wish, i) => (
          <motion.div
            key={i}
            className="bg-white/70 backdrop-blur-md rounded-xl p-4 shadow-sm group"
            style={{
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 3px 12px rgba(255,182,193,0.1)',
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.02, y: -3, boxShadow: '0 8px 25px rgba(255,182,193,0.15)' }}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0 text-pink-400">
                {wish.icon}
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold text-xs md:text-sm mb-0.5">{wish.text}</h3>
                <p className="text-gray-500 text-[0.7rem] md:text-xs leading-relaxed">{wish.subtext}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 md:mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <SmallButton onClick={onNext}>
          Selanjutnya <ChevronRight size={14} />
        </SmallButton>
      </motion.div>
    </div>
  </motion.div>
);

// ============================================================
// PAGE 6: QUOTES (Like reference image - simple cards)
// ============================================================
const QuotesPage: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <motion.div
    className="fixed inset-0 overflow-y-auto"
    style={{ background: 'linear-gradient(180deg, #E8D5FF 0%, #FFD6E7 40%, #FFF8F0 100%)' }}
  >
    <FloatingParticles type="mixed" count={12} />

    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white"
        style={{ textShadow: '0 2px 12px rgba(255,182,193,0.3)', fontFamily: 'Georgia, serif' }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Quote Motivasi 💫
      </motion.h2>

      <motion.p
        className="text-white/60 mb-6 md:mb-8 text-center text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Kata-kata indah untuk menemanimu di hari spesialmu
      </motion.p>

      {/* Simple card layout like reference image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-4xl w-full">
        {QUOTES.map((quote, i) => (
          <motion.div
            key={i}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm relative"
            style={{
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 2px 10px rgba(255,182,193,0.1)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 8px 20px rgba(255,182,193,0.15)' }}
          >
            <Quote size={18} className="text-pink-300 mb-2" />
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-medium mb-2">
              "{quote.text}"
            </p>
            <p className="text-pink-400 text-[0.65rem] md:text-xs italic text-right">
              {quote.author}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 md:mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <SmallButton onClick={onNext}>
          Selanjutnya <ChevronRight size={14} />
        </SmallButton>
      </motion.div>
    </div>
  </motion.div>
);

// ============================================================
// PAGE 7: CLOSING (Clean, soft, not busy)
// ============================================================
const ClosingPage: React.FC<{ onRestart: () => void }> = ({ onRestart }) => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #FFD6E7 0%, #E8D5FF 40%, #FFF8F0 100%)' }}
  >
    <FloatingParticles type="hearts" count={10} />
    <Confetti active={true} />

    <motion.div
      className="text-center px-4 max-w-lg relative z-20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, type: 'spring' }}
    >
      <motion.div
        animate={{ rotate: [0, 6, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="mb-4"
      >
        <Sparkles size={36} className="mx-auto text-pink-300" />
      </motion.div>

      <motion.h2
        className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-700"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Terima kasih sudah menjadi pribadi yang luar biasa ✨
      </motion.h2>

      <motion.h1
        className="text-xl sm:text-2xl md:text-4xl font-bold mb-2"
        style={{
          background: 'linear-gradient(45deg, #F472B6, #a083c3, #bb6b8c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Georgia, serif',
        }}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Selamat Ulang Tahun Keyla ❤️
      </motion.h1>

      <motion.p
        className="text-sm md:text-base text-gray-500 mb-5"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Semoga tahun ini menjadi tahun terbaikmu.
      </motion.p>

      <motion.div
        className="flex justify-center gap-2 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
          >
            <Heart
              size={16 + i * 2}
              fill={['#F9A8D4', '#FBCFE8', '#E8D5FF', '#FFD6E7', '#FFE5D4'][i]}
              color="transparent"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <SmallButton onClick={onRestart}>
          <RefreshCw size={13} />
          Putar Lagi
        </SmallButton>
      </motion.div>
    </motion.div>
  </motion.div>
);

// ============================================================
// MAIN APP (Page swap, NOT scroll)
// ============================================================
const App: React.FC = () => {
  const [page, setPage] = useState(0);

  const nextPage = () => setPage(p => p + 1);
  const restart = () => setPage(0);

  return (
    <div className="w-screen h-screen overflow-hidden" style={{ fontFamily: 'Georgia, Poppins, sans-serif' }}>
      <AnimatePresence mode="wait">
        {page === 0 && (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <IntroPage onComplete={nextPage} />
          </motion.div>
        )}
        {page === 1 && (
          <motion.div key="envelope" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <EnvelopePage onOpen={nextPage} />
          </motion.div>
        )}
        {page === 2 && (
          <motion.div key="message" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <MessagePage onNext={nextPage} />
          </motion.div>
        )}
        {page === 3 && (
          <motion.div key="gallery" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <GalleryPage onNext={nextPage} />
          </motion.div>
        )}
        {page === 4 && (
          <motion.div key="wishes" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <WishesPage onNext={nextPage} />
          </motion.div>
        )}
        {page === 5 && (
          <motion.div key="quotes" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <QuotesPage onNext={nextPage} />
          </motion.div>
        )}
        {page === 6 && (
          <motion.div key="closing" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ClosingPage onRestart={restart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// TANSTACK ROUTER EXPORT
// ============================================================
export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return <App />;
}

export default App;