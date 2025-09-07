import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';
import { Switch } from '../../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  School,
  MapPin,
  Calendar,
  Clock,
  Users,
  Coffee,
  Car,
  Bus,
  Train,
  Plane,
  Navigation,
  Compass,
  Map,
  Building,
  Building2,
  Home,
  Store,
  Utensils,
  BookOpen,
  GraduationCap,
  Library,
  Microscope,
  Calculator,
  Palette,
  Music,
  Dumbbell,
  Trophy,
  Heart,
  Shield,
  Phone,
  Mail,
  Globe,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Bluetooth,
  Camera,
  Mic,
  Video,
  Volume2,
  Bell,
  BellOff,
  Settings,
  Info,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock3,
  Timer,
  Stopwatch,
  Calendar as CalendarIcon,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Thermometer,
  Wind,
  Umbrella,
  Sunrise,
  Sunset,
  Star,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Medal,
  Flag,
  Bookmark,
  Share2,
  MessageCircle,
  ThumbsUp,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Save,
  Edit3,
  Trash2,
  Copy,
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
  Unlink,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserPlus,
  UserMinus,
  Users2,
  Crown,
  Verified,
  Loader2
} from 'lucide-react';

/**
 * # HIVE Advanced Campus Integration System
 * 
 * Deep integration with University at Buffalo's campus systems, locations, 
 * services, and academic culture. Provides specialized features that make HIVE
 * the essential digital companion for UB student life, from academic tracking
 * to campus navigation and real-time service integration.
 * 
 * ## Campus Integration Features:
 * - **UB Academic System**: Course tracking, grade monitoring, academic calendar
 * - **Campus Navigation**: Interactive maps, building access, room finding
 * - **Dining Services**: Real-time hours, menus, nutrition info, wait times
 * - **Transportation**: Stampede shuttle tracking, parking availability, rideshare
 * - **Campus Events**: Academic calendar, club events, athletics, social activities
 * - **Student Services**: Health center, library, career services, financial aid
 * - **Weather & Safety**: Buffalo weather alerts, campus safety notifications
 * - **Academic Resources**: Study spaces, group booking, resource availability
 */

const meta: Meta<typeof React.Fragment> = {
  title: '26-Advanced Systems/Campus Integration',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Deep integration with University at Buffalo campus systems and services'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Data Structures
interface CampusBuilding {
  id: string;
  name: string;
  shortName: string;
  address: string;
  coordinates: { lat: number; lng: number };
  type: 'academic' | 'residential' | 'dining' | 'recreation' | 'administrative' | 'parking';
  hours?: { open: string; close: string; days: string[] };
  amenities: string[];
  accessLevel: 'public' | 'student' | 'restricted';
  floors: number;
  capacity?: number;
  currentOccupancy?: number;
}

interface DiningLocation {
  id: string;
  name: string;
  building: string;
  type: 'dining_hall' | 'cafe' | 'retail' | 'vending';
  hours: { day: string; open: string; close: string }[];
  menuUrl?: string;
  acceptsVisits: boolean;
  waitTime: number; // minutes
  busyLevel: 'low' | 'medium' | 'high';
  specialties: string[];
  dietary: string[]; // vegetarian, vegan, gluten-free, etc.
}

interface TransportService {
  id: string;
  name: string;
  type: 'shuttle' | 'bus' | 'metro' | 'bike_share' | 'rideshare';
  status: 'active' | 'delayed' | 'offline' | 'maintenance';
  routes?: {
    id: string;
    name: string;
    stops: string[];
    nextArrival: string;
    frequency: number; // minutes
  }[];
  location?: { lat: number; lng: number };
  capacity?: number;
  currentLoad?: number;
}

interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'social' | 'athletic' | 'cultural' | 'career' | 'health';
  startTime: Date;
  endTime: Date;
  location: {
    building: string;
    room?: string;
    coordinates?: { lat: number; lng: number };
  };
  organizer: {
    name: string;
    type: 'department' | 'club' | 'athletics' | 'student_life';
    contact?: string;
  };
  registrationRequired: boolean;
  capacity?: number;
  registered?: number;
  cost?: number;
  tags: string[];
}

