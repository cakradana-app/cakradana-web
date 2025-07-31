'use client';

import { useState, useMemo } from 'react';
import { 
  Users, Search, Filter, Eye,
  CheckCircle, AlertTriangle,
  Activity,
  MapPin, Shield, History
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import CandidateProfileModal from '@/components/CandidateProfileModal';
import CandidateRiskModal from '@/components/CandidateRiskModal';
import CandidateHistoryModal from '@/components/CandidateHistoryModal';

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
  avatarSeed: string; // For generating consistent avatars
  email?: string;
  phone?: string;
  address?: string;
  campaignPeriod?: string;
}

// Mock data for candidates based on reference design
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Anies Baswedan',
    party: 'Koalisi Perubahan',
    position: 'Presidential Candidate',
    region: 'National',
    totalDonations: 1250,
    totalAmount: 15000000000,
    riskLevel: 'low',
    status: 'active',
    lastUpdated: '2025-01-22',
    donorCount: 1250,
    riskScore: 25,
    avatarSeed: 'anies-baswedan',
    email: 'anies@koalisiperubahan.id',
    phone: '+62-21-12345678',
    address: 'Jakarta, Indonesia',
    campaignPeriod: '2024-2025'
  },
  {
    id: '2',
    name: 'Prabowo Subianto',
    party: 'Gerindra',
    position: 'Presidential Candidate',
    region: 'National',
    totalDonations: 980,
    totalAmount: 21500000000,
    riskLevel: 'medium',
    status: 'active',
    lastUpdated: '2025-01-21',
    donorCount: 980,
    riskScore: 45,
    avatarSeed: 'prabowo-subianto',
    email: 'prabowo@gerindra.or.id',
    phone: '+62-21-87654321',
    address: 'Jakarta, Indonesia',
    campaignPeriod: '2024-2025'
  },
  {
    id: '3',
    name: 'Ganjar Pranowo',
    party: 'PDI-P',
    position: 'Presidential Candidate',
    region: 'National',
    totalDonations: 1000,
    totalAmount: 12800000000,
    riskLevel: 'low',
    status: 'active',
    lastUpdated: '2025-01-20',
    donorCount: 1000,
    riskScore: 30,
    avatarSeed: 'ganjar-pranowo',
    email: 'ganjar@pdip.or.id',
    phone: '+62-21-11223344',
    address: 'Semarang, Central Java',
    campaignPeriod: '2024-2025'
  }
];



// Function to generate avatar URL using RandomUser.me API
const generateAvatarUrl = (seed: string) => {
  // Use the seed to generate a consistent image by using it as a parameter
  const gender = seed.includes('anies') || seed.includes('ganjar') ? 'men' : 'women';
  const imageId = Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % 99;
  return `https://randomuser.me/api/portraits/${gender}/${imageId}.jpg`;
};

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState<string>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  
  // Modal states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter(candidate => {
      const matchesSearch = searchTerm === '' || 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.party.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesParty = selectedParty === 'all' || candidate.party === selectedParty;
      const matchesRiskLevel = selectedRiskLevel === 'all' || candidate.riskLevel === selectedRiskLevel;
      
      return matchesSearch && matchesParty && matchesRiskLevel;
    });
  }, [searchTerm, selectedParty, selectedRiskLevel]);

  const candidateStats = useMemo(() => {
    const total = mockCandidates.length;
    const active = mockCandidates.filter(c => c.status === 'active').length;
    const highRisk = mockCandidates.filter(c => c.riskLevel === 'high').length;
    const totalDonations = mockCandidates.reduce((sum, c) => sum + c.totalDonations, 0);
    const totalAmount = mockCandidates.reduce((sum, c) => sum + c.totalAmount, 0);

    return {
      total,
      active,
      highRisk,
      totalDonations,
      totalAmount
    };
  }, []);



  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return 'bg-green-500';
    if (score <= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleRiskAnalysis = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowRiskModal(true);
  };

  const handleDonationHistory = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowHistoryModal(true);
  };

  const closeModal = () => {
    setShowProfileModal(false);
    setShowRiskModal(false);
    setShowHistoryModal(false);
    setSelectedCandidate(null);
  };







  const CandidatesContent = () => (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="mt-2 text-gray-600">
            Monitor candidate donations and risk profiles
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedParty}
                onChange={(e) => setSelectedParty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Parties</option>
                <option value="Koalisi Perubahan">Koalisi Perubahan</option>
                <option value="Gerindra">Gerindra</option>
                <option value="PDI-P">PDI-P</option>
              </select>
              <select
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
              <Button className="flex items-center space-x-2 px-4 py-2 h-auto">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Candidate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Image
                        src={generateAvatarUrl(candidate.avatarSeed)}
                        alt={`${candidate.name} avatar`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>';
                          }
                        }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {candidate.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{candidate.party}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{candidate.region}</span>
                </div>

                {/* Financial Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Received</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatAmount(candidate.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Donor Count</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {candidate.donorCount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Risk Score */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Risk Score</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {candidate.riskScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getRiskScoreColor(candidate.riskScore)}`}
                      style={{ width: `${candidate.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewProfile(candidate)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleRiskAnalysis(candidate)}
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Risk
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDonationHistory(candidate)}
                  >
                    <History className="h-4 w-4 mr-1" />
                    History
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Statistics Section */}
        {filteredCandidates.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateStats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateStats.active}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">High Risk</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateStats.highRisk}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Donations</p>
                      <p className="text-2xl font-bold text-gray-900">{candidateStats.totalDonations.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <CandidatesContent />
      
      {/* Modals */}
      {showProfileModal && (
        <CandidateProfileModal
          candidate={selectedCandidate}
          onClose={closeModal}
          generateAvatarUrl={generateAvatarUrl}
          formatAmount={formatAmount}
        />
      )}
      {showRiskModal && (
        <CandidateRiskModal
          candidate={selectedCandidate}
          onClose={closeModal}
          formatAmount={formatAmount}
        />
      )}
      {showHistoryModal && (
        <CandidateHistoryModal
          candidate={selectedCandidate}
          onClose={closeModal}
          formatAmount={formatAmount}
        />
      )}
    </DashboardLayout>
  );
} 