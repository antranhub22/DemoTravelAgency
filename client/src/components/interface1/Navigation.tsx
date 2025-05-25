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

const labelList = [
  { key: 'tours', label: 'TOURS' },
  { key: 'bus', label: 'BUS' },
  { key: 'vehicle', label: 'VEHICLE' },
  { key: 'currency', label: 'CURRENCY' },
  { key: 'laundry', label: 'LAUNDRY' },
  { key: 'homestay', label: 'HOMESTAY' },
];

const Navigation: React.FC<NavigationProps> = ({
  activeMenu, setActiveMenu, activeIcon, setActiveIcon, iconMap, iconComponents,
  iconDisplayNamesEn, iconDisplayNamesFr, iconDisplayNamesRu, iconDisplayNamesZh, iconDisplayNamesKo,
  handleIconClick, t, lang, showTabDropdown, setShowTabDropdown
}) => {
  // Hàm render icon cho từng label
  const renderIcons = (labelKey: string) => (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {iconMap[labelKey].map((icon: string) => {
        const isActive = activeMenu === labelKey && activeIcon === icon;
        return (
          <span
            key={icon}
            onClick={() => { setActiveMenu(labelKey); handleIconClick(icon); }}
            style={{ filter: isActive ? 'brightness(1.2)' : 'none', cursor: 'pointer' }}
          >
            {iconComponents[icon]}
          </span>
        );
      })}
    </div>
  );

  // Layout hình chữ T: 2 label trên, 2 label giữa, 2 label dưới
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-row justify-center gap-8 mb-4">
        {labelList.slice(0,2).map(l => (
          <button
            key={l.key}
            className={`px-8 py-4 rounded-lg font-bold text-lg shadow ${activeMenu === l.key ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-900'}`}
            onClick={() => setActiveMenu(l.key)}
          >
            {l.label}
            {renderIcons(l.key)}
          </button>
        ))}
      </div>
      <div className="flex flex-row justify-center gap-8 mb-4">
        {labelList.slice(2,4).map(l => (
          <button
            key={l.key}
            className={`px-8 py-4 rounded-lg font-bold text-lg shadow ${activeMenu === l.key ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-900'}`}
            onClick={() => setActiveMenu(l.key)}
          >
            {l.label}
            {renderIcons(l.key)}
          </button>
        ))}
      </div>
      <div className="flex flex-row justify-center gap-8">
        {labelList.slice(4,6).map(l => (
          <button
            key={l.key}
            className={`px-8 py-4 rounded-lg font-bold text-lg shadow ${activeMenu === l.key ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-900'}`}
            onClick={() => setActiveMenu(l.key)}
          >
            {l.label}
            {renderIcons(l.key)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation; 