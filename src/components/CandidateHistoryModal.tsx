'use client';

import { X, Eye, CheckCircle, Flag, Plus, Download, Eye as EyeIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
}

interface DonationHistory {
  id: number;
  date: string;
  donor: string;
  amount: number;
  status: 'confirmed' | 'flagged' | 'pending';
  source: string;
}

interface HistoryModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  formatAmount: (amount: number) => string;
}

// Mock data for donation history
const mockDonationHistory: DonationHistory[] = [
  { id: 1, date: '2025-01-22', donor: 'Citra Wijaya', amount: 196541744, status: 'confirmed', source: 'Digital Form' },
  { id: 2, date: '2025-01-20', donor: 'PT Maju Jaya', amount: 500000000, status: 'confirmed', source: 'Paper (OCR)' },
  { id: 3, date: '2025-01-18', donor: 'Anonymous', amount: 250000000, status: 'flagged', source: 'Web Scrape' },
  { id: 4, date: '2025-01-15', donor: 'Partai Kemajuan', amount: 100000000, status: 'pending', source: 'Digital Form' },
  { id: 5, date: '2025-01-12', donor: 'Foreign Corp Ltd', amount: 1000000000, status: 'flagged', source: 'Paper (OCR)' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'flagged':
      return 'bg-red-100 text-red-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSourceColor = (source: string) => {
  switch (source) {
    case 'Digital Form':
      return 'bg-blue-100 text-blue-800';
    case 'Paper (OCR)':
      return 'bg-yellow-100 text-yellow-800';
    case 'Web Scrape':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function CandidateHistoryModal({ 
  candidate, 
  onClose, 
  formatAmount 
}: HistoryModalProps) {
  if (!candidate) return null;

  const confirmedCount = mockDonationHistory.filter(d => d.status === 'confirmed').length;
  const flaggedCount = mockDonationHistory.filter(d => d.status === 'flagged').length;
  const pendingCount = mockDonationHistory.filter(d => d.status === 'pending').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Donation History - {candidate.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{mockDonationHistory.length}</div>
                  <div className="text-sm text-gray-600">Total Transactions</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
                  <div className="text-sm text-gray-600">Confirmed</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{flaggedCount}</div>
                  <div className="text-sm text-gray-600">Flagged</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockDonationHistory.map((donation) => (
                      <tr key={donation.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{donation.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{donation.donor}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatAmount(donation.amount)}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceColor(donation.source)}`}>
                            {donation.source}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                            {donation.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800" title="View Details">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            {donation.status === 'pending' && (
                              <button className="text-green-600 hover:text-green-800" title="Confirm">
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            {donation.status === 'flagged' && (
                              <button className="text-red-600 hover:text-red-800" title="Flag">
                                <Flag className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Add Donation
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 