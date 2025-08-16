import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from './AuthContext';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface DoctorSignupProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function DoctorSignup({ onBack, onSuccess }: DoctorSignupProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    medicalLicense: '',
    specialization: '',
    experience: '',
    hospitalAffiliation: '',
    qualifications: '',
    about: ''
  });
  const [certificates, setCertificates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const specializations = [
    'General Medicine',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Geriatrics',
    'Internal Medicine',
    'Family Medicine',
    'Pulmonology',
    'Endocrinology',
    'Nephrology'
  ];

  const requiredCertificates = [
    'Medical Degree (MBBS/MD)',
    'Medical License',
    'Specialization Certificate',
    'Hospital Affiliation Letter',
    'Identity Proof (Aadhaar/Passport)'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (certificateType: string) => {
    // Simulate file upload
    if (!certificates.includes(certificateType)) {
      setCertificates(prev => [...prev, certificateType]);
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (certificates.length < 3) {
      alert('Please upload at least 3 certificates for verification');
      return;
    }

    setIsLoading(true);
    try {
      const success = await signup({
        ...formData,
        certificates
      }, 'doctor');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Doctor Registration</CardTitle>
            <p className="text-gray-600">
              Join our network of healthcare professionals providing quality care to elderly patients
            </p>
            <Badge variant="outline" className="w-fit mx-auto mt-2">
              <AlertCircle className="h-3 w-3 mr-1" />
              Verification Required
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Dr. Sarah Johnson"
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
                    placeholder="dr.sarah@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="font-medium mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicalLicense">Medical License Number</Label>
                  <Input
                    id="medicalLicense"
                    value={formData.medicalLicense}
                    onChange={(e) => handleInputChange('medicalLicense', e.target.value)}
                    placeholder="MCI-12345"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select value={formData.specialization} onValueChange={(value: string) => handleInputChange('specialization', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hospitalAffiliation">Hospital Affiliation</Label>
                  <Input
                    id="hospitalAffiliation"
                    value={formData.hospitalAffiliation}
                    onChange={(e) => handleInputChange('hospitalAffiliation', e.target.value)}
                    placeholder="Apollo Hospital, Mumbai"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="qualifications">Qualifications</Label>
                  <Input
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={(e) => handleInputChange('qualifications', e.target.value)}
                    placeholder="MBBS, MD (Internal Medicine)"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="about">About Yourself</Label>
                  <Textarea
                    id="about"
                    value={formData.about}
                    onChange={(e) => handleInputChange('about', e.target.value)}
                    placeholder="Brief description of your experience and approach to elderly care..."
                    className="min-h-20"
                  />
                </div>
              </div>
            </div>

            {/* Certificate Upload */}
            <div>
              <h3 className="font-medium mb-4">Certificate Upload</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center text-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Required Documents</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Upload clear photos or scans of your certificates for verification
                </p>
              </div>

              <div className="space-y-3">
                {requiredCertificates.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm">{cert}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {certificates.includes(cert) ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFileUpload(cert)}
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-center text-yellow-700">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Verification Process</span>
                </div>
                <p className="text-sm text-yellow-600 mt-1">
                  Your documents will be reviewed by our medical board within 2-3 business days. 
                  You'll receive an email notification once approved.
                </p>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSignup}
              disabled={isLoading || certificates.length < 3}
            >
              {isLoading ? 'Submitting Application...' : 'Submit Registration'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By registering, you agree to our Terms of Service, Privacy Policy, and Medical Ethics Guidelines
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}