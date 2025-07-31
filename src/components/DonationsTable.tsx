'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  MoreHorizontal,
  Download,
  Upload,
  Calendar,
  DollarSign,
  User,
  Building,
  Users
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

interface DonationsTableProps {
  donations: Donation[];
  onViewDetails: (donation: Donation) => void;
  onEdit: (donation: Donation) => void;
  onDelete: (donation: Donation) => void;
  onBulkDelete: (ids: number[]) => void;
}

type SortField = 'date' | 'donor' | 'recipient' | 'amount' | 'source' | 'risk' | 'status';
type SortDirection = 'asc' | 'desc';

const DonationsTable: React.FC<DonationsTableProps> = ({
  donations,
  onViewDetails,
  onEdit,
  onDelete,
  onBulkDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    status: '',
    risk: '',
    source: '',
    donorType: ''
  });
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter options
  const filterOptions = {
    status: ['Confirmed', 'Flagged', 'Pending'],
    risk: ['Low', 'Medium', 'High'],
    source: ['Web Scrape', 'Digital Form', 'Paper (OCR)'],
    donorType: ['individual', 'company', 'party']
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get color classes
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Flagged': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Web Scrape': return 'bg-green-100 text-green-800';
      case 'Digital Form': return 'bg-blue-100 text-blue-800';
      case 'Paper (OCR)': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = donations.filter(donation => {
      const matchesSearch = 
        donation.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.donor.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !selectedFilters.status || donation.status === selectedFilters.status;
      const matchesRisk = !selectedFilters.risk || donation.risk === selectedFilters.risk;
      const matchesSource = !selectedFilters.source || donation.source === selectedFilters.source;
      const matchesDonorType = !selectedFilters.donorType || donation.donor.type === selectedFilters.donorType;

      return matchesSearch && matchesStatus && matchesRisk && matchesSource && matchesDonorType;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'donor':
          aValue = a.donor.name;
          bValue = b.donor.name;
          break;
        case 'recipient':
          aValue = a.recipient;
          bValue = b.recipient;
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'source':
          aValue = a.source;
          bValue = b.source;
          break;
        case 'risk':
          aValue = a.risk;
          bValue = b.risk;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [donations, searchTerm, selectedFilters, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle filter change
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedItems.length === currentData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentData.map(item => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedItems.length > 0) {
      onBulkDelete(selectedItems);
      setSelectedItems([]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      status: '',
      risk: '',
      source: '',
      donorType: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronDown className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-gray-600" />
      : <ChevronDown className="h-4 w-4 text-gray-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header with Search and Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700 border border-blue-300'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            {selectedItems.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-300 rounded-md hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedItems.length})
              </button>
            )}

            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedFilters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  {filterOptions.status.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                <select
                  value={selectedFilters.risk}
                  onChange={(e) => handleFilterChange('risk', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Risk Levels</option>
                  {filterOptions.risk.map(risk => (
                    <option key={risk} value={risk}>{risk}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <select
                  value={selectedFilters.source}
                  onChange={(e) => handleFilterChange('source', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Sources</option>
                  {filterOptions.source.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Donor Type</label>
                <select
                  value={selectedFilters.donorType}
                  onChange={(e) => handleFilterChange('donorType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {filterOptions.donorType.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === currentData.length && currentData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  DATE
                  <SortIcon field="date" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('donor')}
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  DONOR
                  <SortIcon field="donor" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('recipient')}
              >
                <div className="flex items-center">
                  RECIPIENT
                  <SortIcon field="recipient" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  AMOUNT
                  <SortIcon field="amount" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('source')}
              >
                <div className="flex items-center">
                  SOURCE
                  <SortIcon field="source" />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('risk')}
              >
                <div className="flex items-center">
                  RISK
                  <SortIcon field="risk" />
                </div>
              </th>
              <th 
                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  STATUS
                  <SortIcon field="status" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((donation) => {
              const DonorIcon = getDonorTypeIcon(donation.donor.type);
              return (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(donation.id)}
                      onChange={() => handleSelectItem(donation.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DonorIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{donation.donor.name}</div>
                        <div className="text-sm text-gray-500 capitalize">{donation.donor.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.recipient}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(donation.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSourceColor(donation.source)}`}>
                      {donation.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(donation.risk)}`}>
                      {donation.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewDetails(donation)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(donation)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(donation)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="More">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, filteredAndSortedData.length)}</span> of{' '}
              <span className="font-medium">{filteredAndSortedData.length}</span> results
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">per page</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'text-white bg-blue-600 border border-blue-600'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationsTable; 