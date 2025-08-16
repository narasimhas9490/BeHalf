import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Heart, Users, Stethoscope, Car, User, ArrowRight, Shield, Clock, CheckCircle } from 'lucide-react';
import { SonSignup } from './SonSignup';
import { DoctorSignup } from './DoctorSignup';
import { ParentSignup } from './ParentSignup';

export function Signup() {
  const navigate = useNavigate();
  const [selectedUserType, setSelectedUserType] = useState<string>('');

  const userTypes = [
    {
      id: 'son',
      title: 'Family Member',
      subtitle: 'Son/Daughter',
      description: 'Get care for your elderly parents with professional healthcare services',
      icon: <Users className="h-12 w-12 text-blue-500" />,
      features: [
        'Monitor parent\'s health remotely',
        'Schedule regular checkups',
        'Access to QR medical records',
        'Real-time health updates'
      ],
      color: 'blue',
      popular: true
    },
    {
      id: 'parent',
      title: 'Patient',
      subtitle: 'Elderly Parent',
      description: 'Access your health records and stay connected with your healthcare team',
      icon: <User className="h-12 w-12 text-green-500" />,
      features: [
        'View your health status',
        'Track medications',
        'Appointment scheduling',
        'Emergency contact access'
      ],
      color: 'green',
      popular: false
    },
    {
      id: 'doctor',
      title: 'Healthcare Provider',
      subtitle: 'Doctor',
      description: 'Join our network of certified healthcare professionals',
      icon: <Stethoscope className="h-12 w-12 text-purple-500" />,
      features: [
        'Manage patient consultations',
        'Access QR medical records',
        'Digital prescriptions',
        'Professional certification'
      ],
      color: 'purple',
      popular: false
    },
    {
      id: 'caretaker',
      title: 'Care Provider',
      subtitle: 'Caretaker',
      description: 'Provide professional home healthcare services to elderly patients',
      icon: <Car className="h-12 w-12 text-orange-500" />,
      features: [
        'Manage visit schedules',
        'Document patient interactions',
        'Emergency protocols',
        'Care coordination'
      ],
      color: 'orange',
      popular: false
    }
  ];

  // If user type is selected, show the appropriate signup form
  if (selectedUserType) {
    const handleFormBack = () => setSelectedUserType('');
    const handleFormSuccess = () => navigate('/dashboard');
    
    switch (selectedUserType) {
      case 'son':
        return <SonSignup onBack={handleFormBack} onSuccess={handleFormSuccess} />;
      case 'doctor':
        return <DoctorSignup onBack={handleFormBack} onSuccess={handleFormSuccess} />;
      case 'parent':
        return <ParentSignup onBack={handleFormBack} onSuccess={handleFormSuccess} />;
      case 'caretaker':
        return <ParentSignup onBack={handleFormBack} onSuccess={handleFormSuccess} />;
      default:
        setSelectedUserType('');
        break;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Behalf</h1>
                <p className="text-xs text-gray-600">Healthcare for your loved ones</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Already have an account?</span>
            <Button variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              <Shield className="h-3 w-3 mr-1" />
              Join the Behalf Family
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Create Your Account
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your role to get started with professional healthcare services. 
              Each account type is designed specifically for your needs.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {userTypes.map((userType, index) => (
            <motion.div
              key={userType.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${userType.popular ? 'scale-105' : ''}`}
            >
              <Card 
                className={`h-full cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  userType.popular ? 'border-blue-500 ring-2 ring-blue-200' : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedUserType(userType.id)}
              >
                {userType.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {userType.icon}
                  </div>
                  <CardTitle className="text-xl">{userType.title}</CardTitle>
                  <p className="text-sm text-gray-500">{userType.subtitle}</p>
                  <p className="text-gray-600 text-sm mt-2">{userType.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {userType.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      userType.popular ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700' : ''
                    }`}
                    onClick={() => setSelectedUserType(userType.id)}
                  >
                    Choose {userType.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Behalf Healthcare?
            </h2>
            <p className="text-gray-600">
              Join thousands of families who trust us with their healthcare needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Secure & Certified</h3>
              <p className="text-gray-600 text-sm">
                HIPAA compliant platform with certified healthcare professionals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock emergency support and healthcare assistance
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Family Connected</h3>
              <p className="text-gray-600 text-sm">
                Keep families connected with real-time health updates and reports
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              Free account setup
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              No hidden fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              Data privacy protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}