interface WeatherData {
  current: {
    temperature: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    wind_direction: string;
    conditions: string;
    icon: string;
    visibility: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    conditions: string;
    icon: string;
    precipitation: number;
    wind: number;
  }>;
  alerts: Array<{
    id: string;
    type: 'winter_storm' | 'severe_weather' | 'heat' | 'air_quality';
    severity: 'minor' | 'moderate' | 'severe' | 'extreme';
    title: string;
    description: string;
    start: Date;
    end: Date;
  }>;
}

// Campus Integration Hook
const useCampusIntegration = () => {
  // Mock UB Campus Data
  const [buildings] = useState<CampusBuilding[]>([
    {
      id: 'capen-hall',
      name: 'Capen Hall',
      shortName: 'CAPEN',
      address: '12 Capen Hall, Buffalo, NY 14260',
      coordinates: { lat: 43.0006, lng: -78.7890 },
      type: 'academic',
      hours: { open: '7:00 AM', close: '10:00 PM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
      amenities: ['WiFi', 'Study Spaces', 'Computer Lab', 'Printing'],
      accessLevel: 'student',
      floors: 14,
      capacity: 2000,
      currentOccupancy: 1200
    },
    {
      id: 'student-union',
      name: 'Student Union',
      shortName: 'SU',
      address: '520 Lee Entrance, Buffalo, NY 14260',
      coordinates: { lat: 43.0015, lng: -78.7885 },
      type: 'administrative',
      hours: { open: '6:00 AM', close: '12:00 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      amenities: ['Dining', 'Study Spaces', 'Bookstore', 'ATM', 'WiFi', 'Events'],
      accessLevel: 'public',
      floors: 3,
      capacity: 3000,
      currentOccupancy: 800
    },
    {
      id: 'ellicott-complex',
      name: 'Ellicott Complex',
      shortName: 'ELLICOTT',
      address: 'Ellicott Complex, Buffalo, NY 14261',
      coordinates: { lat: 43.0025, lng: -78.7900 },
      type: 'residential',
      amenities: ['Dining', 'Laundry', 'Study Lounges', 'Recreation'],
      accessLevel: 'student',
      floors: 17,
      capacity: 4500,
      currentOccupancy: 4200
    },
    {
      id: 'lockwood-library',
      name: 'Lockwood Memorial Library',
      shortName: 'LOCKWOOD',
      address: '433 Capen Hall, Buffalo, NY 14260',
      coordinates: { lat: 43.0008, lng: -78.7888 },
      type: 'academic',
      hours: { open: '24 Hours', close: '24 Hours', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      amenities: ['24/7 Study', 'Group Rooms', 'Computers', 'Printing', 'Quiet Zones'],
      accessLevel: 'student',
      floors: 14,
      capacity: 1500,
      currentOccupancy: 900
    }
  ]);

  const [diningLocations] = useState<DiningLocation[]>([
    {
      id: 'crossroads-dining',
      name: 'Crossroads Dining Hall',
      building: 'Student Union',
      type: 'dining_hall',
      hours: [
        { day: 'Monday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Tuesday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Wednesday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Thursday', open: '7:00 AM', close: '10:00 PM' },
        { day: 'Friday', open: '7:00 AM', close: '8:00 PM' },
        { day: 'Saturday', open: '10:00 AM', close: '8:00 PM' },
        { day: 'Sunday', open: '10:00 AM', close: '10:00 PM' }
      ],
      acceptsVisits: true,
      waitTime: 5,
      busyLevel: 'medium',
      specialties: ['Pizza', 'Grill', 'Salad Bar', 'International'],
      dietary: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal']
    },
    {
      id: 'pistachio-joes',
      name: "Pistachio Joe's",
      building: 'Student Union',
      type: 'cafe',
      hours: [
        { day: 'Monday', open: '7:30 AM', close: '5:00 PM' },
        { day: 'Tuesday', open: '7:30 AM', close: '5:00 PM' },
        { day: 'Wednesday', open: '7:30 AM', close: '5:00 PM' },
        { day: 'Thursday', open: '7:30 AM', close: '5:00 PM' },
        { day: 'Friday', open: '7:30 AM', close: '3:00 PM' }
      ],
      acceptsVisits: true,
      waitTime: 2,
      busyLevel: 'low',
      specialties: ['Coffee', 'Pastries', 'Sandwiches', 'Light Meals'],
      dietary: ['Vegetarian', 'Dairy-Free Options']
    }
  ]);

  const [transportServices] = useState<TransportService[]>([
    {
      id: 'stampede-north',
      name: 'Stampede North Campus',
      type: 'shuttle',
      status: 'active',
      routes: [
        {
          id: 'north-loop',
          name: 'North Campus Loop',
          stops: ['Student Union', 'Ellicott Complex', 'Academic Spine', 'Athletics'],
          nextArrival: '3 min',
          frequency: 15
        }
      ],
      capacity: 40,
      currentLoad: 25
    },
    {
      id: 'stampede-south',
      name: 'Stampede South Campus',
      type: 'shuttle',
      status: 'active',
      routes: [
        {
          id: 'south-medical',
          name: 'South Campus Medical',
          stops: ['Medical School', 'Dental School', 'Pharmacy'],
          nextArrival: '8 min',
          frequency: 20
        }
      ],
      capacity: 35,
      currentLoad: 15
    },
    {
      id: 'nfta-metro',
      name: 'NFTA Metro Rail',
      type: 'metro',
      status: 'active',
      routes: [
        {
          id: 'university-station',
          name: 'University Station',
          stops: ['Downtown Buffalo', 'Delavan/Canisius', 'University'],
          nextArrival: '12 min',
          frequency: 15
        }
      ]
    }
  ]);

  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temperature: 28,
      feels_like: 22,
      humidity: 75,
      wind_speed: 12,
      wind_direction: 'NW',
      conditions: 'Snow Showers',
      icon: 'snow',
      visibility: 3
    },
    forecast: [
      { date: 'Today', high: 32, low: 18, conditions: 'Snow', icon: 'snow', precipitation: 80, wind: 15 },
      { date: 'Tomorrow', high: 28, low: 15, conditions: 'Cloudy', icon: 'cloudy', precipitation: 20, wind: 10 },
      { date: 'Wednesday', high: 35, low: 22, conditions: 'Sunny', icon: 'sunny', precipitation: 0, wind: 8 }
    ],
    alerts: [
      {
        id: 'winter-storm-1',
        type: 'winter_storm',
        severity: 'moderate',
        title: 'Winter Storm Watch',
        description: 'Heavy snow expected. 6-10 inches possible. Travel may be difficult.',
        start: new Date(),
        end: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    ]
  });

  const [campusEvents, setCampusEvents] = useState<CampusEvent[]>([
    {
      id: 'career-fair-1',
      title: 'Spring Career Fair',
      description: 'Connect with top employers and explore internship and job opportunities',
      category: 'career',
      startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000),
      location: { building: 'Student Union', room: 'Ballroom' },
      organizer: { name: 'Career Services', type: 'department', contact: 'career@buffalo.edu' },
      registrationRequired: true,
      capacity: 2000,
      registered: 856,
      cost: 0,
      tags: ['Career', 'Networking', 'Jobs', 'Internships']
    },
    {
      id: 'bulls-basketball',
      title: 'Bulls vs. Syracuse',
      description: 'UB Bulls take on Syracuse Orange in a crucial conference matchup',
      category: 'athletic',
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
      location: { building: 'Alumni Arena' },
      organizer: { name: 'UB Athletics', type: 'athletics', contact: 'tickets@buffalo.edu' },
      registrationRequired: true,
      capacity: 6100,
      registered: 4200,
      cost: 15,
      tags: ['Basketball', 'Bulls', 'Sports', 'Conference']
    }
  ]);

  return {
    buildings,
    diningLocations,
    transportServices,
    weatherData,
    campusEvents,
    setWeatherData,
    setCampusEvents
  };
};

