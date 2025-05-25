import React, { useState } from 'react';
import { useAssistant } from '@/context/AssistantContext';
import Interface1 from './Interface1';
import Interface2 from './Interface2';
import Interface3 from './Interface3';
import Interface3Vi from './Interface3Vi';
import Interface3Fr from './Interface3Fr';
import Interface4 from './Interface4';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Link } from 'wouter';
import { History } from 'lucide-react';
import InfographicSteps from './InfographicSteps';
import { FaGlobeAsia } from 'react-icons/fa';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  { code: 'ko', label: 'Korean', flag: '🇰🇷' },
];

const VoiceAssistant: React.FC = () => {
  const { currentInterface, language, setLanguage } = useAssistant();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const selectedLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  
  // Initialize WebSocket connection
  useWebSocket();

  return (
    <div className="relative h-screen overflow-hidden font-sans text-gray-800 bg-neutral-50" id="app">
      {/* Header Bar */}
      <header className="w-full bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-2">
          {/* Left: Logo + Brand name */}
          <div className="flex items-center flex-shrink-0 ml-1 sm:ml-4 mr-2 sm:mr-6">
            <img src="/assets/references/images/haily-logo1.jpg" alt="Haily Logo" className="h-16 sm:h-20 w-auto rounded-lg shadow-md bg-white/80 p-1" />
            <span className="font-extrabold text-xl tracking-wide select-none ml-2" style={{
              background: 'linear-gradient(90deg, #FFD700 60%, #fff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 8px rgba(0,0,0,0.18)',
              letterSpacing: '0.04em',
              fontFamily: 'Poppins, sans-serif',
              borderRadius: '8px',
              lineHeight: 1.1
            }}>
              <span style={{color: '#FFD700', WebkitTextFillColor: '#FFD700'}}>HaiLy</span> <span style={{color: '#fff', WebkitTextFillColor: '#fff'}}>Travel</span>
            </span>
          </div>
          {/* Language + Info + Call History */}
          <div className="flex items-center gap-2 ml-2 sm:ml-6 mr-2 sm:mr-8">
            {/* Language Button */}
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-all duration-200 shadow cursor-pointer select-none" onClick={() => setIsLangDropdownOpen(v => !v)}>
              <span className="text-2xl" style={{fontSize: '2rem'}}>{selectedLang.flag}</span>
              {isLangDropdownOpen && (
                <div className="absolute left-0 top-12 z-50 bg-white rounded-xl shadow-lg py-2 w-40 border border-gray-200 animate-fade-in">
                  {LANGUAGES.map(lang => (
                    <div
                      key={lang.code}
                      className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-amber-100 rounded-lg transition text-gray-900 ${lang.code === language ? 'bg-amber-50 font-bold' : ''}`}
                      onClick={e => { e.stopPropagation(); setLanguage(lang.code); setIsLangDropdownOpen(false); }}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-base">{lang.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Info Button */}
            <button
              onClick={() => setShowInfo(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-amber-300 bg-white/20 hover:bg-white/40 transition-all duration-200 shadow"
            >
              <span className="material-icons text-2xl text-amber-400">info</span>
            </button>
            {/* Call History Button */}
            <Link href="/call-history">
              <a className="flex items-center gap-1 px-2 py-1 rounded bg-primary-dark text-white text-xs sm:text-sm">
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Call History</span>
              </a>
            </Link>
          </div>
        </div>
      </header>
      {/* Info Modal/Popup */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full relative">
            <button onClick={() => setShowInfo(false)} className="absolute top-2 right-2 text-gray-500 hover:text-pink-600 text-2xl">&times;</button>
            <div className="text-gray-800">
              <InfographicSteps currentStep={1} compact={false} horizontal={false} forceShowContent={true} />
            </div>
          </div>
        </div>
      )}

      {/* Interface Layers Container */}
      <div className="relative w-full h-full" id="interfaceContainer">
        <Interface1 
          isActive={currentInterface === 'interface1'} 
        />
        <Interface2 
          isActive={currentInterface === 'interface2'} 
        />
        <Interface3 
          isActive={currentInterface === 'interface3'} 
        />
        <Interface3Vi 
          isActive={currentInterface === 'interface3vi'} 
        />
        <Interface3Fr 
          isActive={currentInterface === 'interface3fr'} 
        />
        <Interface4 
          isActive={currentInterface === 'interface4'} 
        />
      </div>
    </div>
  );
};

export default VoiceAssistant;
