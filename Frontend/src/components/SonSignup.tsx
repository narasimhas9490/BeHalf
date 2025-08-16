import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from './AuthContext';
import { ArrowLeft, Check, Star, Shield, Heart } from 'lucide-react';

interface SonSignupProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function SonSignup({ onBack, onSuccess }: SonSignupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    parentName: '',
    parentAge: '',
    parentAddress: '',
    emergencyContact: '',
    selectedPlan: 'premium'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic Care',
      price: '₹25,000',
      period: '/month',
      color: 'blue',
      popular: false,
      description: 'Essential healthcare for peace of mind',
      features: [
        'NIC certified hospital checkup',
        'Hospital visit every 4 months', 
        'Monthly home visit',
        'Basic health monitoring',
        'Emergency contact support',
        'Digital health records'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Care',
      price: '₹35,000',
      period: '/month',
      color: 'green',
      popular: true,
      description: 'Comprehensive care with premium facilities',
      features: [
        'Best hospitals access',
        'Hospital visit every 3 months',
        'Monthly home visit',
        'Advanced health monitoring',
        '24/7 emergency support',
        'QR medical records',
        'Medication management',
        'Family updates & reports'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum Care',
      price: '₹70,000',
      period: '/month',
      color: 'purple',
      popular: false,
      description: 'Premium care with top-tier hospitals',
      features: [
        'Top-tier hospitals (Apollo, etc.)',
        'Monthly hospital visit',
        'Weekly home visits',
        'Comprehensive health monitoring',
        'Priority emergency support',
        'Complete digital health ecosystem',
        'Personal care coordinator',
        'Specialist consultations',
        'Preventive health programs'
      ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const success = await signup(formData, 'son', formData.selectedPlan);
      if (success) {
        onSuccess();
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Your Information</h3>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="Create a password"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Parent Information</h3>
        <p className="text-gray-600">Tell us about your parent</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="parentName">Parent's Name</Label>
          <Input
            id="parentName"
            value={formData.parentName}
            onChange={(e) => handleInputChange('parentName', e.target.value)}
            placeholder="Parent's full name"
          />
        </div>
        <div>
          <Label htmlFor="parentAge">Age</Label>
          <Input
            id="parentAge"
            type="number"
            value={formData.parentAge}
            onChange={(e) => handleInputChange('parentAge', e.target.value)}
            placeholder="Age"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="parentAddress">Address</Label>
          <Input
            id="parentAddress"
            value={formData.parentAddress}
            onChange={(e) => handleInputChange('parentAddress', e.target.value)}
            placeholder="Complete address"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            placeholder="Emergency contact number"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold">Choose Your Care Plan</h3>
        <p className="text-gray-600">Select the best plan for your parent's needs</p>
      </div>
      
      <div className="space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              formData.selectedPlan === plan.id
                ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                : 'border-gray-200 hover:border-gray-300'
            } ${plan.popular ? 'relative' : ''}`}
            onClick={() => handleInputChange('selectedPlan', plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 left-4 bg-green-500">
                <Star className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            )}
            
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-lg">{plan.name}</h4>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{plan.price}</div>
                <div className="text-gray-500 text-sm">{plan.period}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center mt-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                formData.selectedPlan === plan.id
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`}>
                {formData.selectedPlan === plan.id && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <Badge className="w-fit mx-auto mb-4 bg-blue-100 text-blue-800">
              <Heart className="h-3 w-3 mr-1" />
              Family Member Registration
            </Badge>
            <CardTitle className="text-2xl">Join Behalf Healthcare</CardTitle>
            <p className="text-gray-600">
              Professional care for your parents, peace of mind for you
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? <Check className="h-4 w-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            
            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSignup} disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Complete Registration'}
                  </Button>
                )}
              </div>
            </div>

            {currentStep === 3 && (
              <div className="text-center pt-4">
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    30-day money back guarantee
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    Cancel anytime
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}