'use client';

import { X, Mail, Phone, MapPin, Calendar, Edit, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Candidate {
  id: string;
  name: string;
  party: string;
  position: string;
  region: string;
  totalDonations: number;
  totalAmount: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'inactive' | 'suspended';
  imageUrl?: string;
  lastUpdated: string;
  donorCount: number;
  riskScore: number;
  avatarSeed: string;
  email?: string;
  phone?: string;
  address?: string;
  campaignPeriod?: string;
}

interface ProfileModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  generateAvatarUrl: (seed: string) => string;
  formatAmount: (amount: number) => string;
}

export default function CandidateProfileModal({ 
  candidate, 
  onClose, 
  generateAvatarUrl, 
  formatAmount 
}: ProfileModalProps) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Candidate Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <Image
                src={generateAvatarUrl(candidate.avatarSeed)}
                alt={`${candidate.name} avatar`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.party}</p>
              <p className="text-sm text-gray-500">{candidate.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{candidate.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{candidate.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{candidate.address || candidate.region}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Campaign Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Period: {candidate.campaignPeriod || '2024-2025'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Region: {candidate.region}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Financial Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Received:</span>
                    <span className="text-sm font-semibold">{formatAmount(candidate.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Donor Count:</span>
                    <span className="text-sm font-semibold">{candidate.donorCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Risk Score:</span>
                    <span className="text-sm font-semibold">{candidate.riskScore}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 