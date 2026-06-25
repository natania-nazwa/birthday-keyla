import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

// Komponen Ikon Hadiah (Sebelah Kiri)
const PresentIcon = () => (
  <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full opacity-90">
    <rect x="25" y="60" width="50" height="40" />
    <rect x="20" y="48" width="60" height="12" />
    <line x1="43" y1="48" x2="43" y2="100" />
    <line x1="57" y1="48" x2="57" y2="100" />
    <path d="M50 48 C40 30 25 35 38 48 Z" />
    <path d="M50 48 C60 30 75 35 62 48 Z" />
    <path d="M25 25 C15 35 15 15 5 25" />
    <path d="M75 25 C85 35 85 15 95 25" />
    <circle cx="20" cy="15" r="1.5" fill="currentColor"/>
    <circle cx="85" cy="40" r="1.5" fill="currentColor"/>
    <path d="M35 15 L40 22" />
    <path d="M65 15 L60 22" />
  </svg>
);

// Komponen Ikon Balon (Sebelah Kanan)
const BalloonsIcon = () => (
  <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full opacity-90">
    <path d="M50 85 C45 95 48 105 50 115" />
    <path d="M32 70 C38 85 46 100 50 115" />
    <path d="M68 70 C62 85 54 100 50 115" />
    <ellipse cx="50" cy="45" rx="16" ry="22" />
    <ellipse cx="30" cy="54" rx="13" ry="18" transform="rotate(-15 30 54)" />
    <ellipse cx="70" cy="54" rx="13" ry="18" transform="rotate(15 70 54)" />
    <path d="M48 67 L52 67 L50 71 Z" />
    <path d="M28 72 L32 72 L30 76 Z" />
    <path d="M68 72 L72 72 L70 76 Z" />
    <path d="M44 32 C45 35 45 38 43 40" strokeWidth="0.8" />
    <path d="M24 45 C25 48 25 50 23 52" strokeWidth="0.8" />
    <path d="M66 45 C67 48 67 50 65 52" strokeWidth="0.8" />
  </svg>
);

