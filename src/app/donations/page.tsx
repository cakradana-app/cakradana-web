'use client';

import { useState } from 'react';
import { BarChart3, List, Plus } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import DonationForm from '@/components/DonationForm';
import DonationsTable from '@/components/DonationsTable';
import DonationDetailsModal from '@/components/DonationDetailsModal';
import DonationsAnalytics from '@/components/DonationsAnalytics';

// Import the form data type
interface DonationFormData {
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  donorAddress: string;
  donorType: string;
  recipient: string;
  amount: number;
  paymentMethod: string;
  donationDate: Date;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  proofOfPayment: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supportingDocuments?: any;
}

// Define the donation type
interface Donation {
  id: number;
  date: string;
  donor: {
    name: string;
    type: 'individual' | 'company' | 'party';
  };
  recipient: string;
  amount: number;
  source: string;
  risk: 'Low' | 'Medium' | 'High';
  status: 'Confirmed' | 'Flagged' | 'Pending';
  campaign: string;
}

// Sample data based on the screenshot
const sampleDonations: Donation[] = [
  {
    id: 1,
    date: '22 Jan 2025',
    donor: { name: 'Citra Wijaya', type: 'individual' },
    recipient: 'Ganjar Pranowo',
    amount: 196541744,
    source: 'Web Scrape',
    risk: 'Low',
    status: 'Confirmed',
    campaign: 'Presidential Campaign 2024'
  },
  {
    id: 2,
    date: '01 Sep 2024',
    donor: { name: 'Eko Prasetyo', type: 'individual' },
    recipient: 'Prabowo Subianto',
    amount: 96535744,
    source: 'Digital Form',
    risk: 'High',
    status: 'Flagged',
    campaign: 'Presidential Campaign 2024'
  },
  {
    id: 3,
    date: '15 Des 2024',
    donor: { name: 'PT Maju Jaya', type: 'company' },
    recipient: 'Anies Baswedan',
    amount: 396405204,
    source: 'Paper (OCR)',
    risk: 'Low',
    status: 'Confirmed',
    campaign: 'Presidential Campaign 2024'
  },
  {
    id: 4,
    date: '29 Jun 2024',
    donor: { name: 'Partai Kemajuan Rakyat', type: 'party' },
    recipient: 'Ganjar Pranowo',
    amount: 26400000,
    source: 'Paper (OCR)',
    risk: 'Medium',
    status: 'Pending',
    campaign: 'Party Support Campaign'
  },
  {
    id: 5,
    date: '27 April 2024',
    donor: { name: 'Partai Persatuan Indonesia', type: 'party' },
    recipient: 'Prabowo Subianto',
    amount: 111111111,
    source: 'Web Scrape',
    risk: 'High',
    status: 'Flagged',
    campaign: 'Party Support Campaign'
  }
];



// Donations Content Component
const DonationsContent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donations, setDonations] = useState(sampleDonations);
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');

  const handleFormSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    
    // Add new donation to the list (in real app, this would be an API call)
    const newDonation: Donation = {
      id: donations.length + 1,
      date: data.donationDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      donor: { 
        name: data.donorName, 
        type: data.donorType as 'individual' | 'company' | 'party'
      },
      recipient: data.recipient,
      amount: data.amount,
      source: 'Digital Form',
      risk: 'Low', // Default risk, would be calculated based on business logic
      status: 'Pending',
      campaign: 'General Campaign'
    };
    
    // Add to state
    setDonations(prev => [newDonation, ...prev]);
    
    setIsSubmitting(false);
    setShowDonationForm(false);
    
    // Show success message (in real app, use toast notification)
    alert('Donasi berhasil ditambahkan!');
  };

  const handleFormCancel = () => {
    setShowDonationForm(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewDetails = (donation: any) => {
    setSelectedDonation(donation);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (donation: any) => {
    // In real app, this would open an edit form
    console.log('Edit donation:', donation);
    alert(`Edit donation: ${donation.donor.name}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (donation: any) => {
    if (confirm(`Are you sure you want to delete donation from ${donation.donor.name}?`)) {
      setDonations(prev => prev.filter(d => d.id !== donation.id));
      alert('Donation deleted successfully!');
    }
  };

  const handleBulkDelete = (ids: number[]) => {
    if (confirm(`Are you sure you want to delete ${ids.length} selected donations?`)) {
      setDonations(prev => prev.filter(d => !ids.includes(d.id)));
      alert(`${ids.length} donations deleted successfully!`);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleExport = (donation: any) => {
    console.log('Export donation:', donation);
    alert(`Exporting donation: ${donation.donor.name}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleShare = (donation: any) => {
    console.log('Share donation:', donation);
    alert(`Sharing donation: ${donation.donor.name}`);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-600">View and manage all donation transactions</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('list')}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'list'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <List className="h-4 w-4" />
                <span>Donations List</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'list' && (
          <>
            {/* Actions Bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  Total: <span className="font-medium">{donations.length}</span> donations
                </div>
                <div className="text-sm text-gray-700">
                  Confirmed: <span className="font-medium text-green-600">
                    {donations.filter(d => d.status === 'Confirmed').length}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  Pending: <span className="font-medium text-yellow-600">
                    {donations.filter(d => d.status === 'Pending').length}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  Flagged: <span className="font-medium text-red-600">
                    {donations.filter(d => d.status === 'Flagged').length}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowDonationForm(true)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Donation</span>
                </button>
              </div>
            </div>

            {/* Advanced Donations Table */}
            <DonationsTable
              donations={donations}
              onViewDetails={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBulkDelete={handleBulkDelete}
            />
          </>
        )}

        {activeTab === 'analytics' && (
          <DonationsAnalytics 
            donations={donations}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <DonationForm
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      )}

      {/* Advanced Donation Details Modal */}
      <DonationDetailsModal
        donation={selectedDonation}
        onClose={() => setSelectedDonation(null)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
        onShare={handleShare}
      />
    </div>
  );
};

// Main Page Component using DashboardLayout
export default function DonationsPage() {
  return (
    <DashboardLayout>
      <DonationsContent />
    </DashboardLayout>
  );
} 