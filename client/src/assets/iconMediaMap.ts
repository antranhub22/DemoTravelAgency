// iconMediaMap.ts
// Ánh xạ iconName (sát nghĩa) sang media động tương ứng (ảnh, video, gif...)
// Bạn chỉ cần bổ sung file media vào thư mục /assets/icon-media/ và cập nhật object này

export type IconMediaType = 'image' | 'video' | 'gif';

export interface IconMedia {
  type: IconMediaType;
  src: string; // Đường dẫn tới file media
  alt?: string;
  description?: string;
}

export const iconMediaMap: Record<string, IconMedia[]> = {
  // ================ BUS TICKETS ================
  bus_hcm: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Bus HCM Demo 1',
      description: `Destination: Ho Chi Minh City\nPrice: 320.000 VND`
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      alt: 'Bus HCM Demo 2',
      description: `Destination: Ho Chi Minh City\nPrice: 260,000 VND`
    }
  ],
  bus_dl: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
      alt: 'Bus Da Lat Demo 1',
      description: `Destination: Da Lat\nPrice: 150,000 – 250,000 VND`
    }
  ],
  bus_nt: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      alt: 'Bus Nha Trang Demo 1',
      description: `Destination: Nha Trang\nPrice: 180,000 – 300,000 VND`
    }
  ],
  bus_dn: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      alt: 'Bus Da Nang Demo 1',
      description: `Destination: Da Nang\nPrice: 530,000 – 590,000 VND`
    }
  ],
  // ================ VEHICLE RENTAL ================
  motorcycle: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
      alt: 'Motorbike Rental Demo 1',
      description: `Vehicle Type: Motorbike\nPrice: 150,000 VND/day`
    }
  ],
  car_driver: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      alt: 'Car Rental with Driver Demo 1',
      description: `Vehicle Type: Car with Driver\nPrice: 800,000 – 1,200,000 VND/day`
    }
  ],
  car_self: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
      alt: 'Car Rental Self-drive Demo 1',
      description: `Vehicle Type: Car without Driver\nPrice: 700,000 – 1,000,000 VND/day`
    }
  ],
  // ================ CURRENCY EXCHANGE ================
  usd: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      alt: 'USD Exchange Demo 1',
      description: `Currency Type: USD\nRate: 25,600 VND/USD`
    }
  ],
  eur: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
      alt: 'EUR Exchange Demo 1',
      description: `Currency Type: EUR\nRate: (Contact for rate)`
    }
  ],
  currency_other: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Other Currency Exchange Demo 1',
      description: `Currency Type: Others\nRate: (Contact for rate)`
    }
  ],
  // ================ LAUNDRY SERVICE ================
  laundry_regular: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      alt: 'Regular Laundry Demo 1',
      description: `Laundry Type: Regular Wash\nPrice: 30,000 VND/kg`
    }
  ],
  laundry_express: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      alt: 'Express Laundry Demo 1',
      description: `Laundry Type: Express Wash\nPrice: 40,000 – 50,000 VND/kg`
    }
  ],
  laundry_special: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      alt: 'Delicates Laundry Demo 1',
      description: `Laundry Type: Delicates & Special Garments\nPrice: 15,000 – 60,000 VND/item`
    }
  ],
  // ================ HOMESTAY ================
  homestay_300k: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Homestay <300k Demo 1',
      description: `Size: Small\nAmenities: WiFi, Fan, Shared Bathroom\nPrice: Under 300,000 VND`
    }
  ],
  homestay_300_600k: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
      alt: 'Homestay 300-600k Demo 1',
      description: `Size: Medium\nAmenities: WiFi, A/C, Private Bathroom\nPrice: 300,000 – 600,000 VND`
    }
  ],
  homestay_600k: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      alt: 'Homestay >600k Demo 1',
      description: `Size: Large\nAmenities: A/C, Breakfast, View\nPrice: Over 600,000 VND`
    }
  ],
  // ================ TOURS ================
  tour_halfday: [
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_1.jpg',
      alt: 'White Sand Dunes 1',
      description: 'Tour Name: East Of Mui Ne\nAttractions: White Sand Dunes'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_2.jpg',
      alt: 'Tour Half Day 2',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Red Sand Dunes'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_3.jpg',
      alt: 'Tour Half Day 3',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Fairy Stream'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_4.jpg',
      alt: 'Tour Half Day 4',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Fishing Village'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_5.jpg',
      alt: 'Tour Half Day 5',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Mui Ne Beach'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_6.jpg',
      alt: 'Tour Half Day 6',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Lotus Lake'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_7.jpg',
      alt: 'Tour Half Day 7',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Local Market'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_8.jpg',
      alt: 'Tour Half Day 8',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Dragon Fruit Farm'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_9.jpg',
      alt: 'Tour Half Day 9',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Cham Tower'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_10.jpg',
      alt: 'Tour Half Day 10',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Sand Sculpture Park'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_11.jpg',
      alt: 'Tour Half Day 11',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Mui Ne Harbor'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_12.jpg',
      alt: 'Tour Half Day 12',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Local Pagoda'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/tour_halfday_13.jpg',
      alt: 'Tour Half Day 13',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Sunset Point'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/Fairy_Stream2.jpg',
      alt: 'Fairy Stream 2',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Fairy Stream'
    },
    {
      type: 'image',
      src: '/assets/tour_halfday/Fairy_Stream1.png',
      alt: 'Fairy Stream 1',
      description: 'Tour Name: East Of Mui Ne\nAttractions: Fairy Stream'
    }
  ],
  tour_fullday: [
    {
      type: 'image',
      src: '/assets/tour_fullday/PoSahInu_Tower1.jpg',
      alt: 'Po Sah Inu Tower 1',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Po Sah Inu Tower\nLocation: Phan Thiet\nHighlight: Cham architecture\nActivity: Sightseeing'
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/PoSahInu_Tower2.jpg',
      alt: 'Po Sah Inu Tower 2',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Po Sah Inu Tower\nLocation: Phan Thiet\nHighlight: Cham architecture\nActivity: Sightseeing'
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/dragon fruit plantation.jpeg',
      alt: 'Dragon Fruit Plantation',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Dragon Fruit Plantation\nActivity: Farm Visit\nHighlight: Local agriculture'
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/Ke ga lighthouse.jpg',
      alt: 'Ke Ga Lighthouse',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Ke Ga Lighthouse\nLocation: Ke Ga Cape\nHighlight: Oldest lighthouse in Vietnam\nActivity: Sightseeing'
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/KeGa_Lighthouse1.jpg',
      alt: 'Ke Ga Lighthouse 1',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Ke Ga Lighthouse\nLocation: Ke Ga Cape\nHighlight: Oldest lighthouse in Vietnam\nActivity: Sightseeing'
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/Wine_Castle2.jpg',
      alt: 'Wine Castle 2',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Wine Castle\nLocation: Mui Ne\nHighlight: Wine tasting, European architecture\nActivity: Visit & Tasting'
    }
  ],
  tour_multiday: [
    {
      type: 'image',
      src: '/assets/tour_multiday/Tuyen_Lam_Lake_Dalat.jpg',
      alt: 'Tuyen Lam Lake Dalat',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Tuyen Lam Lake\nLocation: Da Lat\nHighlight: Scenic lake, boat ride\nActivity: Sightseeing'
    },
    {
      type: 'image',
      src: '/assets/tour_multiday/Langbiang-dalat-2.jpg',
      alt: 'Langbiang Dalat 2',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Langbiang Mountain\nLocation: Da Lat\nHighlight: Trekking, panoramic view\nActivity: Hiking'
    },
    {
      type: 'image',
      src: '/assets/tour_multiday/Prenn_Waterfall_tour1.jpg',
      alt: 'Prenn Waterfall Tour 1',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Prenn Waterfall\nLocation: Da Lat\nHighlight: Waterfall, elephant ride\nActivity: Sightseeing'
    },
    {
      type: 'image',
      src: '/assets/tour_multiday/flower-garden-dalat.jpg',
      alt: 'Flower Garden Dalat',
      description: 'Tour Name: East Of Mui Ne\nAttraction: Flower Garden\nLocation: Da Lat\nHighlight: Colorful flowers, photography\nActivity: Visit & Photo'
    }
  ],
  special_tour: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      alt: 'Special Tour Demo 1',
      description: `Tour: Hot Air Balloon Ride\nDuration: ~30 min flight + transfer\nPickup: Hotel in early morning\nInclusions: Balloon Ride, Transport, Drink\nPrice: 3,800,000 VND/person\nLanguage: English, Vietnamese`
    }
  ]
}; 