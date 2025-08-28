import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { 
  School,
  MapPin,
  Calendar,
  Clock,
  Users,
  Trophy,
  Thermometer,
  CloudRain,
  Sun,
  Wind,
  Utensils,
  Bus,
  Car,
  Wifi,
  Zap,
  Activity,
  BookOpen,
  Building,
  Home,
  GraduationCap,
  Star,
  Heart,
  MessageCircle,
  Share2,
  ArrowRight,
  ExternalLink,
  Bell,
  AlertCircle,
  CheckCircle,
  Coffee,
  Gamepad2,
  Music,
  Camera,
  Trees,
  Dumbbell,
  ShoppingBag,
  Phone,
  Mail
} from 'lucide-react';

/**
 * # HIVE Campus-Specific Features System
 * 
 * University at Buffalo-focused features and integrations that make HIVE feel native
 * to the UB experience. These components showcase campus life, local resources,
 * and community-specific functionality that enhances student engagement.
 * 
 * ## Key Features:
 * - **Campus Directory**: UB buildings, facilities, and location finder
 * - **Academic Integration**: Course-specific spaces and study resources
 * - **Housing Communities**: Dorm-specific features and neighborhood connections
 * - **Campus Events**: UB calendar integration and event discovery
 * - **Local Resources**: Buffalo area restaurants, activities, and services
 * - **Weather Integration**: Buffalo weather with campus-specific alerts
 */

