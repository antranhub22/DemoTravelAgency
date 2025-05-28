import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAssistant } from '@/context/AssistantContext';
import Reference from './Reference';
import SiriCallButton from './SiriCallButton';
import { referenceService, ReferenceItem } from '@/services/ReferenceService';
import InfographicSteps from './InfographicSteps';
import { t } from '@/i18n';
import { Button } from './ui/button';
import { Sun, CalendarDays, CalendarCheck, Star, Bus, Mountain, Umbrella, Landmark, Ship, Waves, Map, ArrowRightLeft, Bike, CarFront, Car, DollarSign, Euro, Coins, Shirt, Sparkles, Plus, Home, Building2, KeyRound, UserRound, Info, Users, Clock, Calendar, MapPin, Languages, Briefcase, CreditCard, Phone, Mail, User, Lock, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, Filter, Settings, ClipboardList, FileText, Globe, Tag, ShoppingCart, Truck, Gift, Heart, MessageCircle, Star as StarIcon, BookOpen, BedDouble, Coffee, Wifi, ShieldCheck, PawPrint, CarTaxiFront, ArrowRightLeft as ExchangeIcon, BadgeDollarSign, FileBadge2, UserCog, UserCheck, UserX } from 'lucide-react';

interface Interface2Props {
  isActive: boolean;
}

// Interface cho trạng thái hiển thị của mỗi message
interface VisibleCharState {
  [messageId: string]: number;
}

// Interface cho một turn trong cuộc hội thoại
interface ConversationTurn {
  id: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  messages: Array<{
    id: string;
    content: string;
    timestamp: Date;
  }>;
}

