'use client';

import { useState, useMemo } from 'react';
import { 
  FileText, Download, Filter, Search, Calendar, 
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity,
  Eye, Share2, Printer, Mail, AlertTriangle, CheckCircle
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

interface ReportData {
  id: string;
  title: string;
  type: 'donation' | 'risk' | 'candidate' | 'network';
  status: 'generated' | 'pending' | 'failed';
  createdAt: string;
  lastUpdated: string;
  size: string;
  format: 'pdf' | 'csv' | 'excel';
}

// Mock data for reports
const mockReports: ReportData[] = [
  {
    id: '1',
    title: 'Monthly Donation Report - January 2025',
    type: 'donation',
    status: 'generated',
    createdAt: '2025-01-22',
    lastUpdated: '2025-01-22',
    size: '2.4 MB',
    format: 'pdf'
  },
  {
    id: '2',
    title: 'Risk Analysis Summary - Q4 2024',
    type: 'risk',
    status: 'generated',
    createdAt: '2025-01-21',
    lastUpdated: '2025-01-21',
    size: '1.8 MB',
    format: 'pdf'
  },
  {
    id: '3',
    title: 'Candidate Performance Report',
    type: 'candidate',
    status: 'pending',
    createdAt: '2025-01-20',
    lastUpdated: '2025-01-20',
    size: '0 KB',
    format: 'excel'
  },
  {
    id: '4',
    title: 'Network Analysis - December 2024',
    type: 'network',
    status: 'generated',
    createdAt: '2025-01-19',
    lastUpdated: '2025-01-19',
    size: '3.2 MB',
    format: 'csv'
  },
  {
    id: '5',
    title: 'Anomaly Detection Report',
    type: 'risk',
    status: 'failed',
    createdAt: '2025-01-18',
    lastUpdated: '2025-01-18',
    size: '0 KB',
    format: 'pdf'
  }
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('30d');

  const filteredReports = useMemo(() => {
    return mockReports.filter(report => {
      const matchesType = selectedType === 'all' || report.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
      const matchesFormat = selectedFormat === 'all' || report.format === selectedFormat;
      const matchesSearch = searchTerm === '' || 
        report.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesStatus && matchesFormat && matchesSearch;
    });
  }, [selectedType, selectedStatus, selectedFormat, searchTerm]);

  const reportStats = useMemo(() => {
    const total = mockReports.length;
    const generated = mockReports.filter(r => r.status === 'generated').length;
    const pending = mockReports.filter(r => r.status === 'pending').length;
    const failed = mockReports.filter(r => r.status === 'failed').length;

    return {
      total,
      generated,
      pending,
      failed
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'generated':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Activity className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'risk':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'candidate':
        return <BarChart3 className="h-4 w-4 text-green-500" />;
      case 'network':
        return <PieChart className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const ReportsContent = () => (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600">
            Generate and manage comprehensive reports for donation analysis and risk assessment
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Generated</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.generated}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{reportStats.failed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Report Type Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Report Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={[
                    { name: 'Donation', value: 1, color: '#3B82F6' },
                    { name: 'Risk', value: 2, color: '#EF4444' },
                    { name: 'Candidate', value: 1, color: '#10B981' },
                    { name: 'Network', value: 1, color: '#8B5CF6' }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {[
                    { name: 'Donation', value: 1, color: '#3B82F6' },
                    { name: 'Risk', value: 2, color: '#EF4444' },
                    { name: 'Candidate', value: 1, color: '#10B981' },
                    { name: 'Network', value: 1, color: '#8B5CF6' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Report Generation Trend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Report Generation Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { month: 'Oct', reports: 12 },
                { month: 'Nov', reports: 18 },
                { month: 'Dec', reports: 15 },
                { month: 'Jan', reports: 22 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reports" stroke="#3B82F6" strokeWidth={2} />
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
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="donation">Donation</option>
                <option value="risk">Risk</option>
                <option value="candidate">Candidate</option>
                <option value="network">Network</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="generated">Generated</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Formats</option>
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Generated Reports</h3>
            <p className="text-sm text-gray-600">
              {filteredReports.length} reports found
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    REPORT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TYPE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SIZE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CREATED
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            {getTypeIcon(report.type)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500">{report.format.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{report.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(report.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Donation Report</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Generate comprehensive donation analysis with trends and patterns
            </p>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Generate Report
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Risk Analysis</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Create detailed risk assessment reports with anomaly detection
            </p>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Generate Report
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Candidate Report</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Analyze candidate performance and donation patterns
            </p>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <ReportsContent />
    </DashboardLayout>
  );
} 