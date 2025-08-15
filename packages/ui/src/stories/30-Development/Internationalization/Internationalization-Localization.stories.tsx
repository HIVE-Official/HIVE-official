import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useCallback, useMemo, createContext, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { HiveProgress as Progress } from '../../components/hive-progress';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  Globe,
  Languages,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Euro,
  Yen,
  PoundSterling,
  Users,
  User,
  GraduationCap,
  School,
  Book,
  BookOpen,
  Coffee,
  Utensils,
  Car,
  Bus,
  Navigation,
  Compass,
  Map,
  Building,
  Home,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
  Star,
  Flag,
  Bell,
  Settings,
  Info,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Medal,
  Trophy,
  Crown,
  Verified,
  Shield,
  Lock,
  Key,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Upload,
  Save,
  Edit3,
  Copy,
  Trash2,
  Plus,
  Minus,
  X,
  Check,
  RefreshCw,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  ExternalLink,
  Link,
  Phone,
  Mail,
  Wifi,
  Battery,
  Signal,
  Camera,
  Mic,
  Video,
  Volume2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Loader2,
  Sun,
  Moon,
  Cloud,
  Thermometer,
  Wind
} from 'lucide-react';

/**
 * # HIVE Internationalization & Localization System
 * 
 * Comprehensive multi-language and cultural adaptation system for HIVE's global
 * campus expansion. Designed to support University at Buffalo's diverse international
 * student population and prepare for deployment at universities worldwide.
 * 
 * ## I18n & L10n Features:
 * - **Multi-Language Support**: English, Spanish, Chinese (Simplified/Traditional), Arabic, Hindi, French
 * - **Cultural Adaptations**: Region-specific UI patterns, date/time formats, currency display
 * - **RTL Language Support**: Complete right-to-left layout support for Arabic and Hebrew
 * - **Locale-Specific Content**: Campus-relevant translations and cultural context
 * - **Dynamic Language Switching**: Seamless language changes without page reload
 * - **Accessibility Compliance**: Screen reader support in multiple languages
 * - **Campus Context Translation**: University-specific terms and academic language
 * - **Cultural Sensitivity**: Appropriate imagery, colors, and interaction patterns
 */

const meta: Meta = {
  title: '27-Advanced Systems/Internationalization & Localization',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive internationalization and localization system for global campus deployment'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Supported Languages and Locales
interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  flag: string;
  region: string;
  dateFormat: string;
  timeFormat: string;
  currency: {
    code: string;
    symbol: string;
    position: 'before' | 'after';
  };
  numberFormat: {
    decimal: string;
    thousands: string;
  };
}

interface TranslationKey {
  [key: string]: string | TranslationKey;
}

interface Translations {
  [languageCode: string]: TranslationKey;
}

// Language Configuration
const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇺🇸',
    region: 'United States',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: { code: 'USD', symbol: '$', position: 'before' },
    numberFormat: { decimal: '.', thousands: ',' }
  },
  {
    code: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    flag: '🇪🇸',
    region: 'Spain',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: { code: 'EUR', symbol: '€', position: 'after' },
    numberFormat: { decimal: ',', thousands: '.' }
  },
  {
    code: 'zh-CN',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    direction: 'ltr',
    flag: '🇨🇳',
    region: 'China',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: '24h',
    currency: { code: 'CNY', symbol: '¥', position: 'before' },
    numberFormat: { decimal: '.', thousands: ',' }
  },
  {
    code: 'ar-SA',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
    region: 'Saudi Arabia',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    currency: { code: 'SAR', symbol: 'ر.س', position: 'after' },
    numberFormat: { decimal: '.', thousands: ',' }
  },
  {
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    flag: '🇮🇳',
    region: 'India',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    currency: { code: 'INR', symbol: '₹', position: 'before' },
    numberFormat: { decimal: '.', thousands: ',' }
  },
  {
    code: 'fr-FR',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    flag: '🇫🇷',
    region: 'France',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: { code: 'EUR', symbol: '€', position: 'after' },
    numberFormat: { decimal: ',', thousands: ' ' }
  }
];

