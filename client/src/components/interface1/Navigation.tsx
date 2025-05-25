import React from 'react';

type NavigationProps = {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  activeIcon: string;
  setActiveIcon: (icon: string) => void;
  iconMap: any;
  iconComponents: any;
  iconDisplayNamesEn: any;
  iconDisplayNamesFr: any;
  iconDisplayNamesRu: any;
  iconDisplayNamesZh: any;
  iconDisplayNamesKo: any;
  handleIconClick: (iconName: string) => void;
  t: any;
  lang: any;
  showTabDropdown: boolean;
  setShowTabDropdown: (v: boolean) => void;
};

const Navigation: React.FC<NavigationProps> = ({
  activeMenu, setActiveMenu, activeIcon, setActiveIcon, iconMap, iconComponents,
  iconDisplayNamesEn, iconDisplayNamesFr, iconDisplayNamesRu, iconDisplayNamesZh, iconDisplayNamesKo,
  handleIconClick, t, lang, showTabDropdown, setShowTabDropdown
}) => {
  const tabOptions = [
    { key: 'tours', label: t('tourism_tour', lang) },
    { key: 'bus', label: t('ticket_bus', lang) },
    { key: 'vehicle', label: t('rental_service', lang) },
    { key: 'currency', label: t('currency_exchange', lang) },
    { key: 'laundry', label: t('laundry_service', lang) },
    { key: 'homestay', label: t('homestay_service', lang) },
  ];
  const renderIconGroup = (icons: string[], col: number, iconSize = 22) => {
    const items = icons.map(icon => {
      const isActive = icon === activeIcon;
      return (
        <li key={icon} className="w-10 h-10 flex items-center justify-center">
          {iconComponents[icon] ? (
            <span onClick={() => handleIconClick(icon)}>{iconComponents[icon]}</span>
          ) : <span className="text-red-500">?</span>}
        </li>
      );
    });
    const remainder = icons.length % col;
    if (remainder !== 0) {
      for (let i = 0; i < col - remainder; i++) {
        items.push(<li key={`invisible-${i}`} className="w-10 h-10 flex items-center justify-center invisible"></li>);
      }
    }
    return items;
  };
  return (
    <>
      {/* Tab bar ngang */}
      <div className="w-full overflow-x-auto flex-row flex-nowrap whitespace-nowrap gap-2 bg-white/10 rounded-lg p-1 shadow no-scrollbar mb-4 scrollbar-hide scroll-snap-x flex">
        {tabOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => setActiveMenu(opt.key)}
            className={`flex-shrink-0 min-w-[160px] sm:min-w-[120px] px-4 py-2 rounded-full font-bold text-base sm:text-sm scroll-snap-align-start ${activeMenu === opt.key ? 'bg-amber-400 text-pink-900 shadow' : 'bg-transparent text-amber-300'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {/* Icon group */}
      <div className="flex flex-row gap-2 mb-2 justify-center">
        {iconMap[activeMenu] && renderIconGroup(iconMap[activeMenu], iconMap[activeMenu].length, 20)}
      </div>
    </>
  );
};

export default Navigation; 