// --- KEYWORDS ICONS MAPPING ---
const serviceIcons = [
  { key: 'Tours', icon: <Sun size={32} color="#FFC94A" />, tooltip: 'Tours' },
  { key: 'Bus Tickets', icon: <Bus size={32} color="#FFC94A" />, tooltip: 'Bus Tickets' },
  { key: 'Vehicle Rental', icon: <CarFront size={32} color="#FFC94A" />, tooltip: 'Vehicle Rental' },
  { key: 'Currency Exchange', icon: <DollarSign size={32} color="#FFC94A" />, tooltip: 'Currency Exchange' },
  { key: 'Laundry Service', icon: <Shirt size={32} color="#FFC94A" />, tooltip: 'Laundry Service' },
  { key: 'HomeStay', icon: <Home size={32} color="#FFC94A" />, tooltip: 'HomeStay' },
];
const keywordIconMap: Record<string, JSX.Element> = {
  Destination: <MapPin size={28} color="#8B1A47" />,
  'Tour Name': <Tag size={28} color="#8B1A47" />,
  Duration: <Clock size={28} color="#8B1A47" />,
  'Start Date': <Calendar size={28} color="#8B1A47" />,
  'Pickup Location': <MapPin size={28} color="#8B1A47" />,
  'Drop-off Location': <MapPin size={28} color="#8B1A47" />,
  Activities: <StarIcon size={28} color="#8B1A47" />,
  'Number of Participants': <Users size={28} color="#8B1A47" />,
  'Guide Language': <Languages size={28} color="#8B1A47" />,
  Price: <BadgeDollarSign size={28} color="#8B1A47" />,
  'Special Request': <ClipboardList size={28} color="#8B1A47" />,
  'Departure City': <MapPin size={28} color="#8B1A47" />,
  'Arrival City': <MapPin size={28} color="#8B1A47" />,
  'Travel Date': <Calendar size={28} color="#8B1A47" />,
  'Departure Time': <Clock size={28} color="#8B1A47" />,
  'Number of Tickets': <Tag size={28} color="#8B1A47" />,
  'Bus Type': <Bus size={28} color="#8B1A47" />,
  'Pickup Point': <MapPin size={28} color="#8B1A47" />,
  'Drop-off Point': <MapPin size={28} color="#8B1A47" />,
  'Luggage Info': <Briefcase size={28} color="#8B1A47" />,
  'Contact Number': <Phone size={28} color="#8B1A47" />,
  'Vehicle Type': <Car size={28} color="#8B1A47" />,
  'Pickup Date': <Calendar size={28} color="#8B1A47" />,
  'Return Date': <CalendarCheck size={28} color="#8B1A47" />,
  'Driver Included': <UserCheck size={28} color="#8B1A47" />,
  'Fuel Policy': <CarFront size={28} color="#8B1A47" />,
  'Deposi Method': <CreditCard size={28} color="#8B1A47" />,
  'Currency Type': <DollarSign size={28} color="#8B1A47" />,
  Amount: <BadgeDollarSign size={28} color="#8B1A47" />,
  'Exchange From': <ExchangeIcon size={28} color="#8B1A47" />,
  'Exchange To': <ExchangeIcon size={28} color="#8B1A47" />,
  'ID Required': <User size={28} color="#8B1A47" />,
  'Laundry Type': <Shirt size={28} color="#8B1A47" />,
  'Pickup Time': <Clock size={28} color="#8B1A47" />,
  'Return Time': <Clock size={28} color="#8B1A47" />,
  'Weight Estimate': <Tag size={28} color="#8B1A47" />,
  'Special Item': <Gift size={28} color="#8B1A47" />,
  'Fragrance Option': <Sparkles size={28} color="#8B1A47" />,
  Location: <MapPin size={28} color="#8B1A47" />,
  'Check-in Date': <Calendar size={28} color="#8B1A47" />,
  'Check-out Date': <CalendarCheck size={28} color="#8B1A47" />,
  'Number of Guests': <Users size={28} color="#8B1A47" />,
  'Room Type': <BedDouble size={28} color="#8B1A47" />,
  'Facilities Needed': <Coffee size={28} color="#8B1A47" />,
  'Host Language': <Languages size={28} color="#8B1A47" />,
  'Pet Friendly': <PawPrint size={28} color="#8B1A47" />,
  'Smoking Allowed': <UserX size={28} color="#8B1A47" />,
  'Room Number': <Home size={28} color="#8B1A47" />,
  'Guest Name': <User size={28} color="#8B1A47" />,
  'Service Time': <Clock size={28} color="#8B1A47" />,
  'Food Order': <ShoppingCart size={28} color="#8B1A47" />,
  'Dietary Preference': <Heart size={28} color="#8B1A47" />,
  'Allergen Info': <AlertTriangle size={28} color="#8B1A47" />,
  Quantity: <Tag size={28} color="#8B1A47" />,
  'Cleaning Time': <Clock size={28} color="#8B1A47" />,
  'Linen/Towel Request': <BedDouble size={28} color="#8B1A47" />,
  'Extra Amenities': <Gift size={28} color="#8B1A47" />,
  'Maintenance Issue': <AlertTriangle size={28} color="#8B1A47" />,
  'Interest Type': <StarIcon size={28} color="#8B1A47" />,
  'Travel Time': <Clock size={28} color="#8B1A47" />,
  'Weather Concern': <Globe size={28} color="#8B1A47" />,
  'Transport Needed': <CarTaxiFront size={28} color="#8B1A47" />,
  'Language Preference': <Languages size={28} color="#8B1A47" />,
  'Activity Level': <StarIcon size={28} color="#8B1A47" />,
  'Restaurant Booking': <Coffee size={28} color="#8B1A47" />,
  'Spa/Wellness Time': <Heart size={28} color="#8B1A47" />,
  'Taxi / Transfer': <CarTaxiFront size={28} color="#8B1A47" />,
  'Wake-up Call': <Clock size={28} color="#8B1A47" />,
  'Lost & Found': <Search size={28} color="#8B1A47" />,
  'Issue Type': <AlertTriangle size={28} color="#8B1A47" />,
  'Time of Incident': <Clock size={28} color="#8B1A47" />,
  'Desired Resolution': <CheckCircle size={28} color="#8B1A47" />
};
// --- END KEYWORDS ICONS MAPPING ---

