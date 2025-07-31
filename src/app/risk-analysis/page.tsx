'use client';

import { useState, useMemo } from 'react';
import { 
  AlertTriangle, Shield, TrendingUp, TrendingDown, 
  Filter, Search, Download, Eye, BarChart3, 
  PieChart, Activity, Target, CheckCircle, Clock, XCircle 
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

interface RiskData {
  id: string;
  donor: string;
  recipient: string;
  amount: number;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'confirmed' | 'flagged' | 'pending';
  date: string;
  source: string;
  anomalies: string[];
}

// Mock data for risk analysis
const mockRiskData: RiskData[] = [
  {
    id: '1',
    donor: 'Citra Wijaya',
    recipient: 'Ganjar Pranowo',
    amount: 196541744,
    riskScore: 15,
    riskLevel: 'low',
    status: 'confirmed',
    date: '2025-01-22',
    source: 'Web Scrape',
    anomalies: []
  },
  {
    id: '2',
    donor: 'Eko Prasetyo',
    recipient: 'Prabowo Subianto',
    amount: 96535744,
    riskScore: 85,
    riskLevel: 'high',
    status: 'flagged',
    date: '2024-09-01',
    source: 'Digital Form',
    anomalies: ['Unusual amount pattern', 'Multiple small donations']
  },
  {
    id: '3',
    donor: 'PT Maju Jaya',
    recipient: 'Anies Baswedan',
    amount: 396405204,
    riskScore: 25,
    riskLevel: 'low',
    status: 'confirmed',
    date: '2024-12-15',
    source: 'Paper (OCR)',
    anomalies: []
  },
  {
    id: '4',
    donor: 'Partai Kemajuan Rakyat',
    recipient: 'Ganjar Pranowo',
    amount: 26400000,
    riskScore: 45,
    riskLevel: 'medium',
    status: 'pending',
    date: '2024-06-29',
    source: 'Web Scrape',
    anomalies: ['Party donation pattern']
  },
  {
    id: '5',
    donor: 'Partai Persatuan Indonesia',
    recipient: 'Anies Baswedan',
    amount: 111111111,
    riskScore: 75,
    riskLevel: 'high',
    status: 'flagged',
    date: '2024-08-12',
    source: 'Digital Form',
    anomalies: ['Suspicious amount', 'Pattern matching']
  }
];

export default function RiskAnalysisPage() {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return mockRiskData.filter(item => {
      const matchesRiskLevel = selectedRiskLevel === 'all' || item.riskLevel === selectedRiskLevel;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesSearch = searchTerm === '' || 
        item.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.recipient.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesRiskLevel && matchesStatus && matchesSearch;
    });
  }, [selectedRiskLevel, selectedStatus, searchTerm]);

  const riskStats = useMemo(() => {
    const total = mockRiskData.length;
    const highRisk = mockRiskData.filter(item => item.riskLevel === 'high').length;
    const mediumRisk = mockRiskData.filter(item => item.riskLevel === 'medium').length;
    const lowRisk = mockRiskData.filter(item => item.riskLevel === 'low').length;
    const flagged = mockRiskData.filter(item => item.status === 'flagged').length;
    const confirmed = mockRiskData.filter(item => item.status === 'confirmed').length;
    const pending = mockRiskData.filter(item => item.status === 'pending').length;

    return {
      total,
      highRisk,
      mediumRisk,
      lowRisk,
      flagged,
      confirmed,
      pending,
      averageRiskScore: mockRiskData.reduce((sum, item) => sum + item.riskScore, 0) / total
    };
  }, []);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'flagged':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const RiskAnalysisContent = () => (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
          <p className="mt-2 text-gray-600">
            AI-powered risk assessment and anomaly detection for donation transactions
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{riskStats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-gray-900">{riskStats.highRisk}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-gray-900">{riskStats.flagged}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Risk Score</p>
                <p className="text-2xl font-bold text-gray-900">{riskStats.averageRiskScore.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Risk Level Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Level Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={[
                    { name: 'Low Risk', value: riskStats.lowRisk, color: '#10B981' },
                    { name: 'Medium Risk', value: riskStats.mediumRisk, color: '#F59E0B' },
                    { name: 'High Risk', value: riskStats.highRisk, color: '#EF4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {[
                    { name: 'Low Risk', value: riskStats.lowRisk, color: '#10B981' },
                    { name: 'Medium Risk', value: riskStats.mediumRisk, color: '#F59E0B' },
                    { name: 'High Risk', value: riskStats.highRisk, color: '#EF4444' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">High Risk</span>
              </div>
            </div>
          </div>

          {/* Risk Score Trend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Jan', avgRisk: 35 },
                { month: 'Feb', avgRisk: 42 },
                { month: 'Mar', avgRisk: 38 },
                { month: 'Apr', avgRisk: 45 },
                { month: 'May', avgRisk: 52 },
                { month: 'Jun', avgRisk: 48 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgRisk" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by donor or recipient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
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
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="flagged">Flagged</option>
                <option value="pending">Pending</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Risk Analysis Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Risk Analysis Results</h3>
            <p className="text-sm text-gray-600">
              Detailed risk assessment for all transactions
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DONOR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    RECIPIENT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AMOUNT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    RISK SCORE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ANOMALIES
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.donor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.recipient}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(item.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">{item.riskScore}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(item.riskLevel)}`}>
                          {item.riskLevel.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.anomalies.length > 0 ? (
                        <div className="text-sm text-gray-900">
                          {item.anomalies.map((anomaly, index) => (
                            <div key={index} className="text-xs text-red-600">• {anomaly}</div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">None detected</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <AlertTriangle className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <RiskAnalysisContent />
    </DashboardLayout>
  );
} 