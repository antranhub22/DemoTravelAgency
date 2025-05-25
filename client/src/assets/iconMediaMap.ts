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
      description: `**Bus Type**: Sleeper Bus\n**Destination**: Ho Chi Minh City\n**Price**: 320.000 VND`
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
      description: `**Bus Type**: Sleeper Bus\n**Destination**: Da Lat\n**Price**: 150.000 - 250.000 VND`
    }
  ],
  bus_nt: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      alt: 'Bus Nha Trang Demo 1',
      description: `**Bus Type**: Sleeper Bus\n**Destination**: Nha Trang\n**Price**: 180.000 - 300.000 VND`
    }
  ],
  bus_dn: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      alt: 'Bus Da Nang Demo 1',
      description: `**Bus Type**: Sleeper Bus\n**Destination**: Da Nang\n**Price**: 530.000 - 590.000 VND`
    }
  ],
  // ================ VEHICLE RENTAL ================
  motorcycle: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Motorcycle Rental Demo 1',
      description: `**Vehicle Type**: Honda Wave 110cc\n**Price**: 150.000 VND/day`
    }
  ],
  car_driver: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      alt: 'Car Rental with Driver Demo 1',
      description: `**Vehicle Type**: Car with Driver\n**Price**: 800.000 - 1.200.000 VND/day`
    }
  ],
  car_self: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=80',
      alt: 'Car Rental Self-drive Demo 1',
      description: `**Vehicle Type**: Car without Driver\n**Price**: 700.000 - 1.000.000 VND/day`
    }
  ],
  // ================ CURRENCY EXCHANGE ================
  usd: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'USD Exchange Demo 1',
      description: `**Currency Type**: US Dollar\n**Rate**: 24,500 VND`
    }
  ],
  eur: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
      alt: 'EUR Exchange Demo 1',
      description: `**Currency Type**: Euro\n**Rate**: (Contact for rate)`
    }
  ],
  currency_other: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Other Currency Exchange Demo 1',
      description: `**Currency Type**: Others\n**Rate**: (Contact for rate)`
    }
  ],
  // ================ LAUNDRY SERVICE ================
  laundry_regular: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Regular Laundry Demo 1',
      description: `**Laundry Type**: Regular Wash\n**Price**: 50.000 VND/kg`
    }
  ],
  laundry_express: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      alt: 'Express Laundry Demo 1',
      description: `**Laundry Type**: Express Wash\n**Price**: 40.000 - 50.000 VND/kg`
    }
  ],
  laundry_special: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      alt: 'Delicates Laundry Demo 1',
      description: `**Laundry Type**: Delicates & Special Garments\n**Price**: 15.000 - 60.000 VND/item`
    }
  ],
  // ================ HOMESTAY ================
  homestay_300k: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Homestay <300k Demo 1',
      description: `**Size**: 25m²\n**Amenities**: AC, WiFi, TV\n**Price**: 250.000 VND/night`
    }
  ],
  homestay_300_600k: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
      alt: 'Homestay 300-600k Demo 1',
      description: `**Size**: 35m²\n**Amenities**: WiFi, AC, Private Bathroom\n**Price**: 300.000 - 600.000 VND/night`
    }
  ],
  homestay_600k: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      alt: 'Homestay >600k Demo 1',
      description: `**Size**: 45m²\n**Amenities**: AC, Breakfast, View\n**Price**: Over 600.000 VND/night`
    }
  ],
  // ================ TOURS ================
  tour_halfday: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=600&q=80',
      alt: 'Half Day Tour Demo 1',
      description: `**Attractions**: Cu Chi Tunnels, War Remnants Museum\n**Tour Name**: Cu Chi Tunnels Half Day Tour`
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
      description: `**Attractions**: Po Sah Inu Tower\n**Tour Name**: Full Day Cultural Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/PoSahInu_Tower2.jpg',
      alt: 'Po Sah Inu Tower 2',
      description: `**Attractions**: Po Sah Inu Tower\n**Tour Name**: Full Day Cultural Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/dragon fruit plantation.jpeg',
      alt: 'Dragon Fruit Plantation',
      description: `**Attractions**: Dragon Fruit Plantation\n**Tour Name**: Full Day Farm Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/Ke ga lighthouse.jpg',
      alt: 'Ke Ga Lighthouse',
      description: `**Attractions**: Ke Ga Lighthouse\n**Tour Name**: Full Day Coastal Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/KeGa_Lighthouse1.jpg',
      alt: 'Ke Ga Lighthouse 1',
      description: `**Attractions**: Ke Ga Lighthouse\n**Tour Name**: Full Day Coastal Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_fullday/Wine_Castle2.jpg',
      alt: 'Wine Castle 2',
      description: `**Attractions**: Wine Castle\n**Tour Name**: Full Day Wine Tour`
    }
  ],
  tour_multiday: [
    {
      type: 'image',
      src: '/assets/tour_multiday/Tuyen_Lam_Lake_Dalat.jpg',
      alt: 'Tuyen Lam Lake Dalat',
      description: `**Attractions**: Tuyen Lam Lake\n**Tour Name**: 3 Days Da Lat Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_multiday/Langbiang-dalat-2.jpg',
      alt: 'Langbiang Dalat 2',
      description: `**Attractions**: Langbiang Mountain\n**Tour Name**: 3 Days Da Lat Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_multiday/Prenn_Waterfall_tour1.jpg',
      alt: 'Prenn Waterfall Tour 1',
      description: `**Attractions**: Prenn Waterfall\n**Tour Name**: 3 Days Da Lat Tour`
    },
    {
      type: 'image',
      src: '/assets/tour_multiday/flower-garden-dalat.jpg',
      alt: 'Flower Garden Dalat',
      description: `**Attractions**: Flower Garden\n**Tour Name**: 3 Days Da Lat Tour`
    }
  ],
  special_tour: [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      alt: 'Special Tour Demo 1',
      description: `**Attractions**: Hot Air Balloon Ride\n**Tour Name**: Special Balloon Tour`
    }
  ]
}; 