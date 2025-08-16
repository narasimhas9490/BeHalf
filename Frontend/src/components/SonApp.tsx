import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { QRCodeGenerator } from './QRCodeGenerator';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import { 
  Heart, Calendar, Phone, User, Activity, FileText, 
  Settings, Bell, LogOut, Home, Pill, Clock, 
  CheckCircle, Video, MessageCircle, Download, 
  CreditCard, Receipt, AlertCircle, Shield, 
  TrendingUp, MapPin, Stethoscope, Users,
  Globe, ChevronRight, ArrowLeft
} from 'lucide-react';

export function SonApp() {
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

  // Mock data for parent's health status
  const parentData = {
    name: 'Robert Johnson',
    age: 72,
    plan: user?.plan || 'Premium',
    lastVisit: '2024-01-15',
    nextVisit: '2024-02-15',
    vitals: {
      bloodPressure: '130/80',
      heartRate: '72',
      temperature: '98.6',
      weight: '165'
    },
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', time: '8:00 AM', taken: true },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', time: '8:00 AM, 8:00 PM', taken: false }
    ],
    upcomingAppointments: [
      { type: 'Home Visit', date: '2024-01-25', time: '10:00 AM', provider: 'Dr. Sarah Wilson' },
      { type: 'Hospital Checkup', date: '2024-02-15', time: '2:00 PM', provider: 'Dr. Michael Chen' }
    ],
    recentReports: [
      { date: '2024-01-15', type: 'Monthly Checkup', status: 'Normal', doctor: 'Dr. Sarah Wilson' },
      { date: '2024-01-01', type: 'Blood Work', status: 'Good', doctor: 'Dr. Michael Chen' }
    ],
    billing: {
      currentAmount: 35000,
      dueDate: '2024-02-01',
      status: 'pending',
      history: [
        { date: '2024-01-01', amount: 35000, status: 'paid', description: 'Premium Plan - January' },
        { date: '2023-12-01', amount: 35000, status: 'paid', description: 'Premium Plan - December' }
      ]
    }
  };

  const navigationItems = [
    { id: 'home', label: t('dashboard'), icon: Home, path: '/dashboard' },
    { id: 'appointments', label: t('appointments'), icon: Calendar, path: '/dashboard/appointments' },
    { id: 'medications', label: t('medications'), icon: Pill, path: '/dashboard/medications' },
    { id: 'billing', label: t('payBills'), icon: CreditCard, path: '/dashboard/billing' }
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
                  ? 'text-blue-600 bg-blue-50' 
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
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t('welcome')} back</p>
              <p className="text-2xl font-bold text-blue-600">{user?.name}</p>
              <p className="text-sm text-gray-500">Managing care for {parentData.name}</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              {t('parentHealth')}
            </span>
            <Badge className="bg-green-100 text-green-800">{t('good')}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-600">{parentData.vitals.bloodPressure}</p>
              <p className="text-sm text-gray-600">{t('bloodPressure')}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-600">{parentData.vitals.heartRate} bpm</p>
              <p className="text-sm text-gray-600">{t('heartRate')}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-lg font-bold text-orange-600">{parentData.vitals.temperature}°F</p>
              <p className="text-sm text-gray-600">{t('temperature')}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-600">{parentData.vitals.weight} lbs</p>
              <p className="text-sm text-gray-600">{t('weight')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-600">Jan 25</p>
            <p className="text-xs text-gray-600">{t('nextVisit')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Pill className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-600">{parentData.medications.length}</p>
            <p className="text-xs text-gray-600">{t('medications')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-600">₹{parentData.billing.currentAmount.toLocaleString()}</p>
            <p className="text-xs text-gray-600">{t('amountDue')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Appointment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            {t('upcomingAppointments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {parentData.upcomingAppointments.slice(0, 2).map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{appointment.type}</p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.provider}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Video className="h-4 w-4 mr-1" />
                    Join
                  </Button>
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
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Medication Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2 text-purple-600" />
            {t('todaysMedications')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {parentData.medications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${medication.taken ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <p className="font-semibold">{medication.name}</p>
                    <p className="text-sm text-gray-600">{medication.dosage} • {medication.time}</p>
                  </div>
                </div>
                <Badge variant={medication.taken ? 'default' : 'secondary'}>
                  {medication.taken ? t('completed') : t('pending')}
                </Badge>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/dashboard/medications')}
          >
            {t('view')} All {t('medications')}
            <ChevronRight className="h-4 w-4 ml-1" />
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
              onClick={() => navigate('/dashboard/billing')}
            >
              <CreditCard className="h-6 w-6 mb-2" />
              <span className="text-xs">{t('payBills')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => navigate('/dashboard/qrcode')}
            >
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-xs">{t('qrCode')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => window.open('tel:+919876543210')}
            >
              <Phone className="h-6 w-6 mb-2" />
              <span className="text-xs">Call Parent</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col"
              onClick={() => window.open('tel:+911234567890')}
            >
              <AlertCircle className="h-6 w-6 mb-2" />
              <span className="text-xs">{t('emergency')}</span>
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
        <h1 className="text-2xl font-bold">{t('appointments')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            {t('upcomingAppointments')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {parentData.upcomingAppointments.map((appointment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{appointment.type}</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {appointment.date} at {appointment.time}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      <User className="h-4 w-4 mr-1" />
                      {appointment.provider}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      For: {parentData.name} • {parentData.plan} Plan
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm">
                      <Video className="h-4 w-4 mr-1" />
                      Join Call
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

  const MedicationsView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{t('medications')}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2" />
            Current {t('medications')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {parentData.medications.map((medication, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{medication.name}</h3>
                    <p className="text-gray-600">{medication.dosage} • {medication.frequency}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      Scheduled: {medication.time}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Patient: {parentData.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge 
                      variant={medication.taken ? 'default' : 'secondary'}
                      className={medication.taken ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                    >
                      {medication.taken ? t('completed') : t('pending')}
                    </Badge>
                    <Button size="sm" variant="outline">
                      {t('view')} Details
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

  const BillingView = () => (
    <div className="space-y-6 pb-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{t('payBills')}</h1>
      </div>

      {/* Current Bill */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-orange-600" />
            {t('currentBill')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('amountDue')}:</span>
              <span className="text-2xl font-bold text-orange-600">₹{parentData.billing.currentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('dueDate')}:</span>
              <span className="font-medium">{parentData.billing.dueDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan:</span>
              <Badge>{parentData.plan}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service Period:</span>
              <span className="font-medium">February 2024</span>
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <CreditCard className="h-4 w-4 mr-2" />
              {t('payNow')} - ₹{parentData.billing.currentAmount.toLocaleString()}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="h-5 w-5 mr-2" />
            {t('billingHistory')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {parentData.billing.history.map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{bill.description}</p>
                  <p className="text-sm text-gray-600">{bill.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{bill.amount.toLocaleString()}</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {bill.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-3" />
              Credit/Debit Card
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-3" />
              UPI / Digital Wallet
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Receipt className="h-4 w-4 mr-3" />
              Net Banking
            </Button>
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
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <p className="font-semibold text-left">{lang.nativeName}</p>
                  <p className="text-sm text-gray-600 text-left">{lang.name}</p>
                </div>
                {currentLanguage === lang.code && (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Plan Information</h3>
            <p className="text-gray-600">Current Plan: <Badge>{user?.plan}</Badge></p>
            <Button variant="outline" size="sm">Upgrade Plan</Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Notifications</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm">Email notifications for appointments</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" defaultChecked />
                <span className="text-sm">SMS alerts for medications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm">Weekly health reports</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Emergency Contacts</h3>
            <Button variant="outline" size="sm">Manage Contacts</Button>
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Behalf</h1>
                <p className="text-sm text-gray-600">Family Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {user?.plan}
              </Badge>
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
          <Route path="/medications" element={<MedicationsView />} />
          <Route path="/billing" element={<BillingView />} />
          <Route path="/qrcode" element={<QRCodeGenerator />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}