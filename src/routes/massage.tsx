import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';

// --- Komponen Ikon Kustom SVG ---

const MessageIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-2xl">
    {/* Body Amplop */}
    <rect x="10" y="30" width="80" height="50" fill="#f8fafc" rx="2"/>
    {/* Lipatan Amplop */}
    <path d="M 10 30 L 50 60 L 90 30" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M 10 80 L 40 55 M 90 80 L 60 55" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round"/>
    {/* Segel Merah (Bisa diklik) */}
    <circle cx="50" cy="58" r="9" fill="#b91c1c" className="drop-shadow-md" />
    <circle cx="50" cy="58" r="7" fill="#991b1b" />
    {/* Pantulan Cahaya Segel */}
    <path d="M 47 54 Q 50 59 53 54" stroke="#f87171" strokeWidth="1" fill="none"/>
  </svg>
);

const FlowerIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-2xl">
    {/* Kertas Pembungkus (Cone) */}
    <path d="M 25 35 L 75 35 L 55 85 L 45 85 Z" fill="#f5e6d3" />
    <path d="M 25 35 Q 50 45 75 35 Z" fill="#ebd8c3" />
    {/* Motif Hati Merah di Pembungkus */}
    <g fill="#dc2626">
      <path d="M 38 52 A 1.5 1.5 0 0 1 41 52 A 1.5 1.5 0 0 1 39.5 55 Z"/>
      <path d="M 62 52 A 1.5 1.5 0 0 1 65 52 A 1.5 1.5 0 0 1 63.5 55 Z"/>
      <path d="M 50 64 A 1.5 1.5 0 0 1 53 64 A 1.5 1.5 0 0 1 51.5 67 Z"/>
      <path d="M 43 74 A 1.5 1.5 0 0 1 46 74 A 1.5 1.5 0 0 1 44.5 77 Z"/>
      <path d="M 57 74 A 1.5 1.5 0 0 1 60 74 A 1.5 1.5 0 0 1 58.5 77 Z"/>
      <path d="M 48 45 A 1.5 1.5 0 0 1 51 45 A 1.5 1.5 0 0 1 49.5 48 Z"/>
    </g>
    {/* Pita Bawah */}
    <rect x="42" y="80" width="16" height="5" fill="#e5c8a8" rx="1"/>
    <path d="M 44 85 L 56 85 L 58 92 L 42 92 Z" fill="#f5e6d3"/>
    {/* Mawar Merah */}
    <circle cx="35" cy="35" r="9" fill="#dc2626"/>
    <circle cx="48" cy="27" r="10" fill="#ef4444"/>
    <circle cx="65" cy="35" r="9" fill="#dc2626"/>
    <circle cx="55" cy="40" r="8" fill="#b91c1c"/>
    <circle cx="42" cy="43" r="8" fill="#ef4444"/>
    <circle cx="62" cy="25" r="7" fill="#b91c1c"/>
    <circle cx="38" cy="22" r="8" fill="#ef4444"/>
    {/* Daun Hijau */}
    <path d="M 25 35 Q 15 25 30 20 Z" fill="#4ade80"/>
    <path d="M 75 35 Q 85 25 70 20 Z" fill="#4ade80"/>
    <path d="M 50 20 Q 55 10 65 15 Z" fill="#22c55e"/>
  </svg>
);

const CakeIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-2xl">
    {/* Bodi Kue Lapis Merah */}
    <path d="M 15 65 L 85 55 L 85 85 L 15 85 Z" fill="#dc2626"/>
    {/* Lapisan Krim Putih Tengah */}
    <path d="M 15 72 L 85 62 L 85 68 L 15 76 Z" fill="#ffffff"/>
    {/* Krim Atas Putih */}
    <path d="M 15 65 L 85 55 L 85 45 Q 50 45 15 65 Z" fill="#ffffff"/>
    {/* Krim Bagian Belakang (Kanan) */}
    <path d="M 80 45 Q 90 45 90 55 L 90 85 Q 90 90 85 85 Z" fill="#ffffff"/>
    {/* Strawberry di Atas */}
    <path d="M 65 30 C 55 20 85 20 80 35 C 75 42 60 42 65 30 Z" fill="#ef4444"/>
    <path d="M 62 28 Q 68 22 73 28 L 70 32 Z" fill="#22c55e"/>
  </svg>
);

export const Route = createFileRoute('/massage')({
  component: Pilih,
})

export default function Pilih() {
  const navigate = useNavigate()
  const [isOpened] = useState(false);

  return (
    <div className="min-h-screen bg-[#b21020] flex items-center justify-center p-4 sm:p-8 lg:p-12 font-serif selection:bg-red-200">

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

          .font-cursive {
            font-family: 'Great Vibes', cursive;
          }
        `
      }} />

      {!isOpened ? (
        <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center animate-fade-in">

          <h1 className="font-cursive text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-white mb-16 sm:mb-24 tracking-wide text-center">
            These are for you
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-24 w-full">

            <div 
              onClick={() => navigate({ to: "/pesan" })}
              className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative">
                <MessageIcon />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full blur-xl transition-opacity duration-300"></div>
              </div>
              <span className="text-white font-serif mt-4 md:mt-6 text-lg md:text-xl tracking-wider font-medium">Message</span>
            </div>

            <div 
              onClick={() => navigate({ to: "/bunga" })}
              className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                <FlowerIcon />
              </div>
              <span className="text-white font-serif mt-4 md:mt-6 text-lg md:text-xl tracking-wider font-medium">Flower</span>
            </div>

            <div 
              onClick={() => navigate({ to: "/kue" })}
              className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                <CakeIcon />
              </div>
              <span className="text-white font-serif mt-4 md:mt-6 text-lg md:text-xl tracking-wider font-medium">Cake</span>
            </div>

          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center animate-fade-in">
          <p className="text-white text-xl">Opened!</p>
        </div>
      )}
    </div>
  );
}