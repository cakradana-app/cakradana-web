'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  uploadedAt: Date;
  processedAt?: Date;
  error?: string;
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'error',
          progress: 0,
          uploadedAt: new Date(),
          error: 'Invalid file type. Only PDF, JPEG, and PNG files are allowed.'
        };
        setUploadedFiles(prev => [...prev, newFile]);
        return;
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'error',
          progress: 0,
          uploadedAt: new Date(),
          error: 'File size exceeds 10MB limit.'
        };
        setUploadedFiles(prev => [...prev, newFile]);
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        uploadedAt: new Date()
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (file.progress < 100) {
            return { ...file, progress: file.progress + 10 };
          } else {
            clearInterval(interval);
            // Simulate processing
            setTimeout(() => {
              setUploadedFiles(prev => prev.map(f => 
                f.id === fileId 
                  ? { ...f, status: 'processing', progress: 100 }
                  : f
              ));
              
              // Simulate completion
              setTimeout(() => {
                setUploadedFiles(prev => prev.map(f => 
                  f.id === fileId 
                    ? { ...f, status: 'completed', processedAt: new Date() }
                    : f
                ));
              }, 2000);
            }, 500);
            return { ...file, status: 'processing', progress: 100 };
          }
        }
        return file;
      }));
    }, 100);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'processing':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return 'Pending';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Upload Data</h1>
            <p className="mt-2 text-gray-600">
              Upload paper donation forms for OCR processing
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
              <p className="text-sm text-gray-600">
                Drag and drop files here or click to browse
              </p>
            </div>
            
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className={`mx-auto h-16 w-16 mb-4 transition-colors ${
                isDragOver ? 'text-blue-500' : 'text-gray-400'
              }`} />
              
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
              </h4>
              
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {isDragOver 
                  ? 'Release to upload your files' 
                  : 'Upload PDF, JPEG, or PNG files (max 10MB each)'
                }
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Choose Files
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Upload History */}
          {uploadedFiles.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Upload History</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {uploadedFiles.length} files uploaded
                </p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          file.status === 'completed' ? 'bg-green-100' :
                          file.status === 'processing' ? 'bg-yellow-100' :
                          file.status === 'error' ? 'bg-red-100' :
                          'bg-blue-100'
                        }`}>
                          {getStatusIcon(file.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{file.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              file.status === 'uploading' ? 'bg-blue-100 text-blue-700' :
                              file.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                              file.status === 'completed' ? 'bg-green-100 text-green-700' :
                              file.status === 'error' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {getStatusText(file.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => removeFile(file.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Remove File"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Uploading...</span>
                          <span>{file.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Processing Status */}
                    {file.status === 'processing' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Processing...</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Error Message */}
                    {file.error && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-700">{file.error}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 