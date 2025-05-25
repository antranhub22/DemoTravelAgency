import React from 'react';

type HeaderProps = {
  language: string;
  setLanguage: (lang: string) => void;
  showInfographic: boolean;
  setShowInfographic: React.Dispatch<React.SetStateAction<boolean>>;
};

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { code: 'ru', label: 'Russian', flag: '🇷🇺' },
  { code: 'ko', label: 'Korean', flag: '🇰🇷' },
];

const Header: React.FC<HeaderProps> = ({ language, setLanguage, showInfographic, setShowInfographic }) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = React.useState(false);
  const selectedLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  return (
    <div className="flex items-center justify-between w-full mb-4">
      {/* Flag (ngôn ngữ) bên trái */}
      <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-all duration-200 shadow mr-2 cursor-pointer select-none" onClick={() => setIsLangDropdownOpen(v => !v)}>
        <span className="text-2xl" style={{fontSize: '2rem'}}>{selectedLang.flag}</span>
        {isLangDropdownOpen && (
          <div className="absolute left-0 top-14 z-50 bg-white rounded-xl shadow-lg py-2 w-40 border border-gray-200 animate-fade-in">
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
      {/* Nút info/avatar ở góc phải */}
      <button
        onClick={() => setShowInfographic(true)}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-amber-300 bg-white/20 hover:bg-white/40 transition-all duration-200 shadow ml-2"
      >
        <span className="material-icons text-2xl text-amber-400">info</span>
      </button>
    </div>
  );
};

export default Header; 