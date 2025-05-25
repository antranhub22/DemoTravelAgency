import React from 'react';
// ... existing code ...
// MediaArea component sẽ được copy logic từ phần ServiceCard và media display trong Interface1.tsx
// ... existing code ... 

type MediaAreaProps = {
  activeIcon: string;
  iconMediaMap: any;
  showReference: boolean;
  setShowReference: (v: boolean) => void;
  references: any[];
  t: any;
  lang: any;
};

const MediaArea: React.FC<MediaAreaProps> = ({ activeIcon, iconMediaMap, showReference, setShowReference, references, t, lang }) => {
  return (
    <div className="w-full overflow-x-auto flex flex-row gap-4 pb-4">
      {activeIcon && iconMediaMap[activeIcon] && iconMediaMap[activeIcon].length > 0 &&
        iconMediaMap[activeIcon].map((media: any, idx: number) => (
          <div key={idx} className="min-w-[280px] max-w-xs rounded-2xl shadow-lg overflow-hidden bg-white/90">
            <img src={media.src} alt={media.alt || ''} className="w-full h-40 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-2">{media.description}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default MediaArea; 