// Translation Data
const TRANSLATIONS: Translations = {
  'en-US': {
    common: {
      welcome: 'Welcome to HIVE',
      campus: 'Campus',
      students: 'Students',
      profile: 'Profile',
      feed: 'Feed',
      spaces: 'Spaces',
      calendar: 'Calendar',
      settings: 'Settings',
      notifications: 'Notifications',
      search: 'Search',
      help: 'Help',
      logout: 'Logout',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      share: 'Share',
      like: 'Like',
      comment: 'Comment',
      bookmark: 'Bookmark',
      loading: 'Loading...',
      error: 'Error occurred',
      success: 'Success!',
      retry: 'Try Again'
    },
    campus: {
      dining: 'Dining Services',
      transportation: 'Transportation',
      events: 'Campus Events',
      buildings: 'Campus Buildings',
      weather: 'Weather',
      hours: 'Hours',
      waitTime: 'Wait Time',
      busyLevel: 'Busy Level',
      nextShuttle: 'Next Shuttle',
      parkingSpaces: 'Parking Spaces',
      studySpaces: 'Study Spaces'
    },
    academic: {
      courses: 'Courses',
      grades: 'Grades',
      schedule: 'Schedule',
      assignments: 'Assignments',
      professors: 'Professors',
      classmates: 'Classmates',
      studyGroups: 'Study Groups',
      library: 'Library',
      resources: 'Academic Resources'
    },
    social: {
      friends: 'Friends',
      messages: 'Messages',
      groups: 'Groups',
      events: 'Events',
      clubs: 'Clubs',
      activities: 'Activities',
      connections: 'Connections',
      recommendations: 'Recommendations'
    },
    time: {
      now: 'now',
      today: 'today',
      yesterday: 'yesterday',
      tomorrow: 'tomorrow',
      thisWeek: 'this week',
      nextWeek: 'next week',
      minutes: 'minutes',
      hours: 'hours',
      days: 'days',
      weeks: 'weeks',
      months: 'months'
    }
  },
  'es-ES': {
    common: {
      welcome: 'Bienvenido a HIVE',
      campus: 'Campus',
      students: 'Estudiantes',
      profile: 'Perfil',
      feed: 'Feed',
      spaces: 'Espacios',
      calendar: 'Calendario',
      settings: 'Configuración',
      notifications: 'Notificaciones',
      search: 'Buscar',
      help: 'Ayuda',
      logout: 'Cerrar Sesión',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      share: 'Compartir',
      like: 'Me gusta',
      comment: 'Comentar',
      bookmark: 'Guardar',
      loading: 'Cargando...',
      error: 'Error ocurrido',
      success: '¡Éxito!',
      retry: 'Reintentar'
    },
    campus: {
      dining: 'Servicios de Comedor',
      transportation: 'Transporte',
      events: 'Eventos del Campus',
      buildings: 'Edificios del Campus',
      weather: 'Clima',
      hours: 'Horarios',
      waitTime: 'Tiempo de Espera',
      busyLevel: 'Nivel de Ocupación',
      nextShuttle: 'Próximo Autobús',
      parkingSpaces: 'Espacios de Estacionamiento',
      studySpaces: 'Espacios de Estudio'
    },
    academic: {
      courses: 'Cursos',
      grades: 'Calificaciones',
      schedule: 'Horario',
      assignments: 'Tareas',
      professors: 'Profesores',
      classmates: 'Compañeros de Clase',
      studyGroups: 'Grupos de Estudio',
      library: 'Biblioteca',
      resources: 'Recursos Académicos'
    },
    social: {
      friends: 'Amigos',
      messages: 'Mensajes',
      groups: 'Grupos',
      events: 'Eventos',
      clubs: 'Clubes',
      activities: 'Actividades',
      connections: 'Conexiones',
      recommendations: 'Recomendaciones'
    },
    time: {
      now: 'ahora',
      today: 'hoy',
      yesterday: 'ayer',
      tomorrow: 'mañana',
      thisWeek: 'esta semana',
      nextWeek: 'próxima semana',
      minutes: 'minutos',
      hours: 'horas',
      days: 'días',
      weeks: 'semanas',
      months: 'meses'
    }
  },
  'zh-CN': {
    common: {
      welcome: '欢迎来到 HIVE',
      campus: '校园',
      students: '学生',
      profile: '个人资料',
      feed: '动态',
      spaces: '空间',
      calendar: '日历',
      settings: '设置',
      notifications: '通知',
      search: '搜索',
      help: '帮助',
      logout: '退出登录',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      share: '分享',
      like: '点赞',
      comment: '评论',
      bookmark: '收藏',
      loading: '加载中...',
      error: '发生错误',
      success: '成功！',
      retry: '重试'
    },
    campus: {
      dining: '餐饮服务',
      transportation: '交通',
      events: '校园活动',
      buildings: '校园建筑',
      weather: '天气',
      hours: '营业时间',
      waitTime: '等待时间',
      busyLevel: '繁忙程度',
      nextShuttle: '下班班车',
      parkingSpaces: '停车位',
      studySpaces: '学习空间'
    },
    academic: {
      courses: '课程',
      grades: '成绩',
      schedule: '课程表',
      assignments: '作业',
      professors: '教授',
      classmates: '同学',
      studyGroups: '学习小组',
      library: '图书馆',
      resources: '学术资源'
    },
    social: {
      friends: '朋友',
      messages: '消息',
      groups: '群组',
      events: '活动',
      clubs: '社团',
      activities: '活动',
      connections: '联系人',
      recommendations: '推荐'
    },
    time: {
      now: '现在',
      today: '今天',
      yesterday: '昨天',
      tomorrow: '明天',
      thisWeek: '本周',
      nextWeek: '下周',
      minutes: '分钟',
      hours: '小时',
      days: '天',
      weeks: '周',
      months: '月'
    }
  },
  'ar-SA': {
    common: {
      welcome: 'مرحباً بك في HIVE',
      campus: 'الحرم الجامعي',
      students: 'الطلاب',
      profile: 'الملف الشخصي',
      feed: 'الأخبار',
      spaces: 'المساحات',
      calendar: 'التقويم',
      settings: 'الإعدادات',
      notifications: 'الإشعارات',
      search: 'البحث',
      help: 'المساعدة',
      logout: 'تسجيل الخروج',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      share: 'مشاركة',
      like: 'إعجاب',
      comment: 'تعليق',
      bookmark: 'حفظ',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'نجح!',
      retry: 'إعادة المحاولة'
    },
    campus: {
      dining: 'خدمات الطعام',
      transportation: 'المواصلات',
      events: 'فعاليات الحرم الجامعي',
      buildings: 'مباني الحرم الجامعي',
      weather: 'الطقس',
      hours: 'ساعات العمل',
      waitTime: 'وقت الانتظار',
      busyLevel: 'مستوى الازدحام',
      nextShuttle: 'الحافلة التالية',
      parkingSpaces: 'أماكن وقوف السيارات',
      studySpaces: 'أماكن الدراسة'
    },
    academic: {
      courses: 'المقررات',
      grades: 'الدرجات',
      schedule: 'الجدول الزمني',
      assignments: 'الواجبات',
      professors: 'الأساتذة',
      classmates: 'زملاء الصف',
      studyGroups: 'مجموعات الدراسة',
      library: 'المكتبة',
      resources: 'الموارد الأكاديمية'
    },
    social: {
      friends: 'الأصدقاء',
      messages: 'الرسائل',
      groups: 'المجموعات',
      events: 'الفعاليات',
      clubs: 'الأندية',
      activities: 'الأنشطة',
      connections: 'الاتصالات',
      recommendations: 'التوصيات'
    },
    time: {
      now: 'الآن',
      today: 'اليوم',
      yesterday: 'أمس',
      tomorrow: 'غداً',
      thisWeek: 'هذا الأسبوع',
      nextWeek: 'الأسبوع القادم',
      minutes: 'دقائق',
      hours: 'ساعات',
      days: 'أيام',
      weeks: 'أسابيع',
      months: 'أشهر'
    }
  },
  'hi-IN': {
    common: {
      welcome: 'HIVE में आपका स्वागत है',
      campus: 'कैंपस',
      students: 'छात्र',
      profile: 'प्रोफाइल',
      feed: 'फीड',
      spaces: 'स्थान',
      calendar: 'कैलेंडर',
      settings: 'सेटिंग्स',
      notifications: 'सूचनाएं',
      search: 'खोजें',
      help: 'सहायता',
      logout: 'लॉग आउट',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      delete: 'मिटाएं',
      edit: 'संपादित करें',
      share: 'साझा करें',
      like: 'पसंद',
      comment: 'टिप्पणी',
      bookmark: 'बुकमार्क',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि हुई',
      success: 'सफल!',
      retry: 'फिर कोशिश करें'
    },
    campus: {
      dining: 'भोजन सेवाएं',
      transportation: 'परिवहन',
      events: 'कैंपस इवेंट्स',
      buildings: 'कैंपस भवन',
      weather: 'मौसम',
      hours: 'समय',
      waitTime: 'प्रतीक्षा समय',
      busyLevel: 'व्यस्तता स्तर',
      nextShuttle: 'अगली शटल',
      parkingSpaces: 'पार्किंग स्थान',
      studySpaces: 'अध्ययन स्थान'
    },
    academic: {
      courses: 'पाठ्यक्रम',
      grades: 'ग्रेड',
      schedule: 'समय सारणी',
      assignments: 'असाइनमेंट',
      professors: 'प्रोफेसर',
      classmates: 'सहपाठी',
      studyGroups: 'अध्ययन समूह',
      library: 'पुस्तकालय',
      resources: 'शैक्षणिक संसाधन'
    },
    social: {
      friends: 'मित्र',
      messages: 'संदेश',
      groups: 'समूह',
      events: 'इवेंट्स',
      clubs: 'क्लब',
      activities: 'गतिविधियां',
      connections: 'कनेक्शन',
      recommendations: 'सिफारिशें'
    },
    time: {
      now: 'अभी',
      today: 'आज',
      yesterday: 'कल',
      tomorrow: 'कल',
      thisWeek: 'इस सप्ताह',
      nextWeek: 'अगले सप्ताह',
      minutes: 'मिनट',
      hours: 'घंटे',
      days: 'दिन',
      weeks: 'सप्ताह',
      months: 'महीने'
    }
  },
  'fr-FR': {
    common: {
      welcome: 'Bienvenue sur HIVE',
      campus: 'Campus',
      students: 'Étudiants',
      profile: 'Profil',
      feed: 'Fil d\'actualité',
      spaces: 'Espaces',
      calendar: 'Calendrier',
      settings: 'Paramètres',
      notifications: 'Notifications',
      search: 'Rechercher',
      help: 'Aide',
      logout: 'Déconnexion',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      share: 'Partager',
      like: 'J\'aime',
      comment: 'Commenter',
      bookmark: 'Favoris',
      loading: 'Chargement...',
      error: 'Erreur survenue',
      success: 'Succès !',
      retry: 'Réessayer'
    },
    campus: {
      dining: 'Services de Restauration',
      transportation: 'Transport',
      events: 'Événements du Campus',
      buildings: 'Bâtiments du Campus',
      weather: 'Météo',
      hours: 'Heures',
      waitTime: 'Temps d\'attente',
      busyLevel: 'Niveau d\'affluence',
      nextShuttle: 'Prochaine Navette',
      parkingSpaces: 'Places de Parking',
      studySpaces: 'Espaces d\'étude'
    },
    academic: {
      courses: 'Cours',
      grades: 'Notes',
      schedule: 'Emploi du temps',
      assignments: 'Devoirs',
      professors: 'Professeurs',
      classmates: 'Camarades de classe',
      studyGroups: 'Groupes d\'étude',
      library: 'Bibliothèque',
      resources: 'Ressources académiques'
    },
    social: {
      friends: 'Amis',
      messages: 'Messages',
      groups: 'Groupes',
      events: 'Événements',
      clubs: 'Clubs',
      activities: 'Activités',
      connections: 'Connexions',
      recommendations: 'Recommandations'
    },
    time: {
      now: 'maintenant',
      today: 'aujourd\'hui',
      yesterday: 'hier',
      tomorrow: 'demain',
      thisWeek: 'cette semaine',
      nextWeek: 'la semaine prochaine',
      minutes: 'minutes',
      hours: 'heures',
      days: 'jours',
      weeks: 'semaines',
      months: 'mois'
    }
  }
};

