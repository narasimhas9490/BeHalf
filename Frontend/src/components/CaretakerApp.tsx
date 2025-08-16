import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QRCodeScanner } from './QRCodeScanner';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import { 
  Heart, Calendar, Users, FileText, Settings, 
  Bell, LogOut, Car, MapPin, Clock, 
  Activity, Phone, MessageCircle, Camera,
  Navigation, CheckCircle, ArrowLeft, User,
  Globe, AlertCircle, Route as RouteIcon,
  Timer, Target
} from 'lucide-react';

export function CaretakerApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, setLanguage, currentLanguage, languages } = useLanguage();

  const getCurrentPath = () => {
    const path = location.pathname.split('/dashboard/')[1];
    return path || 'home';
  };

  const currentPath = getCurrentPath();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for caretaker's visits and assignments
  const caretakerData = {
    todaysVisits: [
      { 
        id: 1,
        patientName: 'Robert Johnson', 
        age: 72, 
        time: '10:00 AM', 
        duration: '45 min',
        address: '123 Main St, Bandra, Mumbai',
        phone: '+919876543210',
        status: 'upcoming',
        type: 'Regular Checkup',
        notes: 'Monthly health checkup and vitals monitoring',
        familyContact: 'John Johnson (+919876543220)'
      },
      { 
        id: 2,
        patientName: 'Mary Smith', 
        age: 68, 
        time: '2:00 PM', 
        duration: '30 min',
        address: '456 Oak Ave, Powai, Mumbai',
        phone: '+919876543211',
        status: 'completed',
        type: 'Medication Review',
        notes: 'Review medication compliance and side effects',
        familyContact: 'Sarah Smith (+919876543221)'
      },
      { 
        id: 3,
        patientName: 'James Wilson', 
        age: 75, 
        time: '4:30 PM', 
        duration: '60 min',
        address: '789 Pine Road, Andheri, Mumbai',
        phone: '+919876543212',
        status: 'in-progress',
        type: 'Post-Hospital Care',
        notes: 'Follow-up care after recent hospital discharge',
        familyContact: 'Mike Wilson (+919876543222)'
      }
    ],
    stats: {
      todayVisits: 3,
      completed: 1,
      remaining: 2,
      totalDistance: '45 km'
    }
  };

  const navigationItems = [
    { id: 'home', label: t('dashboard'), icon: Heart, path: '/dashboard' },
    { id: 'visits', label: t('todaysVisits'), icon: Car, path: '/dashboard/visits' },
    { id: 'routes', label: 'Routes', icon: RouteIcon, path: '/dashboard/routes' },
    { id: 'scanner', label: 'QR Scanner', icon: Camera, path: '/dashboard/scanner' }
  ];

  // Bottom navigation for all devices
  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50 safe-area-pb">
      <div className="flex justify-around items-center w-full">
        {navigationItems.map((item) => {
          const isActive = currentPath === item.id || (item.id === 'home' && currentPath === 'home');
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors min-w-0 flex-1 ${
                isActive 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1 flex-shrink-0" />
              <span className="text-xs font-medium truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const DashboardHome = () => (
    <div className="space-y-6 pb-24">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('welcome')} back</p>
              <p className="text-2xl font-bold text-orange-600">{user?.name}</p>
              <p className="text-sm text-gray-500">Ready for {t('today')}'s visits</p>
            </div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Car className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Car className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-600">{caretakerData.stats.todayVisits}</p>
            <p className="text-xs text-gray-600">{t('todaysVisits')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-600">{caretakerData.stats.completed}</p>
            <p className="text-xs text-gray-600">{t('completed')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Current/Next Visit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              Current Visit
            </span>
            <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const currentVisit = caretakerData.todaysVisits.find(v => v.status === 'in-progress') || 
                               caretakerData.todaysVisits.find(v => v.status === 'upcoming');
            if (!currentVisit) return <p className="text-gray-500">No visits scheduled</p>;
            
            return (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{currentVisit.patientName}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mt-2">
                      <p className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {currentVisit.time} • {currentVisit.duration}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {currentVisit.address}
                      </p>
                      <p className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        Age: {currentVisit.age} • {currentVisit.type}
                      </p>
                      <p className="text-gray-500 italic">{currentVisit.notes}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Navigation className="h-4 w-4 mr-1" />
                    Navigate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call Patient
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {currentVisit.status === 'in-progress' ? 'Complete Visit' : 'Start Visit'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact Family
                  </Button>
                </div>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* Today's Schedule Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            {t('today')}'s Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {caretakerData.todaysVisits.map((visit, index) => (
              <div key={visit.id} className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                visit.status === 'completed' ? 'bg-green-50 border-green-500' :
                visit.status === 'in-progress' ? 'bg-blue-50 border-blue-500' :
                'bg-yellow-50 border-yellow-500'
              }`}>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{visit.patientName}</p>
                    <Badge className={
                      visit.status === 'completed' ? 'bg-green-100 text-green-700' :
                      visit.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }>
                      {visit.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {visit.time} • {visit.type}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {visit.address.split(',')[0]}...
                  </p>
                </div>
                {visit.status === 'upcoming' && (
                  <Button size="sm" variant="outline">
                    <Navigation className="h-4 w-4 mr-1" />
                    Navigate
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/dashboard/visits')}
          >
            {t('view')} All Visits
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/dashboard/scanner')}
            >
              <Camera className="h-6 w-6 mb-2" />
              <span className="text-xs">Scan QR Code</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/dashboard/routes')}
            >
              <RouteIcon className="h-6 w-6 mb-2" />
              <span className="text-xs">Optimize Route</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
            >
              <AlertCircle className="h-6 w-6 mb-2" />
              <span className="text-xs">Report Emergency</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
            >
              <Timer className="h-6 w-6 mb-2" />
              <span className="text-xs">Track Time</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const VisitsView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{t('todaysVisits')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="h-5 w-5 mr-2" />
            Scheduled for {t('today')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {caretakerData.todaysVisits.map((visit) => (
              <div key={visit.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{visit.patientName}</h3>
                      <Badge className={
                        visit.status === 'completed' ? 'bg-green-100 text-green-700' :
                        visit.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }>
                        {visit.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Time:</p>
                        <p className="font-medium">{visit.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duration:</p>
                        <p className="font-medium">{visit.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Type:</p>
                        <p className="font-medium">{visit.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Age:</p>
                        <p className="font-medium">{visit.age} years</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Address:</p>
                        <p className="font-medium">{visit.address}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Visit Notes:</p>
                        <p className="font-medium">{visit.notes}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Family Contact:</p>
                        <p className="font-medium">{visit.familyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <Navigation className="h-4 w-4 mr-1" />
                    Navigate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call Patient
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Contact Family
                  </Button>
                </div>
                <div className="flex space-x-2 mt-2">
                  {visit.status === 'upcoming' && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Start Visit
                    </Button>
                  )}
                  {visit.status === 'in-progress' && (
                    <Button size="sm" variant="outline" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete Visit
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="flex-1">
                    <Camera className="h-4 w-4 mr-1" />
                    Scan QR
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const RoutesView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Routes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RouteIcon className="h-5 w-5 mr-2" />
            Optimized Route for {t('today')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Total Distance: {caretakerData.stats.totalDistance}</p>
                <p className="text-sm text-gray-600">Estimated Time: 6 hours 30 minutes</p>
              </div>
              <Button size="sm">
                <Navigation className="h-4 w-4 mr-1" />
                Start Navigation
              </Button>
            </div>
            
            <div className="space-y-3">
              {caretakerData.todaysVisits.map((visit, index) => (
                <div key={visit.id} className="flex items-center p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-orange-600">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{visit.patientName}</p>
                    <p className="text-sm text-gray-600">{visit.time} • {visit.address.split(',')[0]}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Navigation className="h-4 w-4 mr-1" />
                    Navigate
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{t('settings')}</h1>
      </div>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            {t('changeLanguage')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  currentLanguage === lang.code
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <p className="font-semibold text-left">{lang.nativeName}</p>
                  <p className="text-sm text-gray-600 text-left">{lang.name}</p>
                </div>
                {currentLanguage === lang.code && (
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Caretaker Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Caretaker Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Availability</h3>
            <p className="text-gray-600 text-sm">Manage your working hours and service areas</p>
            <Button variant="outline" size="sm">Set Schedule</Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Notifications</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm">New visit assignments</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm">Route updates</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm">Patient emergency alerts</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Location Services</h3>
            <p className="text-gray-600 text-sm">Enable GPS for navigation and tracking</p>
            <Button variant="outline" size="sm">Manage Location</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-300 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t('logout')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Behalf</h1>
                <p className="text-sm text-gray-600">Caretaker App</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/settings')}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-6">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/visits" element={<VisitsView />} />
          <Route path="/routes" element={<RoutesView />} />
          <Route path="/scanner" element={<QRCodeScanner />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}