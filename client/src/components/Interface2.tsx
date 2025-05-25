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
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-gray-900 text-xs rounded shadow-lg whitespace-nowrap font-semibold border border-gray-200">
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
const serviceLabelRows = chunkArray(serviceLabelOptions, 4); // 3 hàng, mỗi hàng 4,4,3
const ServiceLabels = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const { transcripts } = useAssistant();

  // Xác định service đang được đề cập
  useEffect(() => {
    const normText = transcripts.map(m => m.content.toLowerCase().replace(/[^a-z0-9 ]/gi, ' ').replace(/\s+/g, ' ')).join(' ');
    
    // Tìm service được đề cập nhiều nhất
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
    <div className="flex flex-col gap-2 w-full mb-2 items-center">
      {serviceLabelRows.map((row, idx) => (
        <div key={idx} className="flex flex-row justify-center gap-2 w-full max-w-4xl mx-auto">
          {row.map(opt => (
            <span
              key={opt.key}
              className={`flex-shrink-0 min-w-[90px] sm:min-w-[80px] px-3 py-1.5 rounded-full font-bold text-sm sm:text-xs shadow text-center transition-all duration-200 ${
                activeService === opt.key 
                  ? 'bg-amber-400 text-pink-900 scale-110 ring-2 ring-amber-300' 
                  : 'bg-amber-400/60 text-pink-900/80'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.01em', display: 'inline-block' }}
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

// --- COMPONENT: KeywordsBlock ---
const allKeywords = Array.from(new Set(Object.values(serviceKeywordsMap).flat()));
const keywordRows = chunkArray<string>(allKeywords, 10);
const KeywordsBlock = () => {
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);
  const [activeServices, setActiveServices] = useState<string[]>([]);
  const { transcripts } = useAssistant();

  // Di chuyển hook vào trong component
  const [keywordRelatedMap, setKeywordRelatedMap] = useState<Record<string, string[]>>({});
  useEffect(() => {
    fetch('/keywordRelatedMap.json')
      .then(res => res.json())
      .then(data => setKeywordRelatedMap(data));
  }, []);

  useEffect(() => {
    const normText = transcripts.map(m => m.content.toLowerCase().replace(/[^a-z0-9 ]/gi, ' ').replace(/\s+/g, ' ')).join(' ');
    // Đếm số lần xuất hiện của từng service
    const serviceMentions = serviceLabelOptions.map(service => {
      const label = service.label.toLowerCase();
      const regex = new RegExp(`\\b${label.replace(/ /g, '\\s+')}\\b`, 'i');
      const mentions = (normText.match(regex) || []).length;
      return { key: service.key, mentions };
    });
    // Lấy tất cả service có mentions > 0
    const mentionedServices = serviceMentions.filter(s => s.mentions > 0).map(s => s.key);
    setActiveServices(mentionedServices);

    // Lấy tất cả keywords thuộc các service được đề cập
    const serviceKeywords = mentionedServices.length > 0
      ? Array.from(new Set(mentionedServices.flatMap(s => serviceKeywordsMap[s] || [])))
      : [];
    // Highlight các keywords được nhắc tới trong hội thoại
    const matched: string[] = serviceKeywords.filter(kw => {
      const related = keywordRelatedMap[kw] || [];
      const allTerms = [kw, ...related].sort((a, b) => b.length - a.length);
      return allTerms.some(term => {
        const normTerm = term.toLowerCase().replace(/[^a-z0-9 ]/gi, ' ').replace(/\s+/g, ' ').trim();
        if (!normTerm) return false;
        const regex = new RegExp(`\\b${normTerm.replace(/ /g, '\\s+')}\\b`, 'i');
        return regex.test(normText);
      });
    });
    setActiveKeywords(matched);
  }, [transcripts, keywordRelatedMap]);

  return (
    <div className="flex flex-col gap-3 items-center w-full">
      {/* Service labels 3 hàng trên cùng */}
      <ServiceLabels />
      {/* Keyword icons rows */}
      {keywordRows.map((row: string[], idx: number) => (
        <div key={idx} className="flex flex-row justify-center gap-4">
          {row.map((k: string) => keywordIconMap[k] && (
            <span 
              key={k} 
              className={`transition-all duration-200 ${
                activeKeywords.includes(k) 
                  ? 'ring-4 ring-amber-300 rounded-full bg-yellow-50 shadow-lg' 
                  : activeServices.some(s => serviceKeywordsMap[s]?.includes(k))
                    ? 'opacity-100'
                    : 'opacity-75'
              }`}
            >
              <IconWithTooltip 
                icon={React.cloneElement(keywordIconMap[k], { 
                  color: activeKeywords.includes(k) 
                    ? '#FFC94A' 
                    : activeServices.some(s => serviceKeywordsMap[s]?.includes(k))
                      ? '#FFC94A'
                      : '#FFFFFF'
                })} 
                tooltip={k}
                forceShowTooltip={activeKeywords.includes(k)}
              />
            </span>
          ))}
        </div>
      ))}
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
    language
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

  // Handler for Cancel button - End call and go back to interface1
  const handleCancel = useCallback(() => {
    // Capture the current duration for the email
    const finalDuration = callDuration > 0 ? callDuration : localDuration;
    console.log('Canceling call with duration:', finalDuration);
    
    // Call the context's endCall and switch to interface1
    contextEndCall();
    setCurrentInterface('interface1');
  }, [callDuration, localDuration, contextEndCall, setCurrentInterface]);

  // Handler for Next button - End call and proceed to interface3
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
  
  // Format duration for display
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };
  
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
  
  return (
    <div 
      className={`absolute w-full min-h-screen h-full transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } z-20 overflow-y-auto`} id="interface2"
      style={{
        backgroundImage: `linear-gradient(rgba(139,26,71,0.7), rgba(168,34,85,0.6)), url('/assets/courtyard.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row p-2 h-full gap-2">
        {/* Left: Call indicator & Realtime conversation side by side, Reference below */}
        <div className="w-full md:w-2/3 flex flex-col items-center space-y-1 sm:space-y-4 mt-1 min-h-0 overflow-y-auto">
          {/* Replace old orb with new SiriCallButton */}
          <div className="relative flex flex-col items-center justify-center mb-1 sm:mb-6 w-full max-w-xs mx-auto">
            {/* SiriCallButton ở trên */}
            <SiriCallButton
              containerId="siri-button"
              isListening={!isMuted}
              volumeLevel={micLevel}
            />
            {/* Duration bar với các nút hai bên, căn giữa tuyệt đối */}
            <div className="flex items-center justify-center mt-2 w-full gap-2 sm:gap-3">
              {/* Nút Mute bên trái */}
              <button
                className="flex items-center justify-center transition-colors"
                title={isMuted ? t('unmute', language as import('../i18n').Lang) : t('mute', language as import('../i18n').Lang)}
                onClick={toggleMute}
                style={{fontSize: 22, padding: 0, background: 'none', border: 'none', color: '#d4af37', width: 28, height: 28}}
                onMouseOver={e => (e.currentTarget.style.color = '#ffd700')}
                onMouseOut={e => (e.currentTarget.style.color = '#d4af37')}
              >
                <span className="material-icons">{isMuted ? 'mic_off' : 'mic'}</span>
              </button>
              {/* Nút Cancel (chỉ mobile) */}
              <button
                id="cancelButton"
                onClick={handleCancel}
                className="flex items-center justify-center px-3 py-2 bg-white/80 hover:bg-blue-100 text-blue-900 rounded-full text-xs font-semibold border-2 border-blue-200 shadow transition-colors sm:hidden active:scale-95 active:bg-blue-100"
                style={{
                  fontFamily: 'inherit',
                  letterSpacing: 0.2,
                  minHeight: 44,
                  minWidth: 90,
                  fontSize: 14,
                  touchAction: 'manipulation',
                  zIndex: 10
                }}
              >
                <span className="material-icons text-base mr-1">cancel</span>{t('cancel', language as import('../i18n').Lang)}
              </button>
              {/* Duration ở giữa, luôn căn giữa */}
              <div className="flex-1 flex justify-center">
                <div className="text-white text-xs sm:text-sm bg-blue-900/80 rounded-full px-3 sm:px-4 py-1 shadow-lg border border-white/30 flex items-center justify-center" style={{backdropFilter:'blur(2px)'}}>
                  {formatDuration(localDuration)}
                </div>
              </div>
              {/* Nút MicLevel bên phải */}
              <button
                className="flex items-center justify-center transition-colors"
                title="Mic Level"
                style={{fontSize: 22, padding: 0, background: 'none', border: 'none', color: '#d4af37', width: 28, height: 28}}
                tabIndex={-1}
                disabled
                onMouseOver={e => (e.currentTarget.style.color = '#ffd700')}
                onMouseOut={e => (e.currentTarget.style.color = '#d4af37')}
              >
                <span className="material-icons">graphic_eq</span>
                <span className="ml-1 flex items-end h-4 w-6">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} style={{
                      display: 'inline-block',
                      width: 2,
                      height: `${4 + Math.round((micLevel/100)*12) * ((i%2)+1)}px`,
                      background: '#d4af37',
                      marginLeft: 1,
                      borderRadius: 1
                    }} />
                  ))}
                </span>
              </button>
            </div>
          </div>
          
          {/* Realtime conversation container spans full width */}
          {showRealtimeConversation && (
            <div
              id="realTimeConversation"
              ref={conversationRef}
              className="w-full flex flex-col-reverse gap-1 pr-2 relative max-w-full sm:max-w-2xl mx-auto min-h-[60px] max-h-[12vh] overflow-y-auto mb-1"
              style={{
                background: 'rgba(255,255,255,0.88)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.35)',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                padding: '8px',
                transition: 'box-shadow 0.3s, background 0.3s',
                fontFamily: 'SF Pro Text, Roboto, Open Sans, Arial, sans-serif',
                fontSize: window.innerWidth < 640 ? 14 : 16,
                lineHeight: 1.5,
                color: '#222',
                fontWeight: 400,
                backdropFilter: 'blur(2px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* Nút đóng transcript (ẩn realtime conversation) */}
              <button
                className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/70 text-gray-400 hover:text-gray-700 shadow z-10 opacity-60 hover:opacity-90 transition-all"
                style={{fontSize: 14, display: 'block'}}
                title="Ẩn realtime conversation"
                onClick={() => setShowRealtimeConversation(false)}
              >
                <span className="material-icons" style={{fontSize: 16}}>close</span>
              </button>
              {/* Display conversation turns */}
              <div className="w-full flex flex-col gap-1 pr-2" style={{overflowY: 'auto', maxHeight: '28vh'}}>
                {conversationTurns.length === 0 && (
                  <div className="text-gray-400 text-base text-center select-none" style={{opacity: 0.7}}>
                    {t('tap_to_speak', language as import('../i18n').Lang)}
                  </div>
                )}
                {[...conversationTurns].reverse().map((turn, turnIdx) => (
                  <div key={turn.id} className="mb-1">
                    <div className="flex items-start">
                      <div className="flex-grow">
                        {turn.role === 'user' ? (
                          <p className="text-base md:text-lg font-medium text-gray-900" style={{marginBottom: 2}}>
                            {turn.messages[0].content}
                          </p>
                        ) : (
                          <p
                            className="text-base md:text-lg font-medium"
                            style={{
                              marginBottom: 2,
                              position: 'relative',
                              background: 'linear-gradient(90deg, #FF512F, #F09819, #FFD700, #56ab2f, #43cea2, #1e90ff, #6a11cb, #FF512F)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontWeight: 600,
                              letterSpacing: 0.2,
                              transition: 'background 0.5s'
                            }}
                          >
                            <span className="inline-flex flex-wrap">
                              {turn.messages.map((msg, idx) => {
                                const content = msg.content.slice(0, visibleChars[msg.id] || 0);
                                return (
                                  <span key={msg.id} style={{ whiteSpace: 'pre' }}>
                                    {content}
                                    {/* Blinking cursor cho từ cuối cùng khi đang xử lý */}
                                    {idx === turn.messages.length - 1 && turnIdx === 0 && visibleChars[msg.id] < msg.content.length && (
                                      <span className="animate-blink text-yellow-500" style={{marginLeft: 1}}>|</span>
                                    )}
                                  </span>
                                );
                              })}
                            </span>
                            {/* 3 chấm nhấp nháy khi assistant đang nghe */}
                            {turnIdx === 0 && turn.role === 'assistant' && visibleChars[turn.messages[turn.messages.length-1].id] === turn.messages[turn.messages.length-1].content.length && (
                              <span className="ml-2 animate-ellipsis text-yellow-500">...</span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Thêm khối References phía dưới */}
          <div className="w-full mt-4">
            <div className="bg-blue-50 rounded-2xl shadow p-4 border border-blue-100">
              <h3 className="font-bold text-blue-900 text-lg mb-2">References</h3>
              <div className="text-gray-600">(Nội dung tham khảo sẽ hiển thị ở đây)</div>
            </div>
          </div>
        </div>
        {/* Right: Keywords và Summary */}
        <div className="w-full md:w-1/3 flex flex-col gap-4 p-2">
          {/* Khối Keywords */}
          <KeywordsBlock />
          {/* Khối Summary */}
          <div className="bg-yellow-50 rounded-2xl shadow p-4 border border-yellow-200 mb-4">
            <h3 className="font-bold text-yellow-800 text-lg mb-2">Summary</h3>
            <div className="text-gray-700">(Tóm tắt nội dung sẽ hiển thị ở đây)</div>
          </div>
          {/* Hai nút Confirm và Cancel dưới khối Summary */}
          <div className="flex flex-col gap-4 w-full md:w-auto mt-2">
            <Button
              id="endCallButton"
              onClick={handleNext}
              variant="yellow"
              className="w-full md:w-auto flex items-center justify-center space-x-2 text-base sm:text-lg"
              style={{ minHeight: 56, minWidth: 220, zIndex: 10 }}
            >
              <span className="material-icons">send</span>
              <span className="whitespace-nowrap">{t('confirm_request', language as import('../i18n').Lang)}</span>
            </Button>
            <button
              id="cancelButtonDesktop"
              onClick={handleCancel}
              className="w-full md:w-auto bg-white hover:bg-blue-100 text-blue-900 font-semibold py-3 px-8 rounded-full shadow flex items-center justify-center space-x-2 transition-all duration-200 border-2 border-blue-200 text-base sm:text-lg active:scale-95 active:bg-blue-100"
              style={{
                fontFamily: 'inherit',
                letterSpacing: 0.2,
                minHeight: 56,
                minWidth: 120,
                touchAction: 'manipulation',
                zIndex: 10
              }}
            >
              <span className="material-icons text-lg mr-2">cancel</span>{t('cancel', language as import('../i18n').Lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interface2;
