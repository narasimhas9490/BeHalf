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
  Bell, LogOut, Stethoscope, ClipboardList, 
  Activity, Phone, MessageCircle, Camera,
  Clock, User, MapPin, Video, ArrowLeft,
  Globe, CheckCircle, AlertCircle, Pill,
  TrendingUp, Shield
} from 'lucide-react';

export function DoctorApp() {
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

  // Mock data for doctor's assigned patients and appointments
  const doctorData = {
    todaysAppointments: [
      { 
        id: 1,
        patientName: 'Robert Johnson', 
        age: 72, 
        time: '10:00 AM', 
        type: 'Home Visit',
        plan: 'Premium',
        address: '123 Main St, Mumbai',
        phone: '+919876543210',
        status: 'confirmed',
        duration: '45 min',
        notes: 'Regular monthly checkup'
      },
      { 
        id: 2,
        patientName: 'Mary Smith', 
        age: 68, 
        time: '2:00 PM', 
        type: 'Video Consultation',
        plan: 'Basic',
        address: 'Online',
        phone: '+919876543211',
        status: 'confirmed',
        duration: '30 min',
        notes: 'Follow-up for medication review'
      },
      { 
        id: 3,
        patientName: 'James Wilson', 
        age: 75, 
        time: '4:30 PM', 
        type: 'Hospital Checkup',
        plan: 'Platinum',
        address: 'Apollo Hospital, Mumbai',
        phone: '+919876543212',
        status: 'pending',
        duration: '60 min',
        notes: 'Comprehensive health assessment'
      }
    ],
    assignedPatients: [
      {
        id: 1,
        name: 'Robert Johnson',
        age: 72,
        plan: 'Premium',
        lastVisit: '2024-01-15',
        nextVisit: '2024-01-25',
        status: 'stable',
        conditions: ['Hypertension', 'Type 2 Diabetes'],
        medications: 3,
        phone: '+919876543210'
      },
      {
        id: 2,
        name: 'Mary Smith',
        age: 68,
        plan: 'Basic',
        lastVisit: '2024-01-10',
        nextVisit: '2024-01-25',
        status: 'monitoring',
        conditions: ['Arthritis'],
        medications: 2,
        phone: '+919876543211'
      },
      {
        id: 3,
        name: 'James Wilson',
        age: 75,
        plan: 'Platinum',
        lastVisit: '2024-01-20',
        nextVisit: '2024-01-25',
        status: 'good',
        conditions: ['High Cholesterol'],
        medications: 1,
        phone: '+919876543212'
      }
    ],
    stats: {
      todayAppointments: 3,
      totalPatients: 3,
      completedToday: 0,
      pendingReports: 2
    }
  };

  const navigationItems = [
    { id: 'home', label: t('dashboard'), icon: Heart, path: '/dashboard' },
    { id: 'appointments', label: t('todaysAppointments'), icon: Calendar, path: '/dashboard/appointments' },
    { id: 'patients', label: t('myPatients'), icon: Users, path: '/dashboard/patients' },
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
                  ? 'text-purple-600 bg-purple-50' 
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
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('welcome')} back</p>
              <p className="text-2xl font-bold text-purple-600">Dr. {user?.name}</p>
              <p className="text-sm text-gray-500">Ready to help patients {t('today')}</p>
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-600">{doctorData.stats.todayAppointments}</p>
            <p className="text-xs text-gray-600">{t('todaysAppointments')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-600">{doctorData.stats.totalPatients}</p>
            <p className="text-xs text-gray-600">{t('myPatients')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              {t('todaysAppointments')}
            </span>
            <Badge className="bg-blue-100 text-blue-800">{doctorData.stats.todayAppointments} scheduled</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctorData.todaysAppointments.map((appointment, index) => (
              <div key={appointment.id} className={`border rounded-lg p-4 ${
                appointment.status === 'confirmed' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                      <Badge variant="outline" className={
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {appointment.time} • {appointment.duration}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {appointment.address}
                      </p>
                      <p className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        Age: {appointment.age} • {appointment.plan} Plan
                      </p>
                      <p className="text-gray-500 italic">{appointment.notes}</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    {appointment.type === 'Video Consultation' ? (
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Join Video
                      </Button>
                    ) : (
                      <Button size="sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      Call Patient
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/dashboard/appointments')}
          >
            {t('view')} All {t('appointments')}
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
              onClick={() => navigate('/dashboard/patients')}
            >
              <ClipboardList className="h-6 w-6 mb-2" />
              <span className="text-xs">{t('patientRecords')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
            >
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs">Write Report</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
            >
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="text-xs">Patient Chat</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AppointmentsView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{t('todaysAppointments')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Scheduled for {t('today')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctorData.todaysAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                      <Badge className={
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Time:</p>
                        <p className="font-medium">{appointment.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duration:</p>
                        <p className="font-medium">{appointment.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Type:</p>
                        <p className="font-medium">{appointment.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Plan:</p>
                        <p className="font-medium">{appointment.plan}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Location:</p>
                        <p className="font-medium">{appointment.address}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Notes:</p>
                        <p className="font-medium">{appointment.notes}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    {appointment.type === 'Video Consultation' ? (
                      <Button size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Start Video
                      </Button>
                    ) : (
                      <Button size="sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const PatientsView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{t('myPatients')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Assigned Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctorData.assignedPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <Badge className={
                        patient.status === 'stable' ? 'bg-green-100 text-green-700' :
                        patient.status === 'monitoring' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }>
                        {patient.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Age:</p>
                        <p className="font-medium">{patient.age} years</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Plan:</p>
                        <p className="font-medium">{patient.plan}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Visit:</p>
                        <p className="font-medium">{patient.lastVisit}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Visit:</p>
                        <p className="font-medium">{patient.nextVisit}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Medications:</p>
                        <p className="font-medium">{patient.medications} active</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Conditions:</p>
                        <p className="font-medium">{patient.conditions.length} conditions</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Medical Conditions:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {patient.conditions.map((condition, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      View Records
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Camera className="h-4 w-4 mr-1" />
                      Scan QR
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <p className="font-semibold text-left">{lang.nativeName}</p>
                  <p className="text-sm text-gray-600 text-left">{lang.name}</p>
                </div>
                {currentLanguage === lang.code && (
                  <CheckCircle className="h-5 w-5 text-purple-500" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Doctor Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Availability</h3>
            <p className="text-gray-600 text-sm">Manage your working hours and availability</p>
            <Button variant="outline" size="sm">Set Schedule</Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Notifications</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm">New appointment notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm">Patient health alerts</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm">Weekly summary reports</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Professional Information</h3>
            <Button variant="outline" size="sm">Update Profile</Button>
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Behalf</h1>
                <p className="text-sm text-gray-600">Doctor Portal</p>
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
          <Route path="/appointments" element={<AppointmentsView />} />
          <Route path="/patients" element={<PatientsView />} />
          <Route path="/scanner" element={<QRCodeScanner />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}