// --- COMPONENT: IconWithTooltip ---
interface IconWithTooltipProps {
  icon: JSX.Element;
  tooltip: string;
  forceShowTooltip?: boolean;
}
const IconWithTooltip = ({ icon, tooltip, forceShowTooltip = false }: IconWithTooltipProps) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (forceShowTooltip) setShow(true);
    else setShow(false);
  }, [forceShowTooltip]);
  return (
    <div
      className="relative flex flex-col items-center justify-center cursor-pointer group"
      onClick={() => setShow(!forceShowTooltip && !show)}
      onMouseLeave={() => { if (!forceShowTooltip) setShow(false); }}
    >
      {icon}
      {(show || forceShowTooltip) && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 text-sm font-medium whitespace-nowrap bg-white/10 backdrop-blur-sm rounded-lg"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};
// --- END COMPONENT ---

// --- COMPONENT: ServiceLabels ---
const serviceLabelOptions = [
  { key: 'tours', label: 'Tourism & Tours' },
  { key: 'bus', label: 'Bus Tickets' },
  { key: 'vehicle', label: 'Vehicle Rental' },
  { key: 'currency', label: 'Currency Exchange' },
  { key: 'laundry', label: 'Laundry Service' },
  { key: 'homestay', label: 'Homestay Service' },
  { key: 'roomservice', label: 'Room Service' },
  { key: 'housekeeping', label: 'Housekeeping' },
  { key: 'localtourism', label: 'Local Tourism Info' },
  { key: 'concierge', label: 'Concierge Support' },
  { key: 'guestfeedback', label: 'Guest Feedback' },
];
const chunkArray = <T,>(arr: T[], size: number): T[][] => arr.length > size ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)] : [arr];
const serviceLabelRows = window.innerWidth < 640
  ? chunkArray(serviceLabelOptions, 6)
  : chunkArray(serviceLabelOptions, 6); // 2 rows, 6 per row on desktop