export const Route = createFileRoute('/')({
  component: App,
})

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="min-h-screen bg-[#a21020] flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12 font-serif selection:bg-red-200">

      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

          .animate-fade-in {
            animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-scale-in {
            animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes scaleIn {
            0% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .animate-slide-in-right {
            animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .animate-pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
            50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.8); }
          }

          .animate-bounce-gentle {
            animation: bounceGentle 2s ease-in-out infinite;
          }
          @keyframes bounceGentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          .animate-fade-in-slow {
            animation: fadeInSlow 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          @keyframes fadeInSlow {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .font-cursive {
            font-family: 'Great Vibes', cursive;
          }
        `
      }} />

      {/* Kartu Utama - Responsive landscape on desktop, portrait on mobile */}
      <div className="bg-[#fcfcfc] w-full max-w-6xl h-[85vh] min-h-[500px] relative shadow-2xl flex flex-col items-center justify-center overflow-hidden md:aspect-[16/9] md:h-auto">

        {!isOpened ? (
          /* ========================================================
             HALAMAN 1: ENVELOPE (Landing Page - First Open)
             ======================================================== */
          <div className="w-full h-full flex flex-col items-center justify-center relative animate-fade-in px-4">

            {/* Title */}
            <h1 className="font-cursive text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-6 sm:mb-8 md:mb-12 tracking-wide text-center animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
              Happy Birthday Keyla!
            </h1>

            {/* Envelope */}
            <div className="relative w-[220px] h-[150px] sm:w-[300px] sm:h-[200px] md:w-[400px] md:h-[270px] lg:w-[480px] lg:h-[320px] bg-[#af1626] shadow-md z-10 transition-transform duration-500 hover:scale-[1.02] animate-scale-in" style={{ animationDelay: '0.4s', opacity: 0 }}>

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 320" preserveAspectRatio="none">
                <path 
                  d="M0,0 L240,190 L480,0 M0,0 L0,320 L240,190 L480,320 L480,0" 
                  fill="none" 
                  stroke="#700611" 
                  strokeWidth="2" 
                  strokeOpacity="0.8"
                />
              </svg>

              {/* Gold Seal */}
              <button 
                onClick={() => setIsOpened(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] bg-gradient-to-br from-[#f8df81] via-[#d4af37] to-[#997415] rounded-full cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-110 transition-all duration-300 flex items-center justify-center border-[3px] border-[#c09930] group z-20 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 animate-pulse-glow animate-bounce-gentle"
                aria-label="Buka amplop"
              >
                <div className="absolute top-1/2 left-[12%] -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-white rounded-full blur-[0.5px] opacity-80"></div>

                <div className="w-[75%] h-[75%] border-2 border-[#b08821] rounded-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="w-[60%] h-[60%] border-t border-[#b08821] rounded-full flex flex-col items-center justify-center">
                      <div className="w-4 h-2 sm:w-5 sm:h-2.5 md:w-6 md:h-3 border-b-2 border-[#a37b17] rounded-full mt-1 sm:mt-2"></div>
                  </div>
                </div>
              </button>

            </div>

            {/* Instruction Text */}
            <p className="mt-6 sm:mt-8 md:mt-12 text-gray-700 font-serif text-sm sm:text-base md:text-lg lg:text-xl tracking-wide z-10 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
              Click the seal to open
            </p>

            {/* Gift Icon - Bottom Left */}
            <div className="absolute left-4 bottom-4 sm:left-8 sm:bottom-8 md:left-16 md:bottom-12 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 pointer-events-none animate-slide-in-left" style={{ animationDelay: '0.8s', opacity: 0 }}>
              <PresentIcon />
            </div>

            {/* Balloons Icon - Bottom Right */}
            <div className="absolute right-4 bottom-4 sm:right-8 sm:bottom-8 md:right-16 md:bottom-12 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 pointer-events-none animate-slide-in-right" style={{ animationDelay: '0.8s', opacity: 0 }}>
              <BalloonsIcon />
            </div>

          </div>
        ) : (
          /* ========================================================
             HALAMAN 2: PHOTO BACKGROUND (After clicking gold seal)
             ======================================================== */
          <div className="w-full h-full relative animate-fade-in-slow">

            {/* Background Photo */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/k1.png')`,
              }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white px-4">

              {/* Date */}
              <p className="text-white/80 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mb-2 sm:mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
                04-14-05
              </p>

              {/* Title */}
              <h2 className="font-cursive text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-2 sm:mb-4 drop-shadow-lg text-center animate-scale-in" style={{ animationDelay: '0.5s', opacity: 0 }}>
                Happy Birthday Keyla!
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl font-serif tracking-wide mb-8 sm:mb-12 text-center animate-fade-in-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
                I hope this little gift will make you happy
              </p>

              {/* Click Here Button - goes back to envelope */}
              <button
                onClick={() => setIsOpened(false)}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 backdrop-blur-sm border border-white/40 text-white rounded-full hover:bg-white/30 transition-all duration-300 font-serif tracking-widest text-xs sm:text-sm uppercase animate-fade-in-up hover:scale-105"
                style={{ animationDelay: '0.9s', opacity: 0 }}
              >
                Click here
              </button>

            </div>

            {/* Gift Icon - Bottom Left */}
            <div className="absolute left-4 bottom-4 sm:left-8 sm:bottom-8 md:left-16 md:bottom-12 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 pointer-events-none text-white animate-slide-in-left" style={{ animationDelay: '1s', opacity: 0 }}>
              <PresentIcon />
            </div>

            {/* Balloons Icon - Bottom Right */}
            <div className="absolute right-4 bottom-4 sm:right-8 sm:bottom-8 md:right-16 md:bottom-12 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 pointer-events-none text-white animate-slide-in-right" style={{ animationDelay: '1s', opacity: 0 }}>
              <BalloonsIcon />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}