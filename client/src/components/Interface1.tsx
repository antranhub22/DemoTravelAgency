// Interface1 component - latest version v1.0.1 
import React, { useState, useEffect } from 'react';
import { useAssistant } from '@/context/AssistantContext';
import hotelImage from '../assets/hotel-exterior.jpeg';
import { t, Lang } from '../i18n';
import { ActiveOrder } from '@/types';
import { initVapi, getVapiInstance } from '@/lib/vapiClient';
import { FaGlobeAsia } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { DualReference } from './Reference';
import { referenceService } from '@/services/ReferenceService';
import { ReferenceItem } from '@/services/ReferenceService';
import { iconMediaMap, IconMedia } from '../assets/iconMediaMap';
import { FaMountain, FaCarSide, FaUmbrellaBeach, FaStar, FaBusAlt, FaRoute, FaMotorcycle, FaTaxi, FaMoneyBillWave, FaEuroSign, FaPoundSign, FaYenSign, FaRubleSign, FaExchangeAlt, FaBitcoin, FaTshirt, FaSoap, FaBolt, FaPlus, FaHome, FaBuilding, FaCalendarAlt, FaPlusSquare, FaDollarSign, FaWonSign, FaCity } from 'react-icons/fa';
import { ReferenceMedia, ReferenceSlider } from './Reference';
import { OrderStatus } from '@shared/schema';
import { Bus, Mountain, Landmark, Car, CarFront, Bike, Coins, Euro, DollarSign, Shirt, Sparkles, Home, Building2, CalendarDays, KeyRound, UserRound, Plus, Star, Sun, CalendarCheck, Umbrella, Map, Ship, Waves, ArrowRightLeft, ClipboardList, ShoppingBag, Utensils, AlarmClock, AlertTriangle, Clock, CheckCircle, Gift, Wrench, Search } from 'lucide-react';
import InfographicSteps from './InfographicSteps';
import '../styles/custom-scrollbar.css';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

interface Interface1Props {
  isActive: boolean;
}

