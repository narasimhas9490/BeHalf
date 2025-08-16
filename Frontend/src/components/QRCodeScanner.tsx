import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { QrCode, Camera, Upload, User, AlertTriangle, CheckCircle, Phone, Heart, Pill } from 'lucide-react';

export function QRCodeScanner() {
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');

  // Mock patient data that would be returned from QR scan
  const mockPatientData = {
    patientId: 'PAT_001',
    name: 'Robert Johnson',
    age: 72,
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    emergencyContact: '+91 9876543210',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
    ],
    lastUpdated: '2024-01-20',
    vitalSigns: {
      bloodPressure: '130/80',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      weight: '165 lbs'
    },
    recentVisits: [
      {
        date: '2024-01-15',
        doctor: 'Dr. Sarah Wilson',
        type: 'Home Visit',
        notes: 'Routine checkup. Blood pressure stable.'
      }
    ]
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResult(mockPatientData);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    if (manualCode.trim()) {
      // In real app, this would validate and fetch patient data
      setScanResult(mockPatientData);
      setManualCode('');
    }
  };

  const clearResults = () => {
    setScanResult(null);
    setManualCode('');
  };

  const renderPatientData = () => (
    <div className="space-y-6">
      {/* Patient Header */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{scanResult.name}</h2>
                <p className="text-gray-600">Patient ID: {scanResult.patientId}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline">Age: {scanResult.age}</Badge>
                  <Badge variant="outline">Blood Type: {scanResult.bloodType}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-700 font-medium">Verified Patient</p>
              <p className="text-xs text-gray-600">Last updated: {scanResult.lastUpdated}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Emergency Contact</Label>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{scanResult.emergencyContact}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Allergies</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {scanResult.allergies.map((allergy: string, index: number) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Current Vital Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label>Blood Pressure</Label>
                <p className="font-medium">{scanResult.vitalSigns.bloodPressure}</p>
              </div>
              <div>
                <Label>Heart Rate</Label>
                <p className="font-medium">{scanResult.vitalSigns.heartRate}</p>
              </div>
              <div>
                <Label>Temperature</Label>
                <p className="font-medium">{scanResult.vitalSigns.temperature}</p>
              </div>
              <div>
                <Label>Weight</Label>
                <p className="font-medium">{scanResult.vitalSigns.weight}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Conditions */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {scanResult.conditions.map((condition: string, index: number) => (
              <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                {condition}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pill className="h-5 w-5 mr-2" />
            Current Medications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scanResult.medications.map((medication: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-sm text-gray-600">{medication.dosage}</p>
                </div>
                <Badge variant="outline">{medication.frequency}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Visits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scanResult.recentVisits.map((visit: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{visit.type}</p>
                    <p className="text-sm text-gray-600">{visit.date} • {visit.doctor}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1">{visit.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button>
          Start Consultation
        </Button>
        <Button variant="outline">
          Download Records
        </Button>
        <Button variant="outline" onClick={clearResults}>
          Scan Another Patient
        </Button>
      </div>
    </div>
  );

  const renderScanner = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Scan Patient QR Code</CardTitle>
          <p className="text-center text-gray-600">
            Use the camera to scan a patient's medical QR code for instant access to their health information
          </p>
        </CardHeader>
        <CardContent>
          {/* Camera Scanner Area */}
          <div className="relative">
            <div className="w-full max-w-md mx-auto aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Scanning QR Code...</p>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Position QR code within the frame</p>
                  <Button onClick={simulateScan}>
                    <Camera className="h-4 w-4 mr-2" />
                    Start Camera
                  </Button>
                </div>
              )}
            </div>

            {/* Corner guides */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-blue-600 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-blue-600 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-blue-600 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-blue-600 rounded-br-lg"></div>
          </div>

          {/* Alternative Input Methods */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-medium mb-4 text-center">Alternative Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manual-code">Enter Code Manually</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="manual-code"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="Enter patient code"
                  />
                  <Button onClick={handleManualEntry}>
                    Submit
                  </Button>
                </div>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload QR Image
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Scanning Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">1. Position QR Code</h3>
              <p className="text-sm text-gray-600">
                Ensure the patient's QR code is clearly visible and within the scanning frame
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">2. Scan Code</h3>
              <p className="text-sm text-gray-600">
                Hold steady until the code is automatically detected and processed
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">3. Access Records</h3>
              <p className="text-sm text-gray-600">
                Instantly view patient's medical history, medications, and vital information
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div>
      {scanResult ? renderPatientData() : renderScanner()}
    </div>
  );
}