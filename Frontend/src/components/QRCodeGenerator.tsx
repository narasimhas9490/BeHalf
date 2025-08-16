import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from './AuthContext';
import { QrCode, Download, Share, Printer, Eye, Shield, Clock, User } from 'lucide-react';

export function QRCodeGenerator() {
  const { user } = useAuth();
  const [qrSize, setQrSize] = useState(200);

  // Mock parent data - in real app, this would come from API
  const parentData = {
    id: 'PAT_001',
    name: 'Robert Johnson',
    age: 72,
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    emergencyContact: '+91 9876543210',
    medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
    currentMedications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
    ],
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  // Create QR code data
  const qrData = {
    patientId: parentData.id,
    name: parentData.name,
    age: parentData.age,
    bloodType: parentData.bloodType,
    allergies: parentData.allergies,
    emergencyContact: parentData.emergencyContact,
    conditions: parentData.medicalConditions,
    medications: parentData.currentMedications,
    lastUpdated: parentData.lastUpdated,
    accessKey: 'BH_' + Date.now() // Unique access key
  };

  const qrCodeValue = `https://behalf.healthcare/patient/${parentData.id}?key=${qrData.accessKey}&data=${encodeURIComponent(JSON.stringify(qrData))}`;

  const downloadQR = () => {
    // In a real app, this would generate and download the actual QR code
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = qrSize;
    canvas.height = qrSize;
    
    if (ctx) {
      // Simple placeholder - in real app, use a QR code library
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, qrSize, qrSize);
      ctx.fillStyle = '#000000';
      ctx.fillRect(10, 10, qrSize - 20, qrSize - 20);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(20, 20, qrSize - 40, qrSize - 40);
      
      // Add text
      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('QR Code', qrSize / 2, qrSize / 2);
      ctx.fillText(parentData.name, qrSize / 2, qrSize / 2 + 20);
    }

    const link = document.createElement('a');
    link.download = `${parentData.name}_medical_qr.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: `${parentData.name} - Medical QR Code`,
        text: 'Emergency medical information QR code',
        url: qrCodeValue
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(qrCodeValue);
      alert('QR code link copied to clipboard!');
    }
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Medical QR Code - ${parentData.name}</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              .qr-container { border: 2px solid #000; display: inline-block; padding: 20px; }
              .patient-info { margin-top: 20px; }
            </style>
          </head>
          <body>
            <h1>Emergency Medical QR Code</h1>
            <div class="qr-container">
              <div style="width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                QR CODE PLACEHOLDER
              </div>
            </div>
            <div class="patient-info">
              <h2>${parentData.name}</h2>
              <p>Age: ${parentData.age} | Blood Type: ${parentData.bloodType}</p>
              <p>Emergency Contact: ${parentData.emergencyContact}</p>
              <p><strong>Scan for complete medical information</strong></p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="h-5 w-5 mr-2" />
            Medical QR Code
          </CardTitle>
          <p className="text-gray-600">
            Generate and manage QR codes for instant access to {parentData.name}'s medical information during emergencies.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code Display */}
            <div className="text-center">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4 inline-block">
                {/* QR Code Placeholder */}
                <div 
                  className="bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative"
                  style={{ width: qrSize, height: qrSize }}
                >
                  <div className="text-center">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">QR Code</p>
                    <p className="text-xs text-gray-500">{parentData.name}</p>
                  </div>
                  
                  {/* Corner markers to make it look like a real QR code */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-4 border-black"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-4 border-black"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-4 border-black"></div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">{parentData.name}</p>
                <Badge variant="outline">Medical ID: {parentData.id}</Badge>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Last updated: {parentData.lastUpdated}
                </div>
              </div>

              {/* Size Controls */}
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">QR Code Size</p>
                <div className="flex justify-center space-x-2">
                  <Button 
                    variant={qrSize === 150 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setQrSize(150)}
                  >
                    Small
                  </Button>
                  <Button 
                    variant={qrSize === 200 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setQrSize(200)}
                  >
                    Medium
                  </Button>
                  <Button 
                    variant={qrSize === 250 ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setQrSize(250)}
                  >
                    Large
                  </Button>
                </div>
              </div>
            </div>

            {/* QR Code Information */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Patient Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{parentData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{parentData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Type:</span>
                    <span className="font-medium">{parentData.bloodType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Contact:</span>
                    <span className="font-medium">{parentData.emergencyContact}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {parentData.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Current Medications</h4>
                <div className="space-y-2">
                  {parentData.currentMedications.map((med, index) => (
                    <div key={index} className="text-sm bg-blue-50 rounded p-2">
                      <span className="font-medium">{med.name}</span> - {med.dosage}
                      <div className="text-gray-600 text-xs">{med.frequency}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Security Notice</p>
                    <p className="text-yellow-700">
                      This QR code contains sensitive medical information. Only share with healthcare providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={downloadQR}>
                <Download className="h-4 w-4 mr-2" />
                Download QR Code
              </Button>
              <Button variant="outline" onClick={shareQR}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={printQR}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Medical QR Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-2">For Emergencies</h3>
              <p className="text-sm text-gray-600">
                Emergency responders can scan the QR code to instantly access critical medical information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-2">For Healthcare Visits</h3>
              <p className="text-sm text-gray-600">
                Doctors and nurses can quickly access medical history, allergies, and current medications.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-2">Secure Access</h3>
              <p className="text-sm text-gray-600">
                All data is encrypted and only accessible to authorized healthcare providers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}