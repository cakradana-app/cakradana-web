'use client';

import { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  RefreshCw, Trophy, Medal, Award, Download
} from 'lucide-react';
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
  AreaChart,
  Area
} from 'recharts';

interface Donation {
  id: number;
  date: string;
  donor: { name: string; type: string };
  recipient: string;
  amount: number;
  source: string;
  risk: string;
  status: string;
  campaign?: string;
}

interface DonationsAnalyticsProps {
  donations: Donation[];
  onViewDetails: (donation: Donation) => void;
}

// Mockup data for charts
const mockupData = {
  // Status breakdown data
  statusData: [
    { name: 'Confirmed', value: 65, color: '#10B981' },
    { name: 'Pending', value: 20, color: '#F59E0B' },
    { name: 'Flagged', value: 15, color: '#EF4444' }
  ],
  
  // Risk level data
  riskData: [
    { name: 'Low', value: 70, color: '#10B981' },
    { name: 'Medium', value: 20, color: '#F59E0B' },
    { name: 'High', value: 10, color: '#EF4444' }
  ],
  
  // Data source data
  sourceData: [
    { name: 'Web Scrape', value: 45, color: '#3B82F6' },
    { name: 'Digital Form', value: 35, color: '#10B981' },
    { name: 'Paper (OCR)', value: 20, color: '#F59E0B' }
  ],
  
  // Monthly trend data
  monthlyData: [
    { month: 'Aug 2024', amount: 150000000, count: 12 },
    { month: 'Sep 2024', amount: 280000000, count: 18 },
    { month: 'Oct 2024', amount: 320000000, count: 22 },
    { month: 'Nov 2024', amount: 450000000, count: 25 },
    { month: 'Dec 2024', amount: 380000000, count: 20 },
    { month: 'Jan 2025', amount: 520000000, count: 28 },
    { month: 'Feb 2025', amount: 480000000, count: 24 },
    { month: 'Mar 2025', amount: 600000000, count: 30 },
    { month: 'Apr 2025', amount: 550000000, count: 27 },
    { month: 'May 2025', amount: 680000000, count: 32 },
    { month: 'Jun 2025', amount: 720000000, count: 35 },
    { month: 'Jul 2025', amount: 800000000, count: 38 }
  ],
  
  // Donor type data
  donorTypeData: [
    { name: 'Individual', value: 60, color: '#3B82F6' },
    { name: 'Company', value: 25, color: '#10B981' },
    { name: 'Party', value: 15, color: '#F59E0B' }
  ],
  
  // Campaign performance data
  campaignData: [
    { name: 'Presidential Campaign 2024', amount: 1200000000, success: 85 },
    { name: 'Party Support Campaign', amount: 800000000, success: 78 },
    { name: 'Local Election Campaign', amount: 500000000, success: 92 },
    { name: 'Special Fund Campaign', amount: 300000000, success: 88 }
  ]
};

// Top donors ranking data
const topDonorsData = [
  { rank: 1, name: 'PT Maju Jaya', type: 'Company', totalAmount: 396405204, donations: 3, icon: Trophy },
  { rank: 2, name: 'Partai Persatuan Indonesia', type: 'Party', totalAmount: 111111111, donations: 2, icon: Medal },
  { rank: 3, name: 'Citra Wijaya', type: 'Individual', totalAmount: 196541744, donations: 1, icon: Award },
  { rank: 4, name: 'Eko Prasetyo', type: 'Individual', totalAmount: 96535744, donations: 1, icon: Award },
  { rank: 5, name: 'Partai Kemajuan Rakyat', type: 'Party', totalAmount: 26400000, donations: 1, icon: Award }
];

// Top recipients data
const topRecipientsData = [
  { rank: 1, name: 'Ganjar Pranowo', totalAmount: 222941744, donations: 2 },
  { rank: 2, name: 'Prabowo Subianto', totalAmount: 207646855, donations: 2 },
  { rank: 3, name: 'Anies Baswedan', totalAmount: 396405204, donations: 1 }
];

const DonationsAnalytics = ({ donations }: DonationsAnalyticsProps) => {
  const [chartType, setChartType] = useState<'amount' | 'count'>('amount');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalDonations = donations.length;
    const averageAmount = totalDonations > 0 ? totalAmount / totalDonations : 0;
    const highRiskCount = donations.filter(d => d.risk === 'High').length;
    const successRate = donations.filter(d => d.status === 'Confirmed').length / totalDonations * 100;

    return {
      totalAmount,
      totalDonations,
      averageAmount,
      highRiskCount,
      successRate
    };
  }, [donations]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Handle export
  const handleExport = () => {
    alert('Exporting analytics data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Donations Analytics</h2>
          <p className="text-sm text-gray-600">Comprehensive insights into donation patterns and trends</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalAmount)}</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium ml-1">+12.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalDonations}</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium ml-1">+8.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.averageAmount)}</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium ml-1">+5.7%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.successRate.toFixed(1)}%</p>
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium ml-1">+2.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={mockupData.statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockupData.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Donations']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockupData.riskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Donations']} />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Source Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Source Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={mockupData.sourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockupData.sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Donations']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donor Type Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={mockupData.donorTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockupData.donorTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Donations']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Donors Ranking Table */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Donors Ranking</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donations</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topDonorsData.map((donor) => {
                const IconComponent = donor.icon;
                return (
                  <tr key={donor.rank} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <IconComponent className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">#{donor.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {donor.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(donor.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {donor.donations}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Recipients */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recipients</h3>
        <div className="space-y-4">
          {topRecipientsData.map((recipient) => (
            <div key={recipient.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
                  <span className="text-sm font-bold text-blue-600">#{recipient.rank}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                  <p className="text-xs text-gray-500">{recipient.donations} donations</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(recipient.totalAmount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
        <div className="space-y-4">
          {mockupData.campaignData.map((campaign, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${campaign.success}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{campaign.success}% success</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(campaign.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Trend</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setChartType('amount')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                chartType === 'amount'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Amount
            </button>
            <button
              onClick={() => setChartType('count')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                chartType === 'count'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Count
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockupData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [
                  chartType === 'amount' 
                    ? formatCurrency(value as number)
                    : value,
                  chartType === 'amount' ? 'Amount' : 'Count'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey={chartType === 'amount' ? 'amount' : 'count'} 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DonationsAnalytics; 