const ServiceLabels = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const { transcripts } = useAssistant();

  useEffect(() => {
    const normText = transcripts.map(m => m.content.toLowerCase().replace(/[^a-z0-9 ]/gi, ' ').replace(/\s+/g, ' ')).join(' ');
    
    const serviceMentions = serviceLabelOptions.map(service => {
      const label = service.label.toLowerCase();
      const regex = new RegExp(`\\b${label.replace(/ /g, '\\s+')}\\b`, 'i');
      const mentions = (normText.match(regex) || []).length;
      return { key: service.key, mentions };
    });

    const mostMentioned = serviceMentions.reduce((max, curr) => 
      curr.mentions > max.mentions ? curr : max
    , { key: '', mentions: 0 });

    setActiveService(mostMentioned.mentions > 0 ? mostMentioned.key : null);
  }, [transcripts]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <style>{`
        @media (max-width: 640px) {
          .service-label-row {
            max-width: 90vw !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>
      {serviceLabelRows.map((row, idx) => (
        <div 
          key={idx} 
          className="flex flex-row justify-center gap-3 mx-auto service-label-row" 
          style={window.innerWidth < 640 ? {marginBottom: 2, maxWidth: '90vw', width: '90vw'} : {maxWidth: '100%'}}
        >
          {row.map(opt => (
            <span
              key={opt.key}
              className={`flex-shrink-0 min-w-[44px] sm:min-w-[120px] px-2 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-sm shadow-sm text-center transition-all duration-200 ${
                activeService === opt.key 
                  ? 'bg-amber-400 text-pink-900 scale-105 ring-2 ring-amber-300' 
                  : 'bg-amber-400/60 text-pink-900/80 hover:bg-amber-400/80'
              }`}
              style={{ 
                fontFamily: 'Poppins, sans-serif', 
                letterSpacing: '0.01em', 
                display: 'inline-block',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {opt.label}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
// --- END COMPONENT ---

// --- KEYWORDS GROUP MAPPING ---
const serviceKeywordsMap: Record<string, string[]> = {
  tours: [
    'Destination', 'Tour Name', 'Duration', 'Start Date', 'Pickup Location', 'Drop-off Location', 'Activities', 'Number of Participants', 'Guide Language', 'Price', 'Special Request'
  ],
  bus: [
    'Departure City', 'Arrival City', 'Travel Date', 'Departure Time', 'Number of Tickets', 'Bus Type', 'Pickup Point', 'Drop-off Point', 'Luggage Info', 'Contact Number', 'Price'
  ],
  vehicle: [
    'Vehicle Type', 'Pickup Date', 'Return Date', 'Pickup Location', 'Drop-off Location', 'Driver Included', 'Price', 'Fuel Policy', 'Deposi Method'
  ],
  currency: [
    'Currency Type', 'Amount', 'Exchange From', 'Exchange To', 'ID Required'
  ],
  laundry: [
    'Laundry Type', 'Pickup Time', 'Return Time', 'Weight Estimate', 'Special Item', 'Fragrance Option', 'Price'
  ],
  homestay: [
    'Location', 'Check-in Date', 'Check-out Date', 'Number of Guests', 'Room Type', 'Facilities Needed', 'Price', 'Host Language', 'Pet Friendly', 'Smoking Allowed'
  ],
  roomservice: [
    'Room Number', 'Guest Name', 'Service Time', 'Food Order', 'Dietary Preference', 'Allergen Info', 'Quantity', 'Price', 'Special Request'
  ],
  housekeeping: [
    'Room Number', 'Cleaning Time', 'Linen/Towel Request', 'Extra Amenities', 'Maintenance Issue'
  ],
  localtourism: [
    'Interest Type', 'Destination', 'Travel Time', 'Weather Concern', 'Transport Needed', 'Language Preference', 'Activity Level'
  ],
  concierge: [
    'Restaurant Booking', 'Spa/Wellness Time', 'Taxi / Transfer', 'Wake-up Call', 'Lost & Found'
  ],
  guestfeedback: [
    'Issue Type', 'Time of Incident', 'Room Number', 'Desired Resolution'
  ]
};
// --- END KEYWORDS GROUP MAPPING ---

// --- SERVICE RELATED TERMS MAPPING ---
const serviceRelatedTerms: Record<string, string[]> = {
  tours: ['tour', 'tours', 'tourism', 'excursion', 'trip', 'đặt tour', 'tour du lịch'],
  bus: ['bus', 'bus ticket', 'xe khách', 'vé xe', 'bus ride', 'bus service'],
  vehicle: ['vehicle', 'car', 'rental', 'thuê xe', 'xe thuê', 'motorbike', 'scooter'],
  currency: ['currency', 'exchange', 'money', 'đổi tiền', 'ngoại tệ'],
  laundry: ['laundry', 'giặt', 'giặt ủi', 'washing', 'laundry service'],
  homestay: ['homestay', 'nhà nghỉ', 'ở nhà dân', 'homestay service'],
  roomservice: ['room service', 'đồ ăn phòng', 'gọi món', 'in-room dining'],
  housekeeping: ['housekeeping', 'dọn phòng', 'lau dọn', 'cleaning'],
  localtourism: ['local tourism', 'địa điểm', 'thông tin du lịch', 'local info'],
  concierge: ['concierge', 'hỗ trợ', 'đặt bàn', 'booking', 'support'],
  guestfeedback: ['feedback', 'phản hồi', 'khiếu nại', 'complaint']
};
// --- END SERVICE RELATED TERMS MAPPING ---

// --- COMPONENT: KeywordsBlock ---
const KeywordsBlock = () => {
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);
  const { transcripts } = useAssistant();

  useEffect(() => {
    const normText = transcripts.map(m => m.content.toLowerCase().replace(/[^a-z0-9 ]/gi, ' ').replace(/\s+/g, ' ')).join(' ');
    
    const keywordMentions = Object.entries(serviceKeywordsMap).flatMap(([service, keywords]) =>
      keywords.map(keyword => {
        const label = keyword.toLowerCase();
        const regex = new RegExp(`\\b${label.replace(/ /g, '\\s+')}\\b`, 'i');
        const mentions = (normText.match(regex) || []).length;
        return { keyword, mentions };
      })
    );

    const mostMentioned = keywordMentions
      .filter(k => k.mentions > 0)
      .sort((a, b) => b.mentions - a.mentions)
      .slice(0, 6)
      .map(k => k.keyword);

    setActiveKeywords(mostMentioned);
  }, [transcripts]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white mb-2">Keywords</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(keywordIconMap).map(([keyword, icon]) => (
          <div
            key={keyword}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${
              activeKeywords.includes(keyword)
                ? 'bg-white/20 scale-105'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex-shrink-0">{icon}</div>
            <span className="text-sm text-white/90 truncate">{keyword}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
// --- END COMPONENT ---

const Interface2: React.FC<Interface2Props> = ({ isActive }) => {
  const { 
    transcripts, 
    callDetails,
    callDuration,
    endCall: contextEndCall,
    isMuted,
    toggleMute,
    setCurrentInterface,
    micLevel,
    modelOutput,
    language,
    callSummary
  } = useAssistant();
  
  // State cho Paint-on effect
  const [visibleChars, setVisibleChars] = useState<VisibleCharState>({});
  const animationFrames = useRef<{[key: string]: number}>({});
  
  // State để lưu trữ các turns đã được xử lý
  const [conversationTurns, setConversationTurns] = useState<ConversationTurn[]>([]);
  
  // Add state for references
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  
  // Local duration state for backup timer functionality
  const [localDuration, setLocalDuration] = useState(0);
  
  const conversationRef = useRef<HTMLDivElement>(null);

  // NEW: State để ẩn/hiện khung realtime conversation
  const [showRealtimeConversation, setShowRealtimeConversation] = useState(true);
  
  // Thêm state cho summaryContent ở đầu Interface2
  const [summaryContent, setSummaryContent] = useState<string>('');
  
  // Cleanup function for animations
  const cleanupAnimations = () => {
    Object.values(animationFrames.current).forEach(frameId => {
      cancelAnimationFrame(frameId);
    });
    animationFrames.current = {};
  };
  
  // Load all references on mount
  useEffect(() => {
    async function loadAllReferences() {
      await referenceService.initialize();
      // Lấy toàn bộ referenceMap
      const allRefs = Object.values((referenceService as any).referenceMap || {}) as ReferenceItem[];
      console.log('All references loaded:', allRefs);
      setReferences(allRefs);
    }
    loadAllReferences();
  }, []);
  
  // Process transcripts into conversation turns
  useEffect(() => {
    const sortedTranscripts = [...transcripts].sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );

    const turns: ConversationTurn[] = [];
    let currentTurn: ConversationTurn | null = null;

    sortedTranscripts.forEach((message) => {
      if (message.role === 'user') {
        // Always create a new turn for user messages
        currentTurn = {
          id: message.id.toString(),
          role: 'user',
          timestamp: message.timestamp,
          messages: [{ 
            id: message.id.toString(), 
            content: message.content,
            timestamp: message.timestamp 
          }]
        };
        turns.push(currentTurn);
      } else {
        // For assistant messages
        if (!currentTurn || currentTurn.role === 'user') {
          // Start new assistant turn
          currentTurn = {
            id: message.id.toString(),
            role: 'assistant',
            timestamp: message.timestamp,
            messages: []
          };
          turns.push(currentTurn);
        }
        // Add message to current assistant turn
        currentTurn.messages.push({
          id: message.id.toString(),
          content: message.content,
          timestamp: message.timestamp
        });
      }
    });

    setConversationTurns(turns);
  }, [transcripts]);

  // Paint-on animation effect
  useEffect(() => {
    // Get all assistant messages from all turns
    const assistantMessages = conversationTurns
      .filter(turn => turn.role === 'assistant')
      .flatMap(turn => turn.messages);
    
    assistantMessages.forEach(message => {
      // Skip if already animated
      if (visibleChars[message.id] === message.content.length) return;
      
      let currentChar = visibleChars[message.id] || 0;
      const content = message.content;
      
      const animate = () => {
        if (currentChar < content.length) {
          setVisibleChars(prev => ({
            ...prev,
            [message.id]: currentChar + 1
          }));
          currentChar++;
          animationFrames.current[message.id] = requestAnimationFrame(animate);
        } else {
          delete animationFrames.current[message.id];
        }
      };
      
      animationFrames.current[message.id] = requestAnimationFrame(animate);
    });
    
    // Cleanup on unmount or when turns change
    return () => cleanupAnimations();
  }, [conversationTurns]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleCancel = useCallback(() => {
    // Capture the current duration for the email
    const finalDuration = callDuration > 0 ? callDuration : localDuration;
    console.log('Canceling call with duration:', finalDuration);
    
    // Call the context's endCall and switch to interface1
    contextEndCall();
    setCurrentInterface('interface1');
  }, [callDuration, localDuration, contextEndCall, setCurrentInterface]);

  const handleNext = useCallback(() => {
    // Nếu chưa có hội thoại thì không cho xác nhận
    if (!transcripts || transcripts.length === 0) {
      alert(t('need_conversation', language as import('../i18n').Lang));
      return;
    }
    // Capture the current duration for the email
    const finalDuration = callDuration > 0 ? callDuration : localDuration;
    console.log('Ending call with duration:', finalDuration);
    // Call the context's endCall and switch to interface3, interface3fr (French), hoặc interface3vi (Vietnamese)
    contextEndCall();
    if (language === 'fr') {
      setCurrentInterface('interface3fr');
    } else if (language === 'vi') {
      setCurrentInterface('interface3vi');
    } else {
      setCurrentInterface('interface3');
    }
  }, [callDuration, localDuration, contextEndCall, setCurrentInterface, transcripts, language]);
  
  // Memoize the formatDuration function
  const formatDuration = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);
  
  // Local timer as a backup to ensure we always have a working timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    // Only start the timer when this interface is active
    if (isActive) {
      console.log('Interface2 is active, starting local timer');
      // Initialize with the current duration from context
      setLocalDuration(callDuration || 0);
      
      // Start the local timer
      timer = setInterval(() => {
        setLocalDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) {
        console.log('Cleaning up local timer in Interface2');
        clearInterval(timer);
      }
    };
  }, [isActive, callDuration]);
  
  // Auto scroll to top when new transcript arrives
  useEffect(() => {
    if (conversationRef.current && isActive) {
      conversationRef.current.scrollTop = 0;
    }
  }, [conversationTurns, isActive]);
  
  // Tự động sinh summary mỗi khi transcripts thay đổi (giống Interface3, dùng logic tổng hợp đơn giản)
  useEffect(() => {
    if (!transcripts || transcripts.length === 0) {
      setSummaryContent('');
      return;
    }
    // Ghép toàn bộ hội thoại thành 1 đoạn tóm tắt đơn giản (có thể thay bằng AI nếu muốn)
    const summary = transcripts.map(t => `${t.role === 'assistant' ? 'Assistant' : 'User'}: ${t.content}`).join('\n');
    setSummaryContent(summary);
  }, [transcripts]);
  
  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-pink-900/95 to-pink-800/95 backdrop-blur-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Travel Agency Interface"
    >
      <div className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <header className="flex-none mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-2 sm:mb-4">
              {t('hotel_name')}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 text-center">
              {t('hotel_subtitle')}
            </p>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Left Column - Service Labels */}
            <aside className="flex-none lg:w-1/4" aria-label="Service Categories">
              <ServiceLabels />
            </aside>

            {/* Center Column - Conversation */}
            <section className="flex-1 flex flex-col gap-4 sm:gap-6" aria-label="Conversation">
              <div 
                className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 overflow-y-auto"
                ref={conversationRef}
                role="log"
                aria-label="Conversation history"
              >
                {/* Conversation content */}
              </div>
              <div className="flex-none">
                <SiriCallButton
                  containerId="siri-button"
                  isListening={!isMuted}
                  volumeLevel={micLevel}
                />
              </div>
            </section>

            {/* Right Column - Keywords */}
            <aside className="flex-none lg:w-1/4" aria-label="Keywords">
              <KeywordsBlock />
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Interface2;
