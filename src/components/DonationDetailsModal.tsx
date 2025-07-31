'use client';

import { useState } from 'react';
import { 
  X, Edit, Trash2, Download, Share2, Flag, CheckCircle, AlertCircle, Clock,
  User, Building, Users, Calendar, DollarSign, FileText, Copy, ExternalLink,
  History, TrendingUp, Shield, AlertTriangle, Eye, EyeOff
} from 'lucide-react';

interface Donation {
  id: number;
  date: string;
  donor: { name: string; type: string };
  recipient: string;
  amount: number;
  source: string;
  risk: string;
  status: string;
}

interface DonationDetailsModalProps {
  donation: Donation | null;
  onClose: () => void;
  onEdit: (donation: Donation) => void;
  onDelete: (donation: Donation) => void;
  onExport: (donation: Donation) => void;
  onShare: (donation: Donation) => void;
}

const DonationDetailsModal: React.FC<DonationDetailsModalProps> = ({
  donation, onClose, onEdit, onDelete, onExport, onShare
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'analytics'>('details');
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  if (!donation) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Confirmed': return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'Flagged': return { color: 'bg-red-100 text-red-800', icon: AlertCircle };
      case 'Pending': return { color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      default: return { color: 'bg-gray-100 text-gray-800', icon: Clock };
    }
  };

  const getRiskInfo = (risk: string) => {
    switch (risk) {
      case 'Low': return { color: 'bg-green-100 text-green-800', icon: Shield };
      case 'Medium': return { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
      case 'High': return { color: 'bg-red-100 text-red-800', icon: AlertCircle };
      default: return { color: 'bg-gray-100 text-gray-800', icon: Shield };
    }
  };

  const getSourceInfo = (source: string) => {
    switch (source) {
      case 'Web Scrape': return { color: 'bg-green-100 text-green-800', icon: ExternalLink };
      case 'Digital Form': return { color: 'bg-blue-100 text-blue-800', icon: FileText };
      case 'Paper (OCR)': return { color: 'bg-yellow-100 text-yellow-800', icon: FileText };
      default: return { color: 'bg-gray-100 text-gray-800', icon: FileText };
    }
  };

  const getDonorTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return User;
      case 'company': return Building;
      case 'party': return Users;
      default: return User;
    }
  };

  const timelineData = [
    { id: 1, date: donation.date, time: '14:30', event: 'Donation Recorded', description: 'Donation was successfully recorded in the system', status: 'completed', icon: CheckCircle },
    { id: 2, date: donation.date, time: '14:35', event: 'Risk Assessment', description: `Risk level assessed as ${donation.risk}`, status: 'completed', icon: Shield },
    { id: 3, date: donation.date, time: '15:00', event: 'Verification Process', description: 'Donor information verified against database', status: 'completed', icon: CheckCircle },
    { id: 4, date: donation.date, time: '15:30', event: 'Status Update', description: `Status updated to ${donation.status}`, status: 'completed', icon: CheckCircle }
  ];

  const analyticsData = {
    totalDonations: 1250,
    averageAmount: 150000000,
    topRecipient: 'Ganjar Pranowo',
    riskDistribution: { low: 65, medium: 25, high: 10 },
    sourceDistribution: { 'Web Scrape': 40, 'Digital Form': 35, 'Paper (OCR)': 25 }
  };

  const StatusIcon = getStatusInfo(donation.status).icon;
  const RiskIcon = getRiskInfo(donation.risk).icon;
  const SourceIcon = getSourceInfo(donation.source).icon;
  const DonorIcon = getDonorTypeIcon(donation.donor.type);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Donation Details</h3>
                <p className="text-sm text-gray-600">ID: #{donation.id} • {donation.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => copyToClipboard(`Donation ID: ${donation.id}`)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100" title="Copy ID">
                <Copy className="h-4 w-4" />
              </button>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-3 border-b border-gray-200 flex-shrink-0">
          <div className="flex space-x-8">
            {[
              { id: 'details', label: 'Details', icon: Eye },
              { id: 'timeline', label: 'Timeline', icon: History },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as 'details' | 'timeline' | 'analytics')} className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}>
                  <TabIcon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'details' && (
            <div className="p-6 space-y-6">
              {/* Status and Risk Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusInfo(donation.status).color}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Status</p>
                      <p className={`text-sm font-semibold ${getStatusInfo(donation.status).color.replace('bg-', 'text-').replace('-100', '-800')}`}>
                        {donation.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getRiskInfo(donation.risk).color}`}>
                      <RiskIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Risk Level</p>
                      <p className={`text-sm font-semibold ${getRiskInfo(donation.risk).color.replace('bg-', 'text-').replace('-100', '-800')}`}>
                        {donation.risk}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getSourceInfo(donation.source).color}`}>
                      <SourceIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Source</p>
                      <p className={`text-sm font-semibold ${getSourceInfo(donation.source).color.replace('bg-', 'text-').replace('-100', '-800')}`}>
                        {donation.source}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Donor Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <DonorIcon className="h-5 w-5 mr-2 text-gray-600" />
                    Donor Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{donation.donor.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                          donation.donor.type === 'individual' ? 'bg-blue-100 text-blue-800' :
                          donation.donor.type === 'company' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {donation.donor.type}
                        </span>
                        <DonorIcon className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <p className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(donation.amount)}</p>
                    </div>
                  </div>
                </div>

                {/* Recipient Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-600" />
                    Recipient Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Recipient</label>
                      <p className="mt-1 text-sm text-gray-900">{donation.recipient}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{donation.date}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className="text-sm font-mono text-gray-900">#{donation.id}</span>
                        <button onClick={() => copyToClipboard(`#${donation.id}`)} className="text-gray-400 hover:text-gray-600">
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Verification Status</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-900">Verified</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Compliance Check</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-900">Passed</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                    <p className="mt-1 text-sm text-gray-900">{donation.date} at 15:30</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created By</label>
                    <p className="mt-1 text-sm text-gray-900">System Auto-Import</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Transaction Timeline</h4>
              <div className="space-y-4">
                {timelineData.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <ItemIcon className={`h-4 w-4 ${
                            item.status === 'completed' ? 'text-green-600' : 'text-gray-400'
                          }`} />
                        </div>
                        {index < timelineData.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{item.event}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6 space-y-6">
              <h4 className="text-lg font-semibold text-gray-900">Analytics Overview</h4>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Donations</p>
                      <p className="text-2xl font-bold text-gray-900">{analyticsData.totalDonations.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Amount</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.averageAmount)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Top Recipient</p>
                      <p className="text-lg font-semibold text-gray-900">{analyticsData.topRecipient}</p>
                    </div>
                    <User className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Charts Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h5>
                  <div className="space-y-3">
                    {Object.entries(analyticsData.riskDistribution).map(([risk, percentage]) => (
                      <div key={risk} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 capitalize">{risk}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${
                              risk === 'low' ? 'bg-green-500' : risk === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Source Distribution</h5>
                  <div className="space-y-3">
                    {Object.entries(analyticsData.sourceDistribution).map(([source, percentage]) => (
                      <div key={source} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{source}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${
                              source === 'Web Scrape' ? 'bg-green-500' : source === 'Digital Form' ? 'bg-blue-500' : 'bg-yellow-500'
                            }`} style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-600">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => setShowSensitiveInfo(!showSensitiveInfo)} className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                {showSensitiveInfo ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {showSensitiveInfo ? 'Hide' : 'Show'} Sensitive Info
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button onClick={() => onShare(donation)} className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              <button onClick={() => onExport(donation)} className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button onClick={() => onEdit(donation)} className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button onClick={() => onDelete(donation)} className="flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetailsModal; 