const meta: Meta = {
  title: '14-Live Frontend/Campus-Specific Features System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'UB-specific features and campus integrations for the HIVE platform'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Mock UB Data
const UB_BUILDINGS = [
  {
    id: 'lockwood',
    name: 'Lockwood Memorial Library',
    type: 'Academic',
    location: 'North Campus',
    coordinates: { lat: 43.0015, lng: -78.7874 },
    hours: 'Mon-Thu: 8am-2am, Fri: 8am-6pm, Sat: 10am-6pm, Sun: 10am-2am',
    amenities: ['Study Rooms', 'Computer Labs', 'Printing', 'Cafe', 'WiFi'],
    crowdLevel: 'moderate',
    description: 'Main campus library with extensive study spaces and research resources'
  },
  {
    id: 'student-union',
    name: 'Student Union',
    type: 'Student Life',
    location: 'North Campus',
    coordinates: { lat: 43.0026, lng: -78.7871 },
    hours: 'Mon-Sun: 7am-11pm',
    amenities: ['Food Court', 'Meeting Rooms', 'ATM', 'Bookstore', 'Game Room'],
    crowdLevel: 'busy',
    description: 'Central hub for student activities, dining, and campus services'
  },
  {
    id: 'alumni-arena',
    name: 'Alumni Arena',
    type: 'Athletics',
    location: 'North Campus',
    coordinates: { lat: 43.0051, lng: -78.7897 },
    hours: 'Varies by event',
    amenities: ['Basketball Court', 'Concessions', 'Box Office'],
    crowdLevel: 'varies',
    description: 'Home of UB Bulls basketball and major campus events'
  }
];

const UB_DINING = [
  {
    id: 'su-food-court',
    name: 'Student Union Food Court',
    type: 'On-Campus',
    location: 'Student Union',
    hours: 'Mon-Fri: 7am-10pm, Sat-Sun: 11am-10pm',
    options: ['Pizza', 'Asian', 'Sandwiches', 'Salads', 'Coffee'],
    acceptsDiningDollars: true,
    rating: 4.2,
    priceRange: '$'
  },
  {
    id: 'wegmans',
    name: 'Wegmans',
    type: 'Grocery',
    location: 'Amherst (5 min drive)',
    hours: 'Daily: 6am-12am',
    services: ['Grocery', 'Pharmacy', 'Cafe', 'Prepared Foods'],
    acceptsDiningDollars: false,
    rating: 4.7,
    priceRange: '$$'
  }
];

const UB_EVENTS = [
  {
    id: 'homecoming-2024',
    title: 'UB Homecoming Weekend',
    date: '2024-10-12T18:00:00Z',
    endDate: '2024-10-14T23:59:59Z',
    location: 'North Campus',
    type: 'University',
    attendees: 2847,
    description: 'Join us for a weekend of Bulls pride with alumni, games, and campus celebration!',
    tags: ['bulls', 'alumni', 'athletics', 'tradition']
  },
  {
    id: 'career-fair-fall',
    title: 'Fall Career Fair',
    date: '2024-09-25T10:00:00Z',
    endDate: '2024-09-25T16:00:00Z',
    location: 'Student Union Ballroom',
    type: 'Academic',
    attendees: 1200,
    description: 'Connect with 150+ employers recruiting UB students for internships and full-time positions',
    tags: ['career', 'jobs', 'networking', 'professional']
  }
];

const BUFFALO_WEATHER = {
  current: {
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    icon: 'partly-cloudy'
  },
  forecast: [
    { day: 'Today', high: 75, low: 58, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
    { day: 'Tomorrow', high: 68, low: 52, condition: 'Rainy', icon: 'rainy' },
    { day: 'Thursday', high: 70, low: 55, condition: 'Sunny', icon: 'sunny' }
  ],
  campusAlert: {
    active: true,
    message: 'Snow expected tonight. Campus shuttle delays possible.',
    severity: 'moderate'
  }
};

// Campus Directory Component
const CampusDirectory = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<typeof UB_BUILDINGS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuildings = UB_BUILDINGS.filter(building =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    building.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'quiet': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'busy': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <School className="mr-3 h-6 w-6 text-blue-400" />
            UB Campus Directory
          </h2>
          <p className="text-gray-400 mt-1">Find buildings, hours, and amenities across campus</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          placeholder="Search buildings, facilities, or services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white pl-4"
        />
      </div>

      {/* Buildings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBuildings.map((building) => (
          <Card 
            key={building.id} 
            className="bg-gray-900 border-gray-800 cursor-pointer hover:border-blue-600 transition-colors"
            onClick={() => setSelectedBuilding(building)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{building.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="border-gray-700 text-gray-300">
                      {building.type}
                    </Badge>
                    <Badge variant="secondary" className="border-gray-700 text-gray-300">
                      {building.location}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className={`text-sm font-medium ${getCrowdColor(building.crowdLevel)}`}>
                    {building.crowdLevel}
                  </span>
                  <span className="text-xs text-gray-500">crowd level</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-3">{building.description}</p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="mr-2 h-4 w-4" />
                  {building.hours}
                </div>
                <div className="flex flex-wrap gap-1">
                  {building.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {building.amenities.length > 3 && (
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                      +{building.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Building Detail Modal */}
      {selectedBuilding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-gray-900 border-gray-800 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{selectedBuilding.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBuilding(null)}
                  className="text-gray-400"
                >
                  
                </Button>
              </CardTitle>
              <CardDescription className="text-gray-400">
                {selectedBuilding.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white text-sm font-medium">Location & Hours</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="mr-2 h-4 w-4" />
                      {selectedBuilding.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock className="mr-2 h-4 w-4" />
                      {selectedBuilding.hours}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-white text-sm font-medium">Current Status</Label>
                  <div className="mt-2">
                    <div className={`flex items-center text-sm ${getCrowdColor(selectedBuilding.crowdLevel)}`}>
                      <Activity className="mr-2 h-4 w-4" />
                      {selectedBuilding.crowdLevel.charAt(0).toUpperCase() + selectedBuilding.crowdLevel.slice(1)} crowd level
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white text-sm font-medium">Amenities & Services</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedBuilding.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="border-blue-700 text-blue-300">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>
                <Button variant="secondary" className="border-gray-700 text-gray-300">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Weather Widget Component
const BuffaloWeatherWidget = () => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-400" />;
      case 'partly-cloudy': return <Sun className="h-6 w-6 text-yellow-300" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-blue-400" />;
      default: return <Sun className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center text-lg">
          <Thermometer className="mr-2 h-5 w-5 text-blue-400" />
          Buffalo Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getWeatherIcon(BUFFALO_WEATHER.current.icon)}
            <div>
              <p className="text-2xl font-bold text-white">{BUFFALO_WEATHER.current.temperature}�F</p>
              <p className="text-sm text-gray-400">{BUFFALO_WEATHER.current.condition}</p>
            </div>
          </div>
          <div className="text-right text-sm text-gray-400">
            <div className="flex items-center">
              <Wind className="mr-1 h-3 w-3" />
              {BUFFALO_WEATHER.current.windSpeed} mph
            </div>
            <div className="flex items-center mt-1">
              =� {BUFFALO_WEATHER.current.humidity}%
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="grid grid-cols-3 gap-3">
          {BUFFALO_WEATHER.forecast.map((day) => (
            <div key={day.day} className="text-center p-2 bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">{day.day}</p>
              <div className="flex justify-center mb-1">
                {getWeatherIcon(day.icon)}
              </div>
              <p className="text-sm font-semibold text-white">{day.high}�</p>
              <p className="text-xs text-gray-400">{day.low}�</p>
            </div>
          ))}
        </div>

        {/* Campus Weather Alert */}
        {BUFFALO_WEATHER.campusAlert.active && (
          <Alert className="border-yellow-800 bg-yellow-900/20">
            <AlertCircle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200 text-sm">
              <strong>Campus Alert:</strong> {BUFFALO_WEATHER.campusAlert.message}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

// Campus Events Component
const CampusEvents = () => {
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      day: date.getDate(),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    };
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-purple-400" />
          Upcoming Campus Events
        </CardTitle>
        <CardDescription className="text-gray-400">
          Don't miss what's happening around UB
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {UB_EVENTS.map((event) => {
          const eventDate = formatEventDate(event.date);
          return (
            <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
              <div className="text-center min-w-12">
                <div className="bg-purple-600 text-white text-xs font-bold py-1 px-2 rounded-t">
                  {eventDate.month}
                </div>
                <div className="bg-white text-black text-lg font-bold py-1 px-2 rounded-b">
                  {eventDate.day}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold">{event.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="border-purple-700 text-purple-300">
                        {event.type}
                      </Badge>
                      <span className="text-sm text-gray-400 flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{eventDate.time}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Users className="mr-1 h-3 w-3" />
                      {event.attendees.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                      <Heart className="mr-1 h-3 w-3" />
                      Interested
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Attend
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        <Button variant="secondary" className="w-full border-gray-700 text-gray-300">
          View All Campus Events
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

// Dining & Local Component
const DiningAndLocal = () => {
  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  const getPriceColor = (range: string) => {
    switch (range) {
      case '$': return 'text-green-400';
      case '$$': return 'text-yellow-400';
      case '$$$': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Utensils className="mr-2 h-5 w-5 text-orange-400" />
          Dining & Local Spots
        </CardTitle>
        <CardDescription className="text-gray-400">
          Food options on campus and around Buffalo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {UB_DINING.map((place) => (
          <div key={place.id} className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-white font-semibold">{place.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="border-orange-700 text-orange-300">
                    {place.type}
                  </Badge>
                  <span className="text-sm text-gray-400 flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {place.location}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  {getRatingStars(place.rating)}
                  <span className="text-sm text-gray-400 ml-1">{place.rating}</span>
                </div>
                <span className={`text-sm font-semibold ${getPriceColor(place.priceRange)}`}>
                  {place.priceRange}
                </span>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-400 mb-3">
              <Clock className="mr-2 h-4 w-4" />
              {place.hours}
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {'options' in place ? place.options.map((option: string) => (
                <Badge key={option} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  {option}
                </Badge>
              )) : 'services' in place ? place.services.map((service: string) => (
                <Badge key={service} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  {service}
                </Badge>
              )) : null}
            </div>

            <div className="flex items-center justify-between">
              {place.acceptsDiningDollars && (
                <div className="flex items-center text-sm text-green-400">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Accepts Dining Dollars
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                  <MapPin className="mr-1 h-3 w-3" />
                  Directions
                </Button>
                <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Menu
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button variant="secondary" className="w-full border-gray-700 text-gray-300">
          Explore More Local Spots
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

// Transportation Component
const CampusTransportation = () => {
  const shuttleRoutes = [
    { name: 'North Campus Circle', nextArrival: '3 min', status: 'On Time' },
    { name: 'South Campus Express', nextArrival: '8 min', status: 'Delayed' },
    { name: 'Downtown Connector', nextArrival: '12 min', status: 'On Time' }
  ];

  const parkingAreas = [
    { name: 'Lot A1 (Student Union)', availability: 23, total: 150, type: 'Student' },
    { name: 'Lot B2 (Academic Spine)', availability: 8, total: 200, type: 'Faculty/Staff' },
    { name: 'Lot C3 (Alumni Arena)', availability: 45, total: 100, type: 'Event' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time': return 'text-green-400';
      case 'Delayed': return 'text-yellow-400';
      case 'Offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAvailabilityColor = (percentage: number) => {
    if (percentage > 50) return 'text-green-400';
    if (percentage > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Shuttle Tracker */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bus className="mr-2 h-5 w-5 text-blue-400" />
            Campus Shuttle
          </CardTitle>
          <CardDescription className="text-gray-400">
            Real-time shuttle tracking and arrivals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {shuttleRoutes.map((route, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="text-white font-medium">{route.name}</p>
                <p className={`text-sm ${getStatusColor(route.status)}`}>
                  {route.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-400">{route.nextArrival}</p>
                <p className="text-xs text-gray-500">next arrival</p>
              </div>
            </div>
          ))}
          <Button variant="secondary" className="w-full border-gray-700 text-gray-300">
            <Activity className="mr-2 h-4 w-4" />
            Track Live Location
          </Button>
        </CardContent>
      </Card>

      {/* Parking Availability */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Car className="mr-2 h-5 w-5 text-green-400" />
            Parking Availability
          </CardTitle>
          <CardDescription className="text-gray-400">
            Current parking availability across campus
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {parkingAreas.map((area, index) => {
            const percentage = (area.availability / area.total) * 100;
            return (
              <div key={index} className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-medium">{area.name}</p>
                    <Badge variant="secondary" className="border-gray-700 text-gray-300 text-xs">
                      {area.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getAvailabilityColor(percentage)}`}>
                      {area.availability}
                    </p>
                    <p className="text-xs text-gray-500">spots available</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      percentage > 50 ? 'bg-green-500' : 
                      percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
          <Button variant="secondary" className="w-full border-gray-700 text-gray-300">
            <MapPin className="mr-2 h-4 w-4" />
            View Parking Map
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// Quick Actions Component
const CampusQuickActions = () => {
  const quickActions = [
    { icon: <BookOpen className="h-5 w-5" />, label: 'Class Schedule', color: 'blue' },
    { icon: <Utensils className="h-5 w-5" />, label: 'Dining Hours', color: 'orange' },
    { icon: <Bus className="h-5 w-5" />, label: 'Shuttle Tracker', color: 'green' },
    { icon: <Coffee className="h-5 w-5" />, label: 'Study Spaces', color: 'brown' },
    { icon: <Dumbbell className="h-5 w-5" />, label: 'Rec Center', color: 'red' },
    { icon: <ShoppingBag className="h-5 w-5" />, label: 'Campus Store', color: 'purple' },
    { icon: <Phone className="h-5 w-5" />, label: 'Campus Safety', color: 'yellow' },
    { icon: <Mail className="h-5 w-5" />, label: 'UB Email', color: 'indigo' }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-600 hover:bg-blue-700 text-white',
      orange: 'bg-orange-600 hover:bg-orange-700 text-white',
      green: 'bg-green-600 hover:bg-green-700 text-white',
      brown: 'bg-amber-700 hover:bg-amber-800 text-white',
      red: 'bg-red-600 hover:bg-red-700 text-white',
      purple: 'bg-purple-600 hover:bg-purple-700 text-white',
      yellow: 'bg-yellow-600 hover:bg-yellow-700 text-black',
      indigo: 'bg-indigo-600 hover:bg-indigo-700 text-white'
    };
    return colors[color] || 'bg-gray-600 hover:bg-gray-700 text-white';
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Zap className="mr-2 h-5 w-5 text-yellow-400" />
          Quick Actions
        </CardTitle>
        <CardDescription className="text-gray-400">
          Fast access to essential UB services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="primary"
              size="lg"
              className={`h-20 flex flex-col gap-2 ${getColorClasses(action.color)}`}
            >
              {action.icon}
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Campus Features Dashboard
const CampusFeaturesDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            University at Buffalo
          </h1>
          <p className="text-gray-400">Your campus community platform</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="secondary" className="border-blue-700 text-blue-300">
              <CheckCircle className="mr-1 h-3 w-3" />
              UB Verified
            </Badge>
            <Badge variant="secondary" className="border-green-700 text-green-300">
              <Users className="mr-1 h-3 w-3" />
              {2847} Active Students
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 text-gray-300 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Home className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="directory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <MapPin className="mr-2 h-4 w-4" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Bus className="mr-2 h-4 w-4" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <BuffaloWeatherWidget />
              </div>
              <div className="lg:col-span-2">
                <CampusEvents />
              </div>
            </div>
            <div className="mt-6">
              <CampusQuickActions />
            </div>
            <div className="mt-6">
              <DiningAndLocal />
            </div>
          </TabsContent>

          <TabsContent value="directory">
            <CampusDirectory />
          </TabsContent>

          <TabsContent value="events">
            <CampusEvents />
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-6">
              <CampusTransportation />
              <DiningAndLocal />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Story Exports
export const CompleteCampusSystem: Story = {
  render: () => <CampusFeaturesDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'Complete UB-specific campus features and integrations system'
      }
    }
  }
};

export const CampusDirectoryOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <CampusDirectory />
      </div>
    </div>
  )
};

export const WeatherWidgetOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <BuffaloWeatherWidget />
      </div>
    </div>
  )
};

export const CampusEventsOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
        <CampusEvents />
      </div>
    </div>
  )
};

export const TransportationOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <CampusTransportation />
      </div>
    </div>
  )
};

export const MobileCampusExperience: Story = {
  render: () => <CampusFeaturesDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized campus features for students on-the-go'
      }
    }
  }
};