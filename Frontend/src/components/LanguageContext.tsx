import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  languages: Language[];
}

const languages: Language[] = [
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

const translations: Translations = {
  en: {
    // Common
    dashboard: 'Dashboard',
    settings: 'Settings',
    logout: 'Sign Out',
    welcome: 'Welcome',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    
    // Family Dashboard
    parentHealth: 'Parent Health',
    overallHealth: 'Overall Health',
    nextVisit: 'Next Visit',
    medications: 'Medications',
    appointments: 'Appointments',
    payBills: 'Pay Bills',
    qrCode: 'QR Code',
    emergencyCall: 'Emergency Call',
    contactCaretaker: 'Contact Caretaker',
    
    // Parent Dashboard
    myHealth: 'My Health',
    todaysMedications: 'Today\'s Medications',
    upcomingAppointments: 'Upcoming Appointments',
    takeMedicine: 'Take Medicine',
    emergency: 'Emergency',
    caretaker: 'Caretaker',
    
    // Doctor Dashboard
    myPatients: 'My Patients',
    todaysAppointments: 'Today\'s Appointments',
    patientRecords: 'Patient Records',
    consultations: 'Consultations',
    
    // Caretaker Dashboard
    myVisits: 'My Visits',
    todaysVisits: 'Today\'s Visits',
    navigation: 'Navigation',
    completeVisit: 'Complete Visit',
    
    // Health Status
    bloodPressure: 'Blood Pressure',
    heartRate: 'Heart Rate',
    temperature: 'Temperature',
    weight: 'Weight',
    
    // Time
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    
    // Status
    good: 'Good',
    normal: 'Normal',
    stable: 'Stable',
    pending: 'Pending',
    completed: 'Completed',
    
    // Billing
    currentBill: 'Current Bill',
    payNow: 'Pay Now',
    billingHistory: 'Billing History',
    amountDue: 'Amount Due',
    dueDate: 'Due Date',
    
    // Language
    changeLanguage: 'Change Language',
    selectLanguage: 'Select Language'
  },
  
  hi: {
    // Common
    dashboard: 'डैशबोर्ड',
    settings: 'सेटिंग्स',
    logout: 'साइन आउट',
    welcome: 'स्वागत है',
    loading: 'लोड हो रहा है...',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    
    // Family Dashboard
    parentHealth: 'माता-पिता का स्वास्थ्य',
    overallHealth: 'समग्र स्वास्थ्य',
    nextVisit: 'अगली विज़िट',
    medications: 'दवाइयां',
    appointments: 'अपॉइंटमेंट',
    payBills: 'बिल भुगतान',
    qrCode: 'QR कोड',
    emergencyCall: 'आपातकालीन कॉल',
    contactCaretaker: 'देखभालकर्ता से संपर्क',
    
    // Parent Dashboard
    myHealth: 'मेरा स्वास्थ्य',
    todaysMedications: 'आज की दवाइयां',
    upcomingAppointments: 'आगामी अपॉइंटमेंट',
    takeMedicine: 'दवा लें',
    emergency: 'आपातकाल',
    caretaker: 'देखभालकर्ता',
    
    // Doctor Dashboard
    myPatients: 'मेरे मरीज़',
    todaysAppointments: 'आज के अपॉइंटमेंट',
    patientRecords: 'मरीज़ के रिकॉर्ड',
    consultations: 'परामर्श',
    
    // Caretaker Dashboard
    myVisits: 'मेरी विज़िट',
    todaysVisits: 'आज की विज़िट',
    navigation: 'नेवीगेशन',
    completeVisit: 'विज़िट पूरी करें',
    
    // Health Status
    bloodPressure: 'रक्तचाप',
    heartRate: 'हृदय गति',
    temperature: 'तापमान',
    weight: 'वजन',
    
    // Time
    today: 'आज',
    tomorrow: 'कल',
    thisWeek: 'इस सप्ताह',
    
    // Status
    good: 'अच्छा',
    normal: 'सामान्य',
    stable: 'स्थिर',
    pending: 'लंबित',
    completed: 'पूर्ण',
    
    // Billing
    currentBill: 'वर्तमान बिल',
    payNow: 'अभी भुगतान करें',
    billingHistory: 'बिलिंग इतिहास',
    amountDue: 'देय राशि',
    dueDate: 'देय तिथि',
    
    // Language
    changeLanguage: 'भाषा बदलें',
    selectLanguage: 'भाषा चुनें'
  }
  // Add more languages as needed
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}