// Campus Building Card
const CampusBuildingCard = ({ building }: { building: CampusBuilding }) => {
  const occupancyPercentage = building.capacity ? (building.currentOccupancy! / building.capacity) * 100 : 0;
  const getOccupancyColor = () => {
    if (occupancyPercentage < 50) return 'text-green-400';
    if (occupancyPercentage < 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBuildingIcon = () => {
    switch (building.type) {
      case 'academic': return <School className="h-5 w-5" />;
      case 'residential': return <Home className="h-5 w-5" />;
      case 'dining': return <Utensils className="h-5 w-5" />;
      case 'recreation': return <Dumbbell className="h-5 w-5" />;
      case 'administrative': return <Building2 className="h-5 w-5" />;
      case 'parking': return <Car className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };

  const getAccessIcon = () => {
    switch (building.accessLevel) {
      case 'public': return <Globe className="h-4 w-4 text-green-400" />;
      case 'student': return <GraduationCap className="h-4 w-4 text-blue-400" />;
      case 'restricted': return <Lock className="h-4 w-4 text-red-400" />;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-800 rounded-lg">
              {getBuildingIcon()}
            </div>
            <div>
              <CardTitle className="text-white text-lg">{building.name}</CardTitle>
              <CardDescription className="text-gray-400">{building.shortName}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getAccessIcon()}
            <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
              {building.type.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <MapPin className="h-4 w-4" />
          <span>{building.address}</span>
        </div>

        {building.hours && (
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-white">{building.hours.open} - {building.hours.close}</span>
          </div>
        )}

        {building.capacity && building.currentOccupancy && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Current Occupancy</span>
              <span className={`font-medium ${getOccupancyColor()}`}>
                {building.currentOccupancy}/{building.capacity}
              </span>
            </div>
            <Progress value={occupancyPercentage} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {building.amenities.slice(0, 4).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="border-gray-600 text-gray-300 text-xs">
              {amenity}
            </Badge>
          ))}
          {building.amenities.length > 4 && (
            <Badge variant="secondary" className="border-gray-600 text-gray-400 text-xs">
              +{building.amenities.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Dining Services Component
const DiningServicesPanel = ({ diningLocations }: { diningLocations: DiningLocation[] }) => {
  const getCurrentStatus = (location: DiningLocation) => {
    const now = new Date();
    const currentDay = now.toLocaleLString('en-US', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const todayHours = location.hours.find(h => h.day === currentDay);
    if (!todayHours) return 'closed';
    
    const [openHour, openMin] = todayHours.open.match(/\d+/g)?.map(Number) || [0, 0];
    const [closeHour, closeMin] = todayHours.close.match(/\d+/g)?.map(Number) || [23, 59];
    
    const openTime = openHour * 60 + openMin + (todayHours.open.includes('PM') && openHour !== 12 ? 12 * 60 : 0);
    const closeTime = closeHour * 60 + closeMin + (todayHours.close.includes('PM') && closeHour !== 12 ? 12 * 60 : 0);
    
    if (currentTime >= openTime && currentTime <= closeTime) return 'open';
    return 'closed';
  };

  const getBusyLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Utensils className="mr-2 h-5 w-5" />
          Campus Dining Services
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time dining information and wait times
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {diningLocations.map(location => (
          <div key={location.id} className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-white font-medium">{location.name}</h4>
                <p className="text-gray-400 text-sm">{location.building}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${getCurrentStatus(location) === 'open' ? 'bg-green-600' : 'bg-red-600'} text-white text-xs`}>
                  {getCurrentStatus(location)}
                </Badge>
                <Badge variant="secondary" className="border-gray-600 text-gray-300 text-xs">
                  {location.type.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <Timer className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-white">Wait: {location.waitTime} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className={`h-4 w-4 ${getBusyLevelColor(location.busyLevel)}`} />
                <span className={`text-sm capitalize ${getBusyLevelColor(location.busyLevel)}`}>
                  {location.busyLevel} busy
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-gray-400 text-sm">Specialties: </span>
                <span className="text-white text-sm">{location.specialties.join(', ')}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {location.dietary.map((diet, index) => (
                  <Badge key={index} variant="secondary" className="border-green-600 text-green-300 text-xs">
                    {diet}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Transportation Hub
const TransportationHub = ({ services }: { services: TransportService[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'delayed': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      case 'maintenance': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'shuttle': return <Bus className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'metro': return <Train className="h-5 w-5" />;
      case 'bike_share': return <Navigation className="h-5 w-5" />;
      case 'rideshare': return <Car className="h-5 w-5" />;
      default: return <Navigation className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Navigation className="mr-2 h-5 w-5" />
          Campus Transportation
        </CardTitle>
        <CardDescription className="text-gray-400">
          Live shuttle tracking and transit information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map(service => (
          <div key={service.id} className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-700 rounded-lg">
                  {getTransportIcon(service.type)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{service.name}</h4>
                  <p className={`text-sm capitalize ${getStatusColor(service.status)}`}>
                    {service.status}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                {service.type.replace('_', ' ')}
              </Badge>
            </div>

            {service.capacity && service.currentLoad && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-400">Capacity</span>
                  <span className="text-white">{service.currentLoad}/{service.capacity}</span>
                </div>
                <Progress value={(service.currentLoad / service.capacity) * 100} className="h-2" />
              </div>
            )}

            {service.routes && (
              <div className="space-y-3">
                {service.routes.map(route => (
                  <div key={route.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{route.name}</span>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400 font-medium text-sm">{route.nextArrival}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Stops: {route.stops.join(' → ')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Every {route.frequency} minutes
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Buffalo Weather Widget
const BuffaloWeatherWidget = ({ weather }: { weather: WeatherData }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': case 'clear': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy': case 'overcast': return <Cloud className="h-8 w-8 text-gray-400" />;
      case 'rain': case 'showers': return <CloudRain className="h-8 w-8 text-blue-400" />;
      case 'snow': case 'snow showers': return <CloudSnow className="h-8 w-8 text-blue-200" />;
      default: return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor': return 'border-yellow-600 bg-yellow-900/20';
      case 'moderate': return 'border-orange-600 bg-orange-900/20';
      case 'severe': return 'border-red-600 bg-red-900/20';
      case 'extreme': return 'border-purple-600 bg-purple-900/20';
      default: return 'border-gray-600 bg-gray-900/20';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Thermometer className="mr-2 h-5 w-5" />
          Buffalo Weather
        </CardTitle>
        <CardDescription className="text-gray-400">
          Current conditions and campus alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.current.conditions)}
            <div>
              <div className="text-3xl font-bold text-white">{weather.current.temperature}°F</div>
              <div className="text-sm text-gray-400">Feels like {weather.current.feels_like}°F</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-medium">{weather.current.conditions}</div>
            <div className="text-sm text-gray-400">
              {weather.current.wind_direction} {weather.current.wind_speed} mph
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-400">Humidity</div>
            <div className="text-white font-medium">{weather.current.humidity}%</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-400">Wind</div>
            <div className="text-white font-medium">{weather.current.wind_speed} mph</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-sm text-gray-400">Visibility</div>
            <div className="text-white font-medium">{weather.current.visibility} mi</div>
          </div>
        </div>

        {/* Forecast */}
        <div className="space-y-2">
          <h4 className="text-white font-medium">3-Day Forecast</h4>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(day.conditions)}
                  <div>
                    <div className="text-white font-medium">{day.date}</div>
                    <div className="text-sm text-gray-400">{day.conditions}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white">{day.high}°/{day.low}°</div>
                  <div className="text-sm text-blue-400">{day.precipitation}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        {weather.alerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white font-medium flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
              Weather Alerts
            </h4>
            {weather.alerts.map(alert => (
              <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-white">{alert.title}</AlertTitle>
                <AlertDescription className="text-gray-300">
                  {alert.description}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Campus Events Feed
const CampusEventsFeed = ({ events }: { events: CampusEvent[] }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <GraduationCap className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      case 'athletic': return <Trophy className="h-4 w-4" />;
      case 'cultural': return <Palette className="h-4 w-4" />;
      case 'career': return <Target className="h-4 w-4" />;
      case 'health': return <Heart className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-600';
      case 'social': return 'bg-purple-600';
      case 'athletic': return 'bg-red-600';
      case 'cultural': return 'bg-pink-600';
      case 'career': return 'bg-green-600';
      case 'health': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Upcoming Campus Events
        </CardTitle>
        <CardDescription className="text-gray-400">
          Academic, social, and athletic events at UB
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Badge className={`${getCategoryColor(event.category)} text-white text-xs`}>
                    <span className="mr-1">{getCategoryIcon(event.category)}</span>
                    {event.category}
                  </Badge>
                  <span className="text-gray-400 text-sm">{event.organizer.name}</span>
                </div>
                <h4 className="text-white font-medium mb-1">{event.title}</h4>
                <p className="text-gray-300 text-sm mb-2">{event.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-white">{formatDate(event.startTime)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-white">
                  {event.location.building} {event.location.room && `- ${event.location.room}`}
                </span>
              </div>
              {event.capacity && (
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-white">{event.registered || 0}/{event.capacity}</span>
                </div>
              )}
              {event.cost !== undefined && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-white">{event.cost === 0 ? 'Free' : `$${event.cost}`}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {event.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="border-gray-600 text-gray-400 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                {event.registrationRequired && (
                  <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Register
                  </Button>
                )}
                <Button size="sm" variant="secondary" className="border-gray-600 text-gray-300">
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Campus Integration Dashboard
const CampusIntegrationDashboard = () => {
  const campus = useCampusIntegration();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <School className="mr-4 h-10 w-10" />
            Advanced Campus Integration
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl">
            Deep integration with University at Buffalo's campus systems, services, and academic culture.
            Your essential digital companion for UB campus life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Campus Services */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campus Buildings */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Campus Buildings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campus.buildings.map(building => (
                  <CampusBuildingCard key={building.id} building={building} />
                ))}
              </div>
            </div>

            {/* Campus Events */}
            <CampusEventsFeed events={campus.campusEvents} />
          </div>

          {/* Side Services */}
          <div className="lg:col-span-1 space-y-6">
            <BuffaloWeatherWidget weather={campus.weatherData} />
            <DiningServicesPanel diningLocations={campus.diningLocations} />
            <TransportationHub services={campus.transportServices} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Story Exports
export const CampusIntegrationSystem: Story = {
  render: () => <CampusIntegrationDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'Complete University at Buffalo campus integration with real-time services and academic features'
      }
    }
  }
};

export const CampusBuildings: Story = {
  render: () => {
    const campus = useCampusIntegration();
    return (
      <div className="max-w-4xl mx-auto p-6 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campus.buildings.map(building => (
            <CampusBuildingCard key={building.id} building={building} />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive campus building directory with real-time occupancy and amenities'
      }
    }
  }
};

export const DiningServices: Story = {
  render: () => {
    const campus = useCampusIntegration();
    return (
      <div className="max-w-md mx-auto p-6 bg-black">
        <DiningServicesPanel diningLocations={campus.diningLocations} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time campus dining information with wait times and dietary options'
      }
    }
  }
};

export const BuffaloWeather: Story = {
  render: () => {
    const campus = useCampusIntegration();
    return (
      <div className="max-w-md mx-auto p-6 bg-black">
        <BuffaloWeatherWidget weather={campus.weatherData} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Buffalo-specific weather information with campus safety alerts'
      }
    }
  }
};

export const Transportation: Story = {
  render: () => {
    const campus = useCampusIntegration();
    return (
      <div className="max-w-md mx-auto p-6 bg-black">
        <TransportationHub services={campus.transportServices} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Live campus transportation tracking with Stampede shuttle and NFTA integration'
      }
    }
  }
};

export const CampusEvents: Story = {
  render: () => {
    const campus = useCampusIntegration();
    return (
      <div className="max-w-2xl mx-auto p-6 bg-black">
        <CampusEventsFeed events={campus.campusEvents} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive campus events feed with academic, social, and athletic activities'
      }
    }
  }
};
