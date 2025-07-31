'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Upload, X, CheckCircle, User, Building, Users, DollarSign, FileText, CreditCard, Banknote } from 'lucide-react';

// Validation schema
const donationSchema = yup.object({
  donorName: yup.string().required('Nama donor wajib diisi'),
  donorEmail: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  donorPhone: yup.string().required('Nomor telepon wajib diisi'),
  donorAddress: yup.string().required('Alamat wajib diisi'),
  donorType: yup.string().required('Tipe donor wajib dipilih'),
  recipient: yup.string().required('Penerima wajib dipilih'),
  amount: yup.number().positive('Jumlah harus positif').required('Jumlah donasi wajib diisi'),
  paymentMethod: yup.string().required('Metode pembayaran wajib dipilih'),
  donationDate: yup.date().required('Tanggal donasi wajib diisi'),
  description: yup.string().optional(),
  proofOfPayment: yup.mixed().required('Bukti pembayaran wajib diupload'),
  supportingDocuments: yup.mixed().optional(),
});

// Explicit type definition to avoid Yup inference issues
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

interface DonationFormProps {
  onSubmit: (data: DonationFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DonationForm: React.FC<DonationFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm<DonationFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(donationSchema) as any,
    mode: 'onChange'
  });

  const watchedValues = watch();

  const donorTypeOptions = [
    { value: 'individual', label: 'Individual', icon: User },
    { value: 'company', label: 'Company', icon: Building },
    { value: 'party', label: 'Party', icon: Users }
  ];

  const recipientOptions = [
    { value: 'Ganjar Pranowo', label: 'Ganjar Pranowo' },
    { value: 'Prabowo Subianto', label: 'Prabowo Subianto' },
    { value: 'Anies Baswedan', label: 'Anies Baswedan' }
  ];

  const paymentMethodOptions = [
    { value: 'transfer', label: 'Transfer Bank', icon: Banknote },
    { value: 'cash', label: 'Cash', icon: DollarSign },
    { value: 'credit_card', label: 'Credit Card', icon: CreditCard }
  ];

  const handleFileUpload = (fieldName: string, files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
      setValue(fieldName as keyof DonationFormData, file);
      trigger(fieldName as keyof DonationFormData);
    }
  };

  const removeFile = (fieldName: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fieldName];
      return newFiles;
    });
    setValue(fieldName as keyof DonationFormData, undefined);
    trigger(fieldName as keyof DonationFormData);
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue) {
      return new Intl.NumberFormat('id-ID').format(parseInt(numericValue));
    }
    return '';
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCurrency(e.target.value);
    e.target.value = formattedValue;
    const numericValue = parseInt(e.target.value.replace(/\D/g, ''));
    setValue('amount', numericValue);
    trigger('amount');
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isValidStep = await trigger(fieldsToValidate as any);
    
    if (isValidStep && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ['donorName', 'donorEmail', 'donorPhone', 'donorAddress', 'donorType'];
      case 2:
        return ['recipient', 'amount', 'paymentMethod', 'donationDate'];
      case 3:
        return ['description', 'proofOfPayment', 'supportingDocuments'];
      default:
        return [];
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return 'Informasi Donor';
      case 2:
        return 'Detail Donasi';
      case 3:
        return 'Dokumen Pendukung';
      default:
        return '';
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1:
        return 'Masukkan informasi lengkap donor';
      case 2:
        return 'Pilih penerima dan jumlah donasi';
      case 3:
        return 'Upload dokumen pendukung';
      default:
        return '';
    }
  };



  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Tambah Donasi Baru</h2>
            <p className="text-sm text-gray-600">Lengkapi form di bawah untuk menambah donasi</p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep > index + 1 
                  ? 'bg-green-500 border-green-500 text-white'
                  : currentStep === index + 1
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-500'
              }`}>
                {currentStep > index + 1 ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {index < totalSteps - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">{getStepTitle(currentStep)}</h3>
          <p className="text-sm text-gray-600">{getStepDescription(currentStep)}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Informasi Donor</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Donor *
                </label>
                <input
                  type="text"
                  {...register('donorName')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.donorName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nama donor"
                />
                {errors.donorName && (
                  <p className="mt-1 text-sm text-red-600">{errors.donorName.message?.toString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('donorEmail')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.donorEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="email@example.com"
                />
                {errors.donorEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.donorEmail.message?.toString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  {...register('donorPhone')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.donorPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="08123456789"
                />
                {errors.donorPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.donorPhone.message?.toString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Donor *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {donorTypeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <label
                        key={option.value}
                        className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          watchedValues.donorType === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register('donorType')}
                          className="sr-only"
                        />
                        <Icon className="h-6 w-6 mb-2 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.donorType && (
                  <p className="mt-1 text-sm text-red-600">{errors.donorType.message?.toString()}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat *
              </label>
              <textarea
                {...register('donorAddress')}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.donorAddress ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan alamat lengkap"
              />
              {errors.donorAddress && (
                                  <p className="mt-1 text-sm text-red-600">{errors.donorAddress.message?.toString()}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Detail Donasi</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penerima Donasi *
                </label>
                <select
                  {...register('recipient')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.recipient ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih penerima</option>
                  {recipientOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.recipient && (
                  <p className="mt-1 text-sm text-red-600">{errors.recipient.message?.toString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Donasi *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="text"
                    onChange={handleAmountChange}
                    className={`w-full pl-12 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.amount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">{errors.amount.message?.toString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metode Pembayaran *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethodOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <label
                        key={option.value}
                        className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          watchedValues.paymentMethod === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          value={option.value}
                          {...register('paymentMethod')}
                          className="sr-only"
                        />
                        <Icon className="h-6 w-6 mb-2 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message?.toString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Donasi *
                </label>
                <input
                  type="date"
                  {...register('donationDate')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.donationDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.donationDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.donationDate.message?.toString()}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi (Opsional)
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tambahkan deskripsi atau catatan tambahan"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-900">Dokumen Pendukung</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bukti Pembayaran *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadedFiles.proofOfPayment ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-green-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {uploadedFiles.proofOfPayment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFiles.proofOfPayment.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('proofOfPayment')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload bukti pembayaran (JPG, PNG, PDF)
                      </p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileUpload('proofOfPayment', e.target.files)}
                        className="hidden"
                        id="proofOfPayment"
                      />
                      <label
                        htmlFor="proofOfPayment"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        Pilih File
                      </label>
                    </div>
                  )}
                </div>
                {errors.proofOfPayment && (
                  <p className="mt-1 text-sm text-red-600">{errors.proofOfPayment.message?.toString()}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dokumen Pendukung (Opsional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadedFiles.supportingDocuments ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {uploadedFiles.supportingDocuments.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFiles.supportingDocuments.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile('supportingDocuments')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload dokumen pendukung (JPG, PNG, PDF)
                      </p>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileUpload('supportingDocuments', e.target.files)}
                        className="hidden"
                        id="supportingDocuments"
                      />
                      <label
                        htmlFor="supportingDocuments"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        Pilih File
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Sebelumnya
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading || !isValid}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Donasi'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonationForm; 