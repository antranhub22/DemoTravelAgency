import React from 'react';

type CallButtonProps = {
  handleCall: (lang: string) => void;
  lang: string;
  t: any;
};

const CallButton: React.FC<CallButtonProps> = ({ handleCall, lang, t }) => (
  <button className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg text-lg font-bold flex items-center gap-2 animate-pulse z-50" onClick={() => handleCall(lang)}>
    <span className="material-icons text-3xl mr-2">auto_mode</span>
    {t('press_to_order', lang)}
  </button>
);

export default CallButton; 