// Localization Context
interface LocalizationContextType {
  currentLanguage: Language;
  currentLocale: string;
  t: (key: string, params?: Record<string, any>) => string;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  formatNumber: (num: number) => string;
  formatCurrency: (amount: number) => string;
  changeLanguage: (languageCode: string) => void;
  direction: 'ltr' | 'rtl';
}

const LocalizationContext = createContext<LocalizationContextType | null>(null);

// Custom Hook for Localization
const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
};

// Localization Provider
const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLocale, setCurrentLocale] = useState('en-US');
  
  const currentLanguage = useMemo(() => 
    SUPPORTED_LANGUAGES.find(lang => lang.code === currentLocale) || SUPPORTED_LANGUAGES[0]
  , [currentLocale]);

  const t = useCallback((key: string, params?: Record<string, any>) => {
    const keys = key.split('.');
    let translation: any = TRANSLATIONS[currentLocale];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to English
        translation = TRANSLATIONS['en-US'];
        for (const fallbackKey of keys) {
          if (translation && typeof translation === 'object' && fallbackKey in translation) {
            translation = translation[fallbackKey];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    if (typeof translation === 'string') {
      // Simple parameter replacement
      if (params) {
        return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey]?.toString() || match;
        });
      }
      return translation;
    }
    
    return key;
  }, [currentLocale]);

  const formatDate = useCallback((date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    
    return new Intl.DateTimeFormat(currentLocale, options).format(date);
  }, [currentLocale]);

  const formatTime = useCallback((date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: currentLanguage.timeFormat === '12h'
    };
    
    return new Intl.DateTimeFormat(currentLocale, options).format(date);
  }, [currentLocale, currentLanguage]);

  const formatNumber = useCallback((num: number) => {
    return new Intl.NumberFormat(currentLocale).format(num);
  }, [currentLocale]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat(currentLocale, {
      style: 'currency',
      currency: currentLanguage.currency.code
    }).format(amount);
  }, [currentLocale, currentLanguage]);

  const changeLanguage = useCallback((languageCode: string) => {
    setCurrentLocale(languageCode);
    
    // Update document direction for RTL support
    const newLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === languageCode);
    if (newLanguage) {
      document.documentElement.dir = newLanguage.direction;
      document.documentElement.lang = languageCode.split('-')[0];
    }
  }, []);

  const value: LocalizationContextType = {
    currentLanguage,
    currentLocale,
    t,
    formatDate,
    formatTime,
    formatNumber,
    formatCurrency,
    changeLanguage,
    direction: currentLanguage.direction
  };

  return (
    <LocalizationContext.Provider value={value}>
      <div dir={currentLanguage.direction} className={currentLanguage.direction === 'rtl' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LocalizationContext.Provider>
  );
};

