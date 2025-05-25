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

const LABELS = [
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
  handleIconClick, t, lang
}) => {
  // Tạo layout hình chữ T cho 6 label
  // Hàng 1: 2 label
  // Hàng 2: 2 label
  // Hàng 3: 2 label
  // (Có thể điều chỉnh lại vị trí nếu muốn giống hình hơn)
  const labelGrid = [
    [LABELS[0], LABELS[1]],
    [LABELS[2], LABELS[3]],
    [LABELS[4], LABELS[5]],
  ];

  // Render các icon cho từng label
  const renderIcons = (labelKey: string) => (
    <div className="flex flex-wrap justify-center gap-2 mt-2">
      {iconMap[labelKey].map((icon: string) => (
        <button
          key={icon}
          onClick={() => { setActiveMenu(labelKey); setActiveIcon(icon); handleIconClick(icon); }}
          className={`w-10 h-10 flex items-center justify-center rounded-lg shadow transition-all duration-200
            ${activeMenu === labelKey ? 'bg-blue-400' : 'bg-gray-200'}
            ${activeIcon === icon && activeMenu === labelKey ? 'ring-4 ring-blue-600' : ''}`}
        >
          {iconComponents[icon]}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      <div className="grid grid-cols-2 gap-6">
        {labelGrid.flat().map((label, idx) => (
          <div key={label.key} className="flex flex-col items-center">
            <button
              onClick={() => setActiveMenu(label.key)}
              className={`px-8 py-4 mb-2 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
                ${activeMenu === label.key ? 'bg-blue-500 text-white scale-105' : 'bg-blue-200 text-blue-900'}`}
            >
              {t ? t(label.label.toLowerCase(), lang) : label.label}
            </button>
            {renderIcons(label.key)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation; 