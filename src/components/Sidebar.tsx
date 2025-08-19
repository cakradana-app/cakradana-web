'use client';
import React, { useState, useEffect } from 'react';
import { Search, Home, Network, FileText, AlertTriangle, Upload, Users, BarChart3, Loader2 } from 'lucide-react';

interface SidebarProps {
  activePage?: string;
  onPageChange?: (page: string) => void;
  isLoading?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage = 'Dashboard', onPageChange, isLoading = false }) => {
  const [activeItem, setActiveItem] = useState(activePage);
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Update activeItem when activePage prop changes
  useEffect(() => {
    setActiveItem(activePage);
    setClickedItem(null); // Reset clicked state when page changes
  }, [activePage]);

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: 'dashboard' },
    { name: 'Network View', icon: Network, path: 'network-view' },
    { name: 'Donations', icon: FileText, path: 'donations' },
    { name: 'Risk Analysis', icon: AlertTriangle, path: 'risk-analysis' },
    { name: 'Upload Data', icon: Upload, path: 'upload' },
    { name: 'Candidates', icon: Users, path: 'candidates' },
    { name: 'Reports', icon: BarChart3, path: 'reports' }
  ];

  const handleItemClick = async (itemName: string, path: string) => {
    if (isLoading) return; // Prevent multiple clicks while loading
    
    setClickedItem(itemName);
    setActiveItem(itemName);
    
    if (onPageChange) {
      try {
        await onPageChange(path);
      } catch (error) {
        console.error('Page change error:', error);
        // Reset state on error
        setClickedItem(null);
      }
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="flex-1 p-4">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Quick Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === activeItem;
            const isClicked = item.name === clickedItem;
            const isDisabled = isLoading && isClicked;
            
            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item.name, item.path)}
                disabled={isLoading}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'text-blue-700 font-medium bg-blue-50 border border-blue-200'
                    : isClicked && isLoading
                    ? 'text-blue-600 bg-blue-50 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                } ${isDisabled ? 'cursor-not-allowed opacity-75' : 'hover:shadow-sm'}`}
              >
                {isClicked && isLoading ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                )}
                <span className="text-sm">{item.name}</span>
                {isClicked && isLoading && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-xs font-semibold text-white">CD</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">Cakra Putra Dana</div>
            <div>KPU</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;