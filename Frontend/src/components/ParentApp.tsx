import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QRCodeGenerator } from './QRCodeGenerator';
import { useAuth } from './AuthContext';
import { 
  Heart, Calendar, Phone, User, Activity, FileText, 
  Settings, Bell, LogOut, Home, Pill, Clock, AlertTriangle,
  PhoneCall, UserCog, Globe, ChevronRight, Shield, Wifi,
  Battery, Volume2
} from 'lucide-react';

export function ParentApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
  ];

  // Translation object (simplified - in real app this would come from a translation service)
  const translations: {
    [lang: string]: { [key: string]: string }
  } = {
    en: {
      welcome: 'Welcome',
      health: 'Health',
      medications: 'Medications',
      appointments: 'Appointments',
      records: 'Records',
      settings: 'Settings',
      emergencyCall: 'Emergency Call',
      contactCaretaker: 'Contact Caretaker',
      bloodPressure: 'Blood Pressure',
      heartRate: 'Heart Rate',
      temperature: 'Temperature',
      weight: 'Weight',
      nextAppointment: 'Next Appointment',
      takeMedicine: 'Take Medicine',
      viewAll: 'View All',
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      overallHealth: 'Overall Health',
      today: 'Today',
      tomorrow: 'Tomorrow'
    },
    hi: {
      welcome: 'स्वागत है',
      health: 'स्वास्थ्य',
      medications: 'दवाइयां',
      appointments: 'अपॉइंटमेंट',
      records: 'रिकॉर्ड',
      settings: 'सेटिंग्स',
      emergencyCall: 'आपातकालीन कॉल',
      contactCaretaker: 'देखभालकर्ता से संपर्क',
      bloodPressure: 'रक्तचाप',
      heartRate: 'हृदय गति',
      temperature: 'तापमान',
      weight: 'वजन',
      nextAppointment: 'अगली अपॉइंटमेंट',
      takeMedicine: 'दवा लें',
      viewAll: 'सभी देखें',
      goodMorning: 'सुप्रभात',
      goodAfternoon: 'नमस्कार',
      goodEvening: 'शुभ संध्या',
      overallHealth: 'समग्र स्वास्थ्य',
      today: 'आज',
      tomorrow: 'कल'
    }
    // Add more languages as needed
  };

  const t = (key: string) => translations[selectedLanguage]?.[key] || translations.en[key] || key;

  const getCurrentPath = () => {
    const path = location.pathname.split('/dashboard/')[1];
    return path || 'home';
  };

  const currentPath = getCurrentPath();

  // Mock data for parent's health
  const parentData = {
    name: user?.name || 'Patient',
    vitals: {
      bloodPressure: '130/80',
      heartRate: '72',
      temperature: '98.6',
      weight: '65'
    },
    medications: [
      { name: 'Lisinopril', time: '8:00 AM', taken: false },
      { name: 'Metformin', time: '8:00 PM', taken: true }
    ],
    nextAppointment: {
      type: 'Home Visit',
      date: 'Tomorrow',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Wilson'
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning');
    if (hour < 17) return t('goodAfternoon');
    return t('goodEvening');
  };

  const navigationItems = [
    { id: 'home', label: t('health'), icon: Heart, path: '/dashboard' },
    { id: 'medications', label: t('medications'), icon: Pill, path: '/dashboard/medications' },
    { id: 'appointments', label: t('appointments'), icon: Calendar, path: '/dashboard/appointments' },
    { id: 'records', label: t('records'), icon: FileText, path: '/dashboard/records' },
    { id: 'qrcode', label: 'QR Code', icon: FileText, path: '/dashboard/qrcode' },
    { id: 'settings', label: t('settings'), icon: Settings, path: '/dashboard/settings' }
  ];

  const emergencyCall = () => {
    window.open('tel:+911234567890');
  };

  const contactCaretaker = () => {
    window.open('tel:+919876543210');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mobile-first bottom navigation
  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.slice(0, 4).map((item) => {
          const isActive = currentPath === item.id || (item.id === 'home' && currentPath === 'home');
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Emergency buttons component
  const EmergencyButtons = () => (
    <div className="fixed top-4 right-4 flex flex-col space-y-2 z-40">
      <Button
        onClick={emergencyCall}
        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg"
        size="lg"
      >
        <PhoneCall className="h-6 w-6" />
      </Button>
      <Button
        onClick={contactCaretaker}
        className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg"
        size="lg"
      >
        <UserCog className="h-6 w-6" />
      </Button>
    </div>
  );

  // Dashboard home view
  const DashboardHome = () => (
    <div className="space-y-6 pb-20">
      {/* Greeting and Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{getGreeting()}</h2>
              <p className="text-xl text-gray-600">{parentData.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800 text-base px-3 py-1">
                <Heart className="h-4 w-4 mr-1" />
                {t('overallHealth')}: Good
              </Badge>
            </div>
          </div>
          
          {/* Quick Status Indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <Wifi className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Connected</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <Battery className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Device OK</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Vitals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Activity className="h-6 w-6 mr-2 text-blue-600" />
            Current Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{parentData.vitals.bloodPressure}</p>
              <p className="text-sm text-gray-600">{t('bloodPressure')}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{parentData.vitals.heartRate} bpm</p>
              <p className="text-sm text-gray-600">{t('heartRate')}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{parentData.vitals.temperature}°F</p>
              <p className="text-sm text-gray-600">{t('temperature')}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{parentData.vitals.weight} kg</p>
              <p className="text-sm text-gray-600">{t('weight')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Appointment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-green-600" />
            {t('nextAppointment')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-lg font-semibold text-green-800">{parentData.nextAppointment.type}</p>
              <p className="text-gray-600">{t('tomorrow')} at {parentData.nextAppointment.time}</p>
              <p className="text-sm text-gray-500">{parentData.nextAppointment.doctor}</p>
            </div>
            <Button 
              variant="outline" 
              className="text-green-700 border-green-300"
              onClick={() => navigate('/dashboard/appointments')}
            >
              {t('viewAll')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Pill className="h-6 w-6 mr-2 text-purple-600" />
            {t('today')}'s {t('medications')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {parentData.medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${med.taken ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <p className="font-semibold text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.time}</p>
                  </div>
                </div>
                {!med.taken && (
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Clock className="h-4 w-4 mr-1" />
                    {t('takeMedicine')}
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/dashboard/medications')}
          >
            {t('viewAll')} {t('medications')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contact Info */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">Emergency Buttons</p>
                <p className="text-sm text-red-600">Available at top right corner</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={emergencyCall}
                className="bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                <PhoneCall className="h-4 w-4 mr-1" />
                Emergency
              </Button>
              <Button
                onClick={contactCaretaker}
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <UserCog className="h-4 w-4 mr-1" />
                Caretaker
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Settings view with language selection
  const SettingsView = () => (
    <div className="space-y-6 pb-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Globe className="h-6 w-6 mr-2" />
            Language / भाषा
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                  selectedLanguage === lang.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <p className="font-semibold text-left">{lang.nativeName}</p>
                  <p className="text-sm text-gray-600 text-left">{lang.name}</p>
                </div>
                {selectedLanguage === lang.code && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">App Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Text Size</p>
              <p className="text-sm text-gray-600">Adjust text size for better readability</p>
            </div>
            <Button variant="outline">Adjust</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Sound</p>
              <p className="text-sm text-gray-600">Medication reminders and notifications</p>
            </div>
            <Button variant="outline">
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Emergency Contacts</p>
              <p className="text-sm text-gray-600">Manage emergency contact numbers</p>
            </div>
            <Button variant="outline">Edit</Button>
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
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  // Simple views for other sections
  const MedicationsView = () => (
    <div className="space-y-6 pb-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Pill className="h-6 w-6 mr-2 text-purple-600" />
            All {t('medications')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {parentData.medications.map((med, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">{med.name}</h3>
                <p className="text-gray-600">Scheduled: {med.time}</p>
                <Badge className={med.taken ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {med.taken ? 'Taken' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AppointmentsView = () => (
    <div className="space-y-6 pb-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-green-600" />
            {t('appointments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">{parentData.nextAppointment.type}</h3>
            <p className="text-gray-600">{t('tomorrow')} at {parentData.nextAppointment.time}</p>
            <p className="text-sm text-gray-500">{parentData.nextAppointment.doctor}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const RecordsView = () => (
    <div className="space-y-6 pb-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            Health {t('records')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Your health records are securely stored and accessible via QR code.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/dashboard/qrcode')}
          >
            View QR Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Behalf</h1>
                <p className="text-sm text-gray-600">Health App</p>
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
      <main className="max-w-md mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/medications" element={<MedicationsView />} />
          <Route path="/appointments" element={<AppointmentsView />} />
          <Route path="/records" element={<RecordsView />} />
          <Route path="/qrcode" element={<QRCodeGenerator />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>

      {/* Emergency Buttons */}
      <EmergencyButtons />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}