const Interface1: React.FC<Interface1Props> = ({ isActive }) => {
  const { setCurrentInterface, setTranscripts, setModelOutput, setCallDetails, setCallDuration, setEmailSentForCurrentSession, activeOrders, language, setLanguage } = useAssistant();
  const lang: Lang = language as Lang;
  
  // State để lưu trữ tooltip đang hiển thị
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  // Track current time for countdown calculations
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [references, setReferences] = useState<ReferenceItem[]>([]);
  useEffect(() => {
    async function loadAllReferences() {
      await referenceService.initialize();
      const allRefs = Object.values((referenceService as any).referenceMap || {}) as ReferenceItem[];
      setReferences(allRefs);
    }
    loadAllReferences();
  }, []);

  const [activeIcon, setActiveIcon] = useState<string>('tour_halfday');

  // Thêm state để kiểm soát hiển thị reference media
  const [showReference, setShowReference] = useState(false);

  // Thêm state để quản lý menu đang chọn trên mobile
  type MenuKey = 'tours' | 'bus' | 'vehicle' | 'currency' | 'laundry' | 'homestay' | 'roomservice' | 'housekeeping' | 'localtourism' | 'concierge' | 'guestfeedback';
  const [activeMenu, setActiveMenu] = useState<MenuKey>('tours');

  // State để điều khiển popup infographic
  const [showInfographic, setShowInfographic] = useState(false);

  // State cho dropdown tab trên mobile
  const [showTabDropdown, setShowTabDropdown] = useState(false);

  const iconColor = '#FFC94A'; // Màu vàng giống tiêu đề
  const iconComponents: Record<string, JSX.Element> = {
    // TOURISM & TOURS
    tour_halfday: <Sun color={iconColor} size={28} strokeWidth={2} />, // Half Day
    tour_fullday: <CalendarDays color={iconColor} size={28} strokeWidth={2} />, // Full Day
    tour_multiday: <CalendarCheck color={iconColor} size={28} strokeWidth={2} />, // Multi Day
    special_tour: <Star color={iconColor} size={28} strokeWidth={2} />, // Special
    // BUS TICKETS
    bus_hcm: <Bus color={iconColor} size={28} strokeWidth={2} />, // HCM
    bus_dl: <Mountain color={iconColor} size={28} strokeWidth={2} />, // Dalat
    bus_nt: <Umbrella color={iconColor} size={28} strokeWidth={2} />, // Nha Trang
    bus_dn: <Landmark color={iconColor} size={28} strokeWidth={2} />, // Da Nang
    bus_ct: <Ship color={iconColor} size={28} strokeWidth={2} />, // Can Tho
    bus_mt: <Waves color={iconColor} size={28} strokeWidth={2} />, // My Tho
    bus_vt: <Map color={iconColor} size={28} strokeWidth={2} />, // Vung Tau
    bus_other: <ArrowRightLeft color={iconColor} size={28} strokeWidth={2} />, // Other
    // VEHICLE RENTAL
    motorcycle: <Bike color={iconColor} size={28} strokeWidth={2} />, // Motorbike
    car_driver: <CarFront color={iconColor} size={28} strokeWidth={2} />, // Car with driver
    car_self: <Car color={iconColor} size={28} strokeWidth={2} />, // Self-drive car
    // CURRENCY EXCHANGE
    usd: <DollarSign color={iconColor} size={28} strokeWidth={2} />, // USD
    eur: <Euro color={iconColor} size={28} strokeWidth={2} />, // EUR
    krw: <Coins color={iconColor} size={28} strokeWidth={2} />,
    rub: <Coins color={iconColor} size={28} strokeWidth={2} />, // RUB (Coins)
    currency_other: <Coins color={iconColor} size={28} strokeWidth={2} />, // Other
    // LAUNDRY SERVICE
    laundry_regular: <Shirt color={iconColor} size={28} strokeWidth={2} />, // Regular
    laundry_special: <Sparkles color={iconColor} size={28} strokeWidth={2} />, // Special
    laundry_express: <Plus color={iconColor} size={28} strokeWidth={2} />, // Express
    laundry_additional: <Plus color={iconColor} size={28} strokeWidth={2} />, // Additional
    // HOMESTAY SERVICE
    homestay_300k: <Home color={iconColor} size={28} strokeWidth={2} />, // <300k
    homestay_300_600k: <Building2 color={iconColor} size={28} strokeWidth={2} />, // 300-600k
    homestay_600k: <Building2 color={iconColor} size={28} strokeWidth={2} />, // >600k
    homestay_longterm: <CalendarDays color={iconColor} size={28} strokeWidth={2} />, // Long-term
    homestay_fullhouse: <KeyRound color={iconColor} size={28} strokeWidth={2} />, // Full house
    homestay_additional: <UserRound color={iconColor} size={28} strokeWidth={2} />, // Additional
    // ROOM SERVICE
    roomservice_food: <Star color={iconColor} size={28} strokeWidth={2} />, // Dùng Star cho món ăn đặc biệt
    roomservice_drink: <Sparkles color={iconColor} size={28} strokeWidth={2} />, // Sparkles cho đồ uống
    roomservice_extra: <Plus color={iconColor} size={28} strokeWidth={2} />, // Plus cho extra
    roomservice_request: <ClipboardList color={iconColor} size={28} strokeWidth={2} />, // ClipboardList cho yêu cầu
    // HOUSEKEEPING
    housekeeping_cleaning: <Sparkles color={iconColor} size={28} strokeWidth={2} />, // Sparkles cho dọn phòng
    housekeeping_linen: <Shirt color={iconColor} size={28} strokeWidth={2} />, // Shirt cho khăn ga
    housekeeping_amenities: <Gift color={iconColor} size={28} strokeWidth={2} />, // Gift cho amenities
    housekeeping_maintenance: <Wrench color={iconColor} size={28} strokeWidth={2} />, // Wrench cho bảo trì
    // LOCAL TOURISM
    localtourism_attraction: <Landmark color={iconColor} size={28} strokeWidth={2} />, // Landmark cho điểm đến
    localtourism_event: <CalendarDays color={iconColor} size={28} strokeWidth={2} />, // CalendarDays cho sự kiện
    localtourism_map: <Map color={iconColor} size={28} strokeWidth={2} />, // Map cho bản đồ
    localtourism_shopping: <ShoppingBag color={iconColor} size={28} strokeWidth={2} />, // ShoppingBag cho mua sắm
    // CONCIERGE
    concierge_restaurant: <Utensils color={iconColor} size={28} strokeWidth={2} />, // Utensils cho nhà hàng
    concierge_spa: <Sparkles color={iconColor} size={28} strokeWidth={2} />, // Sparkles cho spa
    concierge_taxi: <CarFront color={iconColor} size={28} strokeWidth={2} />, // CarFront cho taxi
    concierge_wakeup: <AlarmClock color={iconColor} size={28} strokeWidth={2} />, // AlarmClock cho wakeup
    concierge_lostfound: <Search color={iconColor} size={28} strokeWidth={2} />, // Search cho lost & found
    // GUEST FEEDBACK
    guestfeedback_issue: <AlertTriangle color={iconColor} size={28} strokeWidth={2} />, // AlertTriangle cho issue
    guestfeedback_time: <Clock color={iconColor} size={28} strokeWidth={2} />, // Clock cho thời gian
    guestfeedback_room: <Home color={iconColor} size={28} strokeWidth={2} />, // Home cho phòng
    guestfeedback_resolution: <CheckCircle color={iconColor} size={28} strokeWidth={2} /> // CheckCircle cho resolution
  };

  // Object ánh xạ tên icon cho từng ngôn ngữ
  const iconDisplayNamesEn: Record<string, string> = {
    tour_halfday: 'Half Day',
    tour_fullday: 'Full Day',
    tour_multiday: '2 Days & More',
    special_tour: 'Special Tours',
    bus_hcm: 'HCM',
    bus_dl: 'Dalat',
    bus_nt: 'Nha Trang',
    bus_dn: 'Da Nang',
    bus_ct: 'Can Tho',
    bus_mt: 'My Tho',
    bus_vt: 'Vung Tau',
    bus_other: 'Other Routes',
    motorcycle: 'Motorbike',
    car_driver: 'Car with Driver',
    car_self: 'Self-drive Car',
    usd: 'US Dollar',
    eur: 'Euro',
    krw: 'Korean Won',
    rub: 'Russian Ruble',
    currency_other: 'Other',
    laundry_regular: 'Regular Laundry',
    laundry_special: 'Special Laundry',
    laundry_express: 'Express Laundry',
    laundry_additional: 'Additional Laundry',
    homestay_300k: '< 300k',
    homestay_300_600k: '300-600k',
    homestay_600k: 'over 600k',
    homestay_longterm: 'Long-term',
    homestay_fullhouse: 'Full House',
    homestay_additional: 'Additional Services',
    roomservice_food: 'Special Meal',
    roomservice_drink: 'Special Drink',
    roomservice_extra: 'Extra',
    roomservice_request: 'Request',
    housekeeping_cleaning: 'Cleaning',
    housekeeping_linen: 'Linen',
    housekeeping_amenities: 'Amenities',
    housekeeping_maintenance: 'Maintenance',
    localtourism_attraction: 'Attraction',
    localtourism_event: 'Event',
    localtourism_map: 'Map',
    localtourism_shopping: 'Shopping',
    concierge_restaurant: 'Restaurant',
    concierge_spa: 'Spa',
    concierge_taxi: 'Taxi',
    concierge_wakeup: 'Wakeup',
    concierge_lostfound: 'Lost & Found',
    guestfeedback_issue: 'Issue',
    guestfeedback_time: 'Time',
    guestfeedback_room: 'Room',
    guestfeedback_resolution: 'Resolution'
  };
  const iconDisplayNamesFr: Record<string, string> = {
    tour_halfday: 'Demi-journée',
    tour_fullday: 'Journée complète',
    tour_multiday: '2 jours et plus',
    special_tour: 'Tours spéciaux',
    bus_hcm: 'HCM',
    bus_dl: 'Dalat',
    bus_nt: 'Nha Trang',
    bus_dn: 'Da Nang',
    bus_ct: 'Can Tho',
    bus_mt: 'My Tho',
    bus_vt: 'Vung Tau',
    bus_other: 'Autres lignes',
    motorcycle: 'Moto',
    car_driver: 'Voiture avec chauffeur',
    car_self: 'Voiture sans chauffeur',
    usd: 'Dollar US',
    eur: 'Euro',
    krw: 'Won coréen',
    rub: 'Rouble russe',
    currency_other: 'Autre',
    laundry_regular: 'Blanchisserie standard',
    laundry_special: 'Blanchisserie spéciale',
    laundry_express: 'Blanchisserie express',
    laundry_additional: 'Blanchisserie supplémentaire',
    homestay_300k: '< 300k',
    homestay_300_600k: '300-600k',
    homestay_600k: '> 600k',
    homestay_longterm: 'Longue durée',
    homestay_fullhouse: 'Maison entière',
    homestay_additional: 'Services supplémentaires',
    roomservice_food: 'Repas spécial',
    roomservice_drink: 'Boisson spéciale',
    roomservice_extra: 'Extra',
    roomservice_request: 'Demande',
    housekeeping_cleaning: 'Nettoyage',
    housekeeping_linen: 'Tissu',
    housekeeping_amenities: 'Équipements',
    housekeeping_maintenance: 'Entretien',
    localtourism_attraction: 'Attraction',
    localtourism_event: 'Événement',
    localtourism_map: 'Carte',
    localtourism_shopping: 'Shopping',
    concierge_restaurant: 'Restaurant',
    concierge_spa: 'Spa',
    concierge_taxi: 'Taxi',
    concierge_wakeup: 'Réveil',
    concierge_lostfound: 'Perdu & Trouvé',
    guestfeedback_issue: 'Problème',
    guestfeedback_time: 'Temps',
    guestfeedback_room: 'Chambre',
    guestfeedback_resolution: 'Résolution'
  };
  const iconDisplayNamesRu: Record<string, string> = {
    tour_halfday: 'Полдня',
    tour_fullday: 'Целый день',
    tour_multiday: '2 дня и более',
    special_tour: 'Особые туры',
    bus_hcm: 'Хошимин',
    bus_dl: 'Далат',
    bus_nt: 'Нячанг',
    bus_dn: 'Дананг',
    bus_ct: 'Кан Тхо',
    bus_mt: 'Ми Тхо',
    bus_vt: 'Вунгтау',
    bus_other: 'Другие маршруты',
    motorcycle: 'Мотоцикл',
    car_driver: 'Авто с водителем',
    car_self: 'Авто без водителя',
    usd: 'Доллар США',
    eur: 'Евро',
    krw: 'Корейская вона',
    rub: 'Российский рубль',
    currency_other: 'Другое',
    laundry_regular: 'Стандартная стирка',
    laundry_special: 'Специальная стирка',
    laundry_express: 'Экспресс-стирка',
    laundry_additional: 'Доп. стирка',
    homestay_300k: '< 300k',
    homestay_300_600k: '300-600k',
    homestay_600k: '> 600k',
    homestay_longterm: 'Долгосрочно',
    homestay_fullhouse: 'Весь дом',
    homestay_additional: 'Доп. услуги',
    roomservice_food: 'Специальное блюдо',
    roomservice_drink: 'Специальный напиток',
    roomservice_extra: 'Дополнительно',
    roomservice_request: 'Запрос',
    housekeeping_cleaning: 'Уборка',
    housekeeping_linen: 'Постельное белье',
    housekeeping_amenities: 'Удобства',
    housekeeping_maintenance: 'Обслуживание',
    localtourism_attraction: 'Достопримечательность',
    localtourism_event: 'Событие',
    localtourism_map: 'Карта',
    localtourism_shopping: 'Покупки',
    concierge_restaurant: 'Ресторан',
    concierge_spa: 'Спа',
    concierge_taxi: 'Такси',
    concierge_wakeup: 'Пробуждение',
    concierge_lostfound: 'Потеряно и Найдено',
    guestfeedback_issue: 'Проблема',
    guestfeedback_time: 'Время',
    guestfeedback_room: 'Номер',
    guestfeedback_resolution: 'Решение'
  };
  const iconDisplayNamesZh: Record<string, string> = {
    tour_halfday: '半天',
    tour_fullday: '全天',
    tour_multiday: '2天及以上',
    special_tour: '特色旅游',
    bus_hcm: '胡志明',
    bus_dl: '大叻',
    bus_nt: '芽庄',
    bus_dn: '岘港',
    bus_ct: '芹苴',
    bus_mt: '美拖',
    bus_vt: '头顿',
    bus_other: '其他线路',
    motorcycle: '摩托车',
    car_driver: '带司机汽车',
    car_self: '自驾汽车',
    usd: '美元',
    eur: '欧元',
    krw: '韩元',
    rub: '卢布',
    currency_other: '其他',
    laundry_regular: '普通洗衣',
    laundry_special: '特殊洗衣',
    laundry_express: '快速洗衣',
    laundry_additional: '附加洗衣',
    homestay_300k: '< 300k',
    homestay_300_600k: '300-600k',
    homestay_600k: '> 600k',
    homestay_longterm: '长期',
    homestay_fullhouse: '整栋',
    homestay_additional: '附加服务',
    roomservice_food: '特色餐点',
    roomservice_drink: '特色饮品',
    roomservice_extra: '额外',
    roomservice_request: '请求',
    housekeeping_cleaning: '清洁',
    housekeeping_linen: '床单',
    housekeeping_amenities: '设施',
    housekeeping_maintenance: '维护',
    localtourism_attraction: '景点',
    localtourism_event: '活动',
    localtourism_map: '地图',
    localtourism_shopping: '购物',
    concierge_restaurant: '餐厅',
    concierge_spa: '水疗',
    concierge_taxi: '出租车',
    concierge_wakeup: '唤醒',
    concierge_lostfound: '丢失和找到',
    guestfeedback_issue: '问题',
    guestfeedback_time: '时间',
    guestfeedback_room: '房间',
    guestfeedback_resolution: '解决'
  };
  const iconDisplayNamesKo: Record<string, string> = {
    tour_halfday: '반나절',
    tour_fullday: '하루',
    tour_multiday: '2일 이상',
    special_tour: '특별 투어',
    bus_hcm: '호치민',
    bus_dl: '달랏',
    bus_nt: '나트랑',
    bus_dn: '다낭',
    bus_ct: '껀터',
    bus_mt: '미토',
    bus_vt: '붕따우',
    bus_other: '기타 노선',
    motorcycle: '오토바이',
    car_driver: '운전기사 포함 차량',
    car_self: '자가 운전 차량',
    usd: '미국 달러',
    eur: '유로',
    krw: '한국 원',
    rub: '러시아 루블',
    currency_other: '기타',
    laundry_regular: '일반 세탁',
    laundry_special: '특수 세탁',
    laundry_express: '급속 세탁',
    laundry_additional: '추가 세탁',
    homestay_300k: '< 300k',
    homestay_300_600k: '300-600k',
    homestay_600k: '> 600k',
    homestay_longterm: '장기',
    homestay_fullhouse: '전체 집',
    homestay_additional: '추가 서비스',
    roomservice_food: '특별한 음식',
    roomservice_drink: '특별한 음료',
    roomservice_extra: '추가',
    roomservice_request: '요청',
    housekeeping_cleaning: '청소',
    housekeeping_linen: '이불',
    housekeeping_amenities: '시설',
    housekeeping_maintenance: '유지보수',
    localtourism_attraction: '명소',
    localtourism_event: '행사',
    localtourism_map: '지도',
    localtourism_shopping: '쇼핑',
    concierge_restaurant: '레스토랑',
    concierge_spa: '스파',
    concierge_taxi: '택시',
    concierge_wakeup: '일어나기',
    concierge_lostfound: '잃어버린 것 찾기',
    guestfeedback_issue: '문제',
    guestfeedback_time: '시간',
    guestfeedback_room: '방',
    guestfeedback_resolution: '해결'
  };

  // Định nghĩa mảng iconName cho từng nhóm dịch vụ (theo danh sách mới)
  const travelTourIcons = [
    "tour_halfday", // Tour_Nửa_ngày
    "tour_fullday", // Tour_Một_ngày
    "tour_multiday", // Tour_Dài_ngày
    "special_tour"   // Tour_đặc_biệt
  ];
  const busTicketIcons = [
    "bus_hcm", "bus_dl", "bus_nt", "bus_dn", "bus_ct", "bus_mt", "bus_vt", "bus_other"
  ];
  const vehicleRentalIcons = [
    "motorcycle", "car_driver", "car_self"
  ];
  const currencyIcons = [
    "usd", "eur", "krw", "rub", "currency_other"
  ];
  const laundryIcons = [
    "laundry_regular", "laundry_special", "laundry_express", "laundry_additional"
  ];
  const homestayIcons = [
    "homestay_300k", "homestay_300_600k", "homestay_600k", "homestay_longterm", "homestay_fullhouse", "homestay_additional"
  ];

  // Bổ sung các dịch vụ chính vào tabOptions
  const tabOptions = [
    { key: 'localtourism', label: t('local_tourism_information', lang) },
    { key: 'tours', label: t('tours', lang) },
    { key: 'bus', label: t('ticket_bus', lang) },
    { key: 'vehicle', label: t('rental_service', lang) },
    { key: 'currency', label: t('currency_exchange', lang) },
    { key: 'laundry', label: t('laundry_service', lang) },
    { key: 'homestay', label: t('homestay_service', lang) },
    { key: 'roomservice', label: t('room_services', lang) },
    { key: 'housekeeping', label: t('housekeeping', lang) },
    { key: 'concierge', label: t('concierge_support', lang) },
    { key: 'guestfeedback', label: t('guest_feedback', lang) }
  ];

  // Bổ sung iconMap cho các dịch vụ mới
  const roomServiceIcons = [
    'roomservice_food', 'roomservice_drink', 'roomservice_extra', 'roomservice_request'
  ];
  const housekeepingIcons = [
    'housekeeping_cleaning', 'housekeeping_linen', 'housekeeping_amenities', 'housekeeping_maintenance'
  ];
  const localTourismIcons = [
    'localtourism_attraction', 'localtourism_event', 'localtourism_map', 'localtourism_shopping'
  ];
  const conciergeIcons = [
    'concierge_restaurant', 'concierge_spa', 'concierge_taxi', 'concierge_wakeup', 'concierge_lostfound'
  ];
  const guestFeedbackIcons = [
    'guestfeedback_issue', 'guestfeedback_time', 'guestfeedback_room', 'guestfeedback_resolution'
  ];

  const iconMap = {
    tours: travelTourIcons,
    bus: busTicketIcons,
    vehicle: vehicleRentalIcons,
    currency: currencyIcons,
    laundry: laundryIcons,
    homestay: homestayIcons,
    roomservice: roomServiceIcons,
    housekeeping: housekeepingIcons,
    localtourism: localTourismIcons,
    concierge: conciergeIcons,
    guestfeedback: guestFeedbackIcons
  };

  // Thêm useEffect để tự động set activeIcon khi activeMenu thay đổi
  useEffect(() => {
    if (iconMap[activeMenu] && iconMap[activeMenu].length > 0) {
      setActiveIcon(iconMap[activeMenu][0]);
    }
  }, [activeMenu]);

  // Hàm dùng chung cho mọi ngôn ngữ
  const handleCall = async (lang: 'en' | 'fr' | 'zh' | 'ru' | 'ko') => {
    setEmailSentForCurrentSession(false);
    setCallDetails({
      id: `call-${Date.now()}`,
      roomNumber: '',
      duration: '0',
      category: ''
    });
    setTranscripts([]);
    setModelOutput([]);
    setCallDuration(0);
    let publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    let assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
    if (lang === 'fr') {
      publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY_FR;
      assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID_FR;
    } else if (lang === 'zh') {
      publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY_ZH;
      assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID_ZH;
    } else if (lang === 'ru') {
      publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY_RU;
      assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID_RU;
    } else if (lang === 'ko') {
      publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY_KO;
      assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID_KO;
    }
    const vapi = await initVapi(publicKey);
    if (vapi && assistantId) {
      await vapi.start(assistantId);
      setCurrentInterface('interface2');
    }
  };

  // Khi nhấn icon, set activeIcon và showReference (nếu nhấn lại icon đang chọn thì bỏ chọn)
  const handleIconClick = (iconName: string) => {
    if (activeIcon === iconName && showReference) {
      setActiveIcon('');
      setShowReference(false);
    } else {
      setActiveIcon(iconName);
      // Chỉ show reference nếu icon có media
      const media = iconMediaMap[iconName];
      if (Array.isArray(media) ? media.length > 0 : (media && typeof media === 'object' && 'src' in media)) {
        setShowReference(true);
      } else {
        setShowReference(false);
      }
    }
    // Tooltip logic giữ nguyên
    setActiveTooltip(activeTooltip === iconName ? null : iconName);
    if (activeTooltip !== iconName) {
      setTimeout(() => {
        setActiveTooltip(currentTooltip => currentTooltip === iconName ? null : currentTooltip);
      }, 3000);
    }
  };

  // Hàm truyền vào Reference để đóng media động
  const handleCloseMedia = () => {
    setActiveIcon('');
    setShowReference(false);
  };

  // Lấy media động tương ứng nếu có (hỗ trợ nhiều media)
  const getActiveIconMediaList = () => {
    if (!activeIcon || !iconMediaMap[activeIcon]) return [];
    const media = iconMediaMap[activeIcon];
    if (Array.isArray(media)) return media;
    if (media && typeof media === 'object' && 'src' in media) return [media];
    return [];
  };

  // Component hiển thị icon với tooltip
  const IconWithTooltip = ({ iconName, className, iconSize = 32, position = 'center', isActive = false }: { iconName: string, className?: string, iconSize?: number, position?: 'left' | 'center' | 'right', isActive?: boolean }) => {
    let tooltipText = iconDisplayNamesEn[iconName] || iconName;
    if (lang === 'fr') tooltipText = iconDisplayNamesFr[iconName] || tooltipText;
    else if (lang === 'ru') tooltipText = iconDisplayNamesRu[iconName] || tooltipText;
    else if (lang === 'zh') tooltipText = iconDisplayNamesZh[iconName] || tooltipText;
    else if (lang === 'ko') tooltipText = iconDisplayNamesKo[iconName] || tooltipText;
    return (
    <div className="relative flex flex-col items-center justify-center cursor-pointer">
      <span 
        className={className || ''}
        style={{
          filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))',
          background: isActive ? 'linear-gradient(90deg, #FFD700 0%, #FFB300 100%)' : 'transparent',
          borderRadius: '50%',
          padding: isActive ? 6 : 0,
          color: isActive ? '#8B1A47' : undefined,
          transition: 'all 0.2s',
        }}
        onClick={() => handleIconClick(iconName)}
      >
        {React.cloneElement(iconComponents[iconName] || <span className="text-red-500">?</span>, { size: iconSize, color: isActive ? '#8B1A47' : iconColor })}
      </span>
      {activeTooltip === iconName && (
          isMobile ? (
            <div className={`absolute top-full ${position === 'left' ? 'left-0' : position === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'} mt-2 w-max max-w-[90vw] bg-white/90 text-gray-800 text-xs sm:text-sm font-medium py-1 px-2 rounded shadow-lg z-50 pointer-events-none text-center break-words`}> 
              {tooltipText}
              <div className={`absolute w-2 h-2 bg-white/90 transform rotate-45 ${position === 'left' ? 'left-4' : position === 'right' ? 'right-4' : 'left-1/2 -translate-x-1/2'} -top-1`}></div>
            </div>
          ) : (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[180px] bg-white/90 text-gray-800 text-xs sm:text-sm font-medium py-1 px-2 rounded shadow-lg z-50 pointer-events-none text-center">
              {tooltipText}
          <div className="absolute w-2 h-2 bg-white/90 transform rotate-45 left-1/2 -translate-x-1/2 top-full -mt-1"></div>
        </div>
          )
      )}
    </div>
  );
  };

  // Hàm để xác định màu sắc và icon dựa trên trạng thái
  const getStatusStyle = (status: string | undefined) => {
    if (!status) return { bg: 'bg-gray-300', text: 'text-gray-800', icon: 'info' };
    switch (status) {
      case 'Đã ghi nhận':
        return { bg: 'bg-gray-300', text: 'text-gray-800', icon: 'assignment_turned_in' };
      case 'Đang thực hiện':
        return { bg: 'bg-yellow-400', text: 'text-yellow-900', icon: 'autorenew' };
      case 'Đã thực hiện và đang bàn giao cho khách':
        return { bg: 'bg-blue-400', text: 'text-blue-900', icon: 'local_shipping' };
      case 'Hoàn thiện':
        return { bg: 'bg-green-500', text: 'text-white', icon: 'check_circle' };
      case 'Lưu ý khác':
        return { bg: 'bg-red-400', text: 'text-white', icon: 'error' };
      default:
        return { bg: 'bg-gray-300', text: 'text-gray-800', icon: 'info' };
    }
  };

  // Hàm chuyển đổi trạng thái từ Staff UI sang key cho dịch thuật
  const getStatusTranslationKey = (status: string | undefined): string => {
    if (!status) return 'status_acknowledged';
    
    switch (status.toLowerCase()) {
      case OrderStatus.ACKNOWLEDGED:
        return 'status_acknowledged';
      case OrderStatus.IN_PROGRESS:
        return 'status_in_progress';
      case OrderStatus.DELIVERING:
        return 'status_delivering';
      case OrderStatus.COMPLETED:
        return 'status_completed';
      case OrderStatus.NOTE:
        return 'status_note';
      default:
    return 'status_acknowledged';
    }
  };

  // Log dữ liệu order thực tế để debug
  console.log('ActiveOrders:', activeOrders);

  // Thêm hook để xác định mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Sửa hàm renderIconGroup để nhận iconSize động
  const renderIconGroup = (icons: string[], col: number, iconSize = 22) => {
    const items = icons.map(icon => {
      const isActive = icon === activeIcon;
      return (
        <li key={icon} className="w-10 h-10 flex items-center justify-center">
          {iconComponents[icon] ? <IconWithTooltip iconName={icon} iconSize={iconSize} isActive={isActive} /> : <span className="text-red-500">?</span>}
        </li>
      );
    });
    // Bổ sung li invisible nếu thiếu để đủ hàng cuối
    const remainder = icons.length % col;
    if (remainder !== 0) {
      for (let i = 0; i < col - remainder; i++) {
        items.push(<li key={`invisible-${i}`} className="w-10 h-10 flex items-center justify-center invisible"></li>);
      }
    }
    return items;
  };

  // Thêm style cho animation
  const shimmerAnimation = `
    @keyframes shimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }
  `;

  // Thêm CSS ẩn scrollbar và scroll-snap-x nếu chưa có:
  <style>{`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scroll-snap-x { scroll-snap-type: x mandatory; }
    .scroll-snap-align-start { scroll-snap-align: start; }
  `}</style>

  // Thêm vào đầu component:
  const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'French', flag: '🇫🇷' },
    { code: 'zh', label: 'Chinese', flag: '🇨🇳' },
    { code: 'ru', label: 'Russian', flag: '🇷🇺' },
    { code: 'ko', label: 'Korean', flag: '🇰🇷' },
  ];
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const handleLangSelect = (code: string) => {
    setLanguage(code as Lang);
    setIsLangDropdownOpen(false);
  };
  const selectedLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  // 1. HEADER: Đưa avatar sang phải, menu/hướng dẫn sang trái, thêm tiêu đề lớn dưới header
  const Header = () => (
    <div className="flex items-center justify-between w-full mb-4">
      <style>{shimmerAnimation}</style>
      {/* Đã xóa nút ngôn ngữ và nút info ở đây */}
      {/* Các thành phần khác giữ nguyên, ví dụ: tiêu đề, dropdown, ... */}
      <div className="flex-1 flex justify-center items-center">
        {/* Dropdown tab nằm giữa trên mobile */}
        <div className="block sm:hidden w-full max-w-xs mx-auto">
          <div className="relative w-full">
            <button
              className="w-full px-4 py-3 rounded-2xl bg-white/30 backdrop-blur-md text-amber-100 font-bold text-base flex items-center justify-between shadow-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200"
              style={{ boxShadow: '0 4px 24px 0 rgba(139,26,71,0.10)', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.02em' }}
              onClick={() => setShowTabDropdown(v => !v)}
            >
              <span className="truncate text-lg font-semibold text-amber-100 drop-shadow-sm" style={{textShadow:'0 1px 6px rgba(139,26,71,0.18)'}}>
                {tabOptions.find(opt => opt.key === activeMenu)?.label}
              </span>
              <span className="material-icons ml-2 text-amber-200 transition-transform duration-200" style={{transform: showTabDropdown ? 'rotate(180deg)' : 'rotate(0deg)'}}>expand_more</span>
            </button>
            {showTabDropdown && (
              <>
                <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setShowTabDropdown(false)} />
                <div className="absolute left-0 right-0 mt-2 bg-white/80 bg-gradient-to-br from-[#fff7] to-[#ffe9b3cc] rounded-2xl shadow-2xl z-50 border border-amber-100 overflow-hidden backdrop-blur-md">
                  {tabOptions.map(opt => (
                    <button
                      key={opt.key}
                      className={`w-full text-left px-5 py-3 text-base font-semibold ${activeMenu === opt.key ? 'bg-amber-100/80 text-pink-900' : 'text-amber-900 hover:bg-amber-50/80 hover:text-pink-900'}`}
                      style={{fontFamily:'Poppins, sans-serif', letterSpacing:'0.01em'}}
                      onClick={() => { setActiveMenu(opt.key as MenuKey); setShowTabDropdown(false); }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // 2. TABS: Trên mobile là dropdown, desktop là tab bar ngang
  const TabBar = () => (
    <>
      {/* Desktop: Tab bar ngang với carousel vô hạn */}
      <div className="hidden sm:block w-full mb-4">
        <Carousel opts={{ loop: true }}>
          <CarouselContent className="flex flex-row gap-2 bg-white/10 rounded-lg p-1 shadow">
            {tabOptions.map(opt => (
              <CarouselItem key={opt.key} className="min-w-[160px] sm:min-w-[120px] px-0">
                <button
                  onClick={() => setActiveMenu(opt.key as MenuKey)}
                  className={`w-full px-4 py-2 rounded-full font-bold text-base sm:text-sm ${activeMenu === opt.key ? 'bg-amber-400 text-pink-900 shadow' : 'bg-transparent text-amber-300'}`}
                >
                  {opt.label}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );

  // 3. ICON GROUP: Style lại icon group cho bo tròn, nhỏ gọn, đặt phía trên card
  const IconGroup = () => (
    <div className="flex flex-row gap-2 mb-2 justify-center">
      {iconMap[activeMenu] && renderIconGroup(iconMap[activeMenu], iconMap[activeMenu].length, 20)}
    </div>
  );

  // 4. CARD DỊCH VỤ: Style lại card/reference: ảnh lớn, overlay, tag, nút heart/arrow, slider ngang
  const ServiceCard = ({ refItem }: { refItem: ReferenceItem }) => (
    <div className="relative min-w-[280px] max-w-xs rounded-2xl shadow-lg overflow-hidden bg-white/90">
      <img src={refItem.image ? refItem.image : hotelImage} alt={refItem.title || 'Service'} className="w-full h-[180px] object-cover rounded-2xl" />
      <div className="absolute top-2 left-2 flex gap-1">
        <span className="bg-amber-400 text-xs font-bold px-2 py-1 rounded-full">AI</span>
        <span className="bg-blue-400 text-xs font-bold px-2 py-1 rounded-full">3 Days</span>
        <span className="bg-pink-400 text-xs font-bold px-2 py-1 rounded-full">{t('tour_package', lang)}</span>
      </div>
      <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow"><span className="material-icons text-pink-500">favorite_border</span></button>
      <div className="absolute bottom-2 right-2 bg-amber-400 rounded-full p-2 shadow"><span className="material-icons text-pink-900">arrow_outward</span></div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-pink-900 mb-1">{refItem.title}</h3>
        <p className="text-sm text-gray-700 mb-2 whitespace-pre-line">
          {refItem.description
            ? refItem.description.split(/\n|\r/).map((line, idx) => {
                const match = line.match(/^([\w\s\-()']+):\s*(.*)$/);
                if (match) {
                  return (
                    <div key={idx} className="mb-0.5">
                      <span className="font-bold text-amber-700">{match[1]}:</span> <span className="font-medium text-gray-900">{match[2]}</span>
                    </div>
                  );
                }
                return <div key={idx}>{line}</div>;
              })
            : null}
        </p>
      </div>
    </div>
  );

  // 5. NÚT CHAT AI: Style lại nút gọi AI cho lớn, glow, fixed bottom center
  const CallButton = () => (
    <button className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-8 py-2 rounded-full shadow-lg text-lg font-bold flex items-center gap-2 animate-pulse z-50" onClick={() => handleCall(lang as any)}>
      <span className="material-icons text-3xl mr-2">auto_mode</span>
      {t('press_to_order', lang)}
    </button>
  );

  return (
    <div 
      className={`absolute w-full min-h-screen h-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-10 overflow-y-auto`} 
      id="interface1"
      style={{
        backgroundImage: `linear-gradient(rgba(139,26,71,0.7), rgba(168,34,85,0.6)), url(${hotelImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        perspective: '1000px'
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-start text-white p-3 pt-6 sm:p-5 sm:pt-10 lg:pt-16 overflow-visible pb-32 sm:pb-24" 
        style={{ transform: 'translateZ(20px)', minHeight: 'fit-content' }}
      >
        {/* --- LAYOUT MỚI MOBILE --- */}
        <Header />
        <TabBar />
        <IconGroup />
        {activeIcon && iconMediaMap[activeIcon] && iconMediaMap[activeIcon].length > 0 && (
          <div className={`w-full overflow-x-auto flex flex-row gap-4 pb-4 ${iconMediaMap[activeIcon].length === 1 ? 'justify-center' : ''}`}>
            {iconMediaMap[activeIcon].map((media, idx) => (
              <div
                key={idx}
                className="reference-media-card min-w-[420px] max-w-[480px] rounded-2xl shadow-lg overflow-hidden bg-white/90"
              >
                <img src={media.src} alt={media.alt || ''} className="w-full h-[270px] object-cover rounded-2xl" />
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-2">{media.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <CallButton />
        {/* --- END LAYOUT MỚI --- */}
        {/* Các block giao diện cũ đã được loại bỏ để layout mới hiển thị rõ ràng */}
        {showInfographic && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full relative">
              <button onClick={() => setShowInfographic(false)} className="absolute top-2 right-2 text-gray-500 hover:text-pink-600 text-2xl">&times;</button>
              <div className="text-gray-800">
                <InfographicSteps />
            </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 639px) {
          .reference-media-card {
            min-width: 260px !important;
            max-width: 320px !important;
          }
          .reference-media-card img {
            height: 160px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Interface1;