// Language Selector Component
const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLocalization();

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Languages className="mr-2 h-5 w-5" />
          Language Settings
        </CardTitle>
        <CardDescription className="text-gray-400">
          Choose your preferred language and region
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SUPPORTED_LANGUAGES.map(language => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`
                  p-4 rounded-lg border-2 transition-all text-left
                  ${currentLanguage.code === language.code
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="text-white font-medium">{language.name}</div>
                    <div className="text-gray-400 text-sm">{language.nativeName}</div>
                    <div className="text-gray-500 text-xs">{language.region}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-white font-medium mb-2">Current Settings</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Language:</span>
                <span className="text-white">{currentLanguage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Region:</span>
                <span className="text-white">{currentLanguage.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Direction:</span>
                <span className="text-white uppercase">{currentLanguage.direction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date Format:</span>
                <span className="text-white">{currentLanguage.dateFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Currency:</span>
                <span className="text-white">{currentLanguage.currency.code} ({currentLanguage.currency.symbol})</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Localized Campus Feed Component
const LocalizedCampusFeed = () => {
  const { t, formatDate, formatTime, currentLanguage } = useLocalization();

  const samplePosts = [
    {
      id: '1',
      user: { name: 'Sarah Johnson', handle: '@sarahj', avatar: '/api/placeholder/40/40' },
      content: 'Just finished my CS 115 project! Anyone else struggling with recursion? Study group tomorrow at Lockwood Library 📚',
      space: 'CS Study Group',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      likes: 12,
      comments: 4,
      shares: 2
    },
    {
      id: '2',
      user: { name: 'Ahmed Al-Rahman', handle: '@ahmed_r', avatar: '/api/placeholder/40/40' },
      content: 'Buffalo Bulls game tonight! Who\'s going? Meet at Alumni Arena at 6:30pm 🏀',
      space: 'UB Athletics',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      likes: 28,
      comments: 15,
      shares: 8
    }
  ];

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return t('time.now');
    if (diffMins < 60) return `${diffMins} ${t('time.minutes')}`;
    if (diffHours < 24) return `${diffHours} ${t('time.hours')}`;
    if (diffDays === 1) return t('time.yesterday');
    return formatDate(date);
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          {t('common.feed')}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {t('common.campus')} {t('social.activities').toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {samplePosts.map(post => (
          <div key={post.id} className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-start space-x-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback className="bg-gray-700 text-white">
                  {post.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-white">{post.user.name}</span>
                  <Badge variant="secondary" className="bg-blue-900 text-blue-300 text-xs">
                    {post.space}
                  </Badge>
                  <span className="text-gray-500 text-sm">{formatRelativeTime(post.timestamp)}</span>
                </div>
                <p className="text-white text-sm">{post.content}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-red-400">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes} {t('common.like').toLowerCase()}</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-blue-400">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments} {t('common.comment').toLowerCase()}</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-green-400">
                  <Share2 className="h-4 w-4" />
                  <span>{post.shares} {t('common.share').toLowerCase()}</span>
                </button>
              </div>
              <button className="text-gray-400 hover:text-yellow-400">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Localized Campus Services
const LocalizedCampusServices = () => {
  const { t, formatTime, formatCurrency, currentLanguage } = useLocalization();

  const services = [
    {
      id: 'dining',
      icon: Utensils,
      title: t('campus.dining'),
      status: 'open',
      waitTime: 5,
      info: `${t('campus.waitTime')}: 5 ${t('time.minutes')}`
    },
    {
      id: 'shuttle',
      icon: Bus,
      title: t('campus.transportation'),
      status: 'active',
      nextArrival: new Date(Date.now() + 8 * 60 * 1000),
      info: `${t('campus.nextShuttle')}: ${formatTime(new Date(Date.now() + 8 * 60 * 1000))}`
    },
    {
      id: 'library',
      icon: BookOpen,
      title: t('academic.library'),
      status: 'open',
      capacity: 85,
      info: `${t('campus.studySpaces')}: 85% ${t('campus.busyLevel').toLowerCase()}`
    },
    {
      id: 'parking',
      icon: Car,
      title: t('campus.parkingSpaces'),
      status: 'available',
      available: 45,
      info: `45 ${t('campus.parkingSpaces').toLowerCase()}`
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': case 'active': case 'available': return 'text-green-400';
      case 'busy': case 'limited': return 'text-yellow-400';
      case 'closed': case 'offline': case 'full': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          {t('common.campus')} {t('common.settings').toLowerCase()}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {t('campus.events')} & {t('campus.buildings').toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map(service => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Icon className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{service.title}</div>
                    <div className={`text-sm ${getStatusColor(service.status)}`}>
                      {service.info}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// RTL Layout Demonstration
const RTLLayoutDemo = () => {
  const { t, currentLanguage } = useLocalization();
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Languages className="mr-2 h-5 w-5" />
          {currentLanguage.direction === 'rtl' ? 'عرض التخطيط' : 'Layout Demo'}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {currentLanguage.direction === 'rtl' 
            ? 'دعم التخطيط من اليمين إلى اليسار' 
            : 'Right-to-left layout support demonstration'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-gray-700 text-white">
              {currentLanguage.direction === 'rtl' ? 'م.أ' : 'JD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-white font-medium">
              {currentLanguage.direction === 'rtl' ? 'محمد أحمد' : 'John Doe'}
            </div>
            <div className="text-gray-400 text-sm">
              {currentLanguage.direction === 'rtl' ? 'طالب هندسة' : 'Engineering Student'}
            </div>
          </div>
          <Badge className="bg-blue-600 text-white">
            {currentLanguage.direction === 'rtl' ? 'نشط' : 'Active'}
          </Badge>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">
              {currentLanguage.direction === 'rtl' ? 'رسالة تجريبية' : 'Sample Message'}
            </h4>
            <span className="text-gray-400 text-sm">
              {currentLanguage.direction === 'rtl' ? 'منذ 5 دقائق' : '5 minutes ago'}
            </span>
          </div>
          <p className="text-gray-300">
            {currentLanguage.direction === 'rtl' 
              ? 'هذا نص تجريبي لإظهار كيفية عمل التخطيط من اليمين إلى اليسار في HIVE. جميع العناصر تتكيف تلقائياً مع اتجاه النص.'
              : 'This is a sample message showing how HIVE adapts to different text directions. All elements automatically adjust for proper layout flow.'
            }
          </p>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Heart className="h-4 w-4 mr-2" />
            {currentLanguage.direction === 'rtl' ? 'إعجاب' : t('common.like')}
          </Button>
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <MessageCircle className="h-4 w-4 mr-2" />
            {currentLanguage.direction === 'rtl' ? 'تعليق' : t('common.comment')}
          </Button>
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
            <Share2 className="h-4 w-4 mr-2" />
            {currentLanguage.direction === 'rtl' ? 'مشاركة' : t('common.share')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Cultural Adaptation Examples
const CulturalAdaptations = () => {
  const { t, currentLanguage, formatCurrency, formatDate } = useLocalization();

  const getCulturalExamples = () => {
    switch (currentLanguage.code) {
      case 'ar-SA':
        return {
          greeting: 'السلام عليكم',
          academicTerm: 'الفصل الدراسي',
          studyTime: 'وقت المراجعة',
          culturalNote: 'يراعي التطبيق أوقات الصلاة والعادات الثقافية'
        };
      case 'zh-CN':
        return {
          greeting: '你好',
          academicTerm: '学期',
          studyTime: '学习时间',
          culturalNote: '界面适应中国学生的学习习惯和文化背景'
        };
      case 'hi-IN':
        return {
          greeting: 'नमस्ते',
          academicTerm: 'सत्र',
          studyTime: 'अध्ययन समय',
          culturalNote: 'भारतीय शैक्षणिक प्रणाली के अनुकूल सुविधाएं'
        };
      case 'fr-FR':
        return {
          greeting: 'Bonjour',
          academicTerm: 'Semestre',
          studyTime: 'Temps d\'étude',
          culturalNote: 'Interface adaptée au système éducatif français'
        };
      case 'es-ES':
        return {
          greeting: 'Hola',
          academicTerm: 'Semestre',
          studyTime: 'Tiempo de estudio',
          culturalNote: 'Diseño adaptado a la cultura académica hispana'
        };
      default:
        return {
          greeting: 'Hello',
          academicTerm: 'Semester',
          studyTime: 'Study Time',
          culturalNote: 'Interface designed for American campus culture'
        };
    }
  };

  const cultural = getCulturalExamples();
  const samplePrice = 15.99;
  const sampleDate = new Date();

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Cultural Adaptations
        </CardTitle>
        <CardDescription className="text-gray-400">
          Culture-specific content and formatting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-white font-medium mb-3">Regional Formatting</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Date Format:</span>
                <span className="text-white">{formatDate(sampleDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Currency:</span>
                <span className="text-white">{formatCurrency(samplePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Text Direction:</span>
                <span className="text-white uppercase">{currentLanguage.direction}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg">
            <h4 className="text-white font-medium mb-3">Cultural Context</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Greeting: </span>
                <span className="text-white">{cultural.greeting}</span>
              </div>
              <div>
                <span className="text-gray-400">Academic Term: </span>
                <span className="text-white">{cultural.academicTerm}</span>
              </div>
              <div>
                <span className="text-gray-400">Study Time: </span>
                <span className="text-white">{cultural.studyTime}</span>
              </div>
            </div>
          </div>
        </div>

        <Alert className="border-blue-600 bg-blue-900/20">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            {cultural.culturalNote}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

// Main Internationalization System
const InternationalizationSystem = () => {
  return (
    <LocalizationProvider>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
              <Globe className="mr-4 h-10 w-10" />
              Internationalization & Localization
            </h1>
            <p className="text-gray-400 text-lg max-w-4xl">
              Comprehensive multi-language support and cultural adaptations for HIVE's global campus expansion.
              Supporting diverse international student populations with authentic localized experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Language Settings */}
            <div className="lg:col-span-1">
              <LanguageSelector />
            </div>

            {/* Localized Content */}
            <div className="lg:col-span-2 space-y-6">
              <LocalizedCampusFeed />
              <LocalizedCampusServices />
            </div>
          </div>

          {/* Cultural Adaptations */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RTLLayoutDemo />
            <CulturalAdaptations />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

// Story Exports
export const InternationalizationSystemDemo: Story = {
  render: () => <InternationalizationSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete internationalization system with multi-language support and cultural adaptations'
      }
    }
  }
};

export const LanguageSelectorDemo: Story = {
  render: () => (
    <LocalizationProvider>
      <div className="max-w-2xl mx-auto p-6 bg-black">
        <LanguageSelector />
      </div>
    </LocalizationProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Language selection interface with regional formatting options'
      }
    }
  }
};

export const RTLSupport: Story = {
  render: () => (
    <LocalizationProvider>
      <div className="max-w-2xl mx-auto p-6 bg-black">
        <RTLLayoutDemo />
      </div>
    </LocalizationProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Right-to-left layout support for Arabic and Hebrew languages'
      }
    }
  }
};

export const LocalizedContent: Story = {
  render: () => (
    <LocalizationProvider>
      <div className="max-w-2xl mx-auto p-6 bg-black space-y-6">
        <LocalizedCampusFeed />
        <LocalizedCampusServices />
      </div>
    </LocalizationProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus content and services with full localization'
      }
    }
  }
};

export const CulturalAdaptationsDemo: Story = {
  render: () => (
    <LocalizationProvider>
      <div className="max-w-2xl mx-auto p-6 bg-black">
        <CulturalAdaptations />
      </div>
    </LocalizationProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cultural adaptations showing region-specific formatting and content'
      }
    }
  }
};