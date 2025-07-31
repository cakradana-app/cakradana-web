'use client';

import { X, AlertTriangle, Download } from 'lucide-react';
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



interface RiskModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  formatAmount: (amount: number) => string;
}

// Mock data for risk analysis
const mockRiskData = {
  factors: [
    { name: 'Large Donations', score: 15, impact: 'high' as const },
    { name: 'Foreign Donors', score: 8, impact: 'medium' as const },
    { name: 'Anonymous Donations', score: 12, impact: 'high' as const },
    { name: 'Rapid Fund Growth', score: 5, impact: 'low' as const }
  ],
  transactions: [
    { id: 1, date: '2025-01-15', amount: 500000000, donor: 'PT Maju Jaya', risk: 'medium' as const, status: 'confirmed' as const },
    { id: 2, date: '2025-01-10', amount: 250000000, donor: 'Anonymous', risk: 'high' as const, status: 'flagged' as const },
    { id: 3, date: '2025-01-05', amount: 1000000000, donor: 'Foreign Corp Ltd', risk: 'high' as const, status: 'pending' as const }
  ]
};

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function CandidateRiskModal({ 
  candidate, 
  onClose, 
  formatAmount 
}: RiskModalProps) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Risk Analysis - {candidate.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{candidate.riskScore}%</div>
                  <div className="text-sm text-gray-600">Overall Risk Score</div>
                  <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(candidate.riskLevel)}`}>
                    {candidate.riskLevel.toUpperCase()} RISK
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{mockRiskData.factors.length}</div>
                  <div className="text-sm text-gray-600">Risk Factors</div>
                  <div className="mt-2 text-xs text-gray-500">Identified threats</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{mockRiskData.transactions.filter(t => t.risk === 'high').length}</div>
                  <div className="text-sm text-gray-600">High Risk Transactions</div>
                  <div className="mt-2 text-xs text-gray-500">Requires attention</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Factors Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRiskData.factors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{factor.name}</div>
                        <div className="text-sm text-gray-600">Impact: {factor.impact}</div>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{factor.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suspicious Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRiskData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{transaction.donor}</div>
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                        <div className="text-sm font-semibold">{formatAmount(transaction.amount)}</div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(transaction.risk)}`}>
                          {transaction.risk.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{transaction.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